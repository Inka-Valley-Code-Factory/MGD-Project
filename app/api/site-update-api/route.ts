import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	if (error || !data.user) return null;
	return data.user;
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

	const { id, name, location, description, images } = body as {
		id?: unknown;
		name?: unknown;
		location?: unknown;
		description?: unknown;
		images?: unknown;
	};

	if (typeof id !== "string" || !id) {
		return NextResponse.json({ error: "id is required" }, { status: 400 });
	}
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

	return NextResponse.json({ site: data });
}

