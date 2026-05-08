import SiteEditor from "@/components/admin/site-editor";
import { Suspense } from "react";

async function SiteDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SiteEditor siteId={id} />;
}

export default function SiteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <SiteDetails params={params} />
    </Suspense>
  );
}
