"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Variants, cubicBezier } from "framer-motion";

import { ArrowDown } from "lucide-react";

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

            {/* Picture Block */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="
                    relative
                    w-60 h-60
                    sm:w-70 sm:h-70
                    lg:w-85 lg:h-85
                    2xl:w-100 2xl:h-100
                "
            >

                {/* Glow layer */}
                <motion.div
                    className="
                        absolute inset-0
                        rounded-full
                        bg-linear-to-r from-accent-from to-accent-to
                        blur-[90px]
                    "
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.35, 0.65, 0.35],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Border */}
                <div className="
                    relative p-0.75 rounded-full
                    bg-linear-to-r from-accent-from to-accent-to
                    shadow-lg
                ">
                    {/* Avatar */}
                    <div className="
                        w-full aspect-square
                        rounded-full overflow-hidden
                        bg-[#0a0f1f]
                    ">
                        <Image
                            src="/author.png"
                            alt="Author"
                            width={400}
                            height={400}
                            loading="eager"
                            className="
                                w-full h-full
                                object-cover
                                object-[50%_40%]
                            "
                        />
                    </div>
                </div>
            </motion.div>

            {/* Text Block */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-4 lg:gap-6"
            >

                <motion.h1
                    variants={item}
                    className="
                        text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl
                        font-bold text-white
                    "
                >
                    Hi, I'm <span className="text-accent-from">Yokub</span>
                </motion.h1>

                <motion.p
                    variants={item}
                    className="
                        text-white/70
                        text-base sm:text-lg lg:text-xl 2xl:text-2xl
                    "
                >
                    Building future of web.
                </motion.p>

                <motion.div
                    variants={item}
                    className="border-t border-white/20 w-full"
                />

                <motion.p
                    variants={item}
                    className="
                        text-white/50
                        text-sm sm:text-base lg:text-lg 2xl:text-xl
                    "
                >
                    Middle Frontend / Junior Fullstack Developer
                </motion.p>

                {/* Button */}
                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                        mt-2 self-center lg:self-start

                        flex items-center gap-2

                        px-6 py-3
                        sm:px-7 sm:py-4
                        lg:px-8 lg:py-4
                        2xl:px-10 2xl:py-5

                        text-sm sm:text-base lg:text-lg 2xl:text-xl
                        rounded-full text-white font-medium

                        bg-[linear-gradient(135deg,var(--accent-from),var(--accent-to))]
                        bg-size-[200%_200%] bg-left hover:bg-right

                        transition-all duration-500 ease-in-out
                        hover:shadow-lg
                        hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]
                    "
                >
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        whileHover={{
                            scale:1.2,
                            y: [0, 8, 0]
                        }}
                        className="flex items-center">
                        <ArrowDown size={25} />
                    </motion.div>
                    Download CV
                </motion.button>

            </motion.div>

        </section>
    );
}