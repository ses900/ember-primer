import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Couple = {
  id: string;
  name: string;
  pair: string;
  e: number;
};

const COUPLES: Couple[] = [
  { id: "fd", name: "Ferredoxin", pair: "Fd red / ox", e: -0.43 },
  { id: "nadh", name: "NADH", pair: "NAD⁺ / NADH", e: -0.32 },
  { id: "lac", name: "Lactate", pair: "pyruvate / lactate", e: -0.19 },
  { id: "mq", name: "Menaquinone", pair: "MQ / MQH₂", e: -0.07 },
  { id: "fum", name: "Fumarate", pair: "fumarate / succinate", e: 0.03 },
  { id: "cyt", name: "Cytochrome c", pair: "cyt c ox / red", e: 0.25 },
  { id: "no3", name: "Nitrate", pair: "NO₃⁻ / NO₂⁻", e: 0.42 },
  { id: "o2", name: "Oxygen", pair: "½O₂ / H₂O", e: 0.82 },
];

const F = 96.485;
const N = 2;

export function RedoxTowerLab() {
  const [donor, setDonor] = useState("nadh");
  const [acceptor, setAcceptor] = useState("o2");

  const d = COUPLES.find((c) => c.id === donor)!;
  const a = COUPLES.find((c) => c.id === acceptor)!;
  const dE = a.e - d.e;
  const dG = -N * F * dE;
  const downhill = dE > 0.02;
  const uphill = dE < -0.02;

  const note = useMemo(() => {
    if (donor === acceptor) return "A couple cannot fall onto itself. Pick two rungs.";
    if (downhill) {
      if (acceptor === "o2" && donor === "nadh")
        return "The aerobic drop: about 1.14 V, roughly −220 kJ per two electrons. That is the waterfall respiration samples.";
      if (acceptor === "o2")
        return "Oxygen sits at the bottom of the aerobic tower. Almost any biological donor can fall onto it. That is why we breathe.";
      return "Electrons can fall this way. The farther the drop, the more work is on the table — if a path and a coupling exist.";
    }
    if (uphill)
      return "This is uphill. Photosynthesis and some reverse electron flows pay to climb. Spontaneous respiration does not.";
    return "Almost no driving force. Near equilibrium, little work.";
  }, [acceptor, donor, downhill, uphill]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
      <div className="rounded-xl bg-background p-2 shadow-[var(--shadow-border)] sm:p-3">
        <div className="mb-2 flex justify-between px-3 text-xs text-subtle">
          <span>Better donor</span>
          <span>E°′</span>
        </div>
        <ul className="space-y-1">
          {COUPLES.map((c) => {
            const isDonor = c.id === donor;
            const isAcc = c.id === acceptor;
            const selected = isDonor || isAcc;
            const between =
              donor !== acceptor &&
              ((c.e < d.e && c.e > a.e) || (c.e > d.e && c.e < a.e));
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (c.id === donor) return;
                    if (c.id === acceptor) {
                      setDonor(c.id);
                      setAcceptor(donor);
                      return;
                    }
                    if (c.e <= d.e) setDonor(c.id);
                    else setAcceptor(c.id);
                  }}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-[background-color,box-shadow] duration-150 ease-out",
                    selected
                      ? "bg-card shadow-[var(--shadow-border-hover)]"
                      : between
                        ? "bg-secondary/80"
                        : "hover:bg-secondary",
                  )}
                >
                  <span className={cn("size-2 shrink-0 rounded-full", selected ? "bg-primary" : "bg-border")} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-foreground">{c.name}</span>
                    <span className="block text-xs text-subtle">{c.pair}</span>
                  </span>
                  {isDonor ? (
                    <span className="text-xs text-life">donor</span>
                  ) : isAcc ? (
                    <span className="text-xs text-life">acceptor</span>
                  ) : null}
                  <span className="w-16 shrink-0 text-right tabular-nums text-xs text-muted-foreground">
                    {c.e > 0 ? "+" : ""}
                    {c.e.toFixed(2)} V
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 px-3 text-xs text-subtle">Better acceptor</p>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-subtle">ΔE</p>
          <p className="font-serif text-3xl tabular-nums tracking-tight">
            {dE >= 0 ? "+" : ""}
            {dE.toFixed(2)}
            <span className="text-lg text-muted-foreground"> V</span>
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-subtle">
            ΔG°′ (2 e⁻)
          </p>
          <p className="font-serif text-3xl tabular-nums tracking-tight">
            {Math.round(dG)}
            <span className="text-lg text-muted-foreground"> kJ/mol</span>
          </p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
        <p className="text-xs leading-relaxed text-subtle">
          Tap a rung above the donor to raise the start; tap below to set the dump.
          ΔG°′ = −nFΔE°′. Negative ΔG is downhill.
        </p>
      </div>
    </div>
  );
}
