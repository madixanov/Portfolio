"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { easeOut, motion } from "framer-motion";

const projects = [
  {
    name: "Clicker Game",
    desc: "Progress system with levels and rewards",
    tech: "React / Strapi",
    img: "/projects/clicker.png",
    code: "#",
    live: "#",
  },
  {
    name: "TMS Platform",
    desc: "Logistics tracking system",
    tech: "Next.js / Express",
    img: "/projects/tms.png",
    code: "#",
    live: "#",
  },
  {
    name: "Portfolio System",
    desc: "Cosmic UI design",
    tech: "Next.js / Motion",
    img: "/projects/portfolio.png",
    code: "#",
    live: "#",
  },
  {
    name: "AI Dashboard",
    desc: "Analytics dashboard with AI insights",
    tech: "Next.js / Node",
    img: "/projects/ai.png",
    code: "#",
    live: "#",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export default function Projects() {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  return (
    <section
      id="projects"
      className="w-full my-40 flex flex-col items-center px-6 overflow-x-hidden"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mb-16"
      >
        <p className="text-white/40 uppercase tracking-widest text-sm">
          My Work
        </p>

        <h2 className="text-5xl font-bold text-white mt-3">
          Projects
        </h2>
      </motion.div>

      {/* MOBILE SLIDER */}
      <div className="lg:hidden w-full overflow-hidden py-2" ref={emblaRef}>
        <div className="flex -ml-4">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="pl-4 min-w-70 sm:min-w-80 shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.03, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="
                  group relative
                  rounded-2xl overflow-hidden
                  bg-white/5 border border-white/10
                  backdrop-blur-md
                  transition-all duration-500
                "
              >
                {/* IMAGE */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    className="object-cover opacity-80 transition duration-700 group-hover:scale-110"
                  />

                  {/* glow pulse */}
                  <div className="
                    absolute inset-0
                    bg-white/5 opacity-0 group-hover:opacity-100
                    blur-xl transition
                  " />
                </div>

                <div className="p-5">
                  <h3 className="text-white font-bold group-hover:text-accent-from transition">
                    {project.name}
                  </h3>

                  <p className="text-white/60 text-sm">
                    {project.desc}
                  </p>

                  <p className="text-accent-from text-xs mt-2">
                    {project.tech}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <a className="flex-1 text-center py-2 rounded-full bg-linear-to-r from-accent-from to-accent-to text-white">
                      Live
                    </a>
                    <a className="flex-1 text-center py-2 rounded-full border border-white/20 text-white/70">
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DESKTOP GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className="hidden lg:grid grid-cols-3 gap-10 max-w-6xl w-full"
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{
              scale: 1.05,
              rotateX: 6,
              rotateY: -6,
            }}
            className="
              group relative
              rounded-2xl overflow-hidden
              bg-white/5 border border-white/10
              backdrop-blur-md
              transition-all duration-500
            "
          >
            {/* IMAGE */}
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={project.img}
                alt={project.name}
                fill
                className="object-cover opacity-80 transition duration-700 group-hover:scale-110"
              />

              {/* light sweep */}
              <div className="
                absolute inset-0
                bg-linear-to-r from-transparent via-white/5 to-transparent
                translate-x-[-120%]
                group-hover:translate-x-[120%]
                transition-transform duration-1000
              " />
            </div>

            <div className="p-5">
              <h3 className="text-white text-xl font-bold group-hover:text-accent-from transition">
                {project.name}
              </h3>

              <p className="text-white/60 text-sm">
                {project.desc}
              </p>

              <p className="text-accent-from text-xs mt-2">
                {project.tech}
              </p>

              <div className="flex gap-3 mt-5">
                <a className="flex-1 text-center py-2 rounded-full bg-linear-to-r from-accent-from to-accent-to text-white">
                  Live
                </a>
                <a className="flex-1 text-center py-2 rounded-full border border-white/20 text-white/70">
                  Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}