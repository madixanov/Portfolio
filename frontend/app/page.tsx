import About from "@/components/about";
import Contacts from "@/components/contacts";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <div className="pt-10">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contacts />
    </div>
  )
}