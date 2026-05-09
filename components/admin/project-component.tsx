"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	ChevronDown,
	ChevronRight,
	ChevronUp,
	Plus,
	RefreshCw,
	UploadCloud,
	X,
} from "lucide-react";

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

type Variation = {
	id: string;
	project_id: string | null;
	name: string;
	description: string | null;
	price: number | null;
	created_at: string | null;
};

type Project = {
	id: string;
	category_id?: string | null;
	name: string;
	description: string | null;
	photo: string[] | null;
	created_at: string | null;
	project_variations?: Variation[] | null;
};

type Category = {
	id: string;
	name: string;
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
			<Card className="relative w-full max-w-[640px] max-h-[calc(100dvh-2rem)] overflow-hidden shadow-lg ring-1 ring-slate-200 dark:ring-slate-800 flex flex-col">
				<CardHeader className="flex flex-row items-start justify-between gap-4">
					<div className="min-w-0">
						<CardTitle className="truncate">{title}</CardTitle>
						{description ? <CardDescription>{description}</CardDescription> : null}
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
				<CardContent className="flex-1 overflow-auto">{children}</CardContent>
			</Card>
		</div>
	);
}

export default function ProjectComponent() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [categories, setCategories] = useState<Category[]>([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
	const [categoryQuery, setCategoryQuery] = useState("");
	const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const selectedCategory = useMemo(() => {
		if (!selectedCategoryId) return null;
		return categories.find((c) => c.id === selectedCategoryId) ?? null;
	}, [categories, selectedCategoryId]);
	const filteredCategories = useMemo(() => {
		const q = categoryQuery.trim().toLowerCase();
		if (!q) return categories;
		return categories.filter((c) => c.name.toLowerCase().includes(q));
	}, [categories, categoryQuery]);

	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [busy, setBusy] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [widgetReady, setWidgetReady] = useState(false);
	const [expandedProjectIds, setExpandedProjectIds] = useState<Set<string>>(
		() => new Set(),
	);
	const [searchQuery, setSearchQuery] = useState("");

	const [createProjectOpen, setCreateProjectOpen] = useState(false);
	const [editProject, setEditProject] = useState<Project | null>(null);
	const [variationModal, setVariationModal] = useState<
		| null
		| {
				mode: "create" | "edit";
				project: Project;
				variation?: Variation;
			}
	>(null);

	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [projectPhotos, setProjectPhotos] = useState<string[]>([]);

	const [variationName, setVariationName] = useState("");
	const [variationDescription, setVariationDescription] = useState("");
	const [variationPrice, setVariationPrice] = useState("");

	const flattenedProjects = useMemo(() => {
		return projects.map((p) => ({
			...p,
			project_variations: Array.isArray(p.project_variations)
				? [...p.project_variations].sort((a, b) => {
						const ta = a.created_at ? Date.parse(a.created_at) : 0;
						const tb = b.created_at ? Date.parse(b.created_at) : 0;
						return tb - ta;
					})
				: [],
		}));
	}, [projects]);

	const visibleProjects = useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return flattenedProjects;
		return flattenedProjects.filter((p) => {
			const name = p.name.toLowerCase();
			const desc = (p.description ?? "").toLowerCase();
			return name.includes(q) || desc.includes(q);
		});
	}, [flattenedProjects, searchQuery]);

	function resetProjectForm() {
		setProjectName("");
		setProjectDescription("");
		setProjectPhotos([]);
	}

	function resetCategoryForm() {
		setCategoryName("");
	}

	function resetVariationForm() {
		setVariationName("");
		setVariationDescription("");
		setVariationPrice("");
	}

	useEffect(() => {
		const urlCategoryId = searchParams.get("categoryId");
		setSelectedCategoryId(urlCategoryId && urlCategoryId.trim() ? urlCategoryId : null);
	}, [searchParams]);

	async function loadCategories() {
		setCategoriesLoading(true);
		try {
			const res = await fetch("/api/categories", { cache: "no-store" });
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { categories?: Category[]; error?: string })
				: null;
			if (!res.ok) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to load categories (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			setCategories(Array.isArray(json?.categories) ? json.categories : []);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to load categories");
		} finally {
			setCategoriesLoading(false);
		}
	}

	function openCreateCategory() {
		resetCategoryForm();
		setCreateCategoryOpen(true);
	}

	async function submitCreateCategory() {
		setBusy(true);
		setError(null);
		try {
			if (!categoryName.trim()) throw new Error("Category name is required");
			const res = await fetch("/api/categories", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ name: categoryName.trim() }),
			});
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { category?: Category; error?: string })
				: null;
			if (!res.ok || !json?.category) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to create category (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			setCreateCategoryOpen(false);
			resetCategoryForm();
			await loadCategories();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Create failed");
		} finally {
			setBusy(false);
		}
	}

	useEffect(() => {
		void loadCategories();
	}, []);

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
				multiple: true,
				maxFiles: 8,

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
						setProjectPhotos((prev) => (prev.includes(url) ? prev : [...prev, url]));
					}
				}

				if (event === "queues-end" || event === "close") {
					setUploading(false);
				}
			},
		);
	}

	async function loadProjects(categoryId?: string | null) {
		setLoading(true);
		setError(null);
		try {
			const url = categoryId ? `/api/projects?categoryId=${encodeURIComponent(categoryId)}` : "/api/projects";
			const res = await fetch(url, { cache: "no-store" });
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { projects?: Project[]; error?: string })
				: null;
			if (!res.ok) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to load projects (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			setProjects(Array.isArray(json?.projects) ? json.projects : []);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to load projects");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (!selectedCategoryId) return;
		void loadProjects(selectedCategoryId);
	}, [selectedCategoryId]);

	function openCreateProject() {
		resetProjectForm();
		setCreateProjectOpen(true);
	}

	function openEditProject(project: Project) {
		setEditProject(project);
		setProjectName(project.name);
		setProjectDescription(project.description ?? "");
		setProjectPhotos(Array.isArray(project.photo) ? project.photo : []);
	}

	function openCreateVariation(project: Project) {
		resetVariationForm();
		setVariationModal({ mode: "create", project });
	}

	function openEditVariation(project: Project, variation: Variation) {
		setVariationModal({ mode: "edit", project, variation });
		setVariationName(variation.name);
		setVariationDescription(variation.description ?? "");
		setVariationPrice(
			typeof variation.price === "number" && Number.isFinite(variation.price)
				? String(variation.price)
				: "",
		);
	}

	function toggleVariations(projectId: string) {
		setExpandedProjectIds((prev) => {
			const next = new Set(prev);
			if (next.has(projectId)) next.delete(projectId);
			else next.add(projectId);
			return next;
		});
	}

	async function submitCreateProject() {
		setBusy(true);
		setError(null);
		try {
			if (!selectedCategoryId) throw new Error("Select a category first");
			if (!projectName.trim()) throw new Error("Project name is required");
			const res = await fetch("/api/projects", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					category_id: selectedCategoryId,
					name: projectName.trim(),
					description: projectDescription.trim() ? projectDescription.trim() : null,
					photo: projectPhotos,
				}),
			});
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { project?: Project; error?: string })
				: null;
			if (!res.ok || !json?.project) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to create project (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			setCreateProjectOpen(false);
			resetProjectForm();
			await loadProjects(selectedCategoryId);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Create failed");
		} finally {
			setBusy(false);
		}
	}

	async function submitEditProject() {
		if (!editProject) return;
		setBusy(true);
		setError(null);
		try {
			if (!selectedCategoryId) throw new Error("Select a category first");
			if (!projectName.trim()) throw new Error("Project name is required");
			const res = await fetch(`/api/projects/${editProject.id}`, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					category_id: selectedCategoryId,
					name: projectName.trim(),
					description: projectDescription.trim() ? projectDescription.trim() : null,
					photo: projectPhotos,
				}),
			});
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { project?: Project; error?: string })
				: null;
			if (!res.ok || !json?.project) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to update project (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			setEditProject(null);
			resetProjectForm();
			await loadProjects(selectedCategoryId);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Update failed");
		} finally {
			setBusy(false);
		}
	}

	async function deleteProject(project: Project) {
		if (!confirm("Delete this project? All variations will be deleted too.")) {
			return;
		}
		setBusy(true);
		setError(null);
		try {
			const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { ok?: boolean; error?: string })
				: null;
			if (!res.ok) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to delete project (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			await loadProjects(selectedCategoryId);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Delete failed");
		} finally {
			setBusy(false);
		}
	}

	function parsePrice(value: string): number | null {
		const v = value.trim();
		if (!v) return null;
		const n = Number(v);
		if (!Number.isFinite(n)) throw new Error("Invalid price");
		return n;
	}

	async function submitVariation() {
		if (!variationModal) return;
		setBusy(true);
		setError(null);
		try {
			if (!variationName.trim()) throw new Error("Variation name is required");
			const price = parsePrice(variationPrice);

			if (variationModal.mode === "create") {
				const res = await fetch("/api/project-variations", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						project_id: variationModal.project.id,
						name: variationName.trim(),
						description: variationDescription.trim()
							? variationDescription.trim()
							: null,
						price,
					}),
				});
				const contentType = res.headers.get("content-type") || "";
				const json = contentType.includes("application/json")
					? ((await res.json()) as { variation?: Variation; error?: string })
					: null;
				if (!res.ok || !json?.variation) {
					if (json?.error) throw new Error(json.error);
					const text = await res.text();
					throw new Error(
						`Failed to create variation (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
					);
				}
				setVariationModal(null);
				resetVariationForm();
				await loadProjects(selectedCategoryId);
				return;
			}

			if (!variationModal.variation) throw new Error("Missing variation");
			const res = await fetch(`/api/project-variations/${variationModal.variation.id}`, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					name: variationName.trim(),
					description: variationDescription.trim()
						? variationDescription.trim()
						: null,
					price,
				}),
			});
			const contentType = res.headers.get("content-type") || "";
			const json = contentType.includes("application/json")
				? ((await res.json()) as { variation?: Variation; error?: string })
				: null;
			if (!res.ok || !json?.variation) {
				if (json?.error) throw new Error(json.error);
				const text = await res.text();
				throw new Error(
					`Failed to update variation (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			setVariationModal(null);
			resetVariationForm();
			await loadProjects(selectedCategoryId);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Save failed");
		} finally {
			setBusy(false);
		}
	}

	async function deleteVariation(variation: Variation) {
		if (!confirm("Delete this project variation?")) {
			return;
		}
		setBusy(true);
		setError(null);
		try {
			const res = await fetch(`/api/project-variations/${variation.id}`, {
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
					`Failed to delete variation (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
				);
			}
			await loadProjects(selectedCategoryId);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Delete failed");
		} finally {
			setBusy(false);
		}
	}

	const formDisabled = busy || uploading;
	const projectModalOpen = createProjectOpen || !!editProject;
	const projectModalTitle = createProjectOpen ? "Create Project" : "Edit Project";
	const projectModalDescription = createProjectOpen
		? "Add a new project. Variations can be added inside each project card."
		: "Update or delete this project.";
	const projectSubmitLabel = createProjectOpen ? "Create" : "Save";

	if (!selectedCategoryId) {
		return (
			<div className="max-w-[1400px] mx-auto w-full p-8">
				<div className="flex items-start justify-between gap-4 mb-10">
					<div>
						<h1 className="text-3xl font-bold text-slate-900 dark:text-white">
							Project Categories
						</h1>
						<p className="text-slate-500 dark:text-slate-400 mt-2">
							Select a category to manage its projects.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
						<div className="w-full sm:w-[320px]">
							<Input
								value={categoryQuery}
								onChange={(e) => setCategoryQuery(e.target.value)}
								placeholder="Search categories…"
								aria-label="Search categories"
								disabled={categoriesLoading}
							/>
						</div>
						<Button
							variant="secondary"
							onClick={() => void loadCategories()}
							disabled={categoriesLoading}
						>
							<RefreshCw aria-hidden="true" />
							Refresh
						</Button>
						<Button onClick={openCreateCategory} disabled={busy}>
							<Plus aria-hidden="true" />
							Create Category
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

				{categoriesLoading ? (
					<Card>
						<CardHeader>
							<CardTitle>Loading…</CardTitle>
						</CardHeader>
					</Card>
				) : categories.length === 0 ? (
					<Card>
						<CardHeader>
							<CardTitle>No categories yet</CardTitle>
							<CardDescription>
								Click “Create Category” to add your first category.
							</CardDescription>
						</CardHeader>
					</Card>
				) : filteredCategories.length === 0 ? (
					<Card>
						<CardHeader>
							<CardTitle>No matching categories</CardTitle>
							<CardDescription>
								Try a different search term.
							</CardDescription>
						</CardHeader>
					</Card>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredCategories.map((c) => (
							<button
								type="button"
								key={c.id}
								onClick={() => router.push(`/protected/projects?categoryId=${encodeURIComponent(c.id)}`)}
								className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 rounded-lg"
								aria-label={`Open category ${c.name}`}
							>
								<Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-slate-200 dark:ring-slate-800">
									<CardHeader className="flex flex-row items-start justify-between gap-4">
										<div className="min-w-0">
											<CardTitle className="text-xl font-bold text-slate-900 dark:text-white truncate">
												{c.name}
											</CardTitle>
											
										</div>
										<ChevronRight
											aria-hidden="true"
											className="text-slate-400 dark:text-slate-500 mt-1"
										/>
									</CardHeader>
								</Card>
							</button>
						))}
					</div>
				)}

				<Modal
					open={createCategoryOpen}
					title="Create Category"
					description="Add a new project category."
					onClose={() => setCreateCategoryOpen(false)}
				>
					<div className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="category-name">Name</Label>
							<Input
								id="category-name"
								value={categoryName}
								onChange={(e) => setCategoryName(e.target.value)}
								placeholder="Category name"
								autoFocus
								disabled={busy}
							/>
						</div>
						<div className="flex items-center justify-end gap-3">
							<Button
								type="button"
								variant="secondary"
								onClick={() => setCreateCategoryOpen(false)}
								disabled={busy}
							>
								Cancel
							</Button>
							<Button
								type="button"
								onClick={() => void submitCreateCategory()}
								disabled={busy}
							>
								{busy ? "Saving…" : "Create"}
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		);
	}

	return (
		<div className="max-w-[1400px] mx-auto w-full p-8">
			<div className="flex items-start justify-between gap-4 mb-10">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-white">
						Projects
					</h1>
					
					{selectedCategory ? (
						<div className="mt-2 text-medium text-slate-500 dark:text-slate-400">
							Category: <span className="font-semibold text-slate-900 dark:text-white">{selectedCategory.name}</span>
						</div>
					) : null}
				</div>
				<div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
					<Button
						variant="secondary"
						onClick={() => router.push("/protected/projects")}
						disabled={busy || uploading}
					>
						Back to Categories
					</Button>
					<div className="w-full sm:w-[320px]">
						<Input
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search projects…"
							disabled={loading}
							aria-label="Search projects"
						/>
					</div>
					<Button
						variant="secondary"
						onClick={() => void loadProjects(selectedCategoryId)}
						disabled={loading || busy || uploading}
					>
						<RefreshCw aria-hidden="true" />
						Refresh
					</Button>
					<Button onClick={openCreateProject} disabled={busy || uploading}>
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
			) : flattenedProjects.length === 0 ? (
				<Card>
					<CardHeader>
						<CardTitle>No projects yet</CardTitle>
						<CardDescription>Click “Create New” to add your first project.</CardDescription>
					</CardHeader>
				</Card>
			) : visibleProjects.length === 0 ? (
				<Card>
					<CardHeader>
						<CardTitle>No matching projects</CardTitle>
						<CardDescription>
							Try a different search term.
						</CardDescription>
					</CardHeader>
				</Card>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{visibleProjects.map((project) => (
						// variations are collapsed by default; user can expand per project
						<Card
							key={project.id}
							className="overflow-hidden shadow-lg ring-1 ring-slate-200 dark:ring-slate-800"
						>
							<CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
								<div className="min-w-0">
									<CardTitle className="text-xl font-bold text-slate-900 dark:text-white truncate">
										{project.name}
									</CardTitle>
									<CardDescription className="text-slate-500 dark:text-slate-400">
										{project.description?.trim()
											? project.description
											: "No description"}
									</CardDescription>
								</div>
								<div className="flex flex-wrap items-center justify-end gap-2">
									<Button
										variant="secondary"
										size="sm"
										onClick={() => openCreateVariation(project)}
										disabled={busy || uploading}
									>
										<Plus aria-hidden="true" />
										Add Variation
									</Button>
									<Button
										variant="secondary"
										size="sm"
										onClick={() => openEditProject(project)}
										disabled={busy || uploading}
									>
										Edit
									</Button>
									<Button
										variant="destructive"
										size="sm"
										onClick={() => void deleteProject(project)}
										disabled={busy || uploading}
									>
										Delete
									</Button>
								</div>
							</CardHeader>

							<CardContent className="space-y-4">
								<div className="text-sm text-slate-500 dark:text-slate-400">
									Photos: {Array.isArray(project.photo) ? project.photo.length : 0}
								</div>
								{Array.isArray(project.photo) && project.photo.length > 0 ? (
									<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
										{project.photo.slice(0, 4).map((url) => (
											<div
												key={url}
												className="aspect-square rounded-md overflow-hidden border border-slate-200 dark:border-slate-800"
											>
												<img
													src={url}
													alt="Project photo"
													className="h-full w-full object-cover"
													loading="lazy"
												/>
											</div>
										))}
									</div>
								) : null}

								<div className="border-t border-slate-200 dark:border-slate-800 pt-4">
									<div className="flex items-center justify-between gap-4 mb-3">
										<div className="text-sm font-semibold text-slate-900 dark:text-white">
											Variations
										</div>
										<div className="flex items-center gap-3">
											<div className="text-sm text-slate-500 dark:text-slate-400">
												{project.project_variations?.length ?? 0}
											</div>
											{project.project_variations && project.project_variations.length > 0 ? (
												<Button
													type="button"
													variant="secondary"
													size="sm"
													onClick={() => toggleVariations(project.id)}
													disabled={busy || uploading}
													aria-expanded={expandedProjectIds.has(project.id)}
													aria-controls={`variations-${project.id}`}
												>
													{expandedProjectIds.has(project.id) ? (
														<ChevronUp aria-hidden="true" />
													) : (
														<ChevronDown aria-hidden="true" />
													)}
													{expandedProjectIds.has(project.id) ? "Hide" : "Show"}
												</Button>
											) : null}
										</div>
									</div>

									{project.project_variations && project.project_variations.length > 0 ? (
										expandedProjectIds.has(project.id) ? (
											<div id={`variations-${project.id}`} className="space-y-3">
												{project.project_variations.map((v) => (
													<div
														key={v.id}
														className="rounded-lg border border-slate-200 dark:border-slate-800 p-4"
													>
														<div className="flex items-start justify-between gap-4">
															<div className="min-w-0">
																<div className="font-semibold text-slate-900 dark:text-white truncate">
																	{v.name}
																</div>
																<div className="text-sm text-slate-500 dark:text-slate-400">
																	{v.description?.trim() ? v.description : "No description"}
																</div>
																<div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
																	Price:{" "}
																	{typeof v.price === "number" && Number.isFinite(v.price)
																		? v.price.toFixed(2)
																		: "—"}
																</div>
															</div>
															<div className="flex flex-wrap items-center gap-2 shrink-0">
																<Button
																	variant="secondary"
																	size="sm"
																	onClick={() => openEditVariation(project, v)}
																	disabled={busy}
																>
																	Edit
																</Button>
																<Button
																	variant="destructive"
																	size="sm"
																	onClick={() => void deleteVariation(v)}
																	disabled={busy}
																>
																	Delete
																</Button>
															</div>
														</div>
													</div>
												))}
											</div>
										) : null
									) : (
										<div className="text-sm text-slate-500 dark:text-slate-400">
											No variations yet.
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			<Modal
				open={projectModalOpen}
				title={projectModalTitle}
				description={projectModalDescription}
				onClose={() => {
					setCreateProjectOpen(false);
					setEditProject(null);
				}}
			>
				<div className="space-y-5">
					<div className="space-y-2">
						<Label htmlFor="project-name">Name</Label>
						<Input
							id="project-name"
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							placeholder="Project name"
							autoFocus
							disabled={formDisabled}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="project-description">Description</Label>
						<textarea
							id="project-description"
							value={projectDescription}
							onChange={(e) => setProjectDescription(e.target.value)}
							placeholder="Optional description"
							rows={5}
							disabled={formDisabled}
							className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y"
						/>
					</div>

					<div className="space-y-2">
						<Label>Photos (optional)</Label>
						<div className="flex items-center gap-3">
							<Button
								type="button"
								variant="secondary"
								onClick={() => void openCloudinaryWidget()}
								disabled={formDisabled || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
							>
								<UploadCloud aria-hidden="true" />
								{uploading ? "Uploading…" : "Upload Photos"}
							</Button>
							<div className="text-sm text-slate-500 dark:text-slate-400">
								{projectPhotos.length} selected
							</div>
						</div>

						{projectPhotos.length > 0 ? (
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
								{projectPhotos.map((url) => (
									<div
										key={url}
										className="relative aspect-square rounded-md overflow-hidden border border-slate-200 dark:border-slate-800"
									>
										<img
											src={url}
											alt="Project photo"
											className="h-full w-full object-cover"
											loading="lazy"
										/>
										<Button
											type="button"
											variant="secondary"
											size="icon"
											onClick={() =>
												setProjectPhotos((prev) => prev.filter((x) => x !== url))
											}
											disabled={formDisabled}
											className="absolute right-1 top-1 h-8 w-8"
											aria-label="Remove photo"
										>
											<X aria-hidden="true" />
										</Button>
									</div>
								))}
							</div>
						) : null}
					</div>

					<div className="flex items-center justify-end gap-3">
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								setCreateProjectOpen(false);
								setEditProject(null);
							}}
							disabled={formDisabled}
						>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={() =>
								void (createProjectOpen ? submitCreateProject() : submitEditProject())
							}
							disabled={formDisabled}
						>
							{busy ? "Saving…" : uploading ? "Uploading…" : projectSubmitLabel}
						</Button>
					</div>
				</div>
			</Modal>

			<Modal
				open={!!variationModal}
				title={
					variationModal?.mode === "create"
						? "Add Project Variation"
						: "Edit Project Variation"
				}
				description={
					variationModal
						? `Project: ${variationModal.project.name}`
						: undefined
				}
				onClose={() => setVariationModal(null)}
			>
				<div className="space-y-5">
					<div className="space-y-2">
						<Label htmlFor="variation-name">Name</Label>
						<Input
							id="variation-name"
							value={variationName}
							onChange={(e) => setVariationName(e.target.value)}
							placeholder="Variation name"
							autoFocus
							disabled={formDisabled}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="variation-description">Description</Label>
						<textarea
							id="variation-description"
							value={variationDescription}
							onChange={(e) => setVariationDescription(e.target.value)}
							placeholder="Optional description"
							rows={4}
							disabled={formDisabled}
							className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="variation-price">Price (optional)</Label>
						<Input
							id="variation-price"
							value={variationPrice}
							onChange={(e) => setVariationPrice(e.target.value)}
							placeholder="e.g. 25000.00"
							inputMode="decimal"
							disabled={formDisabled}
						/>
					</div>

					<div className="flex items-center justify-end gap-3">
						<Button
							type="button"
							variant="secondary"
							onClick={() => setVariationModal(null)}
							disabled={formDisabled}
						>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={() => void submitVariation()}
							disabled={formDisabled}
						>
							{busy ? "Saving…" : variationModal?.mode === "create" ? "Create" : "Save"}
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

