"use client";
import "../i18n/i18n"; 

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t, i18n } = useTranslation();

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    const changeLang = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <header
                className={`
                fixed top-0 left-0 w-full z-50 transition-all
                ${scrolled
                    ? "py-4 bg-black/30 backdrop-blur-md border-b border-white/10"
                    : "py-6 bg-transparent"
                }
            `}
            >
                <div className="flex items-center justify-between max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

                    {/* Logo */}
                    <h1 className="text-2xl sm:text-4xl font-bold cursor-pointer text-white">
                        ykDev
                    </h1>

                    {/* Desktop Nav */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-8 items-center">

                            <li onClick={() => scrollToSection("about")} className="text-lg text-white/80 transition-colors hover:text-white cursor-pointer">
                                {t("nav.about")}
                            </li>

                            <li onClick={() => scrollToSection("skills")} className="text-lg text-white/80 transition-colors hover:text-white cursor-pointer">
                                {t("nav.skills")}
                            </li>

                            <li onClick={() => scrollToSection("experience")} className="text-lg text-white/80 transition-colors hover:text-white cursor-pointer">
                                {t("nav.experience")}
                            </li>

                            <li onClick={() => scrollToSection("projects")} className="text-lg text-white/80 transition-colors hover:text-white cursor-pointer">
                                {t("nav.projects")}
                            </li>

                            {/* Language switcher */}
                            <div className="flex items-center gap-3 ml-6">
                                {["en", "ru", "uz"].map((lng) => (
                                    <button
                                        key={lng}
                                        onClick={() => changeLang(lng)}
                                        className={`uppercase text-sm transition ${
                                            i18n.language === lng
                                                ? "text-white"
                                                : "text-white/40 hover:text-white"
                                        }`}
                                    >
                                        {lng}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => scrollToSection("contact")}
                                className="ml-6 px-5 py-2 rounded-full text-white bg-[linear-gradient(135deg,var(--accent-from),var(--accent-to))] bg-size-[200%_200%] bg-left hover:bg-right transition-all duration-500 hover:scale-105"
                            >
                                {t("nav.contact")}
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
                    fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300
                    ${open ? "opacity-100 visible" : "opacity-0 invisible"}
                `}
            />

            {/* ASIDE */}
            <aside
                className={`
                    fixed top-0 right-0 z-50 h-full w-70 sm:w-85
                    bg-black/70 backdrop-blur-xl border-l border-white/10
                    transform transition-transform duration-500 ease-out
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >
                <div className="p-8 flex flex-col gap-8">

                    <button onClick={() => setOpen(false)} className="self-end text-white text-xl">
                        ✕
                    </button>

                    <div className="flex flex-col gap-6 mt-10">
                        <ul className="flex flex-col gap-8 items-center">
                            <li onClick={() => scrollToSection("about")}>
                                {t("nav.about")}
                            </li>

                            <li onClick={() => scrollToSection("skills")}>
                                {t("nav.skills")}
                            </li>

                            <li onClick={() => scrollToSection("experience")}>
                                {t("nav.experience")}
                            </li>

                            <li onClick={() => scrollToSection("projects")}>
                                {t("nav.projects")}
                            </li>
                        </ul>
                    </div>

                    {/* Language */}
                    <div className="flex gap-3 mt-6">
                        {["en", "ru", "uz"].map((lng) => (
                            <button
                                key={lng}
                                onClick={() => changeLang(lng)}
                                className={`uppercase text-sm ${
                                    i18n.language === lng
                                        ? "text-white"
                                        : "text-white/40"
                                }`}
                            >
                                {lng}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollToSection("contact")}
                        className="mt-10 px-6 py-3 rounded-full text-white bg-[linear-gradient(135deg,var(--accent-from),var(--accent-to))] hover:scale-105 transition"
                    >
                        {t("nav.contact")}
                    </button>
                </div>
            </aside>
        </>
    );
}