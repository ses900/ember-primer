import type { ReactNode, JSX } from "react";
import type { DiagramId } from "@/data/curriculum";

const stroke = "currentColor";

function Frame({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl bg-card px-3 py-5 text-foreground shadow-[var(--shadow-border)] sm:px-6">
        {children}
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-subtle">{caption}</figcaption>
    </figure>
  );
}

function OpenClosed() {
  return (
    <Frame caption="Left: an isolated box runs to mix. Right: an open box stays sorted only while matter and energy still cross the wall.">
      <svg viewBox="0 0 640 220" className="mx-auto h-auto w-full max-w-xl" aria-hidden>
        <text x="110" y="22" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          Isolated
        </text>
        <rect x="40" y="36" width="140" height="140" rx="10" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <circle cx="78" cy="78" r="6" className="fill-foreground/80" />
        <circle cx="96" cy="92" r="6" className="fill-foreground/80" />
        <circle cx="84" cy="112" r="6" className="fill-foreground/80" />
        <circle cx="128" cy="128" r="6" className="fill-life/90" />
        <circle cx="146" cy="108" r="6" className="fill-life/90" />
        <circle cx="138" cy="148" r="6" className="fill-life/90" />
        <text x="110" y="198" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          runs down
        </text>

        <text x="430" y="22" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          Open
        </text>
        <rect x="320" y="36" width="220" height="140" rx="10" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <line x1="320" y1="70" x2="308" y2="58" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <polygon points="308,58 318,60 310,68" className="fill-foreground/70" />
        <text x="292" y="54" className="fill-muted-foreground" fontSize="10">
          food
        </text>
        <line x1="540" y1="142" x2="556" y2="158" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <polygon points="556,158 546,156 554,148" className="fill-foreground/70" />
        <text x="560" y="174" className="fill-muted-foreground" fontSize="10">
          heat
        </text>
        <circle cx="360" cy="88" r="6" className="fill-foreground/80" />
        <circle cx="378" cy="108" r="6" className="fill-foreground/80" />
        <circle cx="368" cy="132" r="6" className="fill-foreground/80" />
        <circle cx="488" cy="84" r="6" className="fill-life/90" />
        <circle cx="506" cy="112" r="6" className="fill-life/90" />
        <circle cx="492" cy="140" r="6" className="fill-life/90" />
        <text x="430" y="198" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          held by flux
        </text>
      </svg>
    </Frame>
  );
}

function EntropyExport() {
  return (
    <Frame caption="Local order is legal if the surroundings take a larger share of disorder. Heat and waste are the receipt.">
      <svg viewBox="0 0 640 200" className="mx-auto h-auto w-full max-w-xl" aria-hidden>
        <rect x="210" y="48" width="220" height="104" rx="12" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="320" y="88" textAnchor="middle" className="fill-foreground" fontSize="14">
          cell
        </text>
        <text x="320" y="110" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          {"ΔS < 0  (more ordered)"}
        </text>
        <path d="M120 100 H210" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" markerEnd="url(#arr)" />
        <text x="165" y="88" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          fuel, hv
        </text>
        <path d="M430 78 H530" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <polygon points="530,78 520,74 520,82" className="fill-foreground/70" />
        <text x="480" y="66" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          heat, waste
        </text>
        <text x="480" y="128" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          {"ΔS_surr > |ΔS_cell|"}
        </text>
        <text x="320" y="178" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          ΔS_universe ≥ 0
        </text>
      </svg>
    </Frame>
  );
}

function GradientDam() {
  return (
    <Frame caption="A dam is a difference with a controlled leak. Work is taken at the leak, not from the water’s “energy content” in the lake.">
      <svg viewBox="0 0 640 210" className="mx-auto h-auto w-full max-w-xl" aria-hidden>
        <rect x="60" y="40" width="200" height="130" rx="8" className="fill-foreground/10" stroke={stroke} strokeOpacity="0.75" />
        <text x="160" y="78" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          high potential
        </text>
        <rect x="380" y="90" width="200" height="80" rx="8" className="fill-foreground/5" stroke={stroke} strokeOpacity="0.75" />
        <text x="480" y="136" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          low potential
        </text>
        <rect x="268" y="40" width="24" height="130" className="fill-primary/80" />
        <path d="M292 88 C 330 88, 330 118, 380 118" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <polygon points="380,118 370,114 370,122" className="fill-foreground/70" />
        <text x="340" y="78" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          work
        </text>
      </svg>
    </Frame>
  );
}

function RedoxFall() {
  return (
    <Frame caption="A fire is one drop. Respiration is a staircase. Same overall fall of electrons from food toward oxygen; work taken on the landings.">
      <svg viewBox="0 0 640 230" className="mx-auto h-auto w-full max-w-xl" aria-hidden>
        <text x="80" y="36" className="fill-muted-foreground" fontSize="11">
          food (reduced)
        </text>
        <text x="470" y="210" className="fill-muted-foreground" fontSize="11">
          O₂ → H₂O
        </text>
        <path
          d="M90 50 L90 50 L200 90 L200 90 L320 130 L320 130 L440 170 L440 170 L540 200"
          fill="none"
          stroke={stroke}
          strokeOpacity="0.85"
          strokeWidth="1.5"
        />
        <circle cx="90" cy="50" r="5" className="fill-foreground" />
        <circle cx="200" cy="90" r="5" className="fill-foreground/80" />
        <circle cx="320" cy="130" r="5" className="fill-foreground/70" />
        <circle cx="440" cy="170" r="5" className="fill-foreground/60" />
        <circle cx="540" cy="200" r="5" className="fill-life" />
        <text x="214" y="84" className="fill-muted-foreground" fontSize="10">
          NADH
        </text>
        <text x="334" y="124" className="fill-muted-foreground" fontSize="10">
          Q / cyt
        </text>
        <text x="454" y="164" className="fill-muted-foreground" fontSize="10">
          pumps
        </text>
        <text x="40" y="120" className="fill-muted-foreground" fontSize="10">
          E more +
        </text>
      </svg>
    </Frame>
  );
}

function AtpCycle() {
  return (
    <Frame caption="ATP is a rapidly turned coin. The treasure is the ratio, held by respiration or fermentation. At equilibrium the coin still exists and buys nothing.">
      <svg viewBox="0 0 640 210" className="mx-auto h-auto w-full max-w-xl" aria-hidden>
        <circle cx="320" cy="108" r="54" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="320" y="104" textAnchor="middle" className="fill-foreground" fontSize="14">
          ATP
        </text>
        <text x="320" y="124" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          ⇌ ADP + Pi
        </text>
        <path d="M200 70 C 240 30, 400 30, 440 70" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.85" />
        <polygon points="440,70 430,66 432,76" className="fill-foreground/70" />
        <text x="320" y="28" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          work (kinases, pumps)
        </text>
        <path d="M440 146 C 400 186, 240 186, 200 146" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.85" />
        <polygon points="200,146 210,150 208,140" className="fill-foreground/70" />
        <text x="320" y="198" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          respiration · photosynthesis · fermentation
        </text>
      </svg>
    </Frame>
  );
}

function MembranePmf() {
  return (
    <Frame caption="A membrane is a dam. Electron transport is the pump. ATP synthase is the mill. Uncouple the wall and you get heat without ATP.">
      <svg viewBox="0 0 640 230" className="mx-auto h-auto w-full max-w-xl" aria-hidden>
        <text x="40" y="36" className="fill-muted-foreground" fontSize="11">
          intermembrane · H⁺ high
        </text>
        <rect x="40" y="88" width="560" height="18" rx="4" className="fill-primary/70" />
        <text x="40" y="140" className="fill-muted-foreground" fontSize="11">
          matrix · H⁺ low, negative
        </text>
        <rect x="120" y="70" width="70" height="54" rx="6" fill="var(--color-card)" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="155" y="102" textAnchor="middle" className="fill-foreground" fontSize="10">
          ETC
        </text>
        <path d="M155 70 V48" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <polygon points="155,48 151,56 159,56" className="fill-foreground/70" />
        <text x="163" y="58" className="fill-muted-foreground" fontSize="9">
          H⁺
        </text>
        <rect x="400" y="70" width="90" height="54" rx="6" fill="var(--color-card)" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="445" y="96" textAnchor="middle" className="fill-foreground" fontSize="10">
          ATP
        </text>
        <text x="445" y="110" textAnchor="middle" className="fill-foreground" fontSize="10">
          synthase
        </text>
        <path d="M445 70 V48" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <polygon points="445,70 441,62 449,62" className="fill-foreground/70" />
        <text x="454" y="58" className="fill-muted-foreground" fontSize="9">
          H⁺ in
        </text>
        <text x="510" y="102" className="fill-muted-foreground" fontSize="10">
          ADP+Pi → ATP
        </text>
      </svg>
    </Frame>
  );
}

function GlycolysisSplit() {
  return (
    <Frame caption="A six-carbon sugar becomes two threes. Net two ATP by substrate-level transfer, and two NADH that must be reoxidized somehow.">
      <svg viewBox="0 0 640 200" className="mx-auto h-auto w-full max-w-xl" aria-hidden>
        <rect x="40" y="70" width="120" height="48" rx="8" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="100" y="98" textAnchor="middle" className="fill-foreground" fontSize="12">
          glucose
        </text>
        <path d="M160 94 H250" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.85" />
        <polygon points="250,94 242,90 242,98" className="fill-foreground/70" />
        <text x="205" y="82" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          −2 ATP
        </text>
        <rect x="250" y="70" width="130" height="48" rx="8" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="315" y="98" textAnchor="middle" className="fill-foreground" fontSize="12">
          2 × triose
        </text>
        <path d="M380 94 H470" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.85" />
        <polygon points="470,94 462,90 462,98" className="fill-foreground/70" />
        <text x="425" y="82" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          +4 ATP · 2 NADH
        </text>
        <rect x="470" y="70" width="130" height="48" rx="8" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="535" y="98" textAnchor="middle" className="fill-foreground" fontSize="12">
          2 pyruvate
        </text>
        <text x="320" y="160" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          net 2 ATP · no membrane · no O₂
        </text>
      </svg>
    </Frame>
  );
}

function EtcWaterfall() {
  return (
    <Frame caption="The roundabout strips electrons from carbon. The chain drops them onto oxygen. The turbine takes the rent as ATP.">
      <svg viewBox="0 0 640 230" className="mx-auto h-auto w-full max-w-xl" aria-hidden>
        <circle cx="130" cy="110" r="52" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="130" y="106" textAnchor="middle" className="fill-foreground" fontSize="12">
          TCA
        </text>
        <text x="130" y="124" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          acetyl-CoA
        </text>
        <text x="130" y="36" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          2 CO₂
        </text>
        <path d="M182 90 H250" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.85" />
        <text x="216" y="80" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          NADH
        </text>
        <rect x="250" y="48" width="44" height="36" rx="4" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="272" y="70" textAnchor="middle" className="fill-foreground" fontSize="10">
          I
        </text>
        <rect x="310" y="72" width="44" height="36" rx="4" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="332" y="94" textAnchor="middle" className="fill-foreground" fontSize="10">
          III
        </text>
        <rect x="370" y="96" width="44" height="36" rx="4" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="392" y="118" textAnchor="middle" className="fill-foreground" fontSize="10">
          IV
        </text>
        <text x="430" y="148" className="fill-muted-foreground" fontSize="10">
          O₂ → H₂O
        </text>
        <path d="M272 48 V28" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.85" />
        <path d="M332 72 V28" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.85" />
        <path d="M392 96 V28" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.85" />
        <text x="332" y="22" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          H⁺ out
        </text>
        <rect x="500" y="70" width="88" height="56" rx="6" fill="none" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.9" />
        <text x="544" y="96" textAnchor="middle" className="fill-foreground" fontSize="11">
          synthase
        </text>
        <text x="544" y="112" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          ATP
        </text>
        <path d="M544 70 V28" strokeWidth="1.4" stroke={stroke} strokeOpacity="0.85" />
        <polygon points="544,70 540,62 548,62" className="fill-foreground/70" />
      </svg>
    </Frame>
  );
}

const map: Record<DiagramId, () => JSX.Element> = {
  "open-closed": OpenClosed,
  "entropy-export": EntropyExport,
  "gradient-dam": GradientDam,
  "redox-fall": RedoxFall,
  "atp-cycle": AtpCycle,
  "membrane-pmf": MembranePmf,
  "glycolysis-split": GlycolysisSplit,
  "etc-waterfall": EtcWaterfall,
};

export function Diagram({ id }: { id: DiagramId }) {
  const Comp = map[id];
  return <Comp />;
}
