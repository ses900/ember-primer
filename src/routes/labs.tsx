import { createFileRoute, Link } from "@tanstack/react-router";
import { labs, lessons } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/labs")({ component: LabsIndex });

function LabsIndex() {
  const done = useProgress((s) => s.completedLabs);

  return (
    <div className="ember-enter mx-auto max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-wider text-subtle">Hands</p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight">Labs</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        Four engines. Turn them until the sentences from the path become pictures you can
        spoil and restore.
      </p>
      <ul className="mt-10 space-y-3">
        {labs.map((lab) => {
          const related = lessons.find((l) => l.slug === lab.related);
          return (
            <li key={lab.slug}>
              <Link
                to="/lab/$slug"
                params={{ slug: lab.slug }}
                className="flex flex-col gap-2 rounded-xl bg-card p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)] sm:flex-row sm:items-center sm:gap-6"
              >
                <span
                  className={cn(
                    "w-10 font-serif text-xl tabular-nums",
                    done.includes(lab.slug) ? "text-life" : "text-subtle",
                  )}
                >
                  {lab.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-xl tracking-tight">{lab.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {lab.dek}
                  </span>
                </span>
                <span className="text-xs text-subtle">
                  {lab.minutes} min
                  {related ? ` · after ${related.title}` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
