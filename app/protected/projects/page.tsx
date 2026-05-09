import ProjectComponent from "@/components/admin/project-component";

import { Suspense } from "react";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="max-w-[1400px] mx-auto w-full p-8">Loading…</div>}>
      <ProjectComponent />
    </Suspense>
  );
}
