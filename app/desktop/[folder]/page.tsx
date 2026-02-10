"use client";
import { Spinner } from "@/components/ui/spinner";
import { Window } from "@/components/window";
import Link from "next/link";
import React, { Suspense } from "react";
import { motion } from "framer-motion";

function PageContent({ title }: Readonly<{ title: string }>) {
  return (
    <Window>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">🚧 Work NOT in Progress -Studies :/- 🚧</p>
      </div>
    </Window>
  );
}

const skillsData = [
  {
    category: "Core Engineering",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "Bash"],
  },
  {
    category: "Web & Platform",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "tRPC",
      "Prisma",
      "React Query",
      "REST APIs",
    ],
  },
  {
    category: "Architecture & Cloud",
    skills: [
      "Microservices",
      "Distributed Systems",
      "AWS",
      "GCP",
      "CI/CD (GitHub Actions)",
    ],
  },
  {
    category: "Data & Analysis",
    skills: ["Pandas", "NumPy", "PostgreSQL", "MongoDB", "Tableau"],
  },
  {
    category: "Quality & Tooling",
    skills: ["Git", "Jest", "React Testing Library", "LaTeX"],
  },
];

function Skills() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Window>
      <motion.div
        className="relative h-full w-full md:w-2/3 bg-white flex justify-center mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative p-6 overflow-y-scroll w-full">
          <h1 className="text-2xl font-bold mb-6">Skills</h1>
          <motion.ul
            className="space-y-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {skillsData.map((category) => (
              <motion.li key={category.category} variants={item}>
                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                  {category.category}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </Window>
  );
}

const projectsData = [
  {
    title: "PV Detection via Super-Resolution",
    org: "Master's Thesis @ TUM",
    date: "2025",
    description:
      "Used Generative AI to enhance satellite imagery resolution for better photovoltaic panel detection.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/mourabitiziyad/pv-sr-detection-thesis",
      },
      {
        label: "Slides",
        url: "https://www.canva.com/design/DAGnnEyTTQ0/BEZHBZHIJEW-8TpCiknySw/view",
      },
      {
        label: "ACDSA 2026 Conference",
        url: "/pv-sr-conference-certificate.pdf",
      },
    ],
  },
  {
    title: "Security Compliance Assessment",
    org: "Siemens AG (Co-op)",
    date: "Apr – Aug 2024",
    description:
      "Built a tool to help developers and security reviewers visualize and evaluate compliance artifacts more efficiently.",
    links: [],
  },
  {
    title: "GenAI for Crops Breeding Platform",
    org: "NoMaze (Application Project)",
    date: "Apr – Oct 2024",
    description:
      "Refactored a data-driven AI platform and added an LLM layer that lets domain experts explore data and build pipelines through conversation.",
    links: [
      {
        label: "Slides",
        url: "https://www.canva.com/design/DAGUg4CaYsE/coqAtbFqhTRr5enign29yA/view",
      },
    ],
  },
  {
    title: "DelayBahn",
    org: "TUM Course Project",
    date: "Dec 2023",
    description:
      "Distributed web app for European travel planning with Deutsche Bahn delay predictions. Processed 2M+ trips using a T3 stack.",
    links: [
      { label: "GitHub", url: "https://github.com/mourabitiziyad/delaybahn" },
    ],
  },
  {
    title: "Jury",
    org: "Al Akhawayn University",
    date: "Apr 2023",
    description:
      "Digital evaluation platform for capstone presentations. Next.js + Supabase, deployed on Vercel.",
    links: [{ label: "Live", url: "https://jury.vercel.app/" }],
  },
  {
    title: "Plato 2.0",
    org: "Quasara / Xpreneurs Incubator",
    date: "Jun 2023 – Mar 2024",
    description:
      "Semantic search over 100k–1M+ images. Built the full stack with Next.js, FastAPI, and AWS.",
    links: [],
  },
  {
    title: "UCI Chess Engine",
    org: "Bachelor's Capstone @ AUI",
    date: "2022",
    description:
      "Open-source magic-bitboard chess engine in C++. Implements UCI protocol for compatibility with chess GUIs.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/mourabitiziyad/Chess-Engine",
      },
      {
        label: "Paper",
        url: "https://www.researchgate.net/publication/363350578_AN_OPEN-SOURCE_MAGIC_BITBOARDS_IMPLEMENTATION_OF_A_CHESS_ENGINE",
      },
      {
        label: "Slides",
        url: "https://www.canva.com/design/DAGDW5UhEzo/ZtXOqrdhcCpsokf9LVtzhw/view",
      },
    ],
  },
];

function Projects() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Window>
      <motion.div
        className="relative h-full w-full md:w-2/3 bg-white flex justify-center mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative p-6 overflow-y-scroll w-full">
          <h1 className="text-2xl font-bold mb-6">Projects</h1>
          <motion.ul
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {projectsData.map((project) => (
              <motion.li
                key={project.title}
                variants={item}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-sm font-semibold text-gray-800">
                    {project.title}
                  </h2>
                  <span className="text-xs text-gray-500">{project.date}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2 italic">
                  {project.org}
                </p>
                <p className="text-xs text-gray-700">{project.description}</p>
                {project.links.length > 0 && (
                  <div className="flex gap-3 mt-2">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </Window>
  );
}

function NotFound() {
  return (
    <Window>
      <div className="p-4">
        <h1 className="text-2xl font-bold">File Not found {":("}</h1>
      </div>
    </Window>
  );
}

function Cv() {
  return (
    <Window>
      <div className="h-full w-full relative rounded-md">
        <Suspense fallback={<Spinner />}>
          <object
            className="relative h-full w-full"
            data="/CV.pdf"
            type="application/pdf"
          >
            <div className="p-4">
              <h1 className="text-2xl font-bold">Curriculum Vitae</h1>
              <p className="text-black">
                If you encounter a problem loading the CV,{" "}
                <Link
                  className="italic underline text-slate-700"
                  href={"/CV.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  view it here.
                </Link>
              </p>
            </div>
          </object>
        </Suspense>
      </div>
    </Window>
  );
}

function About() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <Window>
      <motion.div
        className="relative border-2 h-full w-full md:w-2/3 bg-white flex justify-center mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative p-4 border-8 overflow-y-scroll">
          <motion.ul
            className="w-full"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.li variants={item}>
              <h1 className="text-2xl font-bold mt-2">Salam! 👋 🇲🇦</h1>
            </motion.li>
            <motion.li variants={item}>
              <h3 className="text-gray-800 italic mb-4 text-xs">
                TLDR; MSc Data Engineering & Analytics @ TUM (2025). Full-Stack
                SWE at SAP SE. 10+ years in tech, 5+ in software development.
              </h3>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-gray-800 text-sm mb-4 prose">
                I build things across the stack — from data pipelines to
                polished UIs. Over the years, I have accumulated{" "}
                <span className="font-bold">5+ years</span> of hands-on
                development experience and roughly the same in roles involving
                product and people management. Tech has been a constant for over
                a decade now.
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-gray-800 text-sm mb-4">
                I did my BSc in Computer Science (minor in Communication
                Studies, Summa Cum Laude) at Al Akhawayn University in Morocco.
                After a year of freelancing and teaching Database Systems, I
                moved to Germany for my Masters at TUM. My thesis explored using
                Generative AI to enhance satellite imagery for solar panel
                detection. Now I am at SAP SE, working on the Built-In Support
                platform.
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-gray-800 text-sm mb-4">
                I work best in teams that move fast and communicate well. I am
                goal-oriented and care more about collective wins than
                individual credit.
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-gray-800 text-sm mb-12">
                Outside work: Liverpool FC, the Atlas Lions, chess, FIFA, Smash
                Bros, and hip-hop. Always down for a good conversation.
              </p>
            </motion.li>
          </motion.ul>
        </div>
      </motion.div>
    </Window>
  );
}

export default function Page({
  params,
}: Readonly<{ params: { folder: string } }>) {
  switch (params.folder) {
    case "projects":
      return <Projects />;
    case "skills":
      return <Skills />;
    case "about":
      return <About />;
    case "CV":
      return <Cv />;
    default:
      return <NotFound />;
  }
}
