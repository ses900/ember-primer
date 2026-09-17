export type Term = {
  id: string;
  term: string;
  group: "Thermodynamics" | "Redox" | "Bioenergetics" | "Pathways";
  def: string;
  see?: string[];
};

export const glossary: Term[] = [
  {
    id: "open-system",
    term: "Open system",
    group: "Thermodynamics",
    def: "A region that exchanges both matter and energy with its surroundings. Every organism is one. Order inside can persist only while those exchanges continue.",
    see: ["equilibrium", "dissipative"],
  },
  {
    id: "equilibrium",
    term: "Chemical equilibrium",
    group: "Thermodynamics",
    def: "The state in which every forward reaction is balanced by its reverse. No net flux, no remaining driving force (ΔG = 0). For a cell, this is death.",
    see: ["delta-g", "open-system"],
  },
  {
    id: "entropy",
    term: "Entropy (S)",
    group: "Thermodynamics",
    def: "A measure of spread: the number of microscopic arrangements consistent with a macroscopic state, and of how unavailable energy has become for work. The second law says S of the universe does not decrease.",
    see: ["second-law", "dissipative"],
  },
  {
    id: "second-law",
    term: "Second law",
    group: "Thermodynamics",
    def: "In any real process, ΔS_universe ≥ 0. A system may grow more ordered if the surroundings grow more disordered by more. Life is an instance, not an exception.",
    see: ["entropy", "dissipative"],
  },
  {
    id: "dissipative",
    term: "Dissipative structure",
    group: "Thermodynamics",
    def: "An organized pattern that exists only while a flux of energy (and often matter) is driven through a system far from equilibrium. Flames, hurricanes, cells.",
    see: ["open-system", "second-law"],
  },
  {
    id: "delta-g",
    term: "Gibbs free energy (ΔG)",
    group: "Thermodynamics",
    def: "The work available from a process at constant temperature and pressure. ΔG = ΔG°′ + RT ln(Q). Negative ΔG means the process can go forward as written. Zero means equilibrium.",
    see: ["equilibrium", "atp"],
  },
  {
    id: "gradient",
    term: "Gradient",
    group: "Thermodynamics",
    def: "A difference that can still do work: concentration, voltage, pH, redox potential, temperature. No difference, no flow, no work.",
    see: ["pmf", "chemiosmosis"],
  },
  {
    id: "kt",
    term: "kT",
    group: "Thermodynamics",
    def: "Thermal energy scale. At room temperature, about 2.5 kJ/mol. Covalent bonds sit well above it; that is why structures hold, and why enzymes are needed to rearrange them on biological time.",
  },
  {
    id: "redox",
    term: "Redox",
    group: "Redox",
    def: "Oxidation is loss of electrons; reduction is gain. Catabolism is a controlled fall of electrons from reduced food toward an acceptor such as oxygen.",
    see: ["nadh", "oxygen"],
  },
  {
    id: "reduction-potential",
    term: "Reduction potential (E)",
    group: "Redox",
    def: "How avidly a couple takes electrons. More positive E means a better acceptor. ΔE between donor and acceptor sets the scale of ΔG via ΔG°′ = −nFΔE°′.",
    see: ["redox", "etc"],
  },
  {
    id: "nadh",
    term: "NADH / NAD⁺",
    group: "Redox",
    def: "The cell’s main soluble electron carrier. NADH is the reduced form, parked near −0.32 V. Respiration oxidizes it at complex I. Glycolysis stops if NAD⁺ is not regenerated.",
    see: ["redox", "fermentation"],
  },
  {
    id: "oxygen",
    term: "Oxygen as acceptor",
    group: "Redox",
    def: "O₂ is not the fuel. It is the dump. Inhaled oxygen is reduced to water at complex IV. The energy was in the food’s electrons.",
    see: ["etc", "redox"],
  },
  {
    id: "atp",
    term: "ATP",
    group: "Bioenergetics",
    def: "A kinetically stable phosphate-transfer coin. Its useful ΔG comes from a mass-action ratio held far from equilibrium, not from a tiny spring in the bond. Typical cellular ΔG of hydrolysis: −50 to −65 kJ/mol.",
    see: ["delta-g", "atp-synthase"],
  },
  {
    id: "chemiosmosis",
    term: "Chemiosmosis",
    group: "Bioenergetics",
    def: "Mitchell’s mechanism: electron transport pumps protons across a membrane; the proton-motive force drives ATP synthase. The energetic intermediate is a gradient, not a soluble high-energy molecule.",
    see: ["pmf", "atp-synthase"],
  },
  {
    id: "pmf",
    term: "Proton-motive force",
    group: "Bioenergetics",
    def: "The work available from the proton gradient. Near 30 °C, PMF (mV) ≈ Δψ + 60·ΔpH. Voltage and pH difference add. Both push protons home.",
    see: ["chemiosmosis", "gradient"],
  },
  {
    id: "atp-synthase",
    term: "ATP synthase (F₀F₁)",
    group: "Bioenergetics",
    def: "A rotary turbine. Protons flow through F₀ in the membrane; a shaft turns in F₁; binding affinities change and ATP is released. It can also run in reverse, pumping protons by hydrolyzing ATP.",
    see: ["chemiosmosis", "atp"],
  },
  {
    id: "uncoupling",
    term: "Uncoupling",
    group: "Bioenergetics",
    def: "When protons leak across the membrane without going through ATP synthase. The redox fall still happens; it becomes heat. Brown fat does this on purpose. Poisons like DNP do it as a disaster.",
    see: ["pmf", "chemiosmosis"],
  },
  {
    id: "glycolysis",
    term: "Glycolysis",
    group: "Pathways",
    def: "Glucose to two pyruvates in the cytosol. Net: 2 ATP and 2 NADH. Ancient, anaerobic-capable, substrate-level phosphorylation. No membrane required.",
    see: ["fermentation", "substrate-level"],
  },
  {
    id: "substrate-level",
    term: "Substrate-level phosphorylation",
    group: "Pathways",
    def: "ATP made by direct phosphate transfer from a “hot” metabolite to ADP, without a proton turbine. The two payoff steps of glycolysis are the textbook cases.",
    see: ["glycolysis", "atp"],
  },
  {
    id: "fermentation",
    term: "Fermentation",
    group: "Pathways",
    def: "Dumping glycolysis’s electrons onto an organic molecule (pyruvate → lactate, or acetaldehyde → ethanol) to regenerate NAD⁺. The “waste” is the price of keeping the mill turning without oxygen.",
    see: ["glycolysis", "nadh"],
  },
  {
    id: "tca",
    term: "Citric acid cycle",
    group: "Pathways",
    def: "A catalytic roundabout: acetyl-CoA in, two CO₂ out, oxaloacetate remade, NADH and FADH₂ harvested. Also a hub for biosynthesis. Anaplerosis refills siphoned intermediates.",
    see: ["etc", "redox"],
  },
  {
    id: "etc",
    term: "Electron transport chain",
    group: "Pathways",
    def: "Membrane complexes that pass electrons from NADH/FADH₂ to an acceptor (O₂ in aerobes) and pump protons. The staircase that turns a redox fall into a proton dam.",
    see: ["oxygen", "chemiosmosis"],
  },
  {
    id: "anaplerosis",
    term: "Anaplerosis",
    group: "Pathways",
    def: "Refilling citric-acid-cycle intermediates that were withdrawn for biosynthesis, so the wheel can keep turning. A cycle that is also a hub must be topped up.",
    see: ["tca"],
  },
];

export const glossaryGroups = [
  "Thermodynamics",
  "Redox",
  "Bioenergetics",
  "Pathways",
] as const;
