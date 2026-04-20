"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Variants, cubicBezier } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getCreed, getMajor } from "@/api/api";
import { SingleContent } from "@/types/types";

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: cubicBezier(0.25, 0.1, 0.25, 1),
        },
    },
};

export default function Hero() {
    const { t, i18n } = useTranslation();

    const [creed, setCreed] = useState<SingleContent | null>(null);
    const [major, setMajor] = useState<SingleContent | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            const locale = i18n.language || "en";

            try {
                const [creedData, majorData] = await Promise.all([
                    getCreed(locale),
                    getMajor(locale),
                ]);

                setCreed(creedData);
                setMajor(majorData);
            } catch (error) {
                console.error("Hero data fetch error:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [i18n.language]);

    return (
        <section id="hero" className="
            flex flex-col lg:flex-row
            items-center justify-between
            text-center lg:text-left
            gap-10
            mt-16 sm:mt-24 lg:mt-32
            px-6 sm:px-10 lg:px-16
            max-w-6xl mx-auto
        ">
            {/* IMAGE */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-60 h-60 sm:w-70 sm:h-70 lg:w-85 lg:h-85 2xl:w-100 2xl:h-100"
            >
                <div className="
                    absolute inset-0 rounded-full
                    bg-linear-to-r from-accent-from to-accent-to
                    blur-[90px]
                " />

                <div className="
                    relative p-0.75 rounded-full
                    bg-linear-to-r from-accent-from to-accent-to
                ">
                    <div className="w-full aspect-square rounded-full overflow-hidden bg-[#0a0f1f]">
                        <Image
                            src="/author.png"
                            alt="Author"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover object-[50%_40%]"
                        />
                    </div>
                </div>
            </motion.div>

            {/* TEXT CONTENT */}
            <div className="flex flex-col flex-1 min-h-[300px] justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={i18n.language}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-4 lg:gap-6"
                    >
                        {/* GREETING */}
                        <motion.h1
                            variants={item}
                            className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white"
                        >
                            {t("hero.greeting")}{" "}
                            <span className="text-accent-from">
                                {t("hero.name")}
                            </span>
                        </motion.h1>

                        {/* CREED */}
                        <motion.div variants={item}>
                            {isFetching ? (
                                <div className="h-6 w-3/4 bg-white/10 rounded-md animate-pulse mx-auto lg:mx-0" />
                            ) : (
                                <p className="text-white/70 text-base sm:text-lg lg:text-xl 2xl:text-2xl">
                                    {creed?.content}
                                </p>
                            )}
                        </motion.div>

                        <motion.div
                            variants={item}
                            className="border-t border-white/20 w-full"
                        />

                        {/* MAJOR */}
                        <motion.div variants={item}>
                            {isFetching ? (
                                <div className="h-5 w-1/2 bg-white/10 rounded-md animate-pulse mx-auto lg:mx-0" />
                            ) : (
                                <p className="text-white/50 text-sm sm:text-base lg:text-lg 2xl:text-xl">
                                    {major?.content}
                                </p>
                            )}
                        </motion.div>

                        {/* BUTTON */}
                        <motion.button
                            variants={item}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="
                                mt-2 self-center lg:self-start
                                flex items-center gap-2
                                px-6 py-3
                                rounded-full text-white font-medium
                                bg-[linear-gradient(135deg,var(--accent-from),var(--accent-to))]
                            "
                        >
                            <ArrowDown size={25} />
                            {t("hero.download")}
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}