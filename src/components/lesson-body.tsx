import type { Block } from "@/data/curriculum";
import { Diagram } from "@/components/diagrams";
import { QuizBlock } from "@/components/quiz-block";
import { cn } from "@/lib/utils";

export function LessonBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mx-auto max-w-2xl">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "lede":
            return (
              <p
                key={i}
                className="mb-8 font-serif text-xl leading-snug tracking-tight text-foreground sm:text-2xl"
              >
                {b.text}
              </p>
            );
          case "p":
            return (
              <p key={i} className="mb-5 text-base leading-relaxed text-foreground/90">
                {b.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="mb-4 mt-10 font-serif text-2xl font-medium tracking-tight"
              >
                {b.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i} className="mb-6 space-y-3">
                {b.items.map((item) => (
                  <li
                    key={item}
                    className="border-l border-border pl-4 text-base leading-relaxed text-foreground/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside
                key={i}
                className={cn(
                  "my-8 rounded-xl px-5 py-4 shadow-[var(--shadow-border)]",
                  b.tone === "myth" && "bg-destructive/10",
                  b.tone === "law" && "bg-card",
                  b.tone === "note" && "bg-secondary",
                )}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-subtle">
                  {b.tone === "myth" ? "Myth" : b.tone === "law" ? "Law" : "Note"}
                </p>
                <p className="mt-1 font-serif text-lg font-medium tracking-tight">{b.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </aside>
            );
          case "formula":
            return (
              <figure key={i} className="my-8 rounded-xl bg-card px-5 py-5 shadow-[var(--shadow-border)]">
                <p className="font-serif text-lg tracking-tight sm:text-xl">{b.expr}</p>
                <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {b.meaning}
                </figcaption>
              </figure>
            );
          case "diagram":
            return <Diagram key={i} id={b.id} />;
          case "quiz":
            return (
              <QuizBlock key={b.id} id={b.id} prompt={b.prompt} options={b.options} />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
