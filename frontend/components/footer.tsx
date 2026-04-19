"use client";

import { useTranslation } from "react-i18next";

const socials = [
  { name: "GitHub", link: "https://github.com" },
  { name: "Telegram", link: "https://t.me" },
  { name: "LinkedIn", link: "https://linkedin.com" },
];

export default function Footer() {
  const { t } = useTranslation();
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full mt-40 overflow-hidden">

      {/* 🌌 SPACE BACKGROUND GRID */}
      <div className="
        absolute inset-0
        bg-[radial-gradient(circle_at_center,rgba(100,200,255,0.08),transparent_60%)]
      " />

      <div className="
        relative max-w-6xl mx-auto

        border border-white/10
        bg-black/40 backdrop-blur-xl

        rounded-2xl
        overflow-hidden
      ">

        {/* TOP GRID PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">

          {/* ID PANEL */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
              {t("footer.system_id")}
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              ykDev Terminal
            </h2>

            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              Frontend / Fullstack Developer
              operating in modern web space systems.
            </p>

            <div className="mt-6 text-xs text-white/40">
              {t("footer.status")}: <span className="text-green-400 uppercase">{t("footer.online")}</span>
            </div>
          </div>

          {/* NAV PANEL */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
              {t("footer.nav.name")}
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <button
                key="about"
                onClick={() => scrollTo("about")}
                className="
                  text-white/60 hover:text-white
                  transition-all duration-300
                  text-left

                  hover:translate-x-2
                "
              >
                <span className="text-white/30 mr-2">▸</span>
                {t("footer.nav.about")}
              </button>

              <button
                key="skills"
                onClick={() => scrollTo("skills")}
                className="
                  text-white/60 hover:text-white
                  transition-all duration-300
                  text-left

                  hover:translate-x-2
                "
              >
                <span className="text-white/30 mr-2">▸</span>
                {t("footer.nav.skills")}
              </button>

              <button
                key="projects"
                onClick={() => scrollTo("projects")}
                className="
                  text-white/60 hover:text-white
                  transition-all duration-300
                  text-left

                  hover:translate-x-2
                "
              >
                <span className="text-white/30 mr-2">▸</span>
                {t("footer.nav.projects")}
              </button>

              <button
                key="contact"
                onClick={() => scrollTo("contact")}
                className="
                  text-white/60 hover:text-white
                  transition-all duration-300
                  text-left

                  hover:translate-x-2
                "
              >
                <span className="text-white/30 mr-2">▸</span>
                {t("footer.nav.contact")}
              </button>
            </div>
          </div>

          {/* COMM PANEL */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
              {t("footer.communication")}
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  className="
                    text-white/60 hover:text-accent-from
                    transition-all duration-300
                    hover:translate-x-2
                  "
                >
                  <span className="text-white/30 mr-2">▸</span>
                  {s.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/10" />

        {/* BOTTOM STATUS BAR */}
        <div className="
          flex flex-col sm:flex-row
          justify-between items-center
          px-10 py-5
          text-xs text-white/40
          tracking-widest
        ">
          <p>
            © {new Date().getFullYear()} ykDev // SYSTEM ACTIVE
          </p>

          <p>
            NEXT.JS NODE::RUNNING // UI::STABLE
          </p>
        </div>

      </div>
    </footer>
  );
}