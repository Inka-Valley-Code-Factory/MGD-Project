"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Plus, RefreshCw, UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Review = {
	id: string;
	client_name: string;
	client_photo: string | null;
	site_name: string | null;
	rating: number | null;
	review_text: string;
	created_at: string | null;
};

declare global {
	interface Window {
		cloudinary?: {
			openUploadWidget: (
				options: Record<string, unknown>,
				callback: (error: unknown, result: unknown) => void,
			) => unknown;
		};
	}
}

function Modal({
	open,
	title,
	description,
	onClose,
	children,
}: {
	open: boolean;
	title: string;
	description?: string;
	onClose: () => void;
	children: ReactNode;
}) {
	useEffect(() => {
		if (!open) return;
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-label={title}
		>
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden="true"
			/>
			<Card className="relative w-full max-w-[640px] max-h-[calc(100vh-2rem)] overflow-hidden shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 flex flex-col">
				<CardHeader className="flex flex-row items-start justify-between gap-4 shrink-0">
					<div className="min-w-0">
						<CardTitle className="truncate">{title}</CardTitle>
						{description ? (
							<CardDescription>{description}</CardDescription>
						) : null}
					</div>
					<Button
						type="button"
						variant="secondary"
						size="icon"
						onClick={onClose}
						aria-label="Close"
					>
						<X aria-hidden="true" />
					</Button>
				</CardHeader>
				<CardContent className="overflow-y-auto flex-1">{children}</CardContent>
			</Card>
		</div>
	);
}

export default function ReviewsComponent() {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [busy, setBusy] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [widgetReady, setWidgetReady] = useState(false);
	const [query, setQuery] = useState("");

	const [createOpen, setCreateOpen] = useState(false);
	const [editReview, setEditReview] = useState<Review | null>(null);

	const [clientName, setClientName] = useState("");
	const [siteName, setSiteName] = useState("");
	const [rating, setRating] = useState("");
	const [reviewText, setReviewText] = useState("");
	const [clientPhoto, setClientPhoto] = useState<string | null>(null);

	function resetForm() {
		setClientName("");
		setSiteName("");
		setRating("");
		setReviewText("");
		setClientPhoto(null);
	}

	useEffect(() => {
		const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
		if (!cloudName) return;

		if (typeof window === "undefined") return;
		if (window.cloudinary?.openUploadWidget) {
			setWidgetReady(true);
			return;
		}

		const existing = document.querySelector(
			'script[src="https://widget.cloudinary.com/v2.0/global/all.js"]',
		);
		if (existing) {
			existing.addEventListener("load", () => setWidgetReady(true), {
				once: true,
			});
			return;
		}

		const script = document.createElement("script");
		script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
		script.async = true;
		script.onload = () => setWidgetReady(true);
		script.onerror = () => setWidgetReady(false);
		document.body.appendChild(script);
	}, []);

	async function openCloudinaryWidget() {
		const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
		const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
		const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

		if (!cloudName || !uploadPreset) {
			setError(
				"Cloudinary env vars missing (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)",
			);
			return;
		}
		if (!widgetReady || !window.cloudinary?.openUploadWidget) {
			setError("Cloudinary widget not ready yet");
			return;
		}

		setUploading(true);
		setError(null);

		window.cloudinary.openUploadWidget(
			{
				cloudName,
				uploadPreset,
				folder:
					typeof folder === "string" && folder.trim() ? folder.trim() : undefined,
				sources: ["local", "url"],
				multiple: false,
				maxFiles: 1,
				resourceType: "image",
				clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
				showAdvancedOptions: false,
			},
			(widgetError: unknown, result: unknown) => {
				if (widgetError) {
					setError("Upload failed");
					setUploading(false);
					return;
				}

				const info = (result as { event?: unknown; info?: unknown })?.info as
					| { secure_url?: unknown }
					| undefined;
				const event = (result as { event?: unknown })?.event;

				if (event === "success") {
					const url = info?.secure_url;
					if (typeof url === "string" && url.length > 0) {
						setClientPhoto(url);
					}
				}

				if (event === "queues-end" || event === "close") {
					setUploading(false);
				}
			},
		);
	}

	async function loadReviews() {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/api/reviews", { cache: "no-store" });
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { reviews?: Review[]; error?: string })
				: null;
			if (!res.ok) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to load reviews (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			setReviews(Array.isArray(json?.reviews) ? json.reviews : []);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to load reviews");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		void loadReviews();
	}, []);

	function openCreate() {
		resetForm();
		setCreateOpen(true);
	}

	function openEdit(review: Review) {
		setEditReview(review);
		setClientName(review.client_name);
		setSiteName(review.site_name ?? "");
		setRating(
			typeof review.rating === "number" && Number.isFinite(review.rating)
				? String(review.rating)
				: "",
		);
		setReviewText(review.review_text);
		setClientPhoto(review.client_photo);
	}

	function parseRating(value: string): number | null {
		const v = value.trim();
		if (!v) return null;
		const n = Number(v);
		if (!Number.isFinite(n) || !Number.isInteger(n)) {
			throw new Error("Rating must be an integer");
		}
		if (n < 1 || n > 5) {
			throw new Error("Rating must be between 1 and 5");
		}
		return n;
	}

	async function submitCreate() {
		setBusy(true);
		setError(null);
		try {
			if (!clientName.trim()) throw new Error("Client name is required");
			if (!reviewText.trim()) throw new Error("Review text is required");

			const normalizedRating = parseRating(rating);

			const res = await fetch("/api/reviews", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					client_name: clientName.trim(),
					client_photo: clientPhoto,
					site_name: siteName.trim() ? siteName.trim() : null,
					rating: normalizedRating,
					review_text: reviewText.trim(),
				}),
			});
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { review?: Review; error?: string })
				: null;
			if (!res.ok || !json?.review) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to create review (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}

			setCreateOpen(false);
			resetForm();
			await loadReviews();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Create failed");
		} finally {
			setBusy(false);
		}
	}

	async function submitEdit() {
		if (!editReview) return;
		setBusy(true);
		setError(null);
		try {
			if (!clientName.trim()) throw new Error("Client name is required");
			if (!reviewText.trim()) throw new Error("Review text is required");

			const normalizedRating = parseRating(rating);

			const res = await fetch(`/api/reviews/${editReview.id}`, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					client_name: clientName.trim(),
					client_photo: clientPhoto,
					site_name: siteName.trim() ? siteName.trim() : null,
					rating: normalizedRating,
					review_text: reviewText.trim(),
				}),
			});
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { review?: Review; error?: string })
				: null;
			if (!res.ok || !json?.review) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to update review (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}

			setEditReview(null);
			resetForm();
			await loadReviews();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Update failed");
		} finally {
			setBusy(false);
		}
	}

	async function deleteReview(review: Review) {
		if (!confirm("Delete this review?")) return;
		setBusy(true);
		setError(null);
		try {
			const res = await fetch(`/api/reviews/${review.id}`, {
				method: "DELETE",
			});
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { ok?: boolean; error?: string })
				: null;
			if (!res.ok) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to delete review (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			await loadReviews();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Delete failed");
		} finally {
			setBusy(false);
		}
	}

	const formDisabled = busy || uploading;
	const modalOpen = createOpen || !!editReview;
	const modalTitle = createOpen ? "Create Review" : "Edit Review";
	const modalDescription = createOpen
		? "Write a new client review."
		: "Update or delete this review.";

	const filteredReviews = reviews.filter((r) => {
		const q = query.trim().toLowerCase();
		if (!q) return true;
		return (
			r.client_name.toLowerCase().includes(q) ||
			(r.site_name ?? "").toLowerCase().includes(q) ||
			r.review_text.toLowerCase().includes(q) ||
			(typeof r.rating === "number" ? String(r.rating) : "").includes(q)
		);
	});

	return (
		<div className="max-w-[1400px] mx-auto w-full p-8">
			<div className="flex items-start justify-between gap-4 mb-10">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-white">
						Reviews
					</h1>
					<p className="text-slate-500 dark:text-slate-400 mt-2">
						Create, edit, and delete client reviews.
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search reviews…"
						aria-label="Search reviews"
						className="w-[280px]"
						disabled={loading}
					/>
					<Button
						variant="secondary"
						onClick={() => void loadReviews()}
						disabled={loading || busy || uploading}
					>
						<RefreshCw aria-hidden="true" />
						Refresh
					</Button>
					<Button onClick={openCreate} disabled={busy || uploading}>
						<Plus aria-hidden="true" />
						Create New
					</Button>
				</div>
			</div>

			{error ? (
				<Card className="mb-6 border-red-200 dark:border-red-900">
					<CardHeader>
						<CardTitle className="text-red-600 dark:text-red-400">
							Action failed
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
			) : reviews.length === 0 ? (
				<Card>
					<CardHeader>
						<CardTitle>No reviews yet</CardTitle>
						<CardDescription>
							Click “Create New” to add your first review.
						</CardDescription>
					</CardHeader>
				</Card>
			) : filteredReviews.length === 0 ? (
				<Card>
					<CardHeader>
						<CardTitle>No matching reviews</CardTitle>
						<CardDescription>
							Try a different search term.
						</CardDescription>
					</CardHeader>
				</Card>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{filteredReviews.map((r) => (
						<Card
							key={r.id}
							className="overflow-hidden shadow-lg ring-1 ring-slate-200 dark:ring-slate-800"
						>
							<CardHeader className="flex flex-row items-start justify-between gap-4">
								<div className="min-w-0">
									<CardTitle className="text-xl font-bold text-slate-900 dark:text-white truncate">
										{r.client_name}
									</CardTitle>
									<CardDescription className="text-slate-500 dark:text-slate-400">
										Site: {r.site_name?.trim() ? r.site_name : "—"} · Rating:{" "}
										{typeof r.rating === "number" ? r.rating : "—"}
									</CardDescription>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant="secondary"
										size="sm"
										onClick={() => openEdit(r)}
										disabled={busy || uploading}
									>
										Edit
									</Button>
									<Button
										variant="destructive"
										size="sm"
										onClick={() => void deleteReview(r)}
										disabled={busy || uploading}
									>
										Delete
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								{r.client_photo ? (
									<div className="flex items-center gap-4">
										<div className="h-14 w-14 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
											<img
												src={r.client_photo}
												alt="Client photo"
												className="h-full w-full object-cover"
												loading="lazy"
											/>
										</div>
										<div className="text-sm text-slate-500 dark:text-slate-400">
											Client photo uploaded
										</div>
									</div>
								) : (
									<div className="text-sm text-slate-500 dark:text-slate-400">
										No client photo.
									</div>
								)}

								<div className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
									{r.review_text}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			<Modal
				open={modalOpen}
				title={modalTitle}
				description={modalDescription}
				onClose={() => {
					setCreateOpen(false);
					setEditReview(null);
				}}
			>
				<div className="space-y-5">
					<div className="space-y-2">
						<Label htmlFor="client-name">Client name</Label>
						<Input
							id="client-name"
							value={clientName}
							onChange={(e) => setClientName(e.target.value)}
							placeholder="Client name"
							disabled={formDisabled}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="site-name">Site name (optional)</Label>
						<Input
							id="site-name"
							value={siteName}
							onChange={(e) => setSiteName(e.target.value)}
							placeholder="Site name"
							disabled={formDisabled}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="rating">Rating (1–5, optional)</Label>
						<Input
							id="rating"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
							placeholder="e.g. 5"
							inputMode="numeric"
							disabled={formDisabled}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="review-text">Review text</Label>
						<textarea
							id="review-text"
							value={reviewText}
							onChange={(e) => setReviewText(e.target.value)}
							placeholder="Write the review..."
							rows={6}
							disabled={formDisabled}
							className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y"
						/>
					</div>

					<div className="space-y-2">
						<Label>Client photo (optional)</Label>
						<div className="flex items-center gap-3">
							<Button
								type="button"
								variant="secondary"
								onClick={() => void openCloudinaryWidget()}
								disabled={
									formDisabled ||
									!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
								}
							>
								<UploadCloud aria-hidden="true" />
								{uploading ? "Uploading…" : "Upload Photo"}
							</Button>
							{clientPhoto ? (
								<Button
									type="button"
									variant="secondary"
									onClick={() => setClientPhoto(null)}
									disabled={formDisabled}
								>
									Remove
								</Button>
							) : null}
						</div>

						{clientPhoto ? (
							<div className="flex items-center gap-4 pt-2">
								<div className="h-16 w-16 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
									<img
										src={clientPhoto}
										alt="Client photo"
										className="h-full w-full object-cover"
										loading="lazy"
									/>
								</div>
								<div className="text-sm text-slate-500 dark:text-slate-400">
									Photo selected
								</div>
							</div>
						) : null}
					</div>

					<div className="flex items-center justify-end gap-3">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								setCreateOpen(false);
								setEditReview(null);
							}}
							disabled={formDisabled}
						>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={() => void (createOpen ? submitCreate() : submitEdit())}
							disabled={formDisabled}
						>
							{busy ? "Saving…" : uploading ? "Uploading…" : createOpen ? "Create" : "Save"}
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
