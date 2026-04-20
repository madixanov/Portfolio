"use client";

import { getAbout } from "@/api/api";
import { AboutContent } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t, i18n } = useTranslation();
    const [about, setAbout] = useState<AboutContent | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const locale = i18n.language || "en";
                const aboutData = await getAbout(locale);
                setAbout(aboutData);
            } catch (error) {
                console.error("About fetch error:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [i18n.language]);

    return (
        <section id="about" className="w-full max-w-6xl mx-auto my-40 px-6 sm:px-10 lg:px-16">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative p-10 sm:p-14 rounded-3xl bg-white/1 backdrop-blur-xl border border-white/10"
            >
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-accent-from/20 to-accent-to/20 blur-2xl opacity-40 -z-10"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-white">
                        {t("about")}
                    </h2>

                    {/* Divider */}
                    <div className="w-24 h-0.75 mt-4 mb-8 bg-linear-to-r from-accent-from to-accent-to rounded-full" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={i18n.language}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* TEXT RENDER / SKELETON */}
                            {isFetching ? (
                                <div className="space-y-4">
                                    <div className="h-4 bg-white/10 rounded-md w-full animate-pulse" />
                                    <div className="h-4 bg-white/10 rounded-md w-[95%] animate-pulse" />
                                    <div className="h-4 bg-white/10 rounded-md w-[90%] animate-pulse" />
                                    <div className="h-4 bg-white/10 rounded-md w-[40%] animate-pulse" />
                                </div>
                            ) : (
                                <p className="text-white/70 text-base sm:text-lg lg:text-xl leading-relaxed whitespace-pre-line">
                                    {about?.About?.map((block) =>
                                        block.children
                                            .map((child) => child.text)
                                            .join("")
                                    ).join("\n") || ""}
                                </p>
                            )}

                            {/* MINI STATS / BADGES */}
                            <div className="flex flex-wrap gap-4 mt-10 text-sm sm:text-base">
                                {isFetching ? (
                                    // Badges Skeleton
                                    [1, 2, 3].map((i) => (
                                        <div key={i} className="px-10 py-5 rounded-full bg-white/5 border border-white/10 animate-pulse" />
                                    ))
                                ) : (
                                    about?.InfoBadge?.map((item: any) => (
                                        <span
                                            key={item.id}
                                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 transition-colors hover:border-accent-from/50 hover:bg-white/10"
                                        >
                                            {item.title}
                                        </span>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
}