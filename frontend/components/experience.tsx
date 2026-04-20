"use client";

import { getExperience } from "@/api/api";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const [experiences, setExperiences] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const locale = i18n.language || "en";
        const res = await getExperience(locale);
        setExperiences(res || []);
      } catch (error) {
        console.error("Experience fetch error:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [i18n.language]);

  return (
    <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 my-24 sm:my-32 lg:my-40" id="experience">
      {/* Title */}
      <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-16">
        {t("experience")}
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-2.5 sm:left-4 top-0 bottom-0 w-0.5 bg-white/10" />

        <div className="flex flex-col gap-16 sm:gap-20">
          <AnimatePresence mode="wait">
            {isFetching ? (
              /* SKELETON STATE */
              [1, 2].map((n) => (
                <div key={n} className="relative pl-10 sm:pl-14 animate-pulse">
                  <div className="absolute left-1 sm:left-1.5 top-2 w-4 h-4 rounded-full bg-white/10" />
                  <div className="h-8 bg-white/10 rounded w-1/3 mb-4" />
                  <div className="h-40 bg-white/5 rounded-2xl w-full" />
                </div>
              ))
            ) : (
              experiences.map((exp, i) => (
                <motion.div
                  key={exp.id || i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-10 sm:pl-14"
                >
                  {/* Dot Indicator */}
                  <div className="absolute left-1 sm:left-1.5 top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-linear-to-r from-accent-from to-accent-to shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)]" />

                  {/* HEADER: Job Title & Company */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                      {exp.title}{" "}
                      <span className="text-accent-from font-medium text-lg sm:text-xl lg:text-2xl">
                         @{exp.type || exp.company || "Freelance"}
                      </span>
                    </h3>
                    <span className="text-white/40 text-sm sm:text-base font-mono">
                      {exp.startDate} — {exp.endDate || t("present")}
                    </span>
                  </div>

                  {/* PROJECTS WITHIN THIS EXPERIENCE */}
                  <div className="mt-6 flex flex-col gap-6">
                    {exp.projects?.map((project: any) => (
                      <div 
                        key={project.id} 
                        className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7 backdrop-blur-sm group hover:bg-white/[0.07] transition-all duration-300"
                      >
                        <h4 className="text-lg sm:text-xl font-bold text-white/90 flex items-center gap-3">
                          <span className="w-1.5 h-6 rounded-full bg-accent-to" />
                          {project.title}
                        </h4>
                        
                        <p className="mt-3 text-white/60 text-base sm:text-lg leading-relaxed">
                          {project.description}
                        </p>

                        {/* TASKS LIST */}
                        {project.tasks && project.tasks.length > 0 && (
                          <div className="mt-6">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-3">
                              Key Contributions
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                              {project.tasks.map((task: any) => (
                                <li 
                                  key={task.id} 
                                  className="flex items-center gap-2 text-white/50 text-sm sm:text-base group/item"
                                >
                                  <span className="text-accent-from opacity-0 group-hover/item:opacity-100 transition-opacity">
                                    •
                                  </span>
                                  <span className="group-hover/item:text-white/80 transition-colors">
                                    {task.title}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}