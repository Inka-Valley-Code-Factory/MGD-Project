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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (typeof id !== "string" || !isUuid(id)) {
    return NextResponse.json(
      { error: "Invalid project variation id" },
      { status: 400 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, description, price } = body as {
    name?: unknown;
    description?: unknown;
    price?: unknown;
  };

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  let normalizedPrice: number | null = null;
  if (typeof price === "number") {
    if (!Number.isFinite(price)) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }
    normalizedPrice = price;
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("project_variations")
    .update({
      name: name.trim(),
      description: typeof description === "string" ? description : null,
      price: normalizedPrice,
    })
    .eq("id", id)
    .select("id,project_id,name,description,price,created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ variation: data as ProjectVariationRow });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (typeof id !== "string" || !isUuid(id)) {
    return NextResponse.json(
      { error: "Invalid project variation id" },
      { status: 400 },
    );
  }

  const admin = createAdminClient();
  const { error } = await admin.from("project_variations").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
