"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

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

export default function Projects() {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  return (
    <section
      id="projects"
      className="
        w-full my-40
        flex flex-col items-center
        px-6
        overflow-x-hidden
      "
    >
      {/* HEADER */}
      <div className="text-center max-w-3xl mb-16">
        <p className="text-white/40 uppercase tracking-widest text-sm">
          My Work
        </p>

        <h2 className="text-5xl font-bold text-white mt-3">
          Projects
        </h2>
      </div>

      {/* ================= MOBILE / TABLET SLIDER ================= */}
      <div className="lg:hidden w-full overflow-hidden py-2" ref={emblaRef}>
        <div className="flex -ml-4">

          {projects.map((project, i) => (
            <div
              key={i}
              className="
                pl-4
                min-w-70
                sm:min-w-80
                shrink-0
              "
            >
              <div
                className="
                    group relative

                    rounded-2xl overflow-hidden
                    bg-white/5 border border-white/10
                    backdrop-blur-md

                    transition-all duration-500

                    hover:scale-[1.02]
                    hover:-translate-y-1
                    hover:border-white/30

                    hover:shadow-[0_0_30px_rgba(100,200,255,0.15)]
                "
                >
                {/* IMAGE */}
                <div className="relative h-44 w-full overflow-hidden">
                    <Image
                        src={project.img}
                        alt={project.name}
                        fill
                        className="
                        object-cover
                        opacity-80

                        transition duration-700
                        group-hover:scale-110
                        group-hover:opacity-100
                        "
                    />

                    {/* dark overlay */}
                    <div className="
                        absolute inset-0
                        bg-linear-to-t from-black/80 via-black/20 to-transparent
                        opacity-80
                        group-hover:opacity-60
                        transition
                    " />

                    {/* glow flash */}
                    <div className="
                        absolute inset-0
                        bg-linear-to-r from-transparent via-white/5 to-transparent
                        -translate-x-full
                        group-hover:translate-x-full
                        transition-transform duration-1000
                    " />
                    </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="
                    text-white font-bold text-lg
                    transition
                    group-hover:text-accent-from
                    ">
                    {project.name}
                    </h3>

                    <p className="
                    text-white/60 text-sm
                    group-hover:text-white/80
                    transition
                    ">
                    {project.desc}
                    </p>

                  <p className="text-accent-from text-xs mt-2">
                    {project.tech}
                  </p>

                  {/* BUTTONS */}
                  <div className="flex gap-3 mt-4">
                    <a
                        className="
                            flex-1 text-center py-2 text-sm rounded-full

                            bg-linear-to-r from-accent-from to-accent-to
                            text-white

                            transition-all duration-500

                            group-hover:shadow-[0_0_20px_rgba(100,200,255,0.4)]
                            hover:scale-105
                        "
                        >
                        Live
                        </a>

                    <a
                        className="
                            flex-1 text-center py-2 text-sm rounded-full

                            border border-white/20 text-white/70

                            transition-all duration-500

                            group-hover:border-white/40
                            group-hover:text-white
                            hover:scale-105
                        "
                        >
                        Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ================= DESKTOP GRID ================= */}
      <div
        className="
          hidden lg:grid
          grid-cols-3
          gap-10
          max-w-6xl
          w-full
        "
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="
                group relative

                rounded-2xl overflow-hidden
                bg-white/5 border border-white/10
                backdrop-blur-md

                transition-all duration-500 ease-out

                hover:scale-[1.04]
                hover:-translate-y-2
                hover:border-white/30

                hover:shadow-[0_0_50px_rgba(100,200,255,0.18)]
            "
            >
            {/* IMAGE */}
            <div className="relative h-44 w-full overflow-hidden">
                <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    className="
                    object-cover
                    opacity-80

                    transition duration-700 ease-out
                    group-hover:scale-110
                    group-hover:opacity-100
                    "
                />

                {/* gradient overlay */}
                <div className="
                    absolute inset-0
                    bg-linear-to-t from-black/80 via-black/20 to-transparent
                    opacity-80
                    group-hover:opacity-60
                    transition
                " />

                {/* light sweep effect */}
                <div className="
                    absolute inset-0
                    bg-linear-to-r from-transparent via-white/5 to-transparent
                    translate-x-[-120%]
                    group-hover:translate-x-[120%]
                    transition-transform duration-1000
                " />
                </div>

            {/* CONTENT */}
            <div className="p-5">
              <h3 className="
                text-white font-bold text-lg lg:text-xl
                transition
                group-hover:text-accent-from
                ">
                {project.name}
                </h3>

                <p className="
                text-white/60 text-sm lg:text-base
                transition
                group-hover:text-white/80
                ">
                {project.desc}
                </p>

                <p className="
                text-accent-from text-xs lg:text-sm mt-2
                opacity-80 group-hover:opacity-100
                ">
                {project.tech}
                </p>

              <div className="flex gap-3 mt-5">
                <a
                className="
                    flex-1 text-center py-2 rounded-full text-sm

                    bg-linear-to-r from-accent-from to-accent-to
                    text-white

                    transition-all duration-500

                    hover:scale-105
                    hover:shadow-[0_0_25px_rgba(100,200,255,0.4)]
                "
                >
                Live
                </a>

                <a
                    className="
                        flex-1 text-center py-2 rounded-full text-sm

                        border border-white/20 text-white/70

                        transition-all duration-500

                        hover:scale-105
                        hover:border-white/40
                        hover:text-white
                    "
                    >
                    Code
                    </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}