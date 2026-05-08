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
  name: string;
  description: string | null;
  photo: string[] | null;
  created_at: string | null;
  project_variations?: ProjectVariationRow[] | null;
};

async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function GET() {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("projects")
    .select(
      "id,name,description,photo,created_at,project_variations(id,project_id,name,description,price,created_at)",
    )
    .order("created_at", { ascending: false });

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

  const { name, description, photo } = body as {
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

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("projects")
    .insert({
      name: name.trim(),
      description: typeof description === "string" ? description : null,
      photo: normalizedPhotos,
    })
    .select("id,name,description,photo,created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ project: data as ProjectRow }, { status: 201 });
}
