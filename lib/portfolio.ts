export type PortfolioLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FeaturedWork = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  context: string;
  contribution: string;
  outcome: string;
  tags: string[];
  links: PortfolioLink[];
  tone: "violet" | "amber";
};

export type Project = {
  title: string;
  org: string;
  date: string;
  description: string;
  proof?: string;
  tags: string[];
  links: PortfolioLink[];
};

export const profile = {
  name: "Ziyad Mourabiti",
  role: "Full-stack software engineer at SAP",
  headline:
    "I build reliable, data-intensive products - from enterprise platforms to applied AI.",
  introduction:
    "I work across product, platform, and data: turning complex systems into software people can understand and trust. Today I build Built-In Support at SAP; my recent research explores generative super-resolution for satellite-based solar mapping.",
  email: "mourabitiziyad@gmail.com",
  siteUrl: "https://www.mourabitiziyad.dev",
};

export const socialLinks: PortfolioLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/mourabitiziyad",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ziyadmourabiti",
    external: true,
  },
  {
    label: "Writing",
    href: "https://blog.mourabitiziyad.dev",
    external: true,
  },
];

export const proofPoints = [
  { label: "Currently", value: "Building Built-In Support at SAP" },
  { label: "Education", value: "MSc Data Engineering & Analytics, TUM '25" },
  { label: "Research", value: "Oral presenter at ACDSA 2026" },
];

export const featuredWork: FeaturedWork[] = [
  {
    id: "sap-built-in-support",
    eyebrow: "Enterprise platform / SAP",
    title: "Building support into the product experience",
    summary:
      "End-to-end feature ownership for a large-scale, microservice-based support platform.",
    context:
      "Built-In Support brings help and support closer to where customers work, across a complex enterprise product landscape.",
    contribution:
      "I take features from requirements and epic planning through secure-by-design implementation, including threat modeling and cross-team technical decisions.",
    outcome:
      "The focus is durable platform work: improving reliability and maintainability while making new capabilities easier to evolve.",
    tags: ["Full-stack", "Microservices", "Threat modeling", "Platform engineering"],
    links: [{ label: "Read my experience", href: "/about" }],
    tone: "violet",
  },
  {
    id: "pv-super-resolution",
    eyebrow: "Applied AI / TUM research",
    title: "Sharper satellite imagery for better solar mapping",
    summary:
      "A modular research pipeline evaluating whether generative super-resolution can improve photovoltaic-panel segmentation.",
    context:
      "Accessible satellite imagery has broad coverage, but its spatial resolution makes small photovoltaic installations difficult to detect reliably.",
    contribution:
      "I assembled the workflow from geospatial acquisition through ESRGAN, S2DR3, and Satlas enhancement, image-quality evaluation, and an interactive segmentation interface.",
    outcome:
      "The study found that super-resolution improved segmentation, while perceptual image quality did not consistently predict detection performance. It later became an oral presentation at ACDSA 2026.",
    tags: ["Generative AI", "Computer vision", "Geospatial data", "Python"],
    links: [
      {
        label: "Explore the research",
        href: "https://github.com/mourabitiziyad/pv-sr-detection-thesis",
        external: true,
      },
      {
        label: "Conference certificate",
        href: "/pv-sr-conference-certificate.pdf",
        external: true,
      },
    ],
    tone: "amber",
  },
];

export const projects: Project[] = [
  {
    title: "DelayBahn",
    org: "TUM course project",
    date: "2023",
    description:
      "A distributed journey planner that combined European rail routing with Deutsche Bahn delay prediction.",
    proof: "Processed more than 2 million trips through scheduled ingestion pipelines.",
    tags: ["Next.js", "tRPC", "Distributed systems"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mourabitiziyad/delaybahn",
        external: true,
      },
    ],
  },
  {
    title: "Plato 2.0",
    org: "Quasara / Xpreneurs",
    date: "2023-2024",
    description:
      "A full-stack platform for semantic search, similarity detection, and clustering across large image collections.",
    proof: "Designed for datasets ranging from 100,000 to more than 1 million images.",
    tags: ["Next.js", "FastAPI", "AWS"],
    links: [],
  },
  {
    title: "GenAI for crop breeding",
    org: "NoMaze application project",
    date: "2024",
    description:
      "Refactored a data-driven AI platform and added conversational data exploration, visualization, and pipeline construction.",
    tags: ["LLMs", "Data products", "System design"],
    links: [
      {
        label: "Slides & demo",
        href: "https://www.canva.com/design/DAGUg4CaYsE/coqAtbFqhTRr5enign29yA/view",
        external: true,
      },
    ],
  },
  {
    title: "Security compliance assessment",
    org: "Siemens co-op",
    date: "2024",
    description:
      "A visualization and evaluation tool that made security-compliance artifacts easier for developers and reviewers to assess.",
    tags: ["Security", "Developer experience", "Product engineering"],
    links: [],
  },
  {
    title: "Jury",
    org: "Al Akhawayn University",
    date: "2023",
    description:
      "A digital evaluation platform for capstone presentations, built and shipped with Next.js and Supabase.",
    tags: ["Next.js", "Supabase", "Product delivery"],
    links: [
      { label: "Live site", href: "https://jury.vercel.app/", external: true },
    ],
  },
  {
    title: "UCI chess engine",
    org: "Bachelor's capstone",
    date: "2022",
    description:
      "An open-source C++ chess engine using magic bitboards and the UCI protocol.",
    tags: ["C++", "Algorithms", "Open source"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mourabitiziyad/Monza-Chess",
        external: true,
      },
      {
        label: "Paper",
        href: "https://www.researchgate.net/publication/363350578_AN_OPEN-SOURCE_MAGIC_BITBOARDS_IMPLEMENTATION_OF_A_CHESS_ENGINE",
        external: true,
      },
    ],
  },
];

export const capabilityGroups = [
  {
    label: "Product engineering",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "REST APIs"],
  },
  {
    label: "Platforms & systems",
    skills: ["Microservices", "Distributed systems", "AWS", "GCP", "CI/CD"],
  },
  {
    label: "Data & applied AI",
    skills: ["Python", "SQL", "Pandas", "Computer vision", "PostgreSQL"],
  },
];

export const nowItems = [
  {
    label: "At work",
    text: "Owning full-stack features for SAP Built-In Support, with a focus on secure implementation and maintainable platform foundations.",
  },
  {
    label: "In research",
    text: "Sharing the photovoltaic super-resolution work presented at ACDSA 2026 and keeping its research tooling open.",
  },
  {
    label: "Beyond the screen",
    text: "Following Liverpool and the Atlas Lions, playing chess, FIFA, and Smash Bros, and keeping hip-hop in the rotation.",
  },
];
