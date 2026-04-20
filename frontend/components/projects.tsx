"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { easeOut, motion, Variants, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { getProjects } from "@/api/api";
import { Project } from "@/types/types";

const cardHover: Variants = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    rotateX: 10,
    rotateY: -10,
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const imageVariants: Variants = {
  rest: { filter: "grayscale(100%)", scale: 1 },
  hover: {
    filter: "grayscale(0%)",
    scale: 1.1,
    transition: { duration: 0.6 },
  },
};

const baseUrl = (process.env.NEXT_PUBLIC_URL ?? "http://localhost:1337").replace(/\/$/, "");

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const data = await getProjects(i18n.language);
        setProjects(data || []);
      } catch (error) {
        console.error("Projects fetch error:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [i18n.language]);

  // Вспомогательный компонент для скелетона карточки
  const SkeletonCard = () => (
    <div className="flex flex-col h-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 animate-pulse">
      <div className="h-48 w-full bg-white/10" />
      <div className="p-6 flex-1 space-y-4">
        <div className="h-6 bg-white/10 rounded w-2/3" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-1/2" />
        <div className="flex gap-4 pt-4">
          <div className="h-10 bg-white/10 rounded-xl flex-1" />
          <div className="h-10 bg-white/10 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="w-full my-40 flex flex-col items-center px-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mb-16"
      >
        <p className="text-white/40 uppercase tracking-widest text-sm font-medium">
          {t("projects.title")}
        </p>
        <h2 className="text-5xl font-bold text-white mt-4 tracking-tight">
          {t("projects.name")}
        </h2>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i18n.language + (isFetching ? "-loading" : "-ready")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-6xl"
        >
          {isFetching ? (
            /* ================= LOADING STATE (SKELETONS) ================= */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </div>
          ) : (
            <>
              {/* ================= MOBILE SWIPER ================= */}
              <div className="lg:hidden w-full">
                <Swiper
                  modules={[Pagination, FreeMode]}
                  spaceBetween={20}
                  slidesPerView={1.2}
                  freeMode
                  pagination={{ clickable: true, dynamicBullets: true }}
                  className="pb-14"
                  breakpoints={{
                    320: { slidesPerView: 1.25 },
                    640: { slidesPerView: 1.5 },
                    860: { slidesPerView: 2.25 }
                  }}
                >
                  {projects.map((project) => {
                    const imageUrl = project.image?.url
                      ? project.image.url.startsWith("http")
                        ? project.image.url
                        : `${baseUrl}${project.image.url}`
                      : "/placeholder.png";

                    return (
                      <SwiperSlide key={project.id} className="h-auto!">
                        <motion.div
                          variants={cardHover}
                          initial="rest"
                          whileHover="hover"
                          animate="rest"
                          className="group flex flex-col h-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl"
                        >
                          <div className="relative h-48 w-full overflow-hidden">
                            <motion.div variants={imageVariants} className="w-full h-full">
                              <Image
                                src={imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </motion.div>
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex-1">
                              <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                              <p className="text-white/50 text-sm mt-3">{project.description}</p>
                            </div>
                            <div className="flex gap-4 mt-8">
                              <a href={project.links?.[1]?.link || "#"} className="flex-1 text-center py-2.5 rounded-xl bg-linear-to-br from-accent-from to-accent-to text-white text-sm font-bold">Live</a>
                              <a href={project.links?.[0]?.link || "#"} className="flex-1 text-center py-2.5 rounded-xl border border-white/10 text-white/60">Code</a>
                            </div>
                          </div>
                        </motion.div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              {/* ================= DESKTOP GRID ================= */}
              <div className="hidden lg:grid grid-cols-3 gap-10 w-full">
                {projects.map((project) => {
                  const imageUrl = project.image?.url
                    ? project.image.url.startsWith("http")
                      ? project.image.url
                      : `${baseUrl}${project.image.url}`
                    : "/placeholder.png";

                  return (
                    <motion.div
                      key={project.id}
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      className="group flex flex-col rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl h-full"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <motion.div variants={imageVariants} className="w-full h-full">
                          <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </motion.div>
                      </div>

                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <article className="flex flex-col">
                          <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                          <p className="text-white/50 text-sm mt-3">{project.description}</p>
                        </article>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.skills?.map((skill: any) => (
                            <span key={skill.id} className="px-3 py-1 text-[11px] font-medium rounded-full bg-white/5 border border-white/10 text-white/60 transition hover:text-white hover:border-white/30 hover:bg-white/10">
                              {skill.title || skill.name}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4 mt-6">
                          <a href={project.links?.[1]?.link || "#"} className="flex-1 text-center py-2.5 rounded-xl bg-linear-to-br from-accent-from to-accent-to text-white text-md">Live</a>
                          <a href={project.links?.[0]?.link || "#"} className="flex-1 text-center py-2.5 rounded-xl border border-white/10 text-white/60">Code</a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}