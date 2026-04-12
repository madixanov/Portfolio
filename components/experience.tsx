"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    name: "Frontend Developer",
    company: "Freelance",
    date: "2024 — Present",
    tasks: [
      "Developed responsive UI with React & Next.js",
      "Worked with REST APIs and state management",
      "Improved performance and UX",
    ],
  },
  {
    name: "Junior Fullstack Developer",
    company: "Pet Projects",
    date: "2023 — 2024",
    tasks: [
      "Built fullstack apps with Node.js",
      "Worked with PostgreSQL",
      "Implemented auth (JWT, cookies)",
    ],
  },
];

export default function Experience() {
  return (
    <section className="
      w-full
      max-w-7xl 2xl:max-w-500
      mx-auto

      px-5 sm:px-8 lg:px-12 2xl:px-0
      my-24 sm:my-32 lg:my-40
    " id="experience">

      {/* Title */}
      <h2 className="
        text-center
        text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl
        font-bold text-white
        ">
        Experience
      </h2>

      <div className="relative mt-16 sm:mt-20">

        {/* Vertical line */}
        <div className="
          absolute left-2.5 sm:left-4 top-0 bottom-0
          w-0.5
          bg-white/10
        " />

        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="
                relative
                pl-10 sm:pl-14
              "
            >

              {/* Dot */}
              <div className="
                absolute left-1 sm:left-1.5 top-2
                w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6
                rounded-full
                bg-linear-to-r from-accent-from to-accent-to
                shadow-[0_0_20px_rgba(100,200,255,0.7)]
                " />

              {/* Content */}
              <div>

                {/* Header */}
                <div className="
                  flex flex-col gap-1
                  sm:flex-row sm:justify-between sm:items-center
                ">
                  <h3 className="
                    text-lg sm:text-xl lg:text-2xl 2xl:text-3xl
                    font-semibold text-white
                    ">
                    {exp.name}{" "}
                    <span className="text-white/50">
                      — {exp.company}
                    </span>
                  </h3>

                  <span className="
                    text-white/40
                    text-sm sm:text-base lg:text-lg 2xl:text-xl
                    ">  
                    {exp.date}
                  </span>
                </div>

                {/* Tasks */}
                <ul className="
                  mt-3
                  space-y-1.5 sm:space-y-2
                ">
                  {exp.tasks.map((task, j) => (
                    <li
                    className="
                        flex gap-3
                        text-white/70
                        text-base sm:text-lg lg:text-xl 2xl:text-2xl
                        leading-relaxed
                    "
                    key={j}
                    >
                      <span className="text-accent-from">•</span>
                      {task}
                    </li>
                  ))}
                </ul>

              </div>

            </motion.div>
          ))}

        </div>
      </div>

    </section>
  );
}