import type { ReactNode } from "react";
import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, FlaskConical, House, List } from "lucide-react";
import { lessons } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";

const tabs = [
  { to: "/", label: "Path", icon: House },
  { to: "/labs", label: "Labs", icon: FlaskConical },
  { to: "/glossary", label: "Glossary", icon: BookOpen },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const completed = useProgress((s) => s.completedLessons);
  const setHydrated = useProgress((s) => s.setHydrated);
  const pct = Math.round((completed.length / lessons.length) * 100);

  useEffect(() => {
    const result = useProgress.persist.rehydrate();
    void Promise.resolve(result).then(() => setHydrated());
  }, [setHydrated]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-dvh bg-background text-foreground">
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-border bg-background lg:flex">
          <Link to="/" className="px-5 pt-6 pb-4">
            <p className="font-serif text-2xl tracking-tight">Ember</p>
            <p className="mt-1 text-xs text-subtle">Life as a chemical engine</p>
          </Link>
          <nav className="px-3">
            {tabs.map((t) => {
              const active =
                t.to === "/"
                  ? pathname === "/" || pathname.startsWith("/learn")
                  : t.to === "/labs"
                    ? pathname.startsWith("/lab")
                    : pathname === t.to || pathname.startsWith(t.to);
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={cn(
                    "flex h-11 items-center gap-2.5 rounded-md px-2.5 text-sm transition-[background-color,color] duration-150 ease-out",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                  )}
                >
                  <t.icon className="size-4" />
                  {t.label}
                </Link>
              );
            })}
          </nav>
          <p className="mt-6 px-5 text-xs font-medium uppercase tracking-wider text-subtle">
            Chapters
          </p>
          <ScrollArea className="mt-2 flex-1 px-3 pb-4">
            <ol className="space-y-0.5">
              {lessons.map((l) => {
                const active = pathname === `/learn/${l.slug}`;
                const done = completed.includes(l.slug);
                return (
                  <li key={l.slug}>
                    <Link
                      to="/learn/$slug"
                      params={{ slug: l.slug }}
                      className={cn(
                        "flex min-h-11 items-start gap-2.5 rounded-md px-2.5 py-2 text-sm leading-snug transition-[background-color,color] duration-150 ease-out",
                        active
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 w-5 shrink-0 tabular-nums text-xs",
                          done ? "text-life" : "text-subtle",
                        )}
                      >
                        {l.number}
                      </span>
                      <span>{l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </ScrollArea>
          <div className="border-t border-border px-5 py-4">
            <div className="mb-2 flex items-center justify-between text-xs text-subtle">
              <span>Path</span>
              <span className="tabular-nums">
                {completed.length}/{lessons.length}
              </span>
            </div>
            <Progress value={pct} />
          </div>
        </aside>

        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-sm lg:hidden">
          <Link to="/" className="font-serif text-xl tracking-tight">
            Ember
          </Link>
          <span className="flex items-center gap-2 text-xs tabular-nums text-subtle">
            <List className="size-3.5" />
            {completed.length}/{lessons.length}
          </span>
        </header>

        <div className="lg:pl-60">
          <main className="px-4 pb-28 pt-6 sm:px-8 sm:pt-10 lg:pb-16">{children}</main>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden">
          <ul className="grid grid-cols-3">
            {tabs.map((t) => {
              const active =
                t.to === "/"
                  ? pathname === "/" || pathname.startsWith("/learn")
                  : t.to === "/labs"
                    ? pathname.startsWith("/lab")
                    : pathname === t.to || pathname.startsWith(t.to);
              return (
                <li key={t.to}>
                  <Link
                    to={t.to}
                    className={cn(
                      "flex h-14 flex-col items-center justify-center gap-1 text-xs",
                      active ? "text-foreground" : "text-subtle",
                    )}
                  >
                    <t.icon className="size-4" />
                    {t.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </TooltipProvider>
  );
}
