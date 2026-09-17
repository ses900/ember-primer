import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { labs, lessons } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const completed = useProgress((s) => s.completedLessons);
  const last = useProgress((s) => s.lastLesson);
  const doneLabs = useProgress((s) => s.completedLabs);
  const reset = useProgress((s) => s.reset);
  const next =
    lessons.find((l) => !completed.includes(l.slug)) ?? lessons[lessons.length - 1];
  const resume = last ? lessons.find((l) => l.slug === last) : undefined;
  const start = resume ?? next;

  return (
    <div className="mx-auto max-w-3xl">
      <header className="ember-enter max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-wider text-subtle">A thermodynamic primer</p>
        <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Life is a flame that does not go out.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A living cell is not a bag of energetic molecules. It is an open chemical engine:
          matter and energy flow through, gradients are held far from equilibrium, and heat
          is the price of staying unfinished.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/learn/$slug" params={{ slug: start.slug }}>
              {completed.length > 0 ? "Continue" : "Begin the path"}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/labs">
              Open a lab
              <FlaskConical />
            </Link>
          </Button>
        </div>
      </header>

      <section className="ember-enter-2 mt-16">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-serif text-2xl tracking-tight">The path</h2>
          <p className="text-xs tabular-nums text-subtle">
            {completed.length} of {lessons.length}
          </p>
        </div>
        <ol className="divide-y divide-border overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
          {lessons.map((l) => {
            const done = completed.includes(l.slug);
            return (
              <li key={l.slug}>
                <Link
                  to="/learn/$slug"
                  params={{ slug: l.slug }}
                  className="flex items-start gap-4 px-4 py-4 transition-[background-color] duration-150 ease-out hover:bg-secondary/60 sm:px-5"
                >
                  <span
                    className={cn(
                      "mt-0.5 w-8 shrink-0 font-serif text-sm tabular-nums",
                      done ? "text-life" : "text-subtle",
                    )}
                  >
                    {l.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-snug">{l.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {l.dek}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-xs tabular-nums text-subtle sm:block">
                    {l.minutes} min
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="ember-enter-3 mt-16">
        <h2 className="font-serif text-2xl tracking-tight">Labs</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Four small engines you can turn with your hands. The same claims as the path, made tactile.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {labs.map((lab) => (
            <li key={lab.slug}>
              <Link
                to="/lab/$slug"
                params={{ slug: lab.slug }}
                className="block h-full rounded-xl bg-card p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]"
              >
                <span className="text-xs tabular-nums text-subtle">
                  Lab {lab.number}
                  {doneLabs.includes(lab.slug) ? " · done" : ""}
                </span>
                <span className="mt-2 block font-serif text-lg tracking-tight">{lab.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {lab.dek}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {completed.length > 0 || doneLabs.length > 0 ? (
        <button
          type="button"
          onClick={reset}
          className="mt-16 text-xs text-subtle underline-offset-4 hover:text-muted-foreground hover:underline"
        >
          Reset progress
        </button>
      ) : null}
    </div>
  );
}
