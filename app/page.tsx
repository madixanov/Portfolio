import About from "@/components/about";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <div className="pt-10">
      <Hero />
      <About />
      <Skills />
      <Experience />
    </div>
  )
}