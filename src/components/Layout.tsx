'use client';
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Upload, TrendingUp, Lightbulb, BookOpen, Info, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import NSTicker from '@/components/GlobalNorthStarTicker';
import UserMenu from '@/components/UserMenu';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/overview", label: "Overview", icon: LayoutDashboard },
  { path: "/copilot-workspace", label: "Copilot Workspace", icon: MessageSquare },
  { path: "/data-uploads", label: "Data & Uploads", icon: Upload },
  { path: "/funnel-explorer", label: "Funnel Explorer", icon: TrendingUp },
  { path: "/ab-test-tracker", label: "A/B Test Tracker", icon: TrendingUp },
  { path: "/experiment-suggestions", label: "Experiment Suggestions", icon: Lightbulb },
  { path: "/experiment-library", label: "Experiment Library", icon: BookOpen },
  { path: "/notes", label: "Notes", icon: BookOpen },
  { path: "/about", label: "About Ema", icon: Info }
];

export const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full bg-canvas">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-64 flex-shrink-0 border-r border-border bg-surface p-4">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-3">
            <img src="/remus-logo.svg" alt="Remus" className="h-10 w-10 rounded-full" />
            <div className="flex flex-col">
              <h1 className="text-base font-semibold text-foreground">Ema</h1>
              <p className="text-sm text-muted-foreground">Growth Lab</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 h-8 w-1 rounded-r-full bg-primary transition-all duration-300" />
                  )}
                  <Icon className={cn("h-4 w-4 transition-colors", isActive && "text-primary")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">
              <strong>Ema helps you analyze the metrics you care about.</strong> Pick the funnels, tests, and signals that matter to your team — Ema adapts to your data setup so you can start learning and acting long before you wire up a full analytics stack.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Nav */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground">Remus Growth Experimentation Advisor</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:flex">
              <NSTicker />
            </div>

            <div className="flex items-center gap-3">
             <UserMenu />
           </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};
