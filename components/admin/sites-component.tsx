"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Site = {
	id: string;
	name: string;
	location: string;
};

export default function SitesComponent() {
	const [sites, setSites] = useState<Site[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [query, setQuery] = useState("");

	const filteredSites = sites.filter((site) => {
		const q = query.trim().toLowerCase();
		if (!q) return true;
		return (
			site.name.toLowerCase().includes(q) ||
			site.location.toLowerCase().includes(q)
		);
	});

	async function loadSites() {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/api/sites", { cache: "no-store" });
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { sites?: Site[]; error?: string })
				: null;
			if (!res.ok) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to load sites (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			setSites(Array.isArray(json?.sites) ? json.sites : []);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to load sites");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		void loadSites();
	}, []);

	return (
		<div className="max-w-[1400px] mx-auto w-full p-8">
			<div className="flex items-start justify-between gap-4 mb-10">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-white">
						Sites
					</h1>
					<p className="text-slate-500 dark:text-slate-400 mt-2">
						Create new sites and manage existing ones.
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search by name or location"
						aria-label="Search sites"
						className="w-[260px]"
					/>
					<Button variant="secondary" onClick={() => void loadSites()}>
						Refresh
					</Button>
					<Button asChild>
						<Link href="/protected/sites/new">Create New</Link>
					</Button>
				</div>
			</div>

			{error ? (
				<Card className="border-red-200 dark:border-red-900">
					<CardHeader>
						<CardTitle className="text-red-600 dark:text-red-400">
							Failed to load sites
						</CardTitle>
						<CardDescription>{error}</CardDescription>
					</CardHeader>
				</Card>
			) : null}

			{loading ? (
				<Card>
					<CardHeader>
						<CardTitle>Loading…</CardTitle>
					</CardHeader>
				</Card>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredSites.length === 0 ? (
						<Card className="md:col-span-2 lg:col-span-3">
							<CardHeader>
								<CardTitle>No matching sites</CardTitle>
								<CardDescription>
									Try a different search term.
								</CardDescription>
							</CardHeader>
						</Card>
					) : null}
					{filteredSites.map((site) => (
						<Link
							key={site.id}
							href={`/protected/sites/${site.id}`}
							className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 rounded-lg"
							aria-label={`Open ${site.name}`}
						>
							<Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-slate-200 dark:ring-slate-800">
								<CardHeader className="flex flex-row items-start justify-between gap-4">
									<div className="min-w-0">
										<CardTitle className="text-xl font-bold text-slate-900 dark:text-white truncate">
											{site.name}
										</CardTitle>
										<CardDescription className="text-slate-500 dark:text-slate-400 truncate">
											{site.location}
										</CardDescription>
									</div>
									<ArrowRight
										className="h-5 w-5 text-slate-400 dark:text-slate-500 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300"
										aria-hidden="true"
									/>
								</CardHeader>
							</Card>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

