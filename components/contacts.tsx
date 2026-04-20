"use client";

import Image from "next/image";
import { easeOut, motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState, FormEvent } from "react";
import { getContacts, sendMessage } from "@/api/api";
import { Lock } from "lucide-react";

// --- ТИПЫ ---
interface ContactSocial {
  id: number;
  title: string;
  description: string;
  link: string | null;
  icon: string | null;
  badge: string | null;
}

// --- АНИМАЦИИ ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [contacts, setContacts] = useState<ContactSocial[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const res = await getContacts(i18n.language);
        const data = res.data || res;
        if (Array.isArray(data)) {
          // Разворачиваем список и сохраняем
          setContacts([...data].reverse());
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [i18n.language]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await sendMessage(payload);

      if (res?.success) {
        alert("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Send error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full my-40 px-6 flex flex-col items-center">
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mb-16"
      >
        <p className="text-white/40 uppercase tracking-widest text-sm">{t("contacts.title")}</p>
        <h2 className="text-5xl font-bold text-white mt-3">
          {t("contact.name")} <span className="text-accent-from">{t("contact.secondname")}</span>
        </h2>
        <p className="text-white/60 mt-4">{t("contact.description")}</p>
      </motion.div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10">
        
        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8 flex flex-col h-full"
        >
          <h3 className="text-white text-2xl font-bold mb-6">{t("email.title")}</h3>
          <div className="flex flex-col gap-4 flex-grow">
            <input name="name" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-from/50" placeholder={t("email.name_input")} />
            <input name="email" type="email" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-from/50" placeholder={t("email.email_input")} />
            <textarea name="message" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white resize-none outline-none focus:border-accent-from/50 flex-grow" rows={5} placeholder={t("email.message_input")} />
            <button 
              disabled={loading}
              className="mt-4 py-3 rounded-xl text-white font-medium bg-linear-to-r from-accent-from to-accent-to hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? "..." : t("email.button")}
            </button>
          </div>
        </motion.form>

        {/* SOCIALS */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={i18n.language} // При смене языка блок пересоздается и анимируется
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-5"
            >
              {!isFetching ? contacts.map((s) => {
                const hasBadge = !!s.badge;
                const isLocked = !s.link || s.link === "#" || s.link === "";

                return (
                  <motion.a
                    key={s.id}
                    variants={itemVariants}
                    href={isLocked ? undefined : (s.link ?? undefined)}
                    target={isLocked ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={`
                      group relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500
                      ${isLocked ? "cursor-not-allowed opacity-50" : "hover:scale-[1.03] hover:-translate-y-1"}
                      ${hasBadge 
                        ? "bg-linear-to-r from-accent-from/20 to-accent-to/5 border-accent-from/40" 
                        : "bg-white/5 border-white/10 hover:border-white/30"}
                    `}
                  >
                    {/* ICON / LOCK */}
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-transform group-hover:scale-110">
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-white/30" />
                      ) : (
                        <Image 
                          src={`/icons/${s.icon ?? "default"}.svg`} 
                          alt={s.title} 
                          width={28} height={28} 
                          className="opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                    </div>

                    <div className="relative">
                      <p className={`font-semibold transition-colors ${hasBadge ? "text-white text-lg" : "text-white group-hover:text-accent-from"}`}>
                        {s.title}
                      </p>
                      <p className="text-white/60 text-sm">{s.description}</p>
                    </div>

                    {hasBadge && (
                      <span className="absolute right-4 text-[10px] uppercase tracking-wider text-white/70 px-2 py-1 rounded-full bg-white/10 border border-white/20">
                        {s.badge}
                      </span>
                    )}
                  </motion.a>
                );
              }) : (
                /* Skeleton Loader */
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-[88px] bg-white/5 border border-white/10 rounded-2xl animate-pulse" />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}