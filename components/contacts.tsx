"use client";

import Image from "next/image";

const socials = [
  {
    name: "Telegram",
    desc: "Text me directly (fast reply)",
    link: "https://t.me/yourname",
    icon: "/icons/telegram.svg",
  },
  {
    name: "GitHub",
    desc: "My code & projects",
    link: "https://github.com/yourname",
    icon: "/icons/github.svg",
  },
  {
    name: "YouTube",
    desc: "Dev & tutorials",
    link: "https://youtube.com",
    icon: "/icons/youtube.svg",
  },
  {
    name: "Instagram",
    desc: "Behind the scenes",
    link: "https://instagram.com",
    icon: "/icons/instagram.svg",
  },
  {
    name: "LinkedIn",
    desc: "Professional profile",
    link: "https://linkedin.com",
    icon: "/icons/linkedin.svg",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="
        w-full my-40 px-6
        flex flex-col items-center
      "
    >
      {/* HEADER */}
      <div className="text-center max-w-3xl mb-16">
        <p className="text-white/40 uppercase tracking-widest text-sm">
          Contact & Socials
        </p>

        <h2 className="text-5xl font-bold text-white mt-3">
          Let’s Connect & Build Something{" "}
          <span className="text-accent-from">Amazing</span>
        </h2>

        <p className="text-white/60 mt-4">
          Reach out via Telegram or follow me on social platforms 🚀
        </p>
      </div>

      {/* GRID */}
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10">

        {/* FORM */}
        <div
          className="
            relative
            rounded-2xl
            bg-white/5 border border-white/10
            backdrop-blur-md
            p-8
            flex flex-col justify-center
          "
        >
          <h3 className="text-white text-2xl font-bold mb-6">
            Send me a message
          </h3>

          <div className="flex flex-col gap-4">
            <input
              placeholder="Your name"
              className="
                bg-white/5 border border-white/10
                rounded-xl px-4 py-3
                text-white
                outline-none
                focus:border-accent-from
              "
            />

            <input
              placeholder="Your email"
              className="
                bg-white/5 border border-white/10
                rounded-xl px-4 py-3
                text-white
                outline-none
                focus:border-accent-from
              "
            />

            <textarea
              placeholder="Your message"
              rows={5}
              className="
                bg-white/5 border border-white/10
                rounded-xl px-4 py-3
                text-white
                outline-none
                resize-none
                focus:border-accent-from
              "
            />

            <button
              className="
                mt-2
                py-3 rounded-xl
                text-white font-medium

                bg-linear-to-r from-accent-from to-accent-to
                bg-size-[200%_200%] bg-left hover:bg-right

                transition-all duration-500
                hover:shadow-[0_0_25px_rgba(100,200,255,0.3)]
                hover:scale-[1.02]
              "
            >
              Send Message 🚀
            </button>
          </div>
        </div>

        {/* SOCIALS */}
        <div className="flex flex-col gap-5">

          {socials.map((s, i) => {
            const isTelegram = s.name === "Telegram";

            return (
              <a
                key={i}
                href={s.link}
                target="_blank"
                className={`
                  group relative

                  flex items-center gap-4
                  p-5 rounded-2xl

                  backdrop-blur-md
                  border transition-all duration-500

                  hover:scale-[1.03]
                  hover:-translate-y-1
                  hover:shadow-[0_0_40px_rgba(100,200,255,0.15)]

                  ${
                    isTelegram
                      ? "bg-linear-to-r from-accent-from/20 to-accent-to/5 border-accent-from/40"
                      : "bg-white/5 border-white/10 hover:border-white/30"
                  }
                `}
              >
                {/* glow */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl blur-xl transition
                    opacity-0 group-hover:opacity-100

                    ${
                      isTelegram
                        ? "bg-linear-to-r from-accent-from/30 to-accent-to/20"
                        : "bg-white/10"
                    }
                  `}
                />

                {/* ICON */}
                <div
                  className="
                    relative w-12 h-12
                    flex items-center justify-center
                    rounded-full
                    bg-white/5 border border-white/10
                    group-hover:scale-110 transition
                  "
                >
                  <Image
                    src={s.icon}
                    alt={s.name}
                    width={28}
                    height={28}
                    className="
                      opacity-70 group-hover:opacity-100
                      transition
                    "
                  />
                </div>

                {/* TEXT */}
                <div className="relative">
                  <p
                    className={`
                      font-semibold transition
                      ${
                        isTelegram
                          ? "text-white text-lg"
                          : "text-white group-hover:text-accent-from"
                      }
                    `}
                  >
                    {s.name}
                  </p>

                  <p className="text-white/60 text-sm">
                    {s.desc}
                  </p>
                </div>

                {/* BADGE */}
                {isTelegram && (
                  <span className="
                    absolute right-4
                    text-xs text-white/70
                    px-2 py-1 rounded-full
                    bg-white/10 border border-white/20
                  ">
                    fast reply
                  </span>
                )}
              </a>
            );
          })}

        </div>
      </div>
    </section>
  );
}