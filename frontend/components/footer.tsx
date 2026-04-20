"use client";

import { getMajor, getContacts } from "@/api/api"; // Убедитесь, что getContacts экспортирован
import { SingleContent } from "@/types/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [isFetching, setIsFetching] = useState(true);
  // Состояния для данных
  const [major, setMajor] = useState<SingleContent | null>(null);
  const [socials, setSocials] = useState<{ name: string; link: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const locale = i18n.language;
        // Запускаем оба запроса параллельно
        const [majorData, contactData] = await Promise.all([
          getMajor(locale),
          getContacts(locale) // Предполагаем, что контакты не зависят от языка или принимают его
        ]);

        // Установка Major (проверьте структуру вашего API, обычно это majorData.title или majorData.name)
        setMajor(majorData);

        // Фильтруем только нужные соцсети из пришедших данных
        if (contactData) {
          const filtered = contactData
            .filter((c: any) => ["GitHub", "LinkedIn", "Telegram"].includes(c.title))
            .map((c: any) => ({
              name: c.title,
              link: c.link
            }));
          setSocials(filtered);
        }
      } catch (error) {
        console.error("Footer data fetch error:", error);
      } finally {
          setIsFetching(false);
      }
    };

    fetchData();
  }, [i18n.language]);

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,200,255,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
          
          {/* ID PANEL */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
              {t("footer.system_id")}
            </p>
            <h2 className="text-3xl font-bold text-white mt-3">
              ykDev Terminal
            </h2>
            {/* ВСТАВЛЯЕМ MAJOR СЮДА */}
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              {isFetching ? <span className="text-white/20 text-xs italic">Loading systems...</span> : major?.content}
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
              {["about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-white/60 hover:text-white transition-all duration-300 text-left hover:translate-x-2"
                >
                  <span className="text-white/30 mr-2">▸</span>
                  {t(`footer.nav.${item}`)}
                </button>
              ))}
            </div>
          </div>

          {/* COMM PANEL - ДИНАМИЧЕСКИЕ СОЦСЕТИ */}
          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
              {t("footer.communication")}
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {socials.length > 0 ? (
                socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-accent-from transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="text-white/30 mr-2">▸</span>
                    {s.name}
                  </a>
                ))
              ) : (
                <span className="text-white/20 text-xs italic">Loading systems...</span>
              )}
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="flex flex-col sm:flex-row justify-between items-center px-10 py-5 text-xs text-white/40 tracking-widest">
          <p>© {new Date().getFullYear()} ykDev // SYSTEM ACTIVE</p>
          <p>NEXT.JS NODE::RUNNING // UI::STABLE</p>
        </div>
      </div>
    </footer>
  );
}