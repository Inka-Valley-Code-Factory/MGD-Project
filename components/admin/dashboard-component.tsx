import React from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";
import { 
  LayoutDashboard, 
  Building2, 
  MapPin, 
  Tag, 
  Megaphone,
  Star,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DashboardComp = () => {
  const panels = [
    {
      title: "Project Panel",
      description: "Manage development projects and timelines",
      icon: <Building2 className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20",
      href: "/protected/projects",
    },
    {
      title: "Sites Panel",
      description: "Track and manage site locations and status",
      icon: <MapPin className="w-8 h-8 text-emerald-500" />,
      color: "bg-emerald-50 dark:bg-emerald-900/20",
      href: "/protected/sites",
    },
    {
      title: "Reviews Panel",
      description: "Write and manage client reviews",
      icon: <Star className="w-8 h-8 text-violet-500" />,
      color: "bg-violet-50 dark:bg-violet-900/20",
      href: "/protected/reviews",
    },
    {
      title: "Discount / Offers Panel",
      description: "Configure promotions and seasonal discounts",
      icon: <Tag className="w-8 h-8 text-amber-500" />,
      color: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Advertisement Panel",
      description: "Monitor marketing campaigns and materials",
      icon: <Megaphone className="w-8 h-8 text-rose-500" />,
      color: "bg-rose-50 dark:bg-rose-900/20",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              MGD GROUP PVT LTD
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              ADMIN DASHBOARD
            </span>
          </div>
          <div className="flex items-center gap-4">
             <LogoutButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full p-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-slate-900 dark:text-white" />
            Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Welcome back, Admin. Here's what's happening across your property portfolio.
          </p>
        </div>

        {/* Dashboard Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {panels.map((panel, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ring-1 ring-slate-200 dark:ring-slate-800"
            >
              <div className={`absolute top-0 right-0 p-3 ${panel.color} rounded-bl-3xl opacity-50 group-hover:opacity-100 transition-opacity`}>
                {panel.icon}
              </div>
              <CardHeader className="pt-8">
                <div className={`w-12 h-12 rounded-2xl ${panel.color} flex items-center justify-center mb-4 ring-1 ring-inset ring-black/5 dark:ring-white/5`}>
                  {panel.icon}
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {panel.title}
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {panel.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                {"href" in panel && typeof panel.href === "string" ? (
                  <Link
                    href={panel.href}
                    className="flex items-center text-sm font-semibold text-slate-900 dark:text-white group-hover:gap-2 transition-all"
                  >
                    Access Management{" "}
                    <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                ) : (
                  <div className="flex items-center text-sm font-semibold text-slate-900 dark:text-white group-hover:gap-2 transition-all">
                    Access Management{" "}
                    <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardComp;
