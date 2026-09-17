import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: 0 | 1;
};

function seed(n: number, w: number, h: number, sorted: boolean): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < n; i++) {
    const kind = (i % 2) as 0 | 1;
    const x = sorted
      ? kind === 0
        ? 16 + Math.random() * (w * 0.42)
        : w * 0.58 + Math.random() * (w * 0.42 - 16)
      : 16 + Math.random() * (w - 32);
    out.push({
      x,
      y: 16 + Math.random() * (h - 32),
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      kind,
    });
  }
  return out;
}

function orderMetric(ps: Particle[], w: number) {
  if (ps.length === 0) return 0;
  let left0 = 0;
  let n0 = 0;
  for (const p of ps) {
    if (p.kind === 0) {
      n0 += 1;
      if (p.x < w / 2) left0 += 1;
    }
  }
  if (n0 === 0) return 0;
  const sep = left0 / n0;
  return Math.max(0, Math.min(1, Math.abs(sep - 0.5) * 2));
}

export function OpenSystemLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const fluxOn = useRef(true);
  const [open, setOpen] = useState(true);
  const [order, setOrder] = useState(1);
  const [flux, setFlux] = useState(true);
  const raf = useRef<number>(0);

  useEffect(() => {
    fluxOn.current = flux;
  }, [flux]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.current = seed(72, rect.width, rect.height, true);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let last = performance.now();
    let acc = 0;
    const tick = (t: number) => {
      const dt = Math.min(32, t - last);
      last = t;
      acc += dt;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const ps = particles.current;
      const mid = w / 2;
      const pump = open && fluxOn.current;

      for (const p of ps) {
        p.vx += (Math.random() - 0.5) * 0.08;
        p.vy += (Math.random() - 0.5) * 0.08;
        if (pump) {
          const toward = p.kind === 0 ? 0.22 * w : 0.78 * w;
          p.vx += (toward - p.x) * 0.00035;
        }
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 1.4) {
          p.vx *= 1.4 / sp;
          p.vy *= 1.4 / sp;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 10) { p.x = 10; p.vx *= -0.9; }
        if (p.x > w - 10) { p.x = w - 10; p.vx *= -0.9; }
        if (p.y < 10) { p.y = 10; p.vy *= -0.9; }
        if (p.y > h - 10) { p.y = h - 10; p.vy *= -0.9; }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgb(44, 44, 38)";
      ctx.strokeRect(8, 8, w - 16, h - 16);
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.moveTo(mid, 16);
      ctx.lineTo(mid, h - 16);
      ctx.stroke();
      ctx.setLineDash([]);

      if (open) {
        ctx.fillStyle = "rgb(232, 226, 212)";
        ctx.beginPath();
        ctx.moveTo(18, 28);
        ctx.lineTo(8, 22);
        ctx.lineTo(8, 34);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(w - 18, h - 28);
        ctx.lineTo(w - 8, h - 22);
        ctx.lineTo(w - 8, h - 34);
        ctx.fill();
      }

      for (const p of ps) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = p.kind === 0 ? "rgb(241, 238, 230)" : "rgb(138, 154, 132)";
        ctx.fill();
      }

      if (acc > 120) {
        acc = 0;
        setOrder(orderMetric(ps, w));
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, [open]);

  const remix = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    particles.current = seed(72, rect.width, rect.height, true);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={open ? "default" : "secondary"} onClick={() => { setOpen(true); setFlux(true); }}>
          Open, fed
        </Button>
        <Button size="sm" variant={!open ? "default" : "secondary"} onClick={() => setOpen(false)}>
          Isolated
        </Button>
        {open ? (
          <Button size="sm" variant="outline" onClick={() => setFlux((v) => !v)}>
            {flux ? "Cut the flux" : "Restore flux"}
          </Button>
        ) : null}
        <Button size="sm" variant="ghost" onClick={remix}>
          Reseed ordered
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl bg-background shadow-[var(--shadow-border)]">
        <canvas ref={canvasRef} className="h-64 w-full sm:h-72" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-subtle">Order</p>
          <p className="mt-1 font-serif text-3xl tabular-nums tracking-tight">
            {Math.round(order * 100)}
            <span className="text-lg text-muted-foreground">%</span>
          </p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-fast ease-smooth",
                order > 0.35 ? "bg-life" : "bg-primary/50",
              )}
              style={{ width: `${Math.round(order * 100)}%` }}
            />
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {open
            ? flux
              ? "A flux is sorting the two kinds. Order is a standing pattern, paid for continuously — not a property of the particles."
              : "The box is still open, but the pump is off. Watch the order decay toward mix. Openness is necessary, not sufficient."
            : "Nothing crosses the wall. Thermal motion mixes. This is the second law as a picture: isolation finishes the story."}
        </p>
      </div>
    </div>
  );
}
