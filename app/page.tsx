import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";

import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import HeroComponent from "@/components/front-side/hero-component";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <HeroComponent />
      </div>
    </main>
  );
}
