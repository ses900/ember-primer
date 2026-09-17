import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DG0 = -30.5; // kJ/mol
const R = 0.008314; // kJ/mol/K
const T = 310; // K, 37 °C

function dg(atp: number, adp: number, pi: number) {
  const q = (adp * pi) / atp;
  return DG0 + R * T * Math.log(q);
}

export function AtpRatioLab() {
  const [atp, setAtp] = useState(8);
  const [adp, setAdp] = useState(0.8);
  const [pi, setPi] = useState(8);

  const value = dg(atp, adp, pi);
  const ratio = atp / adp;

  const curve = useMemo(() => {
    const pts = [];
    for (let r = 0.05; r <= 40; r *= 1.12) {
      const a = r;
      const d = 1;
      const p = 8;
      pts.push({ r, g: dg(a, d, p) });
    }
    return pts;
  }, []);

  const dead = Math.abs(value) < 2;
  const cellular = value < -48 && value > -70;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
        <div className="h-64 rounded-xl bg-background p-3 shadow-[var(--shadow-border)] sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={curve} margin={{ top: 16, right: 16, left: 12, bottom: 8 }}>
              <XAxis
                dataKey="r"
                type="number"
                scale="log"
                domain={[0.05, 40]}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                axisLine={{ stroke: "var(--color-border)" }}
                tickLine={false}
                tickFormatter={(v: number) => (v >= 1 ? v.toFixed(0) : v.toFixed(1))}
              />
              <YAxis
                domain={[-80, 10]}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={56}
              />
              <ReferenceLine y={0} stroke="var(--color-subtle)" strokeDasharray="3 4" />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "var(--color-foreground)",
                }}
                formatter={(v) => [`${Number(v).toFixed(1)} kJ/mol`, "ΔG"]}
                labelFormatter={(r) => `ATP/ADP ≈ ${Number(r).toFixed(2)} (Pi = 8 mM)`}
              />
              <Line
                type="monotone"
                dataKey="g"
                stroke="var(--color-primary)"
                strokeWidth={1.6}
                dot={false}
                isAnimationActive={false}
              />
              <ReferenceDot
                x={Math.min(40, Math.max(0.05, ratio))}
                y={value}
                r={5}
                fill="var(--color-life)"
                stroke="none"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-subtle">ΔG of hydrolysis</p>
            <p className="font-serif text-3xl tabular-nums tracking-tight">
              {value.toFixed(1)}
              <span className="text-lg text-muted-foreground"> kJ/mol</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {dead
                ? "Near equilibrium. The molecules are still there. Work is not."
                : cellular
                  ? "In the living window: far from −30.5, because the ratio is held."
                  : value < 0
                    ? "Downhill, but not as far as a healthy cell keeps it."
                    : "Uphill — ATP would form from ADP, not the other way."}
            </p>
          </div>
          <p className="text-xs leading-relaxed text-subtle">
            Curve holds Pi at 8 mM. Your sliders move the real ΔG, including Pi. ΔG°′ = −30.5 kJ/mol at 37 °C.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <SliderField
          label="ATP"
          unit="mM"
          value={atp}
          min={0.2}
          max={12}
          onChange={setAtp}
        />
        <SliderField
          label="ADP"
          unit="mM"
          value={adp}
          min={0.05}
          max={6}
          onChange={setAdp}
        />
        <SliderField
          label="Pi"
          unit="mM"
          value={pi}
          min={0.5}
          max={20}
          onChange={setPi}
        />
      </div>
      <p className="text-sm tabular-nums text-muted-foreground">
        [ATP]/[ADP] = {ratio.toFixed(1)}
        <span className="mx-2 text-subtle">·</span>
        Q = {((adp * pi) / atp).toFixed(3)} M
      </p>
    </div>
  );
}

function SliderField({
  label,
  unit,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block space-y-3">
      <span className="flex items-baseline justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="tabular-nums text-muted-foreground">
          {value.toFixed(2)} {unit}
        </span>
      </span>
      <Slider
        min={min}
        max={max}
        step={0.05}
        value={[value]}
        onValueChange={(v) => onChange(v[0] ?? value)}
      />
    </label>
  );
}
