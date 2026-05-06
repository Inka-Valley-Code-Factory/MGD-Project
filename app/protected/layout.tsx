export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </main>
  );
}
