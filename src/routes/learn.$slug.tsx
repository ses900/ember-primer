import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonBody } from "@/components/lesson-body";
import { adjacentLesson, getLesson, labs } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/learn/$slug")({
  component: LessonPage,
});

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = getLesson(slug);
  if (!lesson) throw notFound();

  const { prev, next } = adjacentLesson(slug);
  const complete = useProgress((s) => s.completeLesson);
  const setLast = useProgress((s) => s.setLastLesson);
  const done = useProgress((s) => s.completedLessons.includes(slug));
  const relatedLab = labs.find((l) => l.slug === lesson.lab);

  useEffect(() => {
    setLast(slug);
  }, [slug, setLast]);

  return (
    <article className="ember-enter mx-auto max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-wider text-subtle">
        Chapter {lesson.number} · {lesson.minutes} min
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight">
        {lesson.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lesson.dek}</p>
      <div className="mt-10">
        <LessonBody blocks={lesson.blocks} />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant={done ? "secondary" : "default"}
          onClick={() => complete(slug)}
        >
          {done ? (
            <>
              <Check />
              Completed
            </>
          ) : (
            "Mark complete"
          )}
        </Button>
        {relatedLab ? (
          <Button asChild variant="outline">
            <Link to="/lab/$slug" params={{ slug: relatedLab.slug }}>
              <FlaskConical />
              {relatedLab.title}
            </Link>
          </Button>
        ) : null}
      </div>

      <nav className="mt-12 flex items-stretch justify-between gap-3 border-t border-border pt-6">
        {prev ? (
          <Button asChild variant="ghost" className="h-auto min-h-11 flex-1 justify-start py-3">
            <Link to="/learn/$slug" params={{ slug: prev.slug }}>
              <ArrowLeft />
              <span className="text-left">
                <span className="block text-xs text-subtle">Previous</span>
                <span className="block">{prev.title}</span>
              </span>
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button asChild variant="ghost" className="h-auto min-h-11 flex-1 justify-end py-3">
            <Link to="/learn/$slug" params={{ slug: next.slug }}>
              <span className="text-right">
                <span className="block text-xs text-subtle">Next</span>
                <span className="block">{next.title}</span>
              </span>
              <ArrowRight />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="ghost" className="h-auto min-h-11 justify-end py-3">
            <Link to="/labs">
              <span className="text-right">
                <span className="block text-xs text-subtle">Continue</span>
                <span className="block">The labs</span>
              </span>
              <ArrowRight />
            </Link>
          </Button>
        )}
      </nav>
    </article>
  );
}
