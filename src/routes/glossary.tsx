import { createFileRoute, Link } from "@tanstack/react-router";
import { glossary, glossaryGroups } from "@/data/glossary";
import { lessons } from "@/data/curriculum";

export const Route = createFileRoute("/glossary")({ component: GlossaryPage });

function GlossaryPage() {
  return (
    <div className="ember-enter mx-auto max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-wider text-subtle">Language</p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight">Glossary</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        The few words this primer leans on. Precision here is the whole game: a gradient is
        not a substance, and ATP is not a battery.
      </p>

      {glossaryGroups.map((group) => (
        <section key={group} className="mt-12">
          <h2 className="font-serif text-2xl tracking-tight">{group}</h2>
          <dl className="mt-5 divide-y divide-border overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
            {glossary
              .filter((t) => t.group === group)
              .map((t) => (
                <div key={t.id} id={t.id} className="px-5 py-5">
                  <dt className="font-medium">{t.term}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.def}</dd>
                  {t.see && t.see.length > 0 ? (
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {t.see.map((id) => {
                        const other = glossary.find((g) => g.id === id);
                        const lesson = lessons.find((l) => l.slug === id);
                        if (other) {
                          return (
                            <a
                              key={id}
                              href={`#${id}`}
                              className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground transition-[color,background-color] duration-150 hover:text-foreground"
                            >
                              {other.term}
                            </a>
                          );
                        }
                        if (lesson) {
                          return (
                            <Link
                              key={id}
                              to="/learn/$slug"
                              params={{ slug: lesson.slug }}
                              className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground transition-[color,background-color] duration-150 hover:text-foreground"
                            >
                              {lesson.title}
                            </Link>
                          );
                        }
                        return null;
                      })}
                    </dd>
                  ) : null}
                </div>
              ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
