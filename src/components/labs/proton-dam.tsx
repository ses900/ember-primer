import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_H = 28;

export function ProtonDamLab() {
  const [view, setView] = useState({ protons: 6, atp: 0 });
  const [leaking, setLeaking] = useState(false);
  const [synthase, setSynthase] = useState(true);
  const [pumping, setPumping] = useState(false);
  const pumpRef = useRef(false);
  const leakRef = useRef(false);
  const synRef = useRef(true);
  const sim = useRef({ protons: 6, atp: 0 });

  useEffect(() => { pumpRef.current = pumping; }, [pumping]);
  useEffect(() => { leakRef.current = leaking; }, [leaking]);
  useEffect(() => { synRef.current = synthase; }, [synthase]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const s = sim.current;
      if (pumpRef.current) s.protons += 1.15;
      if (leakRef.current) s.protons -= 1.6;
      if (synRef.current && s.protons > 8) {
        s.protons -= 0.85;
        s.atp += 0.35;
      }
      s.protons = Math.max(0, Math.min(MAX_H, s.protons));
      setView({ protons: s.protons, atp: s.atp });
    }, 180);
    return () => window.clearInterval(id);
  }, []);

  const { protons, atp } = view;
  const frac = protons / MAX_H;
  const dpsi = frac * 160;
  const dpH = frac * 1.1;
  const pmf = dpsi + 60 * dpH;
  const stalled = synthase && protons <= 8;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={pumping ? "default" : "secondary"} onClick={() => setPumping((v) => !v)}>
          {pumping ? "Pumps on" : "Start pumps"}
        </Button>
        <Button size="sm" variant={synthase ? "default" : "secondary"} onClick={() => setSynthase((v) => !v)}>
          {synthase ? "Synthase open" : "Close synthase"}
        </Button>
        <Button size="sm" variant={leaking ? "default" : "outline"} onClick={() => setLeaking((v) => !v)}>
          {leaking ? "Uncoupled" : "Uncouple"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            sim.current = { protons: 6, atp: 0 };
            setView({ protons: 6, atp: 0 });
            setPumping(false);
            setLeaking(false);
            setSynthase(true);
          }}
        >
          Reset
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl bg-background p-4 shadow-[var(--shadow-border)] sm:p-6">
        <svg viewBox="0 0 640 260" className="h-auto w-full" aria-hidden>
          <text x="24" y="28" className="fill-subtle" fontSize="12">outside · H⁺</text>
          {Array.from({ length: Math.round(protons) }).map((_, i) => (
            <circle key={i} cx={40 + (i % 14) * 22} cy={48 + Math.floor(i / 14) * 18} r="5" className="fill-primary" />
          ))}
          <rect x="20" y="118" width="600" height="16" rx="4" className="fill-primary/70" />
          <rect x="110" y="104" width="72" height="44" rx="6" className="fill-card stroke-border" strokeWidth="1" />
          <text x="146" y="130" textAnchor="middle" className="fill-foreground" fontSize="11">ETC</text>
          <rect x="400" y="104" width="96" height="44" rx="6" className="fill-card stroke-border" strokeWidth="1" />
          <text x="448" y="130" textAnchor="middle" className="fill-foreground" fontSize="11">F₀F₁</text>
          <text x="24" y="168" className="fill-subtle" fontSize="12">matrix</text>
          <text x="24" y="220" className="fill-muted-foreground" fontSize="13">
            {pumping ? "electrons falling · protons leaving" : "pumps idle"}
          </text>
          <text x="400" y="220" className="fill-muted-foreground" fontSize="13">
            {leaking
              ? "protons leaking as heat"
              : synthase
                ? stalled
                  ? "turbine stalled — gradient too low"
                  : "protons returning · ATP"
                : "turbine closed"}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Δψ" value={`${Math.round(dpsi)} mV`} />
        <Stat label="ΔpH" value={dpH.toFixed(2)} />
        <Stat label="PMF" value={`${Math.round(pmf)} mV`} warn={leaking} />
        <Stat label="ATP made" value={atp.toFixed(0)} />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        PMF ≈ Δψ + 60·ΔpH. Feed the pumps to raise the dam. Open the synthase to spend it as ATP.
        Uncouple and the same fall becomes heat — you can oxidize fuel and still starve.
      </p>
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-subtle">{label}</p>
      <p className={cn("mt-1 font-serif text-2xl tabular-nums tracking-tight", warn && "text-destructive")}>
        {value}
      </p>
    </div>
  );
}
