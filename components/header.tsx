"use client";

import { useEffect, useState } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = ["About", "Skills", "Experience", "Projects"];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <header className={`
            fixed top-0 left-0 w-full z-50 transition-all

            ${scrolled ? "py-3 bg-white/1 backdrop-blur-sm border-b border-text-secondary sm:py-4 lg:py-5" 
                :
                "py-6 bg-transparent sm:py-8 lg:py-10"
            }
        `}>

            <div className="flex items-center justify-between
                mx-auto max-w-500
                px-6 sm:px-10 lg:px-16">
                {/* Logo */}
                <h1 className="
                    text-2xl sm:text-4xl font-bold cursor-pointer text-white
                    transition hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]
                ">
                    ykDev
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:block">
                    <ul className="flex gap-8 items-center">
                        {navItems.map((item) => (
                            <li
                                key={item}
                                className="
                                    relative cursor-pointer
                                    text-white/80 hover:text-white
                                    transition text-lg lg:text-xl
                                    hover:after:w-full hover:after:left-0 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]
                                "
                            >
                                {item}
                            </li>
                        ))}

                        {/* Desktop Button */}
                        <button className="
                            ml-6 px-5 py-2
                            rounded-full
                            text-white
                            bg-[linear-gradient(135deg,var(--accent-from),var(--accent-to))]
                            bg-[length:200%_200%] bg-left hover:bg-right
                            transition-all duration-500
                            hover:scale-105
                            hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]
                        ">
                            Contact Me
                        </button>
                    </ul>
                </nav>

                {/* Burger Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden flex flex-col gap-1 z-50"
                >
                    <span className={`w-6 h-[2px] bg-white transition ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
                    <span className={`w-6 h-[2px] bg-white transition ${open ? "opacity-0" : ""}`} />
                    <span className={`w-6 h-[2px] bg-white transition ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
                </button>

                {/* Mobile Menu */}
                <div
                    className={`
                        fixed inset-0 z-40
                        bg-black/70 backdrop-blur-md
                        flex flex-col items-center justify-center gap-8
                        transition-all duration-500
                        ${open ? "opacity-100 visible" : "opacity-0 invisible"}
                    `}
                >
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            onClick={() => setOpen(false)}
                            className="
                                text-2xl text-white/80 hover:text-white
                                transition
                            "
                        >
                            {item}
                        </a>
                    ))}

                    {/* Mobile CTA Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="
                            mt-6 px-6 py-3
                            rounded-full
                            text-white font-medium
                            bg-[linear-gradient(135deg,var(--accent-from),var(--accent-to))]
                            bg-[length:200%_200%] bg-left hover:bg-right
                            transition-all duration-500
                            hover:scale-105
                        "
                    >
                        Contact Me
                    </button>
                </div>
            </div>

        </header>
    );
}