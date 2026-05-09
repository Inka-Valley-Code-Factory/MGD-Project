import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type ProjectVariationRow = {
  id: string;
  project_id: string | null;
  name: string;
  description: string | null;
  price: number | null;
  created_at: string | null;
};

type ProjectRow = {
  id: string;
  category_id?: string | null;
  name: string;
  description: string | null;
  photo: string[] | null;
  created_at: string | null;
  project_variations?: ProjectVariationRow[] | null;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function GET(req: Request) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const categoryId = url.searchParams.get("categoryId");
  if (categoryId && !isUuid(categoryId)) {
    return NextResponse.json({ error: "Invalid categoryId" }, { status: 400 });
  }

  const admin = createAdminClient();

  const selectClause =
    "id,category_id,name,description,photo,created_at,project_variations(id,project_id,name,description,price,created_at)";

  const query = admin
    .from("projects")
    .select(selectClause)
    .order("created_at", { ascending: false });

  const { data, error } = categoryId
    ? await query.eq("category_id", categoryId)
    : await query;

  if (error && categoryId && error.message.toLowerCase().includes("category_id")) {
    // Backward-compatible fallback if the DB schema doesn't yet include category_id
    const retry = await admin
      .from("projects")
      .select(selectClause)
      .order("created_at", { ascending: false });
    if (retry.error) {
      return NextResponse.json({ error: retry.error.message }, { status: 500 });
    }
    return NextResponse.json({ projects: (retry.data ?? []) as ProjectRow[] });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ projects: (data ?? []) as ProjectRow[] });
}

export async function POST(req: Request) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { category_id, name, description, photo } = body as {
    category_id?: unknown;
    name?: unknown;
    description?: unknown;
    photo?: unknown;
  };

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const normalizedPhotos = Array.isArray(photo)
    ? photo.filter((x): x is string => typeof x === "string" && x.length > 0)
    : [];

	const normalizedCategoryId =
		typeof category_id === "string" && category_id.trim()
			? category_id.trim()
			: null;
	if (normalizedCategoryId && !isUuid(normalizedCategoryId)) {
		return NextResponse.json({ error: "Invalid category_id" }, { status: 400 });
	}

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("projects")
    .insert({
      ...(normalizedCategoryId ? { category_id: normalizedCategoryId } : {}),
      name: name.trim(),
      description: typeof description === "string" ? description : null,
      photo: normalizedPhotos,
    })
    .select("id,category_id,name,description,photo,created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ project: data as ProjectRow }, { status: 201 });
}
