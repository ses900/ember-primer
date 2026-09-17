export type CalloutTone = "law" | "myth" | "note";

export type QuizOption = {
  id: string;
  label: string;
  correct?: boolean;
  explain: string;
};

export type Block =
  | { type: "lede"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "callout"; tone: CalloutTone; title: string; body: string }
  | { type: "formula"; expr: string; meaning: string }
  | { type: "diagram"; id: DiagramId }
  | { type: "list"; items: string[] }
  | {
      type: "quiz";
      id: string;
      prompt: string;
      options: QuizOption[];
    };

export type DiagramId =
  | "open-closed"
  | "entropy-export"
  | "gradient-dam"
  | "redox-fall"
  | "atp-cycle"
  | "membrane-pmf"
  | "glycolysis-split"
  | "etc-waterfall";

export type Lesson = {
  slug: string;
  number: string;
  title: string;
  dek: string;
  minutes: number;
  lab?: string;
  blocks: Block[];
};

export const lessons: Lesson[] = [
  {
    slug: "equilibrium",
    number: "01",
    title: "Equilibrium is death",
    dek: "A living cell is not a bag of special molecules. It is an unfinished flow.",
    minutes: 8,
    lab: "open-system",
    blocks: [
      {
        type: "lede",
        text: "A crystal is ordered and finished. A flame is ordered and unfinished. Life is closer to the flame.",
      },
      {
        type: "p",
        text: "Seal a cell in a perfect box — no food, no oxygen, no heat leaving — and it does not pause. It runs down. Reactions that once had a direction become two-way streets. Gradients flatten. The chemistry is still there. The life is not.",
      },
      {
        type: "p",
        text: "That is the first thermodynamic fact of biology: a living thing is an open system. Matter and energy cross its boundary. Nutrients in. Waste out. Heat out. The order you see in a cell is not a property of its stuff. It is a property of its flows.",
      },
      { type: "diagram", id: "open-closed" },
      {
        type: "h2",
        text: "Three kinds of box",
      },
      {
        type: "list",
        items: [
          "Isolated — nothing crosses the wall. Energy and matter stay inside. The universe, taken as a whole, is the only honest example.",
          "Closed — energy may cross (heat, light, work); matter may not. A sealed flask in a water bath.",
          "Open — both matter and energy cross. Every organism. Every flame. Every city.",
        ],
      },
      {
        type: "p",
        text: "At chemical equilibrium, every forward reaction is balanced by its reverse. There is no net flux, no concentration difference that can still do work, no voltage across a membrane. Equilibrium is quiet, mixed, and complete. A corpse is a cell whose reactions have been allowed to finish.",
      },
      {
        type: "callout",
        tone: "law",
        title: "The unfinished condition",
        body: "Life is the maintenance of disequilibrium. Not a substance. Not a spark. A standing pattern in a stream of chemistry, like a whirlpool that exists only while the river runs.",
      },
      {
        type: "p",
        text: "This is why “the cell has energy” is a slippery sentence. A dead cell still contains fats, sugars, even ATP for a while. What it has lost is the network of fluxes that kept those molecules away from their equilibrium ratios. The inventory can look similar. The engine has stopped.",
      },
      {
        type: "callout",
        tone: "note",
        title: "Schrödinger’s phrase",
        body: "In 1944 Schrödinger wrote that organisms feed on negative entropy. The careful version: a cell exports entropy to its surroundings faster than it produces entropy inside. It stays locally ordered by disordering the world a little more.",
      },
      {
        type: "quiz",
        id: "eq-1",
        prompt: "A sealed cell still contains glucose and ATP, yet it dies. What has actually run out?",
        options: [
          {
            id: "a",
            label: "The special vital force stored in its molecules",
            explain:
              "There is no extra force. The molecules are ordinary chemistry. What fails is the open-system condition that kept them far from equilibrium.",
          },
          {
            id: "b",
            label: "The flows that held its chemistry away from equilibrium",
            correct: true,
            explain:
              "Without exchange, every gradient is spent. At equilibrium the same molecules can do no net work. Life was the unfinished flow, not the inventory.",
          },
          {
            id: "c",
            label: "Heat — the cell simply gets too cold",
            explain:
              "Temperature matters, but a warm sealed cell still equilibrates. Death here is thermodynamic completion, not merely a chill.",
          },
        ],
      },
    ],
  },
  {
    slug: "second-law",
    number: "02",
    title: "The second law is not our enemy",
    dek: "Organisms get more ordered by making the universe more disordered — on purpose.",
    minutes: 8,
    lab: "open-system",
    blocks: [
      {
        type: "lede",
        text: "The second law does not forbid living things. It is the reason they have a shape at all.",
      },
      {
        type: "p",
        text: "Entropy is a count of ways. A room with socks in the drawer has fewer arrangements than a room with socks everywhere. Energy that has spread into many microscopic motions is less available to lift a weight. The second law says that in any real process, the entropy of the universe — system plus surroundings — does not decrease.",
      },
      {
        type: "formula",
        expr: "ΔS_universe = ΔS_system + ΔS_surroundings ≥ 0",
        meaning:
          "A system may grow more ordered if the surroundings grow more disordered by a greater amount.",
      },
      {
        type: "p",
        text: "A refrigerator cools its inside by dumping more heat into the kitchen. A cell builds a protein — a rare, specified arrangement — by oxidizing fuel and radiating heat. The ledger is paid in the surroundings. You are not a loophole. You are a very good heat engine with opinions.",
      },
      { type: "diagram", id: "entropy-export" },
      {
        type: "h2",
        text: "Dissipative structures",
      },
      {
        type: "p",
        text: "When a flux of energy is driven through matter far from equilibrium, organized patterns can appear: Bénard convection cells in a heated pan, a hurricane, a flame, a biosphere. Ilya Prigogine called them dissipative structures. They exist because they are good at degrading a gradient. They are the universe’s way of producing entropy faster, not slower.",
      },
      {
        type: "p",
        text: "The sun is a hydrogen gradient in the sky. Earth sits in a stream of photons. Photosynthesis catches a thin slice of that stream and holds it, for a while, as reduced carbon. Everything that then eats, burns, runs, or thinks is a downstream, slower, more branched degradation of the same gradient — more interesting than a rock warming in the sun, and fully legal.",
      },
      {
        type: "callout",
        tone: "myth",
        title: "Myth: life violates entropy",
        body: "Local order is cheap if you have a gradient to spend. The second law is a statement about the whole. A growing child, a folding protein, a forming ice crystal — none of them are cosmic crimes. Watch the heat. Watch the waste. That is where the entropy went.",
      },
      {
        type: "p",
        text: "This also tells you what “waste heat” is for. It is not a design flaw. Exporting disordered energy is how a cell keeps its own books. Metabolism is a controlled leak of a cosmic gradient, with work taken at the landings of the stairs.",
      },
      {
        type: "quiz",
        id: "sl-1",
        prompt: "An organism grows more ordered as it develops. Has it violated the second law?",
        options: [
          {
            id: "a",
            label: "Yes — biological order is a known exception",
            explain:
              "There is no biological exception. The second law is about system plus surroundings, not the organism alone.",
          },
          {
            id: "b",
            label: "No — it exports more entropy than it creates internally",
            correct: true,
            explain:
              "Growth is paid for by oxidizing fuel and dumping heat and waste. The universe’s entropy still rises. The organism’s falls, locally, on that bill.",
          },
          {
            id: "c",
            label: "The second law only applies to closed machines, not cells",
            explain:
              "The law applies to the universe. Cells are open, which is how they obey it while staying ordered — by exchanging.",
          },
        ],
      },
    ],
  },
  {
    slug: "gradients",
    number: "03",
    title: "Gradients are the currency",
    dek: "Work requires a difference. Life is the art of not letting differences finish.",
    minutes: 9,
    lab: "proton-dam",
    blocks: [
      {
        type: "lede",
        text: "Nothing happens for free, and nothing happens without a difference.",
      },
      {
        type: "p",
        text: "Heat flows from hot to cold. Charge from high to low potential. Molecules from high to low chemical potential. At equilibrium those differences are spent. No net flow. No work. A waterfall that has already reached the lake cannot turn a mill.",
      },
      {
        type: "p",
        text: "The cell is a city of dams. Membranes are the walls. Gradients are the reservoirs. Life’s central trick is coupling: a flow that wants to happen (electrons falling toward oxygen, protons falling back in) is wired to a flow that does not (making ATP, pumping sodium, assembling a polymer).",
      },
      { type: "diagram", id: "gradient-dam" },
      {
        type: "h2",
        text: "The kinds of difference a cell keeps",
      },
      {
        type: "list",
        items: [
          "Chemical — glucose versus carbon dioxide; ATP versus ADP and phosphate.",
          "Electrical — membrane voltage, often 70 to 180 millivolts. Tiny distance, fierce field.",
          "Proton — a pH and voltage difference across mitochondria, bacteria, or chloroplasts.",
          "Redox — NADH versus NAD+. Electrons parked at a height.",
        ],
      },
      {
        type: "p",
        text: "Spend any of these without replenishing them and the cell slides toward equilibrium. That is not a metaphor. It is the definition of running down.",
      },
      {
        type: "callout",
        tone: "note",
        title: "The Goldilocks of kT",
        body: "At room temperature, thermal energy kT is about 2.5 kJ/mol. Covalent bonds are tens to hundreds of kJ/mol — stable enough to hold a structure, weak enough that enzymes can rearrange them. Life lives in that window: durable, but not frozen.",
      },
      {
        type: "p",
        text: "Money is a poor metaphor for ATP, but it is a fair metaphor for a gradient. Currency is a claim on a difference. When the difference is gone, the paper is still paper. The cell’s wealth is not its inventory of molecules. It is how far those molecules sit from their equilibrium ratios, and whether a path still exists to spend that distance as work.",
      },
      {
        type: "quiz",
        id: "gr-1",
        prompt: "Which of these can still perform work?",
        options: [
          {
            id: "a",
            label: "A warm bath at uniform temperature, full of ATP at equilibrium with ADP",
            explain:
              "Uniform temperature cannot drive a heat engine, and ATP at equilibrium has ΔG = 0. Plenty of stuff; no difference.",
          },
          {
            id: "b",
            label: "A membrane with more protons on one side than the other",
            correct: true,
            explain:
              "A concentration and charge difference is a gradient. Protons falling back down it can turn ATP synthase. Difference is the currency.",
          },
          {
            id: "c",
            label: "A crystal of pure sugar in a sealed, isolated box at equilibrium",
            explain:
              "The sugar is reduced carbon, but with no acceptor, no path, and no disequilibrium, it is a museum piece, not a fuel.",
          },
        ],
      },
    ],
  },
  {
    slug: "redox",
    number: "04",
    title: "Food is reduced carbon",
    dek: "We eat electrons at a height and dump them onto oxygen. Breath and fire are cousins.",
    minutes: 10,
    lab: "redox-tower",
    blocks: [
      {
        type: "lede",
        text: "Oxidation is the loss of electrons. Reduction is the gain. Metabolism is a controlled fall.",
      },
      {
        type: "p",
        text: "Food is reduced: sugars, fats, amino acids carry electrons at relatively high potential. They “want” to fall. Oxygen is hungry for electrons — its reduction potential is high, about +0.82 V for the ½O₂ / H₂O couple. Catabolism is the stepwise drop of those electrons, with dams along the way.",
      },
      {
        type: "p",
        text: "A fire does the same overall chemistry — reduced carbon plus oxygen to carbon dioxide, water, and heat — in one uncontrolled drop. A cell breaks the drop into landings. At each landing a packet of work can be caught: as NADH, as a proton gradient, as ATP.",
      },
      { type: "diagram", id: "redox-fall" },
      {
        type: "formula",
        expr: "ΔG°′ = −n F ΔE°′",
        meaning:
          "The farther an electron falls (the larger the gap in reduction potential), the more free energy is on the table. n is the number of electrons; F is Faraday’s constant.",
      },
      {
        type: "h2",
        text: "The redox tower",
      },
      {
        type: "p",
        text: "More negative reduction potential means a better electron donor. More positive means a better acceptor. NADH sits near −0.32 V. Oxygen sits near the bottom of the aerobic tower. Anaerobes dump electrons onto nitrate, sulfate, carbon dioxide, fumarate — lower rungs, less energy per electron, still a living.",
      },
      {
        type: "callout",
        tone: "myth",
        title: "Myth: we breathe to get energy from oxygen",
        body: "The energy is in the food’s electrons. Oxygen is the dump — the terminal acceptor that lets the fall complete. You inhale an electron sink. You exhale oxidized carbon. The oxygen atoms in that CO₂ are not, mostly, the O₂ you just breathed.",
      },
      {
        type: "p",
        text: "So the two hungers are one story. We eat because we need electrons (and carbon skeletons). We breathe because we need a place to put them. Fermenting cells that cannot use oxygen still eat; they simply dump electrons onto their own organic leftovers, which is why yeast makes ethanol and tired muscle makes lactate.",
      },
      {
        type: "quiz",
        id: "rx-1",
        prompt: "Why is oxygen such a good terminal electron acceptor for aerobic life?",
        options: [
          {
            id: "a",
            label: "It is chemically energetic on its own, like a fuel",
            explain:
              "O₂ is the acceptor, not the fuel. The fuel is reduced carbon. Oxygen’s virtue is how avidly it takes electrons.",
          },
          {
            id: "b",
            label: "It has a high reduction potential, so electrons fall a long way onto it",
            correct: true,
            explain:
              "A large ΔE between NADH and oxygen means a large ΔG. That drop is what respiration harvests, step by step.",
          },
          {
            id: "c",
            label: "It becomes the carbon dioxide we exhale",
            explain:
              "Inhaled O₂ is reduced to water. Exhaled CO₂ is oxidized carbon from food. Different atoms, same overall combustion.",
          },
        ],
      },
    ],
  },
  {
    slug: "atp",
    number: "05",
    title: "ATP is not a battery",
    dek: "The molecule is ordinary. The ratio is the treasure. Equilibrium ATP can do no work.",
    minutes: 9,
    lab: "atp-ratio",
    blocks: [
      {
        type: "lede",
        text: "The phrase “high-energy bond” is a pedagogical crime. ATP is not a tiny spring.",
      },
      {
        type: "p",
        text: "ATP is kinetically stable in water — it does not hydrolyze by itself on useful timescales — and thermodynamically activated when the cell keeps its concentration far above equilibrium with ADP and phosphate. The chemistry is a phosphate-transfer reagent. Kinases move the γ-phosphate onto substrates, making them more reactive or changing a protein’s shape.",
      },
      {
        type: "formula",
        expr: "ΔG = ΔG°′ + RT ln([ADP][Pi] / [ATP])",
        meaning:
          "The standard free energy of hydrolysis is about −30.5 kJ/mol. In the cell the mass-action ratio is held so far from equilibrium that ΔG is typically −50 to −65 kJ/mol.",
      },
      { type: "diagram", id: "atp-cycle" },
      {
        type: "p",
        text: "If you let ATP fall to equilibrium with ADP and Pi, ΔG goes to zero. The “fuel” is still there, chemically. It can do no work. The molecule did not change. The gradient did. This is the same lesson as the waterfall and the lake, written in phosphates.",
      },
      {
        type: "callout",
        tone: "law",
        title: "Power is a flux, not a stock",
        body: "The cell is not powered by ATP the way a toy is powered by a battery. It is powered by the fluxes that keep ATP far from equilibrium — respiration, photosynthesis, fermentation. ATP is the coupling coin, rapidly turned over. A resting human recycles roughly a body-weight of ATP per day.",
      },
      {
        type: "p",
        text: "Why this coin, and not some other? Phosphate chemistry in water is slow without enzymes, so the cell can hold a store without it leaking. The products of hydrolysis are more stable (better solvated, more resonance) than ATP itself, so the equilibrium lies toward ADP + Pi. And the molecule is ancient, shared, and wired into almost every corner of metabolism. History and chemistry, braided.",
      },
      {
        type: "callout",
        tone: "myth",
        title: "Myth: mitochondria make energy",
        body: "Energy is not created. Mitochondria convert a redox gradient into a proton gradient, then into an ATP/ADP disequilibrium. They are transducers. The sun, or a prior oxidation, already paid.",
      },
      {
        type: "quiz",
        id: "atp-1",
        prompt: "A cell is full of ATP, but the ATP/ADP/Pi ratio sits at equilibrium. Can that ATP do work?",
        options: [
          {
            id: "a",
            label: "Yes — ATP molecules contain a high-energy bond that releases work when broken",
            explain:
              "Breaking a bond never releases energy by itself; bonds are sinks. The useful ΔG comes from the whole reaction sitting far from equilibrium.",
          },
          {
            id: "b",
            label: "No — at equilibrium ΔG is zero, so there is no driving force",
            correct: true,
            explain:
              "The inventory can look rich. Without a disequilibrium there is no work. Life keeps the ratio, not a magical bond.",
          },
          {
            id: "c",
            label: "Only if the cell is warm enough to activate the bonds",
            explain:
              "Temperature scales RT, but equilibrium is still ΔG = 0 at any temperature. Heat is not a substitute for a gradient.",
          },
        ],
      },
    ],
  },
  {
    slug: "membrane",
    number: "06",
    title: "The membrane as a dam",
    dek: "Oxidation is not wired to ATP by a magic intermediate. It is wired by protons and a wall.",
    minutes: 10,
    lab: "proton-dam",
    blocks: [
      {
        type: "lede",
        text: "Peter Mitchell’s 1961 claim was considered eccentric. It was also correct.",
      },
      {
        type: "p",
        text: "The link between burning fuel and making ATP is not a high-energy chemical intermediate passed from enzyme to enzyme in the water. It is a proton gradient across a membrane. The inner mitochondrial membrane — or the bacterial plasma membrane, or the thylakoid — is a dam. Electron transport chains are pumps. ATP synthase is a turbine.",
      },
      { type: "diagram", id: "membrane-pmf" },
      {
        type: "formula",
        expr: "PMF ≈ Δψ + 60 · ΔpH   (mV, near 30 °C)",
        meaning:
          "Voltage (outside positive) and pH (inside alkaline) both push protons home. Each pH unit is worth about 60 millivolts. The two add.",
      },
      {
        type: "p",
        text: "Protons are pumped out of the mitochondrial matrix. The matrix becomes negative and alkaline. Protons want to return, electrically and chemically. They may only return in volume through ATP synthase. In F₀ a c-ring rotates in the membrane. A γ shaft turns inside F₁. Binding affinities for ADP, Pi, and ATP change in sequence (Boyer’s binding-change mechanism). ATP is released, not so much “made by force” as encouraged to leave a site that no longer loves it.",
      },
      {
        type: "callout",
        tone: "note",
        title: "Why cristae",
        body: "Mitochondria fold their inner membrane into cristae because a dam’s power scales with area. More membrane, more pumps, more turbines. Bacteria use their plasma membrane and skip the organelle. The architecture is older than the name.",
      },
      {
        type: "p",
        text: "Chemiosmosis unifies worlds that look different: respiration, photosynthesis, the flagellar motor, uncoupling proteins that turn the gradient into heat on purpose (brown fat). In every case a membrane holds a difference, and a protein lets that difference do something other than simply leak.",
      },
      {
        type: "p",
        text: "If the membrane becomes freely permeable to protons — a hole, a poison like DNP, an uncoupler — the dam fails. Electrons may still fall. Heat is still made. ATP is not. You can starve in the presence of food if the coupling is gone. That is the thermodynamic meaning of “uncoupled.”",
      },
      {
        type: "quiz",
        id: "mem-1",
        prompt: "What does the electron transport chain actually pump, in mitochondria?",
        options: [
          {
            id: "a",
            label: "ATP molecules into the cytosol",
            explain:
              "ATP is made by ATP synthase as protons return. The chain’s immediate product is a proton gradient, not ATP itself.",
          },
          {
            id: "b",
            label: "Protons out of the matrix, building voltage and ΔpH",
            correct: true,
            explain:
              "That gradient is the energetic intermediate. Synthase harvests it. Mitchell’s point: the link is topological, not a soluble high-energy molecule.",
          },
          {
            id: "c",
            label: "Oxygen into the matrix to burn carbon",
            explain:
              "Oxygen is reduced to water at complex IV. It is the electron dump, not something the chain pumps as a gradient.",
          },
        ],
      },
    ],
  },
  {
    slug: "glycolysis",
    number: "07",
    title: "Life before the waterfall",
    dek: "An ancient pathway splits sugar in water, with no membrane and no oxygen — and still pays in ATP.",
    minutes: 9,
    lab: "atp-ratio",
    blocks: [
      {
        type: "lede",
        text: "Glycolysis is old, cytosolic, and modest. It is also how you sprint.",
      },
      {
        type: "p",
        text: "Glucose (six carbons) is split to two pyruvates (three each). The net cash is two ATP and two NADH per glucose. No organelle required. No oxygen required. The phosphorylations are substrate-level: a metabolite is made so “hot” — 1,3-bisphosphoglycerate, phosphoenolpyruvate — that it can hand a phosphate directly to ADP. No turbine. A chemical hand.",
      },
      { type: "diagram", id: "glycolysis-split" },
      {
        type: "p",
        text: "Two ATP per glucose is a poor living next to the roughly thirty you can get by sending pyruvate all the way to oxygen. It is a robust living. Muscle does it when oxygen cannot keep up. Yeasts do it and throw the rest away as ethanol. Many cancer cells do it even when oxygen is present (the Warburg effect) — a choice about flux and biosynthesis, not a simple shortage of air.",
      },
      {
        type: "h2",
        text: "Why ferment at all",
      },
      {
        type: "p",
        text: "Glycolysis needs NAD⁺. If all of it is stuck as NADH, the pathway stops, even if glucose is plentiful. Fermentation exists to dump those electrons onto pyruvate (making lactate) or onto acetaldehyde (making ethanol), regenerating NAD⁺. You “waste” the rest of the energy in those small molecules so the mill can keep turning. The point is not the waste. The point is the cofactor.",
      },
      {
        type: "callout",
        tone: "note",
        title: "Pyruvate’s fork",
        body: "With oxygen and mitochondria, pyruvate is decarboxylated to acetyl-CoA and enters the roundabout of the citric acid cycle. Without that option, it is an electron dump. Same molecule, two thermodynamic jobs: fuel versus sink.",
      },
      {
        type: "p",
        text: "There is a deeper historical claim, still debated in its details: membrane bioenergetics may be as old as cells, but substrate-level phosphorylation is a way to live in the water without a proton dam. Either way, glycolysis is a reminder that “the” metabolism is a stack of inventions. The waterfall of respiration was built on top of something that already worked.",
      },
      {
        type: "quiz",
        id: "gly-1",
        prompt: "Why do cells ferment when it appears to waste energy still sitting in lactate or ethanol?",
        options: [
          {
            id: "a",
            label: "To regenerate NAD⁺ so glycolysis can continue",
            correct: true,
            explain:
              "Without NAD⁺, glyceraldehyde-3-phosphate dehydrogenase stops. Fermentation is cofactor recycling. The “waste” is the price of keeping the mill supplied.",
          },
          {
            id: "b",
            label: "Because lactate and ethanol are the true high-energy stores",
            explain:
              "They still hold reduced carbon, but the cell is throwing that away (or exporting it) on purpose. They are not the point of the pathway.",
          },
          {
            id: "c",
            label: "To cool the cell by converting chemical energy into heat only",
            explain:
              "Heat is always produced, but fermentation’s job is redox balance, not thermoregulation.",
          },
        ],
      },
    ],
  },
  {
    slug: "respiration",
    number: "08",
    title: "The roundabout and the waterfall",
    dek: "A cycle strips electrons from carbon. A chain drops them onto oxygen. A turbine takes the rent.",
    minutes: 11,
    lab: "redox-tower",
    blocks: [
      {
        type: "lede",
        text: "A living animal is a flame with membranes.",
      },
      {
        type: "p",
        text: "Acetyl-CoA (two carbons) enters the citric acid cycle by condensing with oxaloacetate (four) to make citrate (six). Around the wheel, two CO₂ leave, oxaloacetate is remade, and the useful harvest is reduced cofactors — NADH, FADH₂ — plus one GTP or ATP. The cycle is also a roundabout for biosynthesis. Intermediates are siphoned for amino acids, porphyrins, glucose. Anaplerosis refills what was taken.",
      },
      { type: "diagram", id: "etc-waterfall" },
      {
        type: "p",
        text: "Then the waterfall. Complex I takes electrons from NADH and pumps protons. Complex II takes them from succinate and does not pump. The Q-cycle at III pumps. Cytochrome c shuttles. Complex IV reduces O₂ to water and pumps again. The protons come home through ATP synthase. The number of ATP per glucose is on the order of thirty, depending on shuttles and c-ring stoichiometry. The number matters less than the architecture: a staircase, not a cliff.",
      },
      {
        type: "callout",
        tone: "law",
        title: "What inhaled oxygen becomes",
        body: "The O₂ you breathe is reduced to water at complex IV. The CO₂ you exhale is oxidized carbon from food, stripped in the pyruvate dehydrogenase reaction and the cycle. Fire and breath share an overall equation. They do not share a mechanism, and they do not share the fate of the O₂ molecule.",
      },
      {
        type: "p",
        text: "Uncontrolled, this chemistry is a fire: one drop, all heat. Controlled, it is respiration: the same fall, sampled as work. The cell’s invention is not a new reaction. It is a topology — membranes, complexes, a turbine — that lets a cosmic gradient pay the rent of staying far from equilibrium, for a while, in a warm little open system.",
      },
      {
        type: "p",
        text: "You now have the whole picture, in one sentence you can keep: life is a dissipative structure that feeds on redox gradients, holds them as proton and phosphate disequilibria across and inside water-bounded compartments, and pays the second law in heat and waste. Equilibrium is death because equilibrium is the absence of a difference that can still do work.",
      },
      {
        type: "callout",
        tone: "note",
        title: "Where to go next",
        body: "The labs make the same claims tactile: an open box that stays ordered only while it is fed; a redox tower you can drop electrons down; a membrane dam; the mass-action truth of ATP. Run them. The sentences will stick to the pictures.",
      },
      {
        type: "quiz",
        id: "resp-1",
        prompt: "The oxygen you inhale is mostly converted into which molecule?",
        options: [
          {
            id: "a",
            label: "Carbon dioxide, which you then exhale",
            explain:
              "Exhaled CO₂ is oxidized carbon from food. Inhaled O₂ is not the source of those oxygen atoms.",
          },
          {
            id: "b",
            label: "Water, at complex IV of the electron transport chain",
            correct: true,
            explain:
              "O₂ is the terminal electron acceptor. It is reduced to H₂O. That is why we breathe.",
          },
          {
            id: "c",
            label: "ATP, by being inserted into the molecule in mitochondria",
            explain:
              "Oxygen never becomes part of ATP in that way. ATP’s oxygens come from its phosphate chemistry, not from O₂ gas.",
          },
        ],
      },
    ],
  },
];

export const labs = [
  {
    slug: "open-system",
    number: "I",
    title: "Closed versus open",
    dek: "Watch order collapse in a sealed box, then hold it with a flux.",
    minutes: 6,
    related: "equilibrium",
  },
  {
    slug: "redox-tower",
    number: "II",
    title: "The redox tower",
    dek: "Drop electrons from a donor to an acceptor and read the fall.",
    minutes: 5,
    related: "redox",
  },
  {
    slug: "proton-dam",
    number: "III",
    title: "The proton dam",
    dek: "Pump, hold, and spend a membrane gradient.",
    minutes: 6,
    related: "membrane",
  },
  {
    slug: "atp-ratio",
    number: "IV",
    title: "ATP’s real ΔG",
    dek: "Slide the mass-action ratio and watch work appear and vanish.",
    minutes: 5,
    related: "atp",
  },
] as const;

export type LabMeta = (typeof labs)[number];

export function getLesson(slug: string) {
  return lessons.find((l) => l.slug === slug);
}

export function getLab(slug: string) {
  return labs.find((l) => l.slug === slug);
}

export function adjacentLesson(slug: string) {
  const i = lessons.findIndex((l) => l.slug === slug);
  return {
    prev: i > 0 ? lessons[i - 1] : undefined,
    next: i >= 0 && i < lessons.length - 1 ? lessons[i + 1] : undefined,
    index: i,
  };
}
