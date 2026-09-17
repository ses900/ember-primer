import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AtpRatioLab } from "@/components/labs/atp-ratio";
import { OpenSystemLab } from "@/components/labs/open-system";
import { ProtonDamLab } from "@/components/labs/proton-dam";
import { RedoxTowerLab } from "@/components/labs/redox-tower";
import { getLab, getLesson } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/lab/$slug")({
  component: LabPage,
});

function LabPage() {
  const { slug } = Route.useParams();
  const lab = getLab(slug);
  if (!lab) throw notFound();

  const complete = useProgress((s) => s.completeLab);
  const done = useProgress((s) => s.completedLabs.includes(slug));
  const related = getLesson(lab.related);

  return (
    <div className="ember-enter mx-auto max-w-3xl">
      <Link
        to="/labs"
        className="inline-flex h-11 items-center gap-2 text-sm text-muted-foreground transition-[color] duration-150 hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All labs
      </Link>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-subtle">
        Lab {lab.number} · {lab.minutes} min
      </p>
      <h1 className="mt-2 font-serif text-4xl font-medium tracking-tight">{lab.title}</h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{lab.dek}</p>

      <div className="mt-8 rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-6">
        {slug === "open-system" ? <OpenSystemLab /> : null}
        {slug === "redox-tower" ? <RedoxTowerLab /> : null}
        {slug === "proton-dam" ? <ProtonDamLab /> : null}
        {slug === "atp-ratio" ? <AtpRatioLab /> : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant={done ? "secondary" : "default"} onClick={() => complete(slug)}>
          {done ? (
            <>
              <Check />
              Completed
            </>
          ) : (
            "Mark complete"
          )}
        </Button>
        {related ? (
          <Button asChild variant="outline">
            <Link to="/learn/$slug" params={{ slug: related.slug }}>
              Read {related.title}
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
