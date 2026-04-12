"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const skills = [ { name: "React", desc: "Frontend library", icon: "/icons/react.svg", }, { name: "Next.js", desc: "React framework", icon: "/icons/nextjs.svg", }, { name: "TypeScript", desc: "Typed JS", icon: "/icons/typescript.svg", }, { name: "Node.js", desc: "Backend runtime", icon: "/icons/nodejs.svg", }, { name: "Express", desc: "Node.js framework", icon: "/icons/express.svg", }, { name: "Tailwind", desc: "CSS framework", icon: "/icons/tailwind.svg", }, { name: "HTML5", desc: "Markup language", icon: "/icons/html.svg", }, { name: "CSS3", desc: "Style sheet language", icon: "/icons/css.svg", }, { name: "Git", desc: "Version control", icon: "/icons/git.svg", }, { name: "GitHub", desc: "Code hosting", icon: "/icons/github.svg", }, { name: "PostgreSQL", desc: "Relational database", icon: "/icons/postgresql.svg", }, { name: "Python", desc: "Programming language", icon: "/icons/python.svg", }, ];

export default function Skills() {
    const [pause, setPause] = useState(false);

    return (
        <section id="skills" className="w-full overflow-hidden my-60 px-6">

            {/* HEADER STORY */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto"
            >
                <p className="text-white/50 text-sm uppercase tracking-widest">
                    My Tech Stack
                </p>

                <h1 className="
                    text-4xl sm:text-5xl lg:text-6xl
                    font-bold text-white mt-3
                ">
                    Tools I use to build
                    <span className="text-accent-from"> modern apps</span>
                </h1>

                <p className="text-white/60 mt-4 text-base sm:text-lg">
                    I work with modern technologies that help me build fast,
                    scalable and beautiful web applications.
                </p>
            </motion.div>

            {/* divider glow */}
            <div className="
                my-8 h-[1px] w-full
                bg-gradient-to-r from-transparent via-white/20 to-transparent
                blur-[0.5px]
            " />

            {/* CAROUSEL */}
            <motion.div
                className="flex gap-6 w-max py-5 mx-auto"
                animate={{ x: pause ? 0 : -1000 }}
                transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                }}
                onHoverStart={() => setPause(true)}
                onHoverEnd={() => setPause(false)}
            >
                {[...skills, ...skills].map((skill, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="
                            relative group
                            w-35 h-35
                            flex flex-col items-center justify-center
                            rounded-2xl
                            bg-white/5
                            border border-white/10
                            backdrop-blur-md
                            cursor-pointer
                        "
                    >
                        <Image
                            src={skill.icon}
                            alt={skill.name}
                            width={64}
                            height={64}
                            className="
                                filter grayscale opacity-60
                                group-hover:grayscale-0 group-hover:opacity-100
                                transition-all duration-300
                                group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]
                            "
                        />

                        <p className="text-white/70 group-hover:text-white mt-2 transition">
                            {skill.name}
                        </p>

                        <div className="
                            absolute -bottom-14
                            opacity-0 group-hover:opacity-100
                            transition
                            text-xs text-white/60 text-center
                            w-45
                        ">
                            {skill.desc}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

        </section>
    );
}