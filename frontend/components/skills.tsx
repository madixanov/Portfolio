"use client";

import { getSkills } from "@/api/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Skill } from "@/types/types";

const baseUrl = process.env.NEXT_PUBLIC_URL ?? "";

export default function Skills() {
    const [pause, setPause] = useState(false);
    const { t, i18n } = useTranslation(); // Добавили i18n для отслеживания языка
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const res = await getSkills();
                setSkills(res || []);
            } catch (error) {
                console.error("Skills fetch error:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [i18n.language]); // Перезагружаем, если логика API зависит от языка

    return (
        <section id="skills" className="w-full overflow-hidden my-40 px-6">
            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
            >
                <p className="text-white/50 text-sm uppercase tracking-widest">
                    {t("tools.title")}
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3">
                    {t("tools.subtitle")}
                    <span className="text-accent-from"> {t("tools.secondsubtitle")}</span>
                </h1>

                <p className="text-white/60 mt-4 text-base sm:text-lg">
                    {t("tools.description")}
                </p>
            </motion.div>

            {/* DIVIDER */}
            <div className="my-8 h-1 w-full bg-linear-to-r from-transparent via-white/20 to-transparent blur-[0.5px]" />

            {/* CAROUSEL CONTAINER */}
            <div className="relative min-h-[160px] flex items-center">
                <AnimatePresence mode="wait">
                    {isFetching ? (
                        /* SKELETON LOADER */
                        <motion.div 
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-6 mx-auto"
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div 
                                    key={i} 
                                    className="w-35 h-35 rounded-2xl bg-white/5 border border-white/10 animate-pulse" 
                                />
                            ))}
                        </motion.div>
                    ) : (
                        /* ACTUAL CAROUSEL */
                        <motion.div
                            key="carousel"
                            initial={{ opacity: 0 }}
                            animate={{ 
                                opacity: 1, 
                                ...(pause ? {} : { x: [0, -1000] }) 
                            }}
                            exit={{ opacity: 0 }}
                            className="flex gap-6 w-max py-5"
                            // Анимация бесконечного скролла
                            transition={{
                                x: {
                                    duration: 25,
                                    ease: "linear",
                                    repeat: Infinity,
                                },
                                opacity: { duration: 0.5 }
                            }}
                            onHoverStart={() => setPause(true)}
                            onHoverEnd={() => setPause(false)}
                        >
                            {/* Дублируем массив для бесшовности */}
                            {[...skills, ...skills, ...skills].map((skill, i) => (
                                <motion.div
                                    key={`${skill.id}-${i}`}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="
                                        relative group
                                        w-35 h-35
                                        flex flex-col items-center justify-center
                                        rounded-2xl
                                        bg-white/5
                                        border border-white/10
                                        backdrop-blur-md
                                        cursor-pointer
                                        transition-colors hover:border-white/30
                                    "
                                >
                                    <div className="relative w-16 h-16 mb-2">
                                        <Image
                                            src={skill.image?.url ? `${baseUrl}${skill.image.url}` : "/placeholder.svg"}
                                            alt={skill.title}
                                            fill
                                            className="
                                                object-contain
                                                filter grayscale opacity-60
                                                group-hover:grayscale-0 group-hover:opacity-100
                                                transition-all duration-300
                                                group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]
                                            "
                                        />
                                    </div>

                                    <p className="text-white/50 group-hover:text-white text-xs font-medium uppercase tracking-tighter transition-colors">
                                        {skill.title}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}