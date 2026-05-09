import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type ReviewRow = {
  id: string;
  client_name: string;
  client_photo: string | null;
  site_name: string | null;
  rating: number | null;
  review_text: string;
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

function normalizeRating(value: unknown): number | null {
  if (value === null || typeof value === "undefined" || value === "") return null;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error("Invalid rating");
  }
  if (!Number.isInteger(value)) {
    throw new Error("Rating must be an integer");
  }
  if (value < 1 || value > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  return value;
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
    return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("reviews")
    .select(
      "id,client_name,client_photo,site_name,rating,review_text,created_at",
    )
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data as ReviewRow });
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
    return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { client_name, client_photo, site_name, rating, review_text } = body as {
    client_name?: unknown;
    client_photo?: unknown;
    site_name?: unknown;
    rating?: unknown;
    review_text?: unknown;
  };

  if (typeof client_name !== "string" || !client_name.trim()) {
    return NextResponse.json({ error: "Client name is required" }, { status: 400 });
  }
  if (typeof review_text !== "string" || !review_text.trim()) {
    return NextResponse.json({ error: "Review text is required" }, { status: 400 });
  }

  let normalizedRating: number | null = null;
  try {
    normalizedRating = normalizeRating(rating);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid rating" },
      { status: 400 },
    );
  }

  const normalizedClientPhoto =
    typeof client_photo === "string" && client_photo.trim()
      ? client_photo.trim()
      : null;

  const normalizedSiteName =
    typeof site_name === "string" && site_name.trim() ? site_name.trim() : null;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("reviews")
    .update({
      client_name: client_name.trim(),
      client_photo: normalizedClientPhoto,
      site_name: normalizedSiteName,
      rating: normalizedRating,
      review_text: review_text.trim(),
    })
    .eq("id", id)
    .select(
      "id,client_name,client_photo,site_name,rating,review_text,created_at",
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data as ReviewRow });
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
    return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from("reviews").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
