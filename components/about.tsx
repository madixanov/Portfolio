"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="w-full max-w-500 mx-auto my-40 px-6 sm:px-10 lg:px-16">
            <motion.div
                initial={{ opacity: 0, y: 40}}
                whileInView={{ opacity: 1, y: 0}}
                transition={{ duration: 0.5, ease: "easeOut"}}
                viewport={{ once: true }}
                className="relative
                    p-10 sm:p-14
                    rounded-3xl
                    
                    bg-white/1
                    backdrop-blur-xl
                    border border-white/10">
                
                <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-accent-from/20 to-accent-to/20 blur-2xl opacity-40"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-text-primary">
                        About Me
                    </h2>

                    {/* Divider */}
                    <div className="
                        w-24 h-0.75
                        mt-4 mb-8
                        bg-linear-to-r from-accent-from to-accent-to
                        rounded-full
                    " />

                    {/* Text */}
                    <p className="
                        text-white/70
                        text-base sm:text-lg lg:text-xl
                        leading-relaxed
                    ">
                        Hi, I'm <span className="text-white font-semibold">Yokub</span>, a Frontend Developer
                        focused on building modern, fast and scalable web applications.
                        I enjoy creating clean UI and smooth user experiences.
                        <br /><br />
                        I mainly work with <span className="text-white">React</span>, <span className="text-white">Next.js</span> and <span className="text-white">TypeScript</span>,
                        and I also have experience with backend development using <span className="text-white">Node.js</span>, <span className="text-white">Express.js</span>  and <span className="text-white">PostgreSQL</span>.
                        <br /><br />
                        Currently I'm improving my skills in system design, performance optimization and building production-level full-stack applications.
                    </p>

                    {/* mini stats */}
                    <div className="
                        flex flex-wrap gap-4 mt-10
                        text-sm sm:text-base
                    ">
                        <span className="
                            px-4 py-2 rounded-full
                            bg-white/5 border border-white/10
                            text-white/70
                        ">
                            Frontend Developer
                        </span>

                        <span className="
                            px-4 py-2 rounded-full
                            bg-white/5 border border-white/10
                            text-white/70
                        ">
                            1+ Year Experience
                        </span>

                        <span className="
                            px-4 py-2 rounded-full
                            bg-white/5 border border-white/10
                            text-white/70
                        ">
                            React • Next.js • Node.js
                        </span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}