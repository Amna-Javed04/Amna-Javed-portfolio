import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Research } from "@/components/sections/research";
import { Skills } from "@/components/sections/skills";
import { Certs } from "@/components/sections/certs";
import { Profiles } from "@/components/sections/profiles";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Research />
      <Skills />
      <Certs />
      <Profiles />
      <Contact />
    </main>
  );
}
