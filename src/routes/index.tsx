import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Compass, Crosshair, Orbit, Rocket, Satellite, Sparkles, Telescope } from "lucide-react";
import { artifacts, homeHero } from "@/data/artifacts";
import { ArchiveImg } from "@/components/archive/ArchiveImg";
import { SiteFooter, SiteHeader } from "@/components/archive/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Echoes of Exploration — Worlds explored. Stories left behind." },
      { name: "description", content: "Travel into the stories of spacecraft and scientific hardware left on the Moon and Mars." },
      { property: "og:title", content: "Echoes of Exploration" },
      { property: "og:description", content: "Worlds explored. Stories left behind." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: homeHero.src },
    ],
  }),
  component: Index,
});

const apolloStages = [
  { n: "01", label: "LAUNCH", date: "16 Jul 1969", objective: "Send Apollo 11 and its crew toward the Moon, opening the way for the first crewed lunar landing.", mission: "A Saturn V rocket launched Neil Armstrong, Buzz Aldrin and Michael Collins from Kennedy Space Center.", color: "cyan", image: "rocket" },
  { n: "02", label: "LUNAR LANDING", date: "20 Jul 1969", objective: "Land astronauts on the lunar surface and carry out observations, photography and scientific work.", mission: "The Eagle lunar module descended to the Sea of Tranquility. Armstrong and Aldrin became the first humans to walk on the Moon.", color: "violet", image: "lander" },
  { n: "03", label: "ASCENT STAGE LIFT-OFF", date: "21 Jul 1969", objective: "Return the two astronauts from the lunar surface to the command module waiting in lunar orbit.", mission: "The ascent stage lifted off from the descent stage, leaving the lower stage behind at Tranquility Base.", color: "amber", image: "ascent" },
];

function Index() {
  const moon = artifacts.filter((a) => a.destination === "Moon");
  const mars = artifacts.filter((a) => a.destination === "Mars");
  const other = artifacts.filter((a) => a.destination === "Other");
  return (
    <div className="space-app-shell">
      <SiteHeader />
      <main>
        <section className="cosmos-hero">
          <ArchiveImg image={homeHero} eager className="cosmos-image" />
          <div className="cosmos-shade" />
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-dot" /> AN INTERACTIVE SPACE ARCHIVE <span className="kicker-line" /> NASA MISSION STORIES</div>
            <h1>A journey <em>beyond limits.</em></h1>
            <p className="hero-subtitle">Some spacecraft came home. Some went silent. Some were meant to stay.</p>
            <p className="hero-description">Travel across the Moon, Mars and the wider Solar System to uncover the machines, experiments and spacecraft that became part of other worlds — and discover why each one went silent or stayed behind.</p>
            <div className="hero-actions"><Link to="/archive" className="primary-explore"><Rocket size={17} /> Enter the archive <ArrowUpRight size={17} /></Link><a href="#apollo-timeline" className="text-explore">Explore the mission timeline <ArrowDown size={15} /></a></div>
            <div className="hero-proof"><span><BadgeCheck size={16} /> Source-linked research</span><span><Orbit size={16} /> {artifacts.length} investigations</span><span><Telescope size={16} /> Made for curious minds</span></div>
          </div>
          <div className="hero-coordinate">40° N · 3° E <span>MOON · MARS · DEEP SPACE</span></div>
          <div className="hero-scroll"><span /> SCROLL TO DESCEND</div>
        </section>

        <section className="stats-ribbon" aria-label="Archive overview">
          <div><strong>{artifacts.length}</strong><span>Curated investigations</span></div><div><strong>{moon.length.toString().padStart(2,"0")}</strong><span>Moon records</span></div><div><strong>{mars.length.toString().padStart(2,"0")}</strong><span>Mars records</span></div><div><strong>{other.length.toString().padStart(2,"0")}</strong><span>Other destinations</span></div><div><strong>1964—2026</strong><span>Research period</span></div>
        </section>

        <section id="apollo-timeline" className="timeline-section section-wrap">
          <div className="section-heading"><div><p className="section-eyebrow"><span>01</span> FIRST, A LANDING THAT CHANGED EVERYTHING</p><h2>One mission. <em>Three defining moments.</em></h2><p className="section-intro">Follow Apollo 11 from Earth departure to lunar return. Each moment has its own objective and mission story.</p></div><div className="orbit-stamp"><Orbit size={30} /><span>APOLLO<br />11 / 1969</span></div></div>
          <div className="mission-track">
            <div className="track-line" />
            {apolloStages.map((stage) => (
              <article className={`stage-card stage-${stage.color}`} key={stage.n}>
                <div className="stage-topline"><span className="stage-number">{stage.n}</span><span className="stage-label">{stage.label}</span><span className="stage-node" /></div>
                <div className={`stage-art stage-art-${stage.image}`}><img src={stage.image === "rocket" ? "https://images-assets.nasa.gov/image/6900556/6900556~large.jpg" : stage.image === "lander" ? "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~large.jpg" : "https://images-assets.nasa.gov/image/as11-40-5945/as11-40-5945~large.jpg"} alt={stage.image === "rocket" ? "Apollo 11 Saturn V launch" : stage.image === "lander" ? "Apollo 11 Eagle lunar module on the Moon" : "Apollo 11 lunar ascent stage"} loading="lazy" /></div>
                <div className="stage-content"><p className="stage-date">{stage.date}</p><div className="stage-info"><div><p className="info-label"><Crosshair size={14} /> OBJECTIVE</p><p>{stage.objective}</p></div><div><p className="info-label"><Rocket size={14} /> MISSION</p><p>{stage.mission}</p></div></div><Link to="/artifacts/$slug" params={{ slug: "apollo-11-eagle" }} className="stage-link">Explore this mission <ArrowRight size={15} /></Link></div>
              </article>
            ))}
          </div>
          <p className="timeline-caption"><span /> APOLLO 11 · NASA MISSION ARCHIVE IMAGERY AND CHRONOLOGY <span /></p>
        </section>

        <section className="worlds-section">
          <div className="worlds-backdrop" />
          <div className="section-wrap worlds-inner"><div className="section-heading light-heading"><div><p className="section-eyebrow"><span>02</span> CHOOSE YOUR DESTINATION</p><h2>Three environments. <em>Countless traces.</em></h2><p className="section-intro">Go where the evidence leads: the Moon, Mars and the wider Solar System. Every artifact opens a deeper investigation.</p></div><Sparkles className="world-spark" size={35} /></div>
            <div className="world-cards">
              <Link to="/archive" className="world-card moon-card"><img className="world-photo moon-photo" src="https://images-assets.nasa.gov/image/PIA00405/PIA00405~large.jpg" alt="Lunar surface photographed by NASA's Lunar Orbiter missions" loading="lazy" /><span className="world-image-credit">NASA / Lunar Orbiter</span><div className="world-card-top"><span>DESTINATION 01</span><span>{moon.length.toString().padStart(2,"0")} RECORDS</span></div><div className="world-card-copy"><p>THE SILENT FRONTIER</p><h3>The Moon</h3><span>From deliberate impacts to instruments that still reflect laser pulses. Explore the hardware that remains in the lunar dust.</span><b>Explore lunar artifacts <ArrowUpRight size={17} /></b></div></Link>
              <Link to="/archive" className="world-card mars-card"><img className="world-photo mars-photo" src="https://images-assets.nasa.gov/image/PIA02820/PIA02820~large.jpg" alt="Mars surface photographed by NASA spacecraft" loading="lazy" /><span className="world-image-credit">NASA / JPL-Caltech</span><div className="world-card-top"><span>DESTINATION 02</span><span>{mars.length.toString().padStart(2,"0")} RECORDS</span></div><div className="world-card-copy"><p>THE RED PLANET ARCHIVE</p><h3>Mars</h3><span>Rovers, landers and landing systems left across an alien landscape. Discover how their missions ended — and what they taught us.</span><b>Explore Martian artifacts <ArrowUpRight size={17} /></b></div></Link>
              <Link to="/archive" className="world-card other-card"><img className="world-photo other-photo" src="https://images-assets.nasa.gov/image/as17-148-22727/as17-148-22727~large.jpg" alt="Earth photographed from Apollo 17, representing deep-space exploration" loading="lazy" /><span className="world-image-credit">NASA / Apollo 17 · context image</span><div className="world-card-top"><span>DESTINATION 03</span><span>{other.length.toString().padStart(2,"0")} RECORDS</span></div><div className="world-card-copy"><p>ASTEROIDS & DEEP SPACE</p><h3>Beyond</h3><span>From Dawn at Ceres to NEAR Shoemaker on Eros, and probes that continue outward after their last signal.</span><b>Explore other destinations <ArrowUpRight size={17} /></b></div></Link>
            </div>
          </div>
        </section>

        <section className="investigations-section section-wrap"><div className="section-heading"><div><p className="section-eyebrow"><span>03</span> OPEN THE CASE FILES</p><h2>Every artifact has <em>a story.</em></h2><p className="section-intro">Start with a featured investigation. Each record includes its objective, mission, components, ending and scientific legacy.</p></div><Link to="/archive" className="all-records-link">View all {artifacts.length} records <ArrowUpRight size={16} /></Link></div>
          <div className="investigation-grid">{artifacts.slice(0,6).map((a,i)=>(<Link to="/artifacts/$slug" params={{slug:a.slug}} className="investigation-card" key={a.slug}><div className="investigation-image"><ArchiveImg image={a.hero} showCredit={false} className="h-full w-full"/><span className="record-number">CASE FILE / {String(i+1).padStart(2,"0")}</span><span className={`world-tag ${a.destination === "Moon" ? "tag-moon" : a.destination === "Mars" ? "tag-mars" : "tag-other"}`}>{a.destinationDetail ?? a.destination}</span></div><div className="investigation-copy"><p className="mission-name">{a.mission}</p><h3>{a.name}</h3><div className="brief-block"><b>OBJECTIVE</b><p>{a.objective}</p></div><div className="brief-block"><b>MISSION</b><p>{a.missionOverview}</p></div><span className="card-open">Open investigation <ArrowUpRight size={15}/></span></div></Link>))}</div>
          <div className="more-records"><span>THE CURATED ARCHIVE CONTAINS {artifacts.length} SOURCE-LINKED RECORDS</span><Link to="/archive">Continue into the archive <ArrowRight size={16}/></Link></div>
        </section>

        <section className="curiosity-band"><div className="curiosity-orbit"><Orbit size={54}/></div><div><p className="section-eyebrow">THE UNIVERSE IS STILL FULL OF QUESTIONS</p><h2>Look closer. <em>Think deeper.</em></h2><p>What makes a mission successful if its hardware never comes home? Start investigating, compare evidence and make your own discoveries.</p></div><Link to="/archive" className="primary-explore">Begin your investigation <ArrowUpRight size={17}/></Link></section>
      </main>
      <SiteFooter />
    </div>
  );
}
