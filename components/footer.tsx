"use client";

const links = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const socials = [
  { name: "GitHub", link: "https://github.com" },
  { name: "Telegram", link: "https://t.me" },
  { name: "LinkedIn", link: "https://linkedin.com" },
];

export default function Footer() {
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
              System ID
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              ykDev Terminal
            </h2>

            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              Frontend / Fullstack Developer
              operating in modern web space systems.
            </p>

            <div className="mt-6 text-xs text-white/40">
              STATUS: <span className="text-green-400">ONLINE</span>
            </div>
          </div>

          {/* NAV PANEL */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
              Navigation Core
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="
                    text-white/60 hover:text-white
                    transition-all duration-300
                    text-left

                    hover:translate-x-2
                  "
                >
                  <span className="text-white/30 mr-2">▸</span>
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* COMM PANEL */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
              Communication
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