"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <Button
      onClick={logout}
      className=" rounded-xl border-2 border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
    >
      Logout
    </Button>
  );
}
