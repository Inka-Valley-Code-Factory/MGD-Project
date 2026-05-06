"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // check if this is the admin user
    if (email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      console.log("email", email);
      console.log("env", process.env.NEXT_PUBLIC_ADMIN_EMAIL);
      setError("Invalid email or password");
      return;
    }

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-none shadow-2xl ring-1 ring-slate-200/50 dark:ring-slate-800/50">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 min-h-[500px]">
            {/* Left Side - Logo and Branding */}
            <div className="relative hidden md:flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-transparent dark:from-slate-800/20 opacity-50" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700">
                  <Image
                    src="/logo.png"
                    alt="Inka Valley Logo"
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  MGD GROUP PVT LTD
                </h2>
                <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-[280px]">
                  Welcome back to the Admin Portal. Manage your properties with
                  ease and precision.
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex flex-col justify-center p-8 md:p-12 bg-white dark:bg-slate-950">
              <div className="mx-auto w-full max-w-sm">
                <div className="mb-8 md:hidden flex justify-center">
                  <Image
                    src="/logo.png"
                    alt="Inka Valley Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                <div className="space-y-2 mb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Admin Login
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    Enter your credentials to access the dashboard
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@inkavalley.com"
                        required
                        className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Password
                        </Label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline-offset-4 hover:underline transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        className="h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                        {error}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-all shadow-lg shadow-slate-900/10 dark:shadow-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
