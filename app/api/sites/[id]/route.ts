import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type SiteRow = {
  id: string;
  name: string;
  location: string;
  description: string | null;
  images: string[] | null;
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

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (typeof id !== "string" || !isUuid(id)) {
    return NextResponse.json({ error: "Invalid site id" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("sites")
    .select("id,name,location,description,images,created_at")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ site: data as SiteRow });
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
    return NextResponse.json({ error: "Invalid site id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, location, description, images } = body as {
    name?: unknown;
    location?: unknown;
    description?: unknown;
    images?: unknown;
  };

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof location !== "string" || !location.trim()) {
    return NextResponse.json({ error: "Location is required" }, { status: 400 });
  }

  const normalizedImages = Array.isArray(images)
    ? images.filter((x): x is string => typeof x === "string" && x.length > 0)
    : [];

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("sites")
    .update({
      name: name.trim(),
      location: location.trim(),
      description: typeof description === "string" ? description : null,
      images: normalizedImages,
    })
    .eq("id", id)
    .select("id,name,location,description,images,created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ site: data as SiteRow });
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
    return NextResponse.json({ error: "Invalid site id" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from("sites").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
