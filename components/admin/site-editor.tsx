"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Site = {
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

export default function SiteEditor({ siteId }: { siteId?: string }) {
  const router = useRouter();
  const mode = useMemo(() => (siteId ? "edit" : "create"), [siteId]);

  const isValidSiteId = useMemo(
    () => (typeof siteId === "string" ? isUuid(siteId) : false),
    [siteId],
  );
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [widgetReady, setWidgetReady] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const formDisabled = saving || uploading || (mode === "edit" && loading);

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

  useEffect(() => {
    if (!siteId) return;

    if (!isValidSiteId) {
      setError("Invalid site id");
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/sites/${siteId}`, { cache: "no-store" });
        const contentType = res.headers.get("content-type") || "";
        const json = contentType.includes("application/json")
          ? ((await res.json()) as { site?: Site; error?: string })
          : null;
        if (!res.ok || !json?.site) {
          if (json?.error) throw new Error(json.error);
          const text = await res.text();
          throw new Error(
            `Failed to load site (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
          );
        }
        setName(json.site.name);
        setLocation(json.site.location);
        setDescription(json.site.description ?? "");
        setImages(Array.isArray(json.site.images) ? json.site.images : []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load site");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [siteId, isValidSiteId]);

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
        folder: typeof folder === "string" && folder.trim() ? folder.trim() : undefined,

        sources: ["local", "url"],
        multiple: true,
        maxFiles: 6,

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
            setImages((prev) => (prev.includes(url) ? prev : [...prev, url]));
          }
        }

        if (event === "queues-end" || event === "close") {
          setUploading(false);
        }
      },
    );
  }

  async function onSubmit() {
    setSaving(true);
    setError(null);
    try {
      if (!name.trim()) throw new Error("Name is required");
      if (!location.trim()) throw new Error("Location is required");

      if (mode === "create") {
        const res = await fetch("/api/sites", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            location: location.trim(),
            description: description.trim() ? description.trim() : null,
            images,
          }),
        });
        const contentType = res.headers.get("content-type") || "";
        const json = contentType.includes("application/json")
          ? ((await res.json()) as { site?: Site; error?: string })
          : null;
        if (!res.ok || !json?.site) {
          if (json?.error) throw new Error(json.error);
          const text = await res.text();
          throw new Error(
            `Failed to create site (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
          );
        }
        router.push(`/protected/sites/${json.site.id}`);
        router.refresh();
        return;
      }

      if (!siteId || !isValidSiteId) {
        throw new Error("Invalid site id");
      }

      const res = await fetch(`/api/sites/${siteId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          location: location.trim(),
          description: description.trim() ? description.trim() : null,
          images,
        }),
      });
      const contentType = res.headers.get("content-type") || "";
      const json = contentType.includes("application/json")
        ? ((await res.json()) as { site?: Site; error?: string })
        : null;
      if (!res.ok || !json?.site) {
        if (json?.error) throw new Error(json.error);
        const text = await res.text();
        throw new Error(
          `Failed to update site (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
        );
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!siteId || !isValidSiteId) {
      setError("Invalid site id");
      return;
    }

		if (
			!confirm(
				"Are you sure you want to delete this site? This action cannot be undone.",
			)
		) {
			return;
		}
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/sites/${siteId}`, { method: "DELETE" });
      const contentType = res.headers.get("content-type") || "";
      const json = contentType.includes("application/json")
        ? ((await res.json()) as { ok?: boolean; error?: string })
        : null;
      if (!res.ok) {
        if (json?.error) throw new Error(json.error);
        const text = await res.text();
        throw new Error(
          `Failed to delete site (HTTP ${res.status}). Received non-JSON response: ${text.slice(0, 120)}…`,
        );
      }
      router.push("/protected/sites");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-[900px] mx-auto w-full p-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {mode === "create"
              ? "Create Site"
              : loading
                ? "Loading…"
                : name.trim() || "Untitled Site"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {mode === "create"
              ? "Add a new site to your portfolio."
              : "Update or delete this site."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/protected/sites">Back</Link>
          </Button>

          {mode === "edit" ? (
            <Button
              variant="destructive"
              onClick={() => void onDelete()}
              disabled={formDisabled}
            >
              Delete
            </Button>
          ) : null}
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

      <Card className="shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>
            Name and location are required. Images are optional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="text-slate-500 dark:text-slate-400">Loading…</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Site name"
                    disabled={formDisabled}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City / address"
                    disabled={formDisabled}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description (supports line breaks)"
                  rows={6}
                  disabled={formDisabled}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      Images
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {images.length}/6 {!widgetReady ? "• Loading uploader" : "• Max 6 images"}
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => void openCloudinaryWidget()}
                    disabled={formDisabled || !widgetReady}
                    aria-busy={uploading}
                  >
                    {uploading ? (
                      <Loader2 className="animate-spin" aria-hidden="true" />
                    ) : (
                      <UploadCloud aria-hidden="true" />
                    )}
                    {!widgetReady
                      ? "Preparing…"
                      : uploading
                        ? "Uploading…"
                        : images.length > 0
                          ? "Add images"
                          : "Upload images"}
                  </Button>
                </div>

                {images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {images.map((url) => (
                      <div
                        key={url}
                        className="relative rounded-lg overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt="Site image"
                          className="w-full h-28 object-cover"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            setImages((prev) => prev.filter((x) => x !== url))
                          }
                          disabled={formDisabled}
                          aria-label="Remove image"
                        >
                          <X aria-hidden="true" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    No images uploaded.
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button onClick={() => void onSubmit()} disabled={formDisabled}>
                  {saving ? "Saving…" : mode === "create" ? "Create" : "Save"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
