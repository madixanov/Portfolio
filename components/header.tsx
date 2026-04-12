"use client";

import { useEffect, useState } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = [
        { label: "About", id: "about" },
        { label: "Skills", id: "skills" },
        { label: "Experience", id: "experience" },
        { label: "Projects", id: "projects" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // lock scroll when menu open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setOpen(false);
    };

    return (
        <>
            <header className={`
                fixed top-0 left-0 w-full z-50 transition-all
                ${scrolled
                    ? "py-4 bg-black/30 backdrop-blur-md border-b border-white/10"
                    : "py-6 bg-transparent"
                }
            `}>
                <div className="flex items-center justify-between
                    max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

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
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="
                                        cursor-pointer text-white/80 hover:text-white
                                        transition text-lg lg:text-xl
                                    "
                                >
                                    {item.label}
                                </li>
                            ))}

                            <button
                                onClick={() => scrollToSection("contact")}
                                className="
                                    ml-6 px-5 py-2 rounded-full text-white
                                    bg-[linear-gradient(135deg,var(--accent-from),var(--accent-to))]
                                    bg-size-[200%_200%] bg-left hover:bg-right
                                    transition-all duration-500 hover:scale-105
                                "
                            >
                                Contact
                            </button>
                        </ul>
                    </nav>

                    {/* Burger */}
                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden flex flex-col gap-1 z-50"
                    >
                        <span className="w-6 h-0.5 bg-white" />
                        <span className="w-6 h-0.5 bg-white" />
                        <span className="w-6 h-0.5 bg-white" />
                    </button>
                </div>
            </header>

            {/* BACKDROP */}
            <div
                onClick={() => setOpen(false)}
                className={`
                    fixed inset-0 z-40
                    bg-black/60 backdrop-blur-sm
                    transition-opacity duration-300
                    ${open ? "opacity-100 visible" : "opacity-0 invisible"}
                `}
            />

            {/* ASIDE MENU */}
            <aside
                className={`
                    fixed top-0 right-0 z-50
                    h-full w-70 sm:w-85

                    bg-black/70 backdrop-blur-xl
                    border-l border-white/10

                    transform transition-transform duration-500 ease-out

                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >
                <div className="p-8 flex flex-col gap-8">

                    {/* Close */}
                    <button
                        onClick={() => setOpen(false)}
                        className="self-end text-white text-xl"
                    >
                        ✕
                    </button>

                    {/* Links */}
                    <div className="flex flex-col gap-6 mt-10">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="
                                    text-left text-white/80 text-xl
                                    hover:text-white transition
                                "
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="
                            mt-10 px-6 py-3 rounded-full text-white
                            bg-[linear-gradient(135deg,var(--accent-from),var(--accent-to))]
                            hover:scale-105 transition
                        "
                    >
                        Contact Me
                    </button>
                </div>
            </aside>
        </>
    );
}