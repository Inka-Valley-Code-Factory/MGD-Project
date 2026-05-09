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

	const { id } = body as { id?: unknown };
	if (typeof id !== "string" || !id) {
		return NextResponse.json({ error: "id is required" }, { status: 400 });
	}

	const admin = createAdminClient();
	const { error } = await admin.from("sites").delete().eq("id", id);
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ ok: true });
}

