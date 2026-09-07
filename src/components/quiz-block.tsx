import { useState } from "react";
import { Check, X } from "lucide-react";
import type { QuizOption } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function QuizBlock({
  id,
  prompt,
  options,
}: {
  id: string;
  prompt: string;
  options: QuizOption[];
}) {
  const mark = useProgress((s) => s.markQuiz);
  const stored = useProgress((s) => s.quizCorrect[id]);
  const [picked, setPicked] = useState<string | null>(null);
  const choice = options.find((o) => o.id === picked);

  return (
    <section className="my-10 rounded-xl bg-card p-5 shadow-[var(--shadow-border)] sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-subtle">Check</p>
      <h3 className="mt-2 font-serif text-xl font-medium leading-snug tracking-tight">{prompt}</h3>
      <ul className="mt-5 space-y-2">
        {options.map((o) => {
          const selected = picked === o.id;
          const revealed = picked !== null;
          const good = Boolean(o.correct);
          return (
            <li key={o.id}>
              <button
                type="button"
                disabled={revealed}
                onClick={() => {
                  setPicked(o.id);
                  mark(id, Boolean(o.correct));
                }}
                className={cn(
                  "flex min-h-11 w-full items-start gap-3 rounded-lg px-3 py-3 text-left text-sm leading-relaxed transition-[background-color,box-shadow] duration-150 ease-out",
                  "shadow-[var(--shadow-border)] disabled:cursor-default",
                  !revealed && "hover:shadow-[var(--shadow-border-hover)] hover:bg-secondary",
                  revealed && good && "bg-life/10 shadow-none",
                  revealed && selected && !good && "bg-destructive/10 shadow-none",
                  revealed && !selected && !good && "opacity-50",
                )}
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border">
                  {revealed && good ? (
                    <Check className="size-3 text-life" />
                  ) : revealed && selected ? (
                    <X className="size-3 text-destructive" />
                  ) : null}
                </span>
                {o.label}
              </button>
            </li>
          );
        })}
      </ul>
      {choice ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{choice.explain}</p>
      ) : stored === true && !picked ? (
        <p className="mt-4 text-xs text-life">You have answered this correctly before.</p>
      ) : null}
    </section>
  );
}
