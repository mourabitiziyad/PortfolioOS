'use client';
import { Spinner } from "@/components/ui/spinner";
import { Window } from "@/components/window";
import Link from "next/link";
import React, { Suspense } from 'react';
import { motion } from "framer-motion";



function PageContent({ title }: Readonly<{ title: string }>) {
  return (
    <Window>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">This is a simple example of a dynamic route.</p>
      </div>
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
              <p className="text-black">If you encounter a problem loading the CV, <Link className="italic underline text-slate-700" href={'/CV.pdf'} target="_blank" rel="noopener noreferrer">view it here.</Link></p>
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
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }
  return (
    <Window>
      <motion.div
        className="border-2 h-full w-full md:w-2/3 bg-white flex justify-center mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <motion.ul
            className='h-full'
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.li variants={item}>
              <h1 className="text-2xl font-bold mt-2">Salam! 👋 🇲🇦</h1>
            </motion.li>
            <motion.li variants={item}>
              <h3 className="text-gray-800 italic mb-4 text-xs">
                TLDR; I am studying for a Masters in Data Engineering & Analytics @ TUM.
                I have 10+ yrs of experience in tech, and 4+ yrs of development and management experience. Read on for some insights on myself, or navigate the menus for individual details.
              </h3>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-gray-800 text-sm mb-4">
                Hi, I'm passionate about quite a few things, so it's not quite easy to master one area, but I'm trying to get there.
                I have garnered <span className="font-bold">4+ years</span> of experience in software development, automation, and graphic design and <span className="font-bold">5+ years</span> of
                experience in mixed management domains that involve people and products. I also have been passionate about Tech as a whole for more than 10 years now, still got a lot to learn, though.
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-gray-800 text-sm mb-4">
                After getting my Bachelor's degree in Computer Science (with a minor in Communication Studies) at Al Akhawayn University, I spent a year doing freelance work in graphic design and software development,
                I also worked as a teaching assistant in Database Systems. One long visa process later in parallel, I moved to Germany to pursue a Master's degree in Data Engineering and Analytics at the Technical University of Munich.
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-gray-800 text-sm mb-4">
                I like working in fast-paced envioronments but I am also driven by motivation and good team communication. I always see interest in learning new things within a team
                as I consider myself a goal-oriented person, prioritising collective success.
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-gray-800 text-sm mb-4">
                Generally, I am always on the lookout for opportunities in the tech industry, be it in software development, data engineering, or product management.
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-gray-800 text-sm">
                In my free time, I love watching the Premier League, my national team, and Liverpool. I play Chess, video games (FIFA, Super Smash Bros., GTA), and I am a massive sucker for Hip-hop. Other than that, I am always up for a good conversation.
              </p>
            </motion.li>
          </motion.ul>
        </div>
      </motion.div>
    </Window>
  );
}

export default function Page({ params }: Readonly<{ params: { folder: string } }>) {
  switch (params.folder) {
    case "projects":
      return <PageContent title="Projects" />;
    case "studies":
      return <PageContent title="Studies" />;
    case "about":
      return <About />;
    case "CV":
      return <Cv />;
    default:
      return <NotFound />;
  }
}
