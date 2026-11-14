// Research content for the archive. Kept separate from presentation code.
// NASA archive image references; contextual images are explicitly labelled when they do not depict the artifact itself.

export type ArchiveImage = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  kind: "photograph" | "illustration" | "map" | "context";
};

export type Segment = { kind: "fact" | "creative"; text: string };

export type Chapter = {
  id: string;
  title: string;
  dateLabel?: string;
  segments: Segment[];
  milestones?: { date: string; text: string }[];
  image?: ArchiveImage;
};

export type StatusKind = "Confirmed location" | "Approximate location" | "Unknown";

export type TechnicalSpecs = {
  mass?: string;
  dimensions?: string;
  power?: string;
  propulsion?: string;
  designLife?: string;
  instruments?: string;
  structure?: string;
  notes?: string;
};

export type Artifact = {
  slug: string;
  name: string;
  mission: string;
  destination: "Moon" | "Mars" | "Other";
  destinationDetail?: string;
  agency: string;
  builder: string;
  summary: string;
  specs?: TechnicalSpecs;
  objective?: string;
  missionOverview?: string;
  hero: ArchiveImage;
  keyDates: { label: string; date: string }[];
  status: { kind: StatusKind; place: string; note: string };
  chapters: Chapter[];
  sources: { label: string; url: string }[];
  related: string[];
  components?: { name: string; function: string }[];
  endingType?: "intentional-impact" | "power-loss" | "communication-loss" | "immobilized" | "decommissioned" | "discarded-by-design" | "still-scientifically-useful" | "accidental-atmospheric-loss";
  endingExplanation?: string;
  challenge?: { question: string; hint: string; answer: string };
};

const nasa = (
  id: string,
  alt: string,
  opts: { size?: "large" | "medium" | "orig"; kind?: ArchiveImage["kind"]; credit?: string } = {},
): ArchiveImage => ({
  src: `https://images-assets.nasa.gov/image/${id}/${id}~${opts.size ?? "large"}.jpg`,
  alt,
  credit: opts.credit ?? "NASA",
  sourceUrl: `https://images.nasa.gov/details/${id}`,
  kind: opts.kind ?? "photograph",
});

export const homeHero = nasa(
  "as11-40-5903",
  "Buzz Aldrin walks on the lunar surface near a leg of the Apollo 11 Lunar Module, July 20, 1969",
);
export const earthImage = nasa(
  "as17-148-22727",
  "Earth photographed by the Apollo 17 crew while traveling toward the Moon, December 1972",
);

export const artifacts: Artifact[] = [
  {
    slug: "apollo-11-eagle",
    name: "Eagle Descent Stage",
    mission: "Apollo 11",
    destination: "Moon",
    agency: "NASA",
    builder: "Grumman Aircraft Engineering Corporation",
    summary:
      "The lower half of the first crewed lunar lander. When Armstrong and Aldrin lifted off, it stayed behind as their launch platform — and it is still there.",
    hero: nasa("as11-40-5927", "The Apollo 11 Lunar Module Eagle resting on the Sea of Tranquility"),
    keyDates: [
      { label: "Launch", date: "16 Jul 1969" },
      { label: "Landing", date: "20 Jul 1969" },
      { label: "Ascent stage lift-off", date: "21 Jul 1969" },
    ],
    status: {
      kind: "Confirmed location",
      place: "Tranquility Base, Mare Tranquillitatis (approx. 0.67°N, 23.47°E)",
      note: "The descent stage and its shadow have been photographed from orbit by NASA's Lunar Reconnaissance Orbiter Camera.",
    },
    chapters: [
      {
        id: "beginning",
        title: "The Beginning",
        dateLabel: "1961 – 1969",
        segments: [
          { kind: "fact", text: "In May 1961, President John F. Kennedy committed the United States to landing a crew on the Moon before the decade was out." },
          { kind: "fact", text: "NASA chose lunar orbit rendezvous: a separate, lightweight lander would descend to the surface while a command module waited in orbit. Grumman built that lander in two stages — a descent stage with the landing engine and legs, and an ascent stage that carried the crew home." },
        ],
      },
      {
        id: "journey",
        title: "The Journey",
        dateLabel: "16 – 20 Jul 1969",
        segments: [
          { kind: "fact", text: "On July 16, 1969, a Saturn V lifted Apollo 11 from Kennedy Space Center's Launch Complex 39A with Neil Armstrong, Buzz Aldrin and Michael Collins aboard." },
          { kind: "fact", text: "On July 20, Armstrong and Aldrin separated Eagle from the command module Columbia and began their powered descent toward the Sea of Tranquility." },
          { kind: "creative", text: "If I could describe that descent, I would say the Moon did not wait for us. It rose up grey and enormous, and every second of fuel mattered." },
        ],
        milestones: [
          { date: "16 Jul 1969", text: "Launch from LC-39A" },
          { date: "19 Jul 1969", text: "Lunar orbit insertion" },
          { date: "20 Jul 1969", text: "Eagle undocks and descends" },
        ],
        image: nasa("6900556", "Saturn V rocket launching Apollo 11 from Kennedy Space Center, July 16, 1969"),
      },
      {
        id: "turning-point",
        title: "The Turning Point",
        dateLabel: "20 Jul 1969",
        segments: [
          { kind: "fact", text: "During the descent the guidance computer raised 1202 and 1201 program alarms. Mission Control judged it safe to continue." },
          { kind: "fact", text: "The automatic targeting was carrying Eagle toward a boulder-strewn crater, so Armstrong took semi-manual control and flew past it. Eagle touched down with only seconds of planned fuel margin remaining." },
          { kind: "fact", text: "Armstrong radioed: \"Houston, Tranquility Base here. The Eagle has landed.\"" },
        ],
      },
      {
        id: "discoveries",
        title: "The Discoveries",
        dateLabel: "20 – 21 Jul 1969",
        segments: [
          { kind: "fact", text: "In about two and a half hours outside, the crew collected roughly 21.5 kilograms of lunar rock and soil, and deployed a passive seismometer and a laser ranging retroreflector." },
          { kind: "fact", text: "Analysis of the returned basalts showed that the lunar maria formed from ancient volcanic lava, about 3.6 to 3.9 billion years old." },
          { kind: "creative", text: "They walked around me for a little while, left footprints that no wind would ever erase, and then climbed back inside." },
        ],
        image: nasa("as11-40-5903", "Buzz Aldrin beside a leg of the Lunar Module"),
      },
      {
        id: "ending",
        title: "The Ending",
        dateLabel: "21 Jul 1969",
        segments: [
          { kind: "fact", text: "On July 21, 1969, the ascent stage fired its engine and lifted off, using the descent stage as its launch pad. The descent stage, as designed, stayed on the surface." },
          { kind: "fact", text: "The ascent stage rejoined Columbia and was later jettisoned into lunar orbit. Its eventual fate has not been confirmed." },
        ],
        image: nasa("as11-44-6642", "Eagle's ascent stage returning to rendezvous, photographed from the command module"),
      },
      {
        id: "remains",
        title: "Where It Remains",
        segments: [
          { kind: "fact", text: "The descent stage stands at Tranquility Base. A plaque on one leg reads: \"Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind.\"" },
          { kind: "fact", text: "Its location is confirmed by orbital imagery from the Lunar Reconnaissance Orbiter. The laser retroreflector nearby is still used for ranging measurements from Earth." },
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        segments: [
          { kind: "fact", text: "Apollo 11 demonstrated that humans could land on another world and return safely. Its samples reshaped our understanding of the Moon's origin and history." },
          { kind: "creative", text: "I was built to be left behind. That was always the plan. Half of me went home; this half keeps the place." },
        ],
      },
    ],
    sources: [
      { label: "NASA — Apollo 11 mission overview", url: "https://www.nasa.gov/mission/apollo-11/" },
      { label: "NASA Science — Apollo 11", url: "https://science.nasa.gov/mission/apollo-11/" },
      { label: "LROC — Apollo landing sites from orbit", url: "https://www.lroc.asu.edu/featured_sites" },
      { label: "NASA History — Apollo 11 Lunar Surface Journal", url: "https://www.nasa.gov/history/alsj/a11/a11.html" },
    ],
    related: ["surveyor-3", "spirit"],
  },
  {
    slug: "surveyor-3",
    name: "Surveyor 3",
    mission: "Surveyor Program",
    destination: "Moon",
    agency: "NASA / JPL",
    builder: "Hughes Aircraft Company",
    summary:
      "A robotic lander that dug the first trenches in lunar soil — and two and a half years later became the only spacecraft on another world to be visited by astronauts.",
    hero: nasa("AS12-48-7134", "Alan Bean examines Surveyor 3, with the Apollo 12 Lunar Module in the background"),
    keyDates: [
      { label: "Launch", date: "17 Apr 1967" },
      { label: "Landing", date: "20 Apr 1967" },
      { label: "Last transmission", date: "4 May 1967" },
      { label: "Visited by Apollo 12", date: "20 Nov 1969" },
    ],
    status: {
      kind: "Confirmed location",
      place: "Surveyor crater, Oceanus Procellarum",
      note: "Photographed in place by the Apollo 12 crew, who landed about 180 metres away; parts were removed and returned to Earth.",
    },
    chapters: [
      {
        id: "beginning",
        title: "The Beginning",
        dateLabel: "1960s",
        segments: [
          { kind: "fact", text: "Before anyone could land on the Moon, engineers needed to know whether its surface would hold a spacecraft's weight. NASA's Surveyor program was built to find out, with soft-landing robotic spacecraft." },
          { kind: "fact", text: "Surveyor 3 carried a television camera and, for the first time, a mechanical surface sampler — a small claw-like scoop on an extendable arm." },
        ],
      },
      {
        id: "journey",
        title: "The Journey",
        dateLabel: "17 – 20 Apr 1967",
        segments: [
          { kind: "fact", text: "Surveyor 3 launched from Cape Kennedy on April 17, 1967, aboard an Atlas-Centaur rocket, and reached the Moon three days later." },
        ],
        milestones: [
          { date: "17 Apr 1967", text: "Launch, Atlas-Centaur" },
          { date: "20 Apr 1967", text: "Landing, Oceanus Procellarum" },
        ],
      },
      {
        id: "turning-point",
        title: "The Turning Point",
        dateLabel: "20 Apr 1967",
        segments: [
          { kind: "fact", text: "During landing, bright reflections confused the lander's radar, and its vernier engines did not cut off as planned. Surveyor 3 touched down and bounced — twice — before settling inside a shallow crater." },
          { kind: "creative", text: "If I could describe that landing, I would admit it was not graceful. But I was down, and I was whole." },
        ],
      },
      {
        id: "discoveries",
        title: "The Discoveries",
        dateLabel: "Apr – May 1967",
        segments: [
          { kind: "fact", text: "Its scoop dug trenches and pressed into the soil, showing that the lunar surface had the consistency of damp sand — firm enough to support a crewed lander. It returned more than six thousand television images." },
        ],
        image: nasa("as12-48-7121", "Surveyor 3 inside its crater, photographed by Apollo 12"),
      },
      {
        id: "ending",
        title: "The Ending",
        dateLabel: "4 May 1967",
        segments: [
          { kind: "fact", text: "As the long lunar night arrived, Surveyor 3 last transmitted on May 4, 1967. It did not respond when the Sun returned." },
          { kind: "fact", text: "On November 19, 1969, Apollo 12 landed nearby. The next day Pete Conrad and Alan Bean walked to the lander and removed its camera, its scoop and other parts to study how materials age on the Moon." },
          { kind: "fact", text: "Bacteria later found inside the returned camera were reported as having survived on the Moon. Later reviews concluded contamination after return is the more likely explanation." },
        ],
        image: nasa("AS12-48-7133", "Two U.S. spacecraft on the Moon: Surveyor 3 and the Apollo 12 Lunar Module"),
      },
      {
        id: "remains",
        title: "Where It Remains",
        segments: [
          { kind: "fact", text: "The rest of Surveyor 3 remains in Surveyor crater in the Ocean of Storms. The camera returned by Apollo 12 is held by the Smithsonian National Air and Space Museum." },
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        segments: [
          { kind: "fact", text: "Surveyor 3 proved robots could scout landing sites for humans, and the Apollo 12 visit demonstrated a pinpoint crewed landing on a chosen target." },
          { kind: "creative", text: "For two years I watched the sky in silence. Then visitors came, and they took a little of me home." },
        ],
      },
    ],
    sources: [
      { label: "NASA Science — Surveyor 3", url: "https://science.nasa.gov/mission/surveyor-3/" },
      { label: "NASA History — Apollo 12 Lunar Surface Journal", url: "https://www.nasa.gov/history/alsj/a12/a12.html" },
      { label: "NASA NSSDCA — Surveyor 3", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A" },
    ],
    related: ["apollo-11-eagle", "opportunity"],
  },
  {
    slug: "spirit",
    name: "Spirit Rover",
    mission: "Mars Exploration Rover A",
    destination: "Mars",
    agency: "NASA / JPL",
    builder: "NASA Jet Propulsion Laboratory",
    summary:
      "Designed for 90 Martian days, Spirit explored Gusev Crater for over six years, found evidence of an ancient hot-water environment, and fell silent beside a patch of soft sand called Troy.",
    hero: nasa("PIA03250", "Panorama of the Columbia Hills taken by Spirit in Gusev Crater", { size: "orig" }),
    keyDates: [
      { label: "Launch", date: "10 Jun 2003" },
      { label: "Landing", date: "4 Jan 2004" },
      { label: "Last communication", date: "22 Mar 2010" },
      { label: "Mission ended", date: "25 May 2011" },
    ],
    status: {
      kind: "Confirmed location",
      place: "Troy, west of Home Plate, Gusev Crater",
      note: "Spirit was stationary at Troy when contact was lost. Its position is known from its own imagery and orbital imaging.",
    },
    chapters: [
      {
        id: "beginning",
        title: "The Beginning",
        dateLabel: "2000 – 2003",
        segments: [
          { kind: "fact", text: "NASA designed two identical robotic geologists, Spirit and Opportunity, to search Mars for evidence of past water. Each was planned to last 90 Martian days." },
          { kind: "fact", text: "Spirit's target was Gusev Crater, chosen because it might once have held a lake." },
        ],
        image: nasa("PIA04413", "Artist's concept of a Mars Exploration Rover on the surface", { kind: "illustration", credit: "NASA/JPL" }),
      },
      {
        id: "journey",
        title: "The Journey",
        dateLabel: "10 Jun 2003 – 4 Jan 2004",
        segments: [
          { kind: "fact", text: "Spirit launched from Cape Canaveral on June 10, 2003, aboard a Delta II rocket. On January 4, 2004, it reached Mars, slowed by parachute and cushioned by airbags." },
          { kind: "creative", text: "If I could describe those first moments, I would tell you that an unfamiliar world had become my landscape." },
        ],
        milestones: [
          { date: "10 Jun 2003", text: "Launch, Delta II" },
          { date: "4 Jan 2004", text: "Airbag landing in Gusev Crater" },
          { date: "Jan 2004", text: "Flash-memory fault, recovered remotely" },
        ],
      },
      {
        id: "discoveries",
        title: "The Discoveries",
        dateLabel: "2004 – 2009",
        segments: [
          { kind: "fact", text: "The plains of Gusev turned out to be volcanic basalt. So Spirit drove to the Columbia Hills, several kilometres away, where it found rocks altered by water." },
          { kind: "fact", text: "In 2007, its jammed front wheel scraped up bright soil near Home Plate that proved to be nearly pure silica — evidence of hot springs or steam vents in Mars's past." },
          { kind: "fact", text: "Later analysis of an outcrop called Comanche identified carbonate minerals, pointing to a once wetter, less acidic environment." },
        ],
        image: nasa("PIA02055", "Spirit's view of Home Plate in the Columbia Hills", { size: "orig", credit: "NASA/JPL-Caltech/Cornell" }),
      },
      {
        id: "turning-point",
        title: "The Turning Point",
        dateLabel: "May 2009",
        segments: [
          { kind: "fact", text: "In 2006, Spirit's right front wheel stopped working, and the rover learned to drive backwards, dragging it. In May 2009, its wheels broke through a crust into soft sand at a site called Troy." },
          { kind: "fact", text: "Months of tests with a twin rover on Earth followed. In January 2010, NASA announced that Spirit would stay where it was as a stationary research platform." },
        ],
        image: nasa("PIA12203", "Panorama from Spirit's position at Troy", { credit: "NASA/JPL-Caltech/Cornell" }),
      },
      {
        id: "ending",
        title: "The Ending",
        dateLabel: "22 Mar 2010 – 25 May 2011",
        segments: [
          { kind: "fact", text: "Unable to tilt its solar panels toward the winter Sun, Spirit last communicated on March 22, 2010. Engineers listened for more than a year. NASA ended recovery efforts on May 25, 2011." },
          { kind: "creative", text: "The winter was long. I had told them everything I could." },
        ],
      },
      {
        id: "remains",
        title: "Where It Remains",
        segments: [
          { kind: "fact", text: "Spirit rests at Troy, on the western edge of Home Plate, after driving about 7.7 kilometres. Its physical condition since 2010 is unknown." },
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        segments: [
          { kind: "fact", text: "Spirit worked roughly twenty-five times longer than planned. Its discovery of silica deposits remains among the strongest evidence for past habitable conditions on Mars." },
        ],
      },
    ],
    sources: [
      { label: "NASA Science — Spirit", url: "https://science.nasa.gov/mission/mer-spirit/" },
      { label: "NASA JPL — Mars Exploration Rovers", url: "https://www.jpl.nasa.gov/missions/mars-exploration-rover-spirit-mer" },
      { label: "NASA — Spirit's mission ends (2011)", url: "https://www.jpl.nasa.gov/news/nasa-concludes-attempts-to-contact-mars-rover-spirit" },
    ],
    related: ["opportunity", "apollo-11-eagle"],
  },
  {
    slug: "opportunity",
    name: "Opportunity Rover",
    mission: "Mars Exploration Rover B",
    destination: "Mars",
    agency: "NASA / JPL",
    builder: "NASA Jet Propulsion Laboratory",
    summary:
      "Planned for 90 days, it worked for nearly fifteen years, confirmed that liquid water once soaked Meridiani Planum, and drove farther than any vehicle on another world at the time.",
    hero: nasa("PIA06739", "Opportunity's own shadow cast over Endurance Crater on Sol 180", { size: "orig", credit: "NASA/JPL" }),
    keyDates: [
      { label: "Launch", date: "7 Jul 2003" },
      { label: "Landing", date: "25 Jan 2004" },
      { label: "Last contact", date: "10 Jun 2018" },
      { label: "Mission declared complete", date: "13 Feb 2019" },
    ],
    status: {
      kind: "Confirmed location",
      place: "Perseverance Valley, western rim of Endeavour Crater, Meridiani Planum",
      note: "Location at last contact is known. Its condition after the 2018 dust storm is unknown.",
    },
    chapters: [
      {
        id: "beginning",
        title: "The Beginning",
        dateLabel: "2000 – 2003",
        segments: [
          { kind: "fact", text: "Opportunity was Spirit's twin. Its landing site, Meridiani Planum, was chosen because orbiters had detected grey hematite, a mineral that often forms in water." },
        ],
      },
      {
        id: "journey",
        title: "The Journey",
        dateLabel: "7 Jul 2003 – 25 Jan 2004",
        segments: [
          { kind: "fact", text: "Opportunity launched on July 7, 2003, US Eastern time, aboard a Delta II. On January 25, 2004, it bounced to rest inside a small crater later named Eagle." },
          { kind: "creative", text: "I rolled to a stop in a hollow no wider than a few rooms, and the first thing I saw was layered rock. I had landed beside the answer." },
        ],
        milestones: [
          { date: "7 Jul 2003", text: "Launch, Delta II Heavy" },
          { date: "25 Jan 2004", text: "Landing in Eagle crater" },
          { date: "2006 – 2008", text: "Exploration of Victoria crater" },
          { date: "Aug 2011", text: "Arrival at Endeavour crater" },
          { date: "Mar 2015", text: "Passes marathon distance" },
        ],
      },
      {
        id: "discoveries",
        title: "The Discoveries",
        dateLabel: "2004 – 2018",
        segments: [
          { kind: "fact", text: "Within weeks, Opportunity found small hematite spheres — nicknamed blueberries — and sulphate-rich layered rock, strong evidence that liquid water had once saturated the area." },
          { kind: "fact", text: "At Endeavour crater it found gypsum veins and clay minerals, signs of water that was less acidic and more favourable to life." },
        ],
      },
      {
        id: "turning-point",
        title: "The Turning Point",
        dateLabel: "Jun 2018",
        segments: [
          { kind: "fact", text: "In June 2018, a dust storm spread across Mars and blocked sunlight from Opportunity's solar panels. The rover's last contact with Earth came on June 10, 2018." },
          { kind: "fact", text: "A widely shared line — \"my battery is low and it's getting dark\" — was a journalist's poetic paraphrase of the final data, not an actual transmission." },
        ],
      },
      {
        id: "ending",
        title: "The Ending",
        dateLabel: "13 Feb 2019",
        segments: [
          { kind: "fact", text: "Engineers sent more than a thousand recovery commands. After no response, NASA declared the mission complete on February 13, 2019." },
          { kind: "creative", text: "The sky went dark from horizon to horizon. I did what I was built to do: I waited for the Sun." },
        ],
      },
      {
        id: "remains",
        title: "Where It Remains",
        segments: [
          { kind: "fact", text: "Opportunity remains in Perseverance Valley on the western rim of Endeavour crater, after driving about 45 kilometres. Whether it is now covered in dust or damaged is unknown." },
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        segments: [
          { kind: "fact", text: "Opportunity's evidence for ancient water helped shape the goals of later missions, including Curiosity and Perseverance, which search for signs of past habitable environments." },
        ],
      },
    ],
    sources: [
      { label: "NASA Science — Opportunity", url: "https://science.nasa.gov/mission/mer-opportunity/" },
      { label: "NASA — Opportunity mission comes to an end (2019)", url: "https://www.jpl.nasa.gov/news/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end" },
    ],
    related: ["spirit", "surveyor-3"],
  },

  {
    slug: "lunar-orbiter-1", name: "Lunar Orbiter 1", mission: "Lunar Orbiter Program", destination: "Moon", agency: "NASA", builder: "The Boeing Company",
    summary: "A photographic scout that mapped candidate Apollo landing areas, returned an iconic view of Earth, and was deliberately sent into the lunar far side at mission end.",
    hero: nasa("as17-148-22727", "Earth photographed during Apollo 17; contextual lunar exploration image, not the Lunar Orbiter 1 spacecraft", { kind: "context" }),
    keyDates: [{label:"Launch",date:"10 Aug 1966"},{label:"Lunar orbit",date:"14 Aug 1966"},{label:"Planned impact",date:"29 Oct 1966"}],
    status:{kind:"Approximate location",place:"Lunar far side; impact site not precisely established here",note:"NASA intentionally directed the spacecraft into the far side. The supplied research guide does not provide a verified coordinate."},
    components:[{name:"Imaging system",function:"Photographed candidate landing sites and lunar terrain."},{name:"Film processing and scanning",function:"Processed onboard film and transmitted image data to Earth."},{name:"Solar panels and radio",function:"Supplied electrical power and communications."},{name:"Propulsion and attitude control",function:"Maintained orbit and spacecraft orientation."}],
    endingType:"intentional-impact", endingExplanation:"As systems deteriorated and fuel ran low, controllers deliberately sent Lunar Orbiter 1 into the lunar far side to avoid radio interference with later missions. This was planned disposal, not an accidental crash.",
    challenge:{question:"Why would mission controllers deliberately send a functioning spacecraft into the Moon?",hint:"Think about radio interference and the next spacecraft in the program.",answer:"The planned impact kept the spacecraft from interfering by radio with later Lunar Orbiter missions."},
    chapters:[{id:"purpose",title:"Why It Travelled",dateLabel:"1966",segments:[{kind:"fact",text:"Lunar Orbiter 1 photographed candidate Apollo and Surveyor landing areas and mapped the lunar surface before crewed landings."},{kind:"fact",text:"Its imaging system used film processing and scanning equipment to return photographs to Earth. It also returned an early iconic image of Earth from near the Moon."}]},{id:"ending",title:"The Ending",dateLabel:"29 Oct 1966",segments:[{kind:"fact",text:"The spacecraft's systems deteriorated and fuel was nearly exhausted. Controllers deliberately sent it into the lunar far side to avoid radio interference with later Lunar Orbiter missions."}]},{id:"legacy",title:"What Remains",segments:[{kind:"fact",text:"The spacecraft is understood to have impacted the Moon as planned. The supplied research guide does not identify a precise present-day site."},{kind:"fact",text:"Its mapping work helped assess lunar terrain for later missions, while its Earth image became an important visual milestone."}]}],
    sources:[{label:"NASA History — Lunar Orbiter 1",url:"https://www.nasa.gov/history/55-years-ago-lunar-orbiter-1-launches-to-survey-the-moon/"},{label:"NASA Science — Lunar Rangers and Surveyors",url:"https://science.nasa.gov/mission/lunar-rangers-and-surveyors/"}], related:["surveyor-3","apollo-11-eagle"]
  },
  {
    slug:"apollo-alsep",name:"EASEP & ALSEP Lunar Science Stations",mission:"Apollo 11 EASEP; Apollo 12, 14, 15, 16 & 17 ALSEP",destination:"Moon",agency:"NASA",builder:"NASA and scientific instrument teams",
    summary:"Apollo 11 left a simpler EASEP package; Apollo 12, 14, 15, 16 and 17 deployed full ALSEP stations. These unattended experiments measured the Moon after the astronauts returned home.",
    hero:nasa("as11-40-5903","Apollo lunar surface photograph used as context; it does not show the ALSEP station",{kind:"context"}),
    keyDates:[{label:"EASEP deployed",date:"21 Jul 1969"},{label:"EASEP shut down",date:"27 Aug 1969"},{label:"ALSEP shutdown",date:"30 Sep 1977"}],
    status:{kind:"Confirmed location",place:"Multiple Apollo landing sites on the Moon",note:"Apollo 11 deployed EASEP, a simpler precursor, rather than the later full ALSEP configuration. Full ALSEP arrays were deployed on Apollo 12, 14, 15, 16 and 17. Instrument sets varied by site."},
    components:[{name:"Central station",function:"Coordinated experiment operations and communications."},{name:"Seismometers",function:"Measured lunar seismic activity."},{name:"Heat-flow probes",function:"Measured thermal properties below the surface."},{name:"Magnetometers",function:"Measured local magnetic fields."},{name:"Power source and cabling",function:"Supplied power and connected distributed instruments."}],
    endingType:"decommissioned",endingExplanation:"NASA shut down ALSEP experiments remotely on 30 September 1977, largely because of funding and support constraints. The shutdown did not destroy the stations.",
    challenge:{question:"How could a science station keep working after the astronauts who installed it had gone home?",hint:"Look for the central station, power source and instruments.",answer:"ALSEP was designed as an unattended surface science network, with a central station, power source, cabling and instruments that could send measurements to Earth."},
    chapters:[{id:"purpose",title:"Science Without Astronauts",dateLabel:"1969–1977",segments:[{kind:"fact",text:"ALSEP measured the lunar environment after crews returned to Earth, including moonquakes, heat flow, magnetic fields and other geophysical properties."},{kind:"fact",text:"The instrument package varied by landing site and could include seismometers, heat-flow probes, magnetometers and active seismic equipment."}]},{id:"ending",title:"A Remote Shutdown",dateLabel:"30 Sep 1977",segments:[{kind:"fact",text:"Apollo 11 EASEP was shut down on 27 August 1969. NASA terminated ALSEP operations on 30 September 1977. This was a remote shutdown, not destruction."}]},{id:"legacy",title:"The Data Outlived the Mission",segments:[{kind:"fact",text:"ALSEP returned a large body of lunar geophysical data, including evidence that the Moon has seismic activity and a complex interior."}]}],
    sources:[{label:"NASA — Apollo Lunar Surface Experiments Package",url:"https://science.nasa.gov/moon/"},{label:"NASA — Apollo mission archive",url:"https://www.nasa.gov/the-apollo-program/"}],related:["apollo-11-eagle","lunar-retroreflectors"]
  },
  {
    slug:"lunar-retroreflectors",name:"Lunar Laser Retroreflectors",mission:"Apollo 11, 14 and 15; Lunokhod missions",destination:"Moon",agency:"NASA / international lunar missions",builder:"Multiple mission teams",
    summary:"Small arrays of corner-cube mirrors that need no battery or radio. Observatories on Earth still use lunar reflectors for precision laser-ranging science.",
    hero:nasa("as11-40-5903","Apollo 11 lunar surface; reflector deployment context",{kind:"photograph"}),
    keyDates:[{label:"First Apollo array",date:"21 Jul 1969"},{label:"Additional Apollo arrays",date:"1971–1972"},{label:"Science role",date:"Continuing lunar laser ranging"}],
    status:{kind:"Confirmed location",place:"Apollo landing sites and Lunokhod locations on the Moon",note:"The arrays are fixed passive hardware. The PDF notes that ranging continues, although success depends on equipment, conditions and target."},
    components:[{name:"Corner-cube reflectors",function:"Return incoming laser light toward its source."},{name:"Mounting structure",function:"Holds the reflector array in position."}],
    endingType:"still-scientifically-useful",endingExplanation:"These reflectors were not simply failed or useless relics. They are passive instruments and do not require a battery or radio transmitter; lunar laser ranging has continued for decades.",
    challenge:{question:"How can a machine continue helping science without power or a radio?",hint:"Consider what happens when a laser pulse reaches a carefully shaped mirror.",answer:"Corner-cube retroreflectors return laser light toward the source. By timing the round trip, observatories measure the Earth–Moon distance."},
    chapters:[{id:"purpose",title:"A Passive Experiment",dateLabel:"1969 onward",segments:[{kind:"fact",text:"The arrays allow observatories on Earth to send laser pulses to the Moon and measure the round-trip travel time, refining Earth–Moon distance measurements and testing gravitational physics."},{kind:"fact",text:"The reflector itself is passive: it needs no battery and no radio transmitter."}]},{id:"ending",title:"Not Abandoned in the Usual Sense",segments:[{kind:"fact",text:"The hardware remains at its deployment locations and can still contribute to science. Measurement success depends on equipment, conditions and target."}]},{id:"legacy",title:"Old Hardware, Continuing Science",segments:[{kind:"fact",text:"The reflectors are a powerful example of long-lived scientific usefulness: a device with no power source can keep contributing to precision measurements."}]}],
    sources:[{label:"NASA — Apollo 11 mission",url:"https://science.nasa.gov/mission/apollo-11/"},{label:"NASA — Moon science",url:"https://science.nasa.gov/moon/"}],related:["apollo-11-eagle","apollo-alsep"]
  },
  {
    slug:"lcross-centaur",name:"LCROSS & Centaur Impactor",mission:"Lunar Crater Observation and Sensing Satellite",destination:"Moon",agency:"NASA",builder:"NASA Ames / Northrop Grumman teams",
    summary:"A spent rocket stage and its shepherding spacecraft deliberately struck a permanently shadowed crater to test for water ice near the lunar south pole.",
    hero:nasa("as11-40-5903","Apollo lunar surface photograph used as Moon context; it does not show the LCROSS impact",{kind:"context"}),
    keyDates:[{label:"Launch",date:"18 Jun 2009"},{label:"Centaur impact",date:"9 Oct 2009"},{label:"Shepherding craft impact",date:"About six minutes later"}],
    status:{kind:"Approximate location",place:"Cabeus crater, near the lunar south pole",note:"Both impacts were deliberate. The guide identifies Cabeus crater but does not give precise coordinates for the impact points."},
    components:[{name:"Centaur upper stage",function:"Served as the first impactor, excavating material from the crater."},{name:"Shepherding spacecraft",function:"Carried cameras and spectrometers to observe and measure the ejecta plume."}],
    endingType:"intentional-impact",endingExplanation:"The Centaur stage intentionally struck Cabeus crater. The Shepherding Spacecraft flew through the plume, collected data, relayed it to Earth, then intentionally impacted the Moon. Both impacts were the experiment—not accidents.",
    challenge:{question:"Why did LCROSS use two impacts instead of simply photographing the crater from orbit?",hint:"What could a plume of excavated material reveal?",answer:"The first impact threw subsurface material into sunlight where the shepherding spacecraft could observe and measure the plume for evidence of water and other compounds."},
    chapters:[{id:"purpose",title:"Looking Into Permanent Shadow",dateLabel:"2009",segments:[{kind:"fact",text:"LCROSS tested whether a permanently shadowed crater near the lunar south pole contained water ice."},{kind:"fact",text:"A spent Centaur upper stage was used as the first impactor. The shepherding spacecraft carried cameras and spectrometers to observe the resulting ejecta plume."}]},{id:"ending",title:"The Impact Was the Experiment",dateLabel:"9 Oct 2009",segments:[{kind:"fact",text:"The Centaur stage intentionally struck Cabeus crater. About six minutes later, the Shepherding Spacecraft flew through the plume, collected and relayed data, then intentionally impacted the Moon."}]},{id:"legacy",title:"What the Plume Revealed",segments:[{kind:"fact",text:"The mission found evidence of water and other compounds in ejecta from a permanently shadowed region."}]}],
    sources:[{label:"NASA — LCROSS mission",url:"https://science.nasa.gov/mission/lcross/"},{label:"NASA — LCROSS impact coverage",url:"https://www.nasa.gov/"}],related:["lunar-orbiter-1","lunar-retroreflectors"]
  },
  {
    slug:"ranger-7-8-9",name:"Ranger 7, 8 & 9",mission:"Ranger Program",destination:"Moon",agency:"NASA / JPL",builder:"Jet Propulsion Laboratory",
    summary:"Three imaging probes returned thousands of close-up lunar photographs before deliberately impacting the surface, helping engineers understand landing hazards.",
    hero:{src:"https://assets.science.nasa.gov/content/dam/science/psd/lunar-science/2023/09/ranger7_moon_0.jpg",alt:"First close-up lunar surface image returned by Ranger 7 on 31 July 1964",credit:"NASA/JPL",sourceUrl:"https://science.nasa.gov/resource/ranger-7-moon-close-up/",kind:"photograph"},
    keyDates:[{label:"Ranger 7 launch",date:"28 Jul 1964"},{label:"Ranger 8 launch",date:"17 Feb 1965"},{label:"Ranger 9 launch",date:"21 Mar 1965"}],
    status:{kind:"Approximate location",place:"Impact sites on the lunar surface",note:"The probes successfully impacted as planned. This guide does not supply exact impact coordinates."},
    components:[{name:"Television cameras",function:"Returned progressively closer images of the lunar surface."},{name:"Imaging electronics",function:"Processed camera signals for transmission."},{name:"Communications and telemetry",function:"Sent images and spacecraft data to Earth."},{name:"Guidance and attitude control",function:"Kept the probe oriented during its approach."}],
    endingType:"intentional-impact",endingExplanation:"Ranger 7, 8 and 9 returned images and then impacted the Moon as planned. Other Ranger missions had different outcomes; do not generalize their endings to these three successful probes.",
    challenge:{question:"Why were the Ranger probes designed to keep transmitting images until impact?",hint:"Think about what engineers needed to know before landing people on the Moon.",answer:"Close-up photographs helped scientists assess lunar terrain and landing hazards before crewed missions."},
    chapters:[{id:"purpose",title:"A Camera on a Collision Course",dateLabel:"1964–1965",segments:[{kind:"fact",text:"Ranger probes transmitted progressively closer images of the lunar surface before intentionally impacting the Moon, helping scientists assess terrain and landing hazards."},{kind:"fact",text:"Ranger 7 returned more than 4,300 images; Ranger 8 more than 7,000; Ranger 9 nearly 5,800."}]},{id:"ending",title:"A Planned Final Descent",segments:[{kind:"fact",text:"Ranger 7, 8 and 9 successfully returned thousands of images and then impacted the Moon as planned. Other Rangers failed in different ways, so each mission's outcome must be kept distinct."}]},{id:"legacy",title:"The Close-up View",segments:[{kind:"fact",text:"The program helped establish close-up lunar imaging as a reliable exploration method and supported later landing-site assessment."}]}],
    sources:[{label:"NASA Science — Lunar Rangers and Surveyors",url:"https://science.nasa.gov/mission/lunar-rangers-and-surveyors/"},{label:"NASA History — Ranger program",url:"https://www.nasa.gov/history/"}],related:["lunar-orbiter-1","surveyor-3"]
  },
  {
    slug:"sojourner-pathfinder",name:"Sojourner & Mars Pathfinder",mission:"Mars Pathfinder",destination:"Mars",agency:"NASA / JPL",builder:"NASA Jet Propulsion Laboratory",
    summary:"Pathfinder demonstrated a lower-cost Mars landing system and carried Sojourner, the first successful Mars rover. Loss of the lander relay ended rover operations; it does not prove the rover was destroyed.",
    hero:nasa("PIA04413","Artist concept of a Mars Exploration Rover used as context; it is not a photograph of Sojourner",{kind:"context",credit:"NASA/JPL"}),
    keyDates:[{label:"Launch",date:"4 Dec 1996"},{label:"Mars landing",date:"4 Jul 1997"},{label:"Mission ended",date:"Sep 1997"}],
    status:{kind:"Approximate location",place:"Ares Vallis, Mars",note:"The lander and rover operated at the Pathfinder landing site. The supplied guide does not provide coordinates or a later condition assessment."},
    components:[{name:"Pathfinder lander",function:"Provided cameras and a communications relay for the rover."},{name:"Sojourner six-wheel chassis",function:"Enabled short-range mobile exploration."},{name:"Rocker-bogie suspension",function:"Helped the rover traverse uneven terrain."},{name:"APXS instrument",function:"Analyzed the elemental composition of rocks and soil."},{name:"UHF link",function:"Connected the rover to its lander relay."}],
    endingType:"communication-loss",endingExplanation:"Pathfinder's lander stopped communicating after a power-system failure. Because the lander served as Sojourner's communications relay, loss of the lander ended rover operations. This is not evidence that Sojourner was physically destroyed.",
    challenge:{question:"Why did losing the lander also end Sojourner's mission?",hint:"Find the communications relationship between rover and lander.",answer:"Sojourner relied on the Pathfinder lander as its communications relay. Once the lander stopped communicating, rover operations could no longer continue."},
    chapters:[{id:"purpose",title:"A New Way to Explore Mars",dateLabel:"1996–1997",segments:[{kind:"fact",text:"Pathfinder demonstrated a lower-cost Mars landing system and mobile robotic exploration. It analyzed rocks and soil and studied weather."},{kind:"fact",text:"Sojourner used six wheels, rocker-bogie suspension, cameras, an Alpha Proton X-ray Spectrometer, solar power, batteries and a UHF link to the lander."}]},{id:"ending",title:"The Relay Went Silent",dateLabel:"Sep 1997",segments:[{kind:"fact",text:"Pathfinder's lander stopped communicating after a power-system failure. Because the lander relayed communications for Sojourner, the rover's operations ended too."},{kind:"fact",text:"The loss of contact is not evidence that Sojourner was physically destroyed."}]},{id:"legacy",title:"Small Rover, Large Influence",segments:[{kind:"fact",text:"Pathfinder proved the value of small mobile rovers and helped shape later Mars rover designs."}]}],
    sources:[{label:"NASA — Mars Pathfinder",url:"https://science.nasa.gov/mission/mars-pathfinder/"},{label:"NASA JPL — Mars Pathfinder",url:"https://www.jpl.nasa.gov/missions/mars-pathfinder"}],related:["spirit","opportunity"]
  },
  {
    slug:"viking-landers",name:"Viking 1 & 2 Landers",mission:"Viking Program",destination:"Mars",agency:"NASA",builder:"NASA Langley / Martin Marietta teams",
    summary:"The first successful long-duration Mars surface laboratories returned panoramic images, measured soil and atmosphere, and ran pioneering experiments searching for signs of life.",
    hero:{src:"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia00/pia00381/PIA00381.jpg?crop=faces%2Cfocalpoint&fit=clip&h=900&w=1600",alt:"First photograph taken on Mars by Viking 1, showing the lander footpad and surface",credit:"NASA/JPL",sourceUrl:"https://science.nasa.gov/photojournal/first-photograph-taken-on-mars-surface/",kind:"photograph"},
    keyDates:[{label:"Viking 1 launch",date:"20 Aug 1975"},{label:"Viking 1 landing",date:"20 Jul 1976"},{label:"Viking 2 landing",date:"3 Sep 1976"},{label:"Lander operations ended",date:"1980 / 1982"}],
    status:{kind:"Confirmed location",place:"Chryse Planitia (Viking 1) and Utopia Planitia (Viking 2), Mars",note:"The landers remain at their landing sites. Their orbiters had separate lifetimes and must not be confused with the landers."},
    components:[{name:"Imaging cameras",function:"Captured surface panoramas."},{name:"Soil-sampling arm",function:"Collected material for onboard experiments."},{name:"Biology and chemical-analysis experiments",function:"Tested Martian soil for chemical and biological signals."},{name:"Meteorology sensors",function:"Measured local weather conditions."},{name:"Radio and thermal systems",function:"Supported communications and survival in the Martian environment."}],
    endingType:"decommissioned",endingExplanation:"Viking 2 lander communications ended in 1980; Viking 1 lander operated until 1982. Their landers remain on Mars. The orbiters had separate mission lifetimes.",
    challenge:{question:"Why must the landers and orbiters be treated as separate artifacts?",hint:"They operated in different places and had different lifetimes.",answer:"The landers operated on the surface while orbiters circled Mars. Their mission endings and physical locations were different."},
    chapters:[{id:"purpose",title:"Searching the Martian Soil",dateLabel:"1975–1976",segments:[{kind:"fact",text:"Viking was designed to image the surface, measure atmospheric and soil properties, and conduct biology experiments searching for evidence of life."},{kind:"fact",text:"Each lander carried cameras, a soil-sampling arm, biology and chemical-analysis experiments, meteorology sensors, communications, power and thermal systems."}]},{id:"ending",title:"Two Long Surface Missions",dateLabel:"1980–1982",segments:[{kind:"fact",text:"Viking 2 lander communications ended in 1980; Viking 1 lander operated until 1982. The landers remain on Mars. The orbiters had separate lifetimes."}]},{id:"legacy",title:"A First Long Look",segments:[{kind:"fact",text:"Viking returned the first long-duration surface images from Mars and conducted pioneering experiments on Martian soil. The biology results remain scientifically debated and did not provide clear confirmation of life."}]}],
    sources:[{label:"NASA — Viking missions",url:"https://science.nasa.gov/mission/viking/"},{label:"NASA — Viking program",url:"https://www.nasa.gov/"}],related:["phoenix","insight"]
  },
  {
    slug:"phoenix",name:"Phoenix Mars Lander",mission:"Phoenix",destination:"Mars",agency:"NASA",builder:"University of Arizona / NASA JPL and partners",
    summary:"A polar lander that dug into Martian arctic soil, confirmed water ice and studied chemistry relevant to habitability before seasonal darkness and cold ended contact.",
    hero:nasa("PIA11046","Phoenix Mars lander on the Martian arctic plain",{credit:"NASA/JPL-Caltech/University of Arizona"}),
    keyDates:[{label:"Launch",date:"4 Aug 2007"},{label:"Landing",date:"25 May 2008"},{label:"Last communication",date:"2 Nov 2008"}],
    status:{kind:"Confirmed location",place:"Green Valley, Vastitas Borealis, Mars",note:"The lander remains at its polar landing site; the mission was not designed to survive the Martian winter."},
    components:[{name:"Robotic arm and scoop",function:"Dug and delivered soil and ice samples."},{name:"Cameras and microscopy",function:"Imaged the surface and sample material."},{name:"Thermal and evolved-gas analyzer",function:"Heated samples and analyzed released gases."},{name:"Meteorology sensors",function:"Tracked local atmospheric conditions."},{name:"Solar arrays",function:"Generated power during the available daylight season."}],
    endingType:"power-loss",endingExplanation:"The lander stopped communicating as northern Martian winter approached. Reduced sunlight, accumulating frost or ice and severe cold made continued operation unlikely. It was not designed to survive the winter.",
    challenge:{question:"Why was Phoenix's polar location both scientifically valuable and operationally risky?",hint:"Consider subsurface ice and seasonal sunlight.",answer:"The polar soil offered access to water ice, but winter brought reduced sunlight, frost and severe cold that threatened power and hardware survival."},
    chapters:[{id:"purpose",title:"Digging for Ice",dateLabel:"2007–2008",segments:[{kind:"fact",text:"Phoenix dug into Martian arctic soil to study subsurface water ice and analyze the chemistry of an environment relevant to habitability."},{kind:"fact",text:"Its robotic arm and scoop, cameras, thermal and evolved-gas analysis instruments, microscopy, meteorology sensors and solar arrays supported the investigation."}]},{id:"ending",title:"The Polar Night",dateLabel:"2 Nov 2008",segments:[{kind:"fact",text:"Phoenix stopped communicating as the northern Martian winter approached. Reduced sunlight, accumulating frost or ice and severe cold made continued operation unlikely. The mission was not designed to survive winter."}]},{id:"legacy",title:"Ice and Chemistry",segments:[{kind:"fact",text:"Phoenix confirmed water ice and detected perchlorate in the soil, informing later questions about Mars' habitability."}]}],
    sources:[{label:"NASA — Phoenix Mars Lander",url:"https://science.nasa.gov/mission/phoenix/"},{label:"NASA JPL — Phoenix",url:"https://www.jpl.nasa.gov/missions/phoenix"}],related:["viking-landers","insight"]
  },
  {
    slug:"insight",name:"InSight Lander",mission:"Interior Exploration using Seismic Investigations, Geodesy and Heat Transport",destination:"Mars",agency:"NASA",builder:"NASA JPL and international partners",
    summary:"A stationary geophysical laboratory that listened for marsquakes and helped reveal the planet's crust, mantle and core. Dust-covered solar panels eventually reduced its power.",
    hero:{src:"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia22/pia22829/PIA22829.jpg?crop=faces%2Cfocalpoint&fit=clip&h=900&w=1600",alt:"First image taken by NASA InSight from the surface of Mars",credit:"NASA/JPL-Caltech",sourceUrl:"https://science.nasa.gov/mission/insight/",kind:"photograph"},
    keyDates:[{label:"Launch",date:"5 May 2018"},{label:"Landing",date:"26 Nov 2018"},{label:"Mission ended",date:"Dec 2022"}],
    status:{kind:"Confirmed location",place:"Elysium Planitia, Mars",note:"InSight is a stationary lander at its landing site. The mission was declared ended in December 2022."},
    components:[{name:"SEIS seismometer",function:"Detected marsquakes and measured ground motion."},{name:"HP3 heat-flow probe",function:"Attempted to measure heat flow below the surface; it did not reach its planned depth."},{name:"Robotic arm and cameras",function:"Placed instruments and documented the work area."},{name:"Solar arrays",function:"Generated electrical power."},{name:"Weather sensors and radio",function:"Recorded local conditions and communicated science data."}],
    endingType:"power-loss",endingExplanation:"Dust accumulated on the solar panels, reducing power. After repeated missed communications, NASA ended the mission in December 2022. HP3 did not reach its planned depth; distinguish that limited result from the seismometer's major success.",
    challenge:{question:"Did every InSight instrument succeed equally?",hint:"Compare the seismometer result with the heat-flow probe result.",answer:"No. SEIS detected 1,319 marsquakes and produced major results, while HP3 did not reach its planned depth."},
    chapters:[{id:"purpose",title:"Listening to a Planet",dateLabel:"2018–2022",segments:[{kind:"fact",text:"InSight studied Mars' interior by measuring marsquakes, heat flow and planetary wobble."},{kind:"fact",text:"Its main instruments included the SEIS seismometer and HP3 heat-flow probe, supported by a robotic arm, cameras, solar arrays, radio, telemetry and weather sensors."}]},{id:"ending",title:"Power Faded",dateLabel:"Dec 2022",segments:[{kind:"fact",text:"Dust accumulated on InSight's solar panels, reducing power. After repeated missed communications, NASA ended the mission in December 2022."},{kind:"fact",text:"The HP3 heat-flow probe did not reach its planned depth, so its limited result must be distinguished from the seismometer's major success."}]},{id:"legacy",title:"Listening Beneath the Surface",segments:[{kind:"fact",text:"InSight detected 1,319 marsquakes and helped constrain the structure of Mars' crust, mantle and core."}]}],
    sources:[{label:"NASA Science — InSight",url:"https://science.nasa.gov/mission/insight/"},{label:"NASA JPL — InSight",url:"https://www.jpl.nasa.gov/missions/insight"}],related:["phoenix","viking-landers"]
  },
  {
    slug:"perseverance-landing-hardware",name:"Perseverance Landing Hardware",mission:"Mars 2020 / Perseverance",destination:"Mars",agency:"NASA / JPL",builder:"NASA Jet Propulsion Laboratory and contractors",
    summary:"Heat shield, parachute, backshell and descent-stage hardware were intentionally released during Perseverance's landing. Their presence on Mars is evidence of a successful delivery sequence, not rover failure.",
    hero:nasa("PIA24341","Perseverance rover on Mars; contextual image, not the discarded landing hardware",{kind:"context",credit:"NASA/JPL-Caltech"}),
    keyDates:[{label:"Perseverance landing",date:"18 Feb 2021"},{label:"Ingenuity image of parachute / backshell",date:"19 Apr 2022 · Sol 414"}],
    status:{kind:"Approximate location",place:"Scattered around the Perseverance landing region, Jezero Crater, Mars",note:"The components came down at separate locations. Aerial and orbital imagery help identify some debris; do not imply a single landing-hardware site."},
    components:[{name:"Heat shield",function:"Protected the rover from intense heating during atmospheric entry."},{name:"Backshell",function:"Enclosed and protected the landing system during descent."},{name:"Supersonic parachute",function:"Slowed the spacecraft in the Martian atmosphere."},{name:"Powered descent stage",function:"Used rocket engines to lower the rover toward the surface."},{name:"Sky-crane bridle and cutters",function:"Lowered the rover on cables before cutting it free."}],
    endingType:"discarded-by-design",endingExplanation:"The components were jettisoned in sequence as designed. The descent stage flew away and crashed at a safe distance; parachute and backshell came down elsewhere. They are not evidence that Perseverance itself failed.",
    challenge:{question:"Why would a successful rover landing leave so much hardware behind?",hint:"Think of each component as a temporary stage with one job.",answer:"Each component performed a specific entry, descent or landing task and was released when no longer needed. Discarding them in sequence was part of the planned landing design."},
    chapters:[{id:"purpose",title:"A Landing System Built to Let Go",dateLabel:"18 Feb 2021",segments:[{kind:"fact",text:"The entry, descent and landing system slowed and protected Perseverance through the Martian atmosphere and delivered it safely to the surface."},{kind:"fact",text:"Its components included a heat shield, backshell, supersonic parachute, powered descent stage, sky-crane bridle and cutters, and MEDLI2 entry sensors."}]},{id:"ending",title:"Discarded by Design",dateLabel:"18 Feb 2021",segments:[{kind:"fact",text:"The components were jettisoned in sequence as designed. The descent stage flew away from the rover and crashed at a safe distance; the parachute and backshell came down elsewhere."},{kind:"fact",text:"These objects are not evidence that Perseverance itself failed. They are the remains of a successful landing sequence."}]},{id:"legacy",title:"Engineering Traces",segments:[{kind:"fact",text:"Orbital and aerial images let students match engineering stages to debris locations and understand how a spacecraft can deliberately leave hardware behind to complete its mission."}]}],
    sources:[{label:"NASA — Perseverance mission",url:"https://science.nasa.gov/mission/mars-2020-perseverance/"},{label:"NASA — Mars 2020 landing",url:"https://mars.nasa.gov/mars2020/"}],related:["spirit","opportunity"]
  },

];

// Additional mission records added for the expanded 1964–2026 research archive.
// Technical values are stated at the level supported by the linked NASA mission sources.
artifacts.push(
  {
    slug: "curiosity-rover", name: "Curiosity Rover", mission: "Mars Science Laboratory", destination: "Mars", agency: "NASA / JPL", builder: "NASA Jet Propulsion Laboratory",
    summary: "A nuclear-powered mobile laboratory that landed with a rocket-powered sky crane and has spent years reading the layered rock record of Gale Crater for evidence of ancient habitability.",
    hero: nasa("PIA16064", "NASA Curiosity rover on Mars, Gale Crater", { credit: "NASA/JPL-Caltech" }),
    keyDates: [{label:"Launch",date:"26 Nov 2011"},{label:"Landing",date:"6 Aug 2012"},{label:"Mission status",date:"Continuing mission"}],
    status:{kind:"Confirmed location",place:"Gale Crater, Mars",note:"The rover's location and route are tracked through mission operations and orbital imagery. It remains an active mission in the latest NASA mission record consulted."},
    specs:{mass:"899 kg at launch on Earth (rover mass); 337 kg equivalent weight on Mars",dimensions:"About 3.0 m long × 2.7 m wide × 2.2 m high (excluding arm details)",power:"Multi-Mission Radioisotope Thermoelectric Generator (MMRTG)",propulsion:"Six-wheel rocker-bogie mobility; rocket-powered sky-crane landing system",designLife:"One Martian year (about 687 Earth days) planned primary surface mission",instruments:"10 science instruments; 17 cameras; drill, laser spectrometer, environmental sensors and onboard analytical laboratory",structure:"Aluminium-alloy structural chassis, six wheels, mast, robotic arm, RTG power unit and thermal-control systems",notes:"Size and mass refer to rover configuration; landing hardware was separate and discarded during descent."},
    objective:"Determine whether ancient Mars had environmental conditions capable of supporting microbial life.",
    missionOverview:"Curiosity landed in Gale Crater using a parachute and the first sky-crane landing system used for a rover of this size. Its cameras, drill, laser and onboard laboratories study rocks, soil and atmosphere.",
    chapters:[
      {id:"beginning",title:"A Laboratory on Wheels",dateLabel:"2004–2011",segments:[{kind:"fact",text:"Curiosity was built to answer a question earlier missions could only approach: did ancient Mars ever have environments with the ingredients and conditions needed for microbial life? Its science laboratory was designed to analyse powdered rock and soil on the planet itself."},{kind:"fact",text:"At launch it was the largest and most capable rover sent to Mars. Its nuclear power source allowed work beyond the limits of sunlight-dependent rovers."}]},
      {id:"journey",title:"Seven Minutes of Terror",dateLabel:"26 Nov 2011 – 6 Aug 2012",segments:[{kind:"fact",text:"After a roughly eight-month cruise, Curiosity entered the Martian atmosphere at high speed. A heat shield, supersonic parachute and rocket-powered descent stage slowed it before a sky crane lowered the rover on cables."},{kind:"creative",text:"I did not roll out of a capsule. I was lowered through the sky, hanging beneath rockets, toward a world I had travelled eight months to meet."}],milestones:[{date:"26 Nov 2011",text:"Launch aboard Atlas V"},{date:"6 Aug 2012",text:"Touchdown in Gale Crater"},{date:"2013",text:"Evidence of an ancient habitable lake environment"}]},
      {id:"discoveries",title:"Reading the Rocks",dateLabel:"2012 onward",segments:[{kind:"fact",text:"Curiosity found evidence that an ancient freshwater lake in Gale Crater could have supported microbial life. Its later work has traced changing environments through layered rocks on Mount Sharp."},{kind:"fact",text:"The rover uses a drill, the ChemCam laser, cameras and onboard analytical instruments to investigate minerals, organic molecules and the chemistry of its surroundings."}]},
      {id:"ending",title:"Still at Work",dateLabel:"Latest mission record",segments:[{kind:"fact",text:"Curiosity has not been abandoned. NASA lists the rover as an active mission. Its continued operation is a reminder that an artifact left on another world can remain a working scientific instrument rather than a relic."}]},
      {id:"legacy",title:"A Longer Question",segments:[{kind:"fact",text:"Curiosity transformed Mars exploration from looking for signs of water to examining whether ancient environments were genuinely habitable. Its findings guide the questions asked by later missions."}]}
    ],
    components:[{name:"MMRTG power unit",function:"Converts heat from radioactive decay into electricity and heat for the rover."},{name:"Rocker-bogie suspension",function:"Lets six wheels cross uneven terrain while keeping the body comparatively stable."},{name:"Robotic arm and drill",function:"Brushes, abrades and collects powdered samples from selected rocks."},{name:"Mast cameras and ChemCam",function:"Image distant terrain and analyse rock chemistry from a distance."},{name:"SAM and CheMin laboratories",function:"Analyse samples for chemical, mineralogical and organic clues."}],
    endingType:"still-scientifically-useful",endingExplanation:"Curiosity remains an active NASA mission in the latest mission information consulted. It is not classified as abandoned or lost.",
    sources:[{label:"NASA Science — Curiosity mission and key facts",url:"https://science.nasa.gov/mission/msl-curiosity/"},{label:"NASA Science — Curiosity science instruments",url:"https://science.nasa.gov/mission/msl-curiosity/science-instruments/"}],related:["spirit","opportunity","perseverance-rover"]
  },
  {
    slug:"perseverance-rover",name:"Perseverance Rover",mission:"Mars 2020",destination:"Mars",agency:"NASA / JPL",builder:"NASA Jet Propulsion Laboratory",
    summary:"A robotic astrobiologist exploring an ancient river delta, collecting carefully selected rock cores and preparing samples that may one day be returned to Earth.",
    hero:{src:"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia24/pia24268/PIA24268.jpg?crop=faces%2Cfocalpoint&fit=clip&h=900&w=1600",alt:"One of Perseverance rover’s first images from the surface of Mars",credit:"NASA/JPL-Caltech",sourceUrl:"https://science.nasa.gov/resource/perseverance-rovers-first-image-from-mars/",kind:"photograph"},
    keyDates:[{label:"Launch",date:"30 Jul 2020"},{label:"Landing",date:"18 Feb 2021"},{label:"Mission status",date:"Continuing mission"}],
    status:{kind:"Confirmed location",place:"Jezero Crater, Mars",note:"The rover's route and location are monitored by the Mars 2020 mission. It remains active in the latest NASA mission information consulted."},
    specs:{mass:"About 1,025 kg at launch; rover landed mass about 1,025 kg",dimensions:"About 3.0 m long × 2.7 m wide × 2.2 m high",power:"MMRTG nuclear power system",propulsion:"Six-wheel rocker-bogie mobility; sky-crane powered descent",designLife:"At least one Martian year planned primary mission",instruments:"Seven major science/technology instruments, 23 cameras, sample coring and caching system, MOXIE technology demonstration",structure:"Six-wheel aluminium chassis, mast, robotic arm, sample handling assembly, radioisotope power and thermal systems",notes:"Mission includes sample tubes and separate landing debris; do not count every tube or landing component as an independent spacecraft."},
    objective:"Search for signs of ancient microbial life, characterize geology and climate, and collect/cache scientifically selected samples for possible future return.",
    missionOverview:"Perseverance landed in Jezero Crater, an ancient lake-and-delta environment. It studies rocks and collects sealed cores while testing technologies for future human and robotic exploration.",
    chapters:[{id:"beginning",title:"A Mission Built Around a Question",dateLabel:"2013–2020",segments:[{kind:"fact",text:"Perseverance was designed to investigate an ancient environment where water once flowed and sediments accumulated. Its job is not to declare that life existed, but to search for preserved signs and collect samples that can be studied with laboratories on Earth."}]},{id:"journey",title:"The Landing Sequence",dateLabel:"30 Jul 2020 – 18 Feb 2021",segments:[{kind:"fact",text:"The rover travelled inside an aeroshell, survived atmospheric entry behind a heat shield, deployed a supersonic parachute, then descended under rocket power. A sky crane lowered it to the surface before the descent stage flew away."},{kind:"creative",text:"I arrived carrying sealed containers for a future that might not yet exist: a day when another mission could come back for the stones I chose."}],milestones:[{date:"30 Jul 2020",text:"Launch aboard Atlas V"},{date:"18 Feb 2021",text:"Landing in Jezero Crater"},{date:"2021",text:"First sample collection and MOXIE demonstrations"}]},{id:"discoveries",title:"A Delta Preserved in Stone",dateLabel:"2021 onward",segments:[{kind:"fact",text:"Perseverance explores an ancient river delta and crater floor. Its instruments examine mineralogy, chemistry, weather and subsurface structure, while its sample system stores selected rock and regolith cores."},{kind:"fact",text:"The rover also carried Ingenuity, the first aircraft to attempt powered flight on another planet, and MOXIE, which demonstrated oxygen production from Martian carbon dioxide."}]},{id:"ending",title:"The Story Is Still Being Written",dateLabel:"Latest mission record",segments:[{kind:"fact",text:"Perseverance remains an active mission in the latest NASA information consulted. Its samples and route are an ongoing scientific record, not abandoned equipment."}]},{id:"legacy",title:"A Cache for the Future",segments:[{kind:"fact",text:"Perseverance is helping develop the methods, instruments and operational experience needed for future sample-return and human-exploration missions."}]}],
    components:[{name:"Sample coring drill",function:"Cuts rock cores for sealed sample tubes."},{name:"Sample handling system",function:"Moves, documents and stores samples inside the rover."},{name:"Mastcam-Z",function:"Captures zoomable stereo panoramas and helps characterize targets."},{name:"SuperCam and SHERLOC",function:"Analyse chemistry, minerals and organic compounds in rocks."},{name:"MOXIE",function:"Demonstrated producing oxygen from the carbon-dioxide-rich Martian atmosphere."},{name:"RIMFAX",function:"Uses ground-penetrating radar to examine shallow subsurface layers."}],
    endingType:"still-scientifically-useful",endingExplanation:"Perseverance remains operational in the latest NASA mission information consulted. Its landing hardware was discarded by design; that does not mean the rover mission failed.",
    sources:[{label:"NASA Science — Perseverance mission",url:"https://science.nasa.gov/mission/mars-2020-perseverance/"},{label:"NASA Science — Perseverance instruments",url:"https://science.nasa.gov/mission/mars-2020-perseverance/science-instruments/"}],related:["curiosity-rover","ingenuity-helicopter","perseverance-landing-hardware"]
  },
  {
    slug:"ingenuity-helicopter",name:"Ingenuity Mars Helicopter",mission:"Mars 2020 technology demonstration",destination:"Mars",agency:"NASA / JPL",builder:"NASA Jet Propulsion Laboratory",
    summary:"A 1.8-kilogram helicopter built for five test flights that completed 72, proving powered, controlled flight was possible in the thin atmosphere of another planet.",
    hero:{src:"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia24/pia24642/PIA24642.jpg?crop=faces%2Cfocalpoint&fit=clip&h=900&w=1600",alt:"Ingenuity Mars Helicopter seen by Perseverance during its fourth flight",credit:"NASA/JPL-Caltech",sourceUrl:"https://images.nasa.gov/details/PIA24642",kind:"photograph"},
    keyDates:[{label:"Launch",date:"30 Jul 2020"},{label:"Mars arrival",date:"18 Feb 2021"},{label:"First flight",date:"19 Apr 2021"},{label:"Final flight",date:"18 Jan 2024"}],
    status:{kind:"Confirmed location",place:"Jezero Crater, Mars",note:"Ingenuity remains on the Martian surface. NASA confirmed rotor blade damage after Flight 72 and ended flight operations."},
    specs:{mass:"About 1.8 kg",dimensions:"Fuselage about 13.6 × 19.5 × 16.3 cm; rotor diameter about 1.2 m",power:"Solar-powered; rechargeable lithium-ion batteries",propulsion:"Two counter-rotating coaxial rotor systems; four carbon-fibre blades",designLife:"Five flights planned; 72 flights completed",instruments:"Navigation camera, colour camera, inertial measurement unit, laser rangefinder and flight-control sensors",structure:"Lightweight carbon-fibre rotor blades, composite fuselage, landing legs and solar panel",notes:"Flight 72 ended after a hard landing; post-flight imagery showed damage to rotor blade tips. Do not describe it as destroyed in a crash without qualification."},
    objective:"Demonstrate that powered, controlled flight could be achieved in the extremely thin Martian atmosphere and scout terrain for Perseverance.",
    missionOverview:"Ingenuity travelled to Mars attached beneath Perseverance. After deployment on the surface, it completed five planned technology flights and continued as an extended aerial scout until rotor damage ended flight operations.",
    chapters:[{id:"beginning",title:"A Rotorcraft for Another World",dateLabel:"2014–2020",segments:[{kind:"fact",text:"Mars has an atmosphere less than one percent as dense as Earth's at the surface. A helicopter there must spin its blades much faster and be extremely light. Ingenuity was created as a technology demonstration, not as the primary science mission."}]},{id:"journey",title:"The First Flight",dateLabel:"19 Apr 2021",segments:[{kind:"fact",text:"After travelling attached to Perseverance, Ingenuity was deployed onto the ground and completed its first powered, controlled flight on another planet on 19 April 2021."},{kind:"creative",text:"The ground fell away beneath me. For a few seconds, the sky was no longer something above the rover. It was a place I could enter."}]},{id:"discoveries",title:"Five Flights Became Seventy-Two",dateLabel:"2021–2024",segments:[{kind:"fact",text:"Ingenuity far exceeded its original five-flight plan, completing 72 flights and helping demonstrate how aerial scouting could support future planetary exploration."}]},{id:"ending",title:"The Last Landing",dateLabel:"18 Jan 2024",segments:[{kind:"fact",text:"During Flight 72, Ingenuity's navigation system struggled with a featureless sandy surface. The helicopter landed hard, and later imagery showed damage to the tips of rotor blades. NASA concluded flight operations."}]},{id:"legacy",title:"A New Way to Explore",segments:[{kind:"fact",text:"Ingenuity proved that powered flight can work on another planet and changed how future missions can consider aerial exploration. The helicopter remains at its final location on Mars."}]}],
    components:[{name:"Coaxial rotor system",function:"Two counter-rotating rotors generate lift in the thin Martian atmosphere."},{name:"Solar panel and batteries",function:"Collect sunlight and store energy for flight and survival heating."},{name:"Navigation camera and sensors",function:"Estimate position, altitude and motion during autonomous flight."},{name:"Carbon-fibre blades",function:"Provide a light, stiff rotor structure capable of high-speed rotation."}],
    endingType:"decommissioned",endingExplanation:"Flight operations ended after rotor blade damage discovered following Flight 72. Ingenuity is grounded on Mars, not physically recovered or returned to Earth.",
    sources:[{label:"NASA JPL — Ingenuity mission",url:"https://science.nasa.gov/mission/mars-2020/ingenuity-mars-helicopter/"},{label:"NASA — Ingenuity completes 72nd flight",url:"https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/"}],related:["perseverance-rover","perseverance-landing-hardware"]
  },
  {
    slug:"mars-odyssey-orbiter",name:"2001 Mars Odyssey",mission:"2001 Mars Odyssey",destination:"Mars",agency:"NASA / JPL",builder:"Lockheed Martin Astronautics",
    summary:"The long-serving orbiter that mapped the elements and minerals of Mars, detected widespread hydrogen-rich regions, and relayed data from surface explorers.",
    hero:nasa("PIA04244","NASA artist concept of the 2001 Mars Odyssey spacecraft",{kind:"illustration",credit:"NASA/JPL-Caltech"}),
    keyDates:[{label:"Launch",date:"7 Apr 2001"},{label:"Mars orbit",date:"24 Oct 2001"},{label:"Status",date:"Active mission"}],
    status:{kind:"Approximate location",place:"Mars orbit",note:"The spacecraft remains in orbit and is listed by NASA as an active mission in the latest mission page consulted."},
    specs:{mass:"Approximately 758 kg at launch",dimensions:"Solar-array spacecraft; exact deployed dimensions should be taken from the spacecraft fact sheet",power:"Solar arrays and rechargeable batteries",propulsion:"Chemical propulsion for cruise and orbit insertion; reaction wheels and thrusters for attitude control",designLife:"Primary science mission February 2002–August 2004; extended operations continued",instruments:"THEMIS, GRS, HEND, MARIE and radio science / relay systems",structure:"Orbiter bus with deployable solar arrays, high-gain antenna and science instrument deck",notes:"This is an orbital spacecraft, not a surface artifact. It belongs in the archive's 'still operating / in orbit' collection."},
    objective:"Map Martian surface chemistry and mineralogy, study the radiation environment and support communications with surface missions.",
    missionOverview:"Odyssey entered Mars orbit in October 2001 and began mapping the planet. Its gamma-ray and neutron measurements helped identify hydrogen-rich regions, while its instruments study surface and atmospheric processes and it relays rover data.",
    chapters:[{id:"beginning",title:"A Mapmaker Arrives",dateLabel:"2001",segments:[{kind:"fact",text:"Mars Odyssey was designed to map the chemical elements and minerals that make up the Martian surface, while also measuring the radiation environment relevant to future human exploration."}]},{id:"journey",title:"Into Orbit",dateLabel:"7 Apr – 24 Oct 2001",segments:[{kind:"fact",text:"Launched on a Delta II rocket, Odyssey reached Mars in October 2001 and used aerobraking to settle into its science orbit."}]},{id:"discoveries",title:"Reading Mars from Above",segments:[{kind:"fact",text:"Its global measurements helped identify hydrogen-rich regions interpreted as evidence for water ice beneath the surface. THEMIS also maps thermal properties and mineral distributions."}]},{id:"ending",title:"Still on Watch",segments:[{kind:"fact",text:"NASA's mission page lists Odyssey as active. Its long service has supported science and communications for multiple generations of Mars landers and rovers."}]},{id:"legacy",title:"A Relay Across Generations",segments:[{kind:"fact",text:"Odyssey demonstrates that an orbiter can become infrastructure for exploration, not just a one-time observer. It has supported surface missions long after its original science phase."}]}],
    endingType:"still-scientifically-useful",endingExplanation:"Odyssey remains an active orbiter according to NASA's mission page. It is not a discarded surface object.",
    sources:[{label:"NASA Science — Mars Odyssey",url:"https://science.nasa.gov/mission/odyssey/"}],related:["mars-reconnaissance-orbiter","maven-orbiter","curiosity-rover"]
  },
  {
    slug:"mars-reconnaissance-orbiter",name:"Mars Reconnaissance Orbiter",mission:"MRO",destination:"Mars",agency:"NASA / JPL",builder:"Lockheed Martin Space",
    summary:"A high-resolution orbital scout whose cameras can resolve features about the size of a kitchen table, helping scientists study water, weather and landing sites.",
    hero:nasa("PIA03239","Mars Reconnaissance Orbiter artist concept",{kind:"illustration",credit:"NASA/JPL-Caltech"}),
    keyDates:[{label:"Launch",date:"12 Aug 2005"},{label:"Mars orbit",date:"10 Mar 2006"},{label:"Status",date:"Active mission"}],
    status:{kind:"Approximate location",place:"Mars orbit",note:"MRO remains an orbital spacecraft; this is not a surface artifact. NASA lists it as an active mission in the latest mission page consulted."},
    specs:{mass:"Approximately 2,180 kg at launch",dimensions:"Large orbiter with deployable solar arrays and a 3 m high-gain antenna",power:"Two solar arrays and rechargeable batteries",propulsion:"Main engine for orbit insertion; reaction wheels and thrusters for pointing",designLife:"Two-year primary science phase; extended mission operations",instruments:"HiRISE, CTX, MARCI, CRISM, MCS, SHARAD plus navigation and communications systems",structure:"Orbiter bus, high-gain antenna, solar arrays, instrument deck and 10 m SHARAD antenna",notes:"HiRISE is a camera instrument on MRO; do not count it as a separate spacecraft."},
    objective:"Study the history of water on Mars, characterize the surface and atmosphere, identify landing sites and relay communications for surface missions.",
    missionOverview:"MRO entered Mars orbit in March 2006. Its instruments image the surface at high resolution, map minerals, probe beneath the surface with radar and monitor weather and dust.",
    chapters:[{id:"beginning",title:"The Orbital Detective",dateLabel:"2005",segments:[{kind:"fact",text:"Mars Reconnaissance Orbiter was designed to examine Mars in extraordinary detail, looking for evidence of water and selecting safer, scientifically valuable landing sites."}]},{id:"journey",title:"Aerobraking into Science Orbit",dateLabel:"12 Aug 2005 – 10 Mar 2006",segments:[{kind:"fact",text:"After launch, MRO reached Mars and used months of aerobraking, dipping through the upper atmosphere to reduce its orbit without spending all its propellant."}]},{id:"discoveries",title:"Seeing the Planet in Detail",segments:[{kind:"fact",text:"HiRISE images can resolve features about a metre across from orbit. Other instruments map minerals, subsurface layers, water ice, dust and atmospheric conditions."}]},{id:"ending",title:"An Orbital Workhorse",segments:[{kind:"fact",text:"NASA lists MRO as an active mission. It continues science observations and communications support; it should not be labelled abandoned."}]},{id:"legacy",title:"The Eyes That Guide the Rovers",segments:[{kind:"fact",text:"MRO has helped choose landing sites, monitor surface changes and relay data from missions on the ground. Its orbital images also help locate and study surface hardware."}]}],
    endingType:"still-scientifically-useful",endingExplanation:"MRO remains an active Mars orbiter in NASA's mission information. It has not landed on Mars.",
    sources:[{label:"NASA Science — Mars Reconnaissance Orbiter",url:"https://science.nasa.gov/mission/mars-reconnaissance-orbiter/"},{label:"NASA Science — MRO science instruments",url:"https://science.nasa.gov/mission/mars-reconnaissance-orbiter/science-instruments/"}],related:["mars-odyssey-orbiter","maven-orbiter","phoenix"]
  },
  {
    slug:"maven-orbiter",name:"MAVEN Orbiter",mission:"Mars Atmosphere and Volatile Evolution",destination:"Mars",agency:"NASA",builder:"Lockheed Martin Space",
    summary:"An atmospheric investigator that spent more than eleven years studying how Mars loses gas to space before an unexpected loss of signal ended the mission.",
    hero:{src:"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia17/pia17487/PIA17487.jpg?crop=faces%2Cfocalpoint&fit=clip&h=900&w=1600",alt:"NASA artist concept of the MAVEN spacecraft near Mars",credit:"NASA/GSFC",sourceUrl:"https://science.nasa.gov/mission/maven/",kind:"illustration"},
    keyDates:[{label:"Launch",date:"18 Nov 2013"},{label:"Mars orbit",date:"21 Sep 2014"},{label:"Last signal",date:"6 Dec 2025"},{label:"Mission ended",date:"2026"}],
    status:{kind:"Approximate location",place:"Mars orbit; spacecraft not recoverable according to NASA mission update",note:"NASA reports an unexpected loss of signal on 6 December 2025 and a review board determined the spacecraft was not recoverable. Exact current orbit/condition is not represented as visually confirmed."},
    specs:{mass:"About 2,454 kg at launch",dimensions:"Orbiter with two large solar arrays and instrument booms",power:"Solar arrays and batteries",propulsion:"Chemical propulsion for orbit insertion and trajectory control",designLife:"One-year primary science mission; more than 11 years in Mars orbit",instruments:"Imaging Ultraviolet Spectrograph, magnetometers, particle and field instruments, NGIMS and Langmuir Probe",structure:"Orbiter bus, solar arrays, instrument booms and high-gain communications antenna",notes:"NASA announced the mission ended following loss of signal in December 2025; distinguish loss of contact from confirmed physical destruction."},
    objective:"Understand how and why Mars lost much of its atmosphere and how solar wind and radiation drive atmospheric escape.",
    missionOverview:"MAVEN entered Mars orbit in September 2014 and studied the upper atmosphere and its interaction with the solar wind, revealing processes that help explain the planet's climate history.",
    chapters:[{id:"beginning",title:"Where Did the Atmosphere Go?",dateLabel:"2013",segments:[{kind:"fact",text:"Mars once had a thicker atmosphere and flowing water on its surface. MAVEN was sent to investigate how the Sun's energy and solar wind helped strip gases away over geological time."}]},{id:"journey",title:"Into the Martian Upper Atmosphere",dateLabel:"18 Nov 2013 – 21 Sep 2014",segments:[{kind:"fact",text:"MAVEN launched in November 2013 and entered orbit around Mars in September 2014. Its orbit carried it through different atmospheric regions to sample the planet's upper atmosphere."}]},{id:"discoveries",title:"Watching an Atmosphere Escape",segments:[{kind:"fact",text:"MAVEN measured atmospheric particles, fields and gases, helping scientists understand how Mars loses atmospheric material to space and how that loss changed the planet over time."}]},{id:"ending",title:"The Signal That Did Not Return",dateLabel:"6 Dec 2025",segments:[{kind:"fact",text:"NASA reported that MAVEN experienced an unexpected loss of signal while passing behind Mars on 6 December 2025. After recovery efforts and review, NASA determined the spacecraft was not recoverable and ended the mission."},{kind:"creative",text:"For more than a decade I watched the thin air above Mars. Then the planet passed between my antenna and home, and the signal did not return."}]},{id:"legacy",title:"A Record of a Vanishing Sky",segments:[{kind:"fact",text:"MAVEN's long record helps scientists reconstruct how Mars changed from a world with a thicker atmosphere to the cold, dry planet observed today. Its final physical condition and exact current orbit should be treated cautiously."}]}],
    endingType:"communication-loss",endingExplanation:"MAVEN lost signal on 6 December 2025. NASA later determined it was not recoverable and declared the mission ended. This is a loss of communications and mission capability, not evidence that the spacecraft physically crashed.",
    sources:[{label:"NASA Science — MAVEN mission and end of mission",url:"https://science.nasa.gov/mission/maven/"}],related:["mars-odyssey-orbiter","mars-reconnaissance-orbiter"]
  },
  {
    slug:"apollo-lunar-roving-vehicles",name:"Apollo Lunar Roving Vehicles",mission:"Apollo 15, 16 and 17",destination:"Moon",agency:"NASA",builder:"Boeing / General Motors and Apollo contractor teams",
    summary:"Three battery-powered electric vehicles let Apollo astronauts travel kilometres across the lunar surface. Each was parked at the end of its mission so it could keep recording the departure of its crew on television.",
    hero:nasa("as15-88-11866","Apollo 15 Lunar Roving Vehicle on the Moon",{credit:"NASA"}),
    keyDates:[{label:"First lunar rover",date:"31 Jul 1971"},{label:"Last rover mission",date:"Dec 1972"},{label:"Vehicles left",date:"3"}],
    status:{kind:"Confirmed location",place:"Apollo 15, 16 and 17 landing sites on the Moon",note:"The three rovers were parked at their respective landing sites and remain there. Their positions are documented by Apollo surface photography and later lunar orbital imaging."},
    specs:{mass:"About 210 kg uncrewed vehicle mass",dimensions:"Approximately 3.1 m long × 2.3 m wide; folded for transport in the Lunar Module",power:"Two non-rechargeable 36-volt silver-zinc potassium-hydroxide batteries",propulsion:"Four independently driven 0.25-horsepower electric wheel motors; four-wheel steering",designLife:"Designed for three lunar surface missions; one rover deployed on each of Apollo 15, 16 and 17",instruments:"Navigation system, television camera, communications equipment and astronaut-operated geology tools",structure:"Aluminium alloy chassis, wire-mesh wheels, foldable frame, seats and dust guards",notes:"Three LRVs were deployed. The vehicles were intentionally left at the landing sites; their final parking locations are known from mission records."},
    objective:"Extend astronaut exploration range, carry tools and samples, and allow crews to investigate a wider range of lunar geology.",
    missionOverview:"The Lunar Roving Vehicle was folded into the Lunar Module descent stage for transport. Astronauts unfolded it on the surface, drove it using battery-powered wheel motors and left it behind when the crew departed.",
    chapters:[{id:"beginning",title:"A Car for Another World",dateLabel:"1960s–1971",segments:[{kind:"fact",text:"Apollo crews could walk only so far from their lander. The Lunar Roving Vehicle expanded the exploration zone and allowed astronauts to carry more tools and lunar samples across the surface."}]},{id:"journey",title:"Unfolding on the Moon",dateLabel:"1971–1972",segments:[{kind:"fact",text:"The rover travelled folded inside the Lunar Module. Once on the surface, astronauts deployed its frame, wheels, seats and controls, then checked its systems before driving."}]},{id:"discoveries",title:"Three Missions, Wider Horizons",segments:[{kind:"fact",text:"Apollo 15, 16 and 17 used the rovers to reach geological sites that would have been difficult to visit on foot. The vehicles carried television cameras and tools that supported field geology."}]},{id:"ending",title:"Parked for the Last Time",segments:[{kind:"fact",text:"At the end of each mission, the rover was parked so its television camera could document the Lunar Module ascent. The vehicles were left on the Moon intentionally, not abandoned after an unexpected breakdown."}]},{id:"legacy",title:"The Tracks Remain",segments:[{kind:"fact",text:"The three rovers remain as physical records of the Apollo surface traverses. Their routes and parking places help tell the story of how human exploration expanded beyond a landing point."}]}],
    components:[{name:"Wire-mesh wheels",function:"Provided traction on loose lunar soil while reducing mass."},{name:"Electric wheel motors",function:"Individually drove the four wheels."},{name:"Battery packs",function:"Supplied electrical energy for driving and vehicle systems."},{name:"Foldable aluminium chassis",function:"Allowed the vehicle to fit in the Lunar Module and unfold on the surface."},{name:"Navigation and communications",function:"Helped crews track distance, direction and send television signals to Earth."}],
    endingType:"discarded-by-design",endingExplanation:"All three Lunar Roving Vehicles were parked at their Apollo landing sites at the end of the missions. They were left intentionally and remain on the Moon.",
    sources:[{label:"NASA — Apollo Lunar Roving Vehicle",url:"https://www.nasa.gov/history/alsj/a15/a15.lrv.html"},{label:"NASA — Apollo 15 Lunar Surface Journal",url:"https://www.nasa.gov/history/alsj/a15/a15.html"}],related:["apollo-11-eagle","apollo-alsep","lunar-retroreflectors"]
  },
  {
    slug:"lunar-prospector",name:"Lunar Prospector",mission:"Discovery Program",destination:"Moon",agency:"NASA / Ames Research Center",builder:"Lockheed Martin Missiles and Space",
    summary:"A compact polar orbiter that mapped the Moon's chemistry and gravity, found hydrogen-rich regions near both poles, then deliberately struck a permanently shadowed crater in a search for a water-vapour signal.",
    hero:nasa("PIA00405","Lunar surface image used as context for Lunar Prospector's polar mapping",{kind:"context",credit:"NASA"}),
    keyDates:[{label:"Launch",date:"6 Jan 1998"},{label:"Lunar orbit",date:"12 Jan 1998"},{label:"Impact",date:"31 Jul 1999"}],
    status:{kind:"Approximate location",place:"Shoemaker crater region near the lunar south pole",note:"The spacecraft was intentionally impacted. The impact site was targeted, but the experiment did not produce a definitive water-vapour signature."},
    specs:{mass:"About 300 kg",dimensions:"Compact spin-stabilized spacecraft; deployed boom and antenna",power:"Solar arrays and batteries",propulsion:"Hydrazine propulsion for orbit changes; spin-stabilized in mapping orbit",designLife:"One-year primary mission; extended mission to July 1999",instruments:"Gamma-Ray Spectrometer, Neutron Spectrometer, Alpha Particle Spectrometer, Magnetometer and Electron Reflectometer",structure:"Compact spacecraft bus with solar panels, instrument booms and S-band communications",notes:"Hydrogen detections suggested polar water ice. The deliberate impact plume did not yield a clear water-vapour detection."},
    objective:"Map the Moon's surface composition and gravity field and investigate evidence for hydrogen and possible polar water ice.",
    missionOverview:"Lunar Prospector mapped the Moon from polar orbit. Its neutron spectrometer detected hydrogen-rich regions, and at the end of the mission NASA directed the spacecraft into a shadowed crater to look for a detectable plume.",
    chapters:[{id:"beginning",title:"A Small Orbiter, a Global Question",dateLabel:"1995–1998",segments:[{kind:"fact",text:"Lunar Prospector was a Discovery-class mission designed to map the Moon's elemental composition and gravity field. Scientists also wanted to investigate earlier hints that water ice might be trapped in permanently shadowed polar craters."}]},{id:"journey",title:"Into a Polar Orbit",dateLabel:"6–12 Jan 1998",segments:[{kind:"fact",text:"The spacecraft launched in January 1998 and entered lunar orbit five days later. It spent nearly nineteen months mapping the Moon from polar orbit."}]},{id:"discoveries",title:"Hydrogen at the Poles",segments:[{kind:"fact",text:"Neutron measurements detected hydrogen-rich regions near both lunar poles, interpreted as evidence consistent with water ice mixed into the soil. The mission also mapped elemental composition, magnetic anomalies and clues about the Moon's interior."}]},{id:"ending",title:"The Final Experiment",dateLabel:"31 Jul 1999",segments:[{kind:"fact",text:"NASA deliberately targeted Lunar Prospector into the permanently shadowed Shoemaker crater. Observers searched for a dust and vapour plume that might confirm water. The expected clear water signature was not detected, so the impact did not provide a definitive confirmation."},{kind:"creative",text:"I spent my final orbit tracing the Moon's hidden chemistry. Then my path was changed: my last measurement would be made by impact."}]},{id:"legacy",title:"A Mission That Changed the Map",segments:[{kind:"fact",text:"Lunar Prospector's global maps and polar hydrogen evidence shaped later lunar science and helped establish the importance of permanently shadowed regions."}]}],
    endingType:"intentional-impact",endingExplanation:"Lunar Prospector was intentionally impacted into Shoemaker crater on 31 July 1999. The impact was a planned experiment, but the plume observations did not produce a definitive water-vapour signature.",
    sources:[{label:"NASA Science — Lunar Prospector",url:"https://science.nasa.gov/mission/lunar-prospector/"},{label:"NASA Planetary Data System — Lunar Prospector",url:"https://pds-ppi.igpp.ucla.edu/mission/Lunar%20Prospector"}],related:["lcross-centaur","lunar-orbiter-1"]
  },
  {
    slug:"mars-observer",name:"Mars Observer",mission:"Mars Observer",destination:"Mars",agency:"NASA",builder:"Martin Marietta Astro Space",
    summary:"A sophisticated orbiter that travelled almost all the way to Mars, then fell silent just before orbit insertion. Its loss forced NASA to rethink how it designed and managed planetary missions.",
    hero:{src:"https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/m/mars_observer-1.jpg",alt:"NASA artist concept of the Mars Observer spacecraft above Mars",credit:"NASA/JPL-Caltech",sourceUrl:"https://science.nasa.gov/resource/mars-observer-artists-concept/",kind:"illustration"},
    keyDates:[{label:"Launch",date:"25 Sep 1992"},{label:"Last contact",date:"22 Aug 1993"},{label:"Orbit insertion",date:"Never completed"}],
    status:{kind:"Unknown",place:"Mars encounter region; exact spacecraft fate unknown",note:"Contact was lost before Mars orbit insertion. An investigation proposed a likely propulsion-system leak and spacecraft spin, but the physical fate was not directly observed."},
    specs:{mass:"1,018 kg (NASA mission page value)",dimensions:"Large orbiter based on a commercial Earth-orbiting spacecraft bus",power:"Solar arrays and batteries",propulsion:"Bipropellant propulsion planned for Mars orbit insertion and manoeuvres",designLife:"Planned one-Martian-year orbital science mission",instruments:"Mars Observer Camera, Thermal Emission Spectrometer, Pressure Modulator Infrared Radiometer, Laser Altimeter, Magnetometer/Electron Reflectometer, Gamma-Ray Spectrometer and radio science",structure:"Orbiter bus with solar arrays, high-gain antenna and remote-sensing instrument suite",notes:"A propulsion-system leak is a probable explanation from the investigation, not a directly observed final event."},
    objective:"Map the Martian surface and investigate its geology, atmosphere, climate, gravity and magnetic field from orbit.",
    missionOverview:"Mars Observer launched in 1992 after a seventeen-year gap in NASA Mars missions. It was intended to enter orbit in August 1993, but communications were lost shortly before the planned orbital insertion manoeuvre.",
    chapters:[{id:"beginning",title:"The Return to Mars",dateLabel:"1981–1992",segments:[{kind:"fact",text:"Mars Observer was intended to restart NASA's detailed orbital study of Mars. Its instrument suite was designed to map surface features, thermal properties, atmosphere, gravity and magnetic fields."}]},{id:"journey",title:"Eleven Months Across Space",dateLabel:"25 Sep 1992 – 22 Aug 1993",segments:[{kind:"fact",text:"The spacecraft travelled for 337 days toward Mars. It was only days away from its planned orbit insertion when controllers lost contact."}]},{id:"turning-point",title:"The Signal Disappears",dateLabel:"22 Aug 1993",segments:[{kind:"fact",text:"The spacecraft stopped communicating before it could enter Mars orbit. The investigation could not establish the exact sequence with certainty. A likely cause involved a propellant leak that may have damaged systems and caused the spacecraft to spin."}]},{id:"ending",title:"A Mission That Never Reached Its Orbit",segments:[{kind:"fact",text:"Mars Observer returned no significant Mars-orbit science. Its exact physical fate is unknown; it should be classified as lost before orbit insertion, not described as a confirmed crash on Mars."},{kind:"creative",text:"I crossed the dark for eleven months. Mars was close enough to become a world beneath me. Then the carrier vanished, and the map I was built to make remained unwritten."}]},{id:"legacy",title:"The Cost of Silence",segments:[{kind:"fact",text:"The loss influenced NASA's later planetary mission strategy and reinforced the need for stronger systems engineering, fault protection and mission assurance."}]}],
    endingType:"communication-loss",endingExplanation:"Mars Observer lost contact on 22 August 1993 before Mars orbit insertion. The investigation identified a likely propulsion-system leak, but the exact physical fate remains unconfirmed.",
    sources:[{label:"NASA Science — Mars Observer",url:"https://science.nasa.gov/mission/mars-observer/"},{label:"NASA JPL — Mars Observer",url:"https://www.jpl.nasa.gov/missions/mars-observer/"}],related:["mars-climate-orbiter","mars-polar-lander-deep-space-2"]
  },
  {
    slug:"mars-climate-orbiter",name:"Mars Climate Orbiter",mission:"Mars Surveyor '98",destination:"Mars",agency:"NASA / JPL",builder:"Lockheed Martin Astronautics",
    summary:"A weather orbiter lost because two teams' software used different measurement units. A small interface failure sent a spacecraft worth hundreds of millions of dollars too low into the Martian atmosphere.",
    hero:{src:"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia02/pia02330/PIA02330.jpg?crop=faces%2Cfocalpoint&fit=clip&h=900&w=1600",alt:"Mars image from the Mars Climate Orbiter mission",credit:"NASA/JPL/MSSS",sourceUrl:"https://images.nasa.gov/details/PIA02330",kind:"photograph"},
    keyDates:[{label:"Launch",date:"11 Dec 1998"},{label:"Last contact",date:"23 Sep 1999"},{label:"Loss",date:"23 Sep 1999"}],
    status:{kind:"Unknown",place:"Mars atmosphere / encounter trajectory",note:"NASA's mission investigation concluded the spacecraft was lost in the Martian atmosphere. It was not a planned impact."},
    specs:{mass:"About 638 kg at launch",dimensions:"Compact orbiter with solar arrays and communications antenna",power:"Solar arrays and batteries",propulsion:"Chemical propulsion for trajectory correction and Mars orbit insertion",designLife:"Planned one-Martian-year orbital science and relay mission",instruments:"Mars Color Imager (MARCI) and Pressure Modulated Infrared Radiometer (PMIRR)",structure:"Orbiter bus, deployable solar arrays, antenna and atmospheric science instruments",notes:"The loss was traced to a unit-conversion interface error: one ground-software input used pound-force seconds while the navigation system expected newton-seconds."},
    objective:"Study Martian weather and climate from orbit and serve as a communications relay for Mars Polar Lander and Deep Space 2.",
    missionOverview:"Mars Climate Orbiter launched in December 1998. A navigation data mismatch between English and metric units caused trajectory errors, and the spacecraft approached Mars at an unsafe altitude during orbit insertion.",
    chapters:[{id:"beginning",title:"A Weather Station for Mars",dateLabel:"1998",segments:[{kind:"fact",text:"Mars Climate Orbiter was designed to observe the planet's atmosphere and weather while also relaying communications for the Mars Polar Lander and Deep Space 2 probes."}]},{id:"journey",title:"The Journey to Mars",dateLabel:"11 Dec 1998 – Sep 1999",segments:[{kind:"fact",text:"The spacecraft travelled for nine months toward Mars. During navigation, a ground software component supplied thrust data in English units while another part of the navigation system expected metric units."}]},{id:"turning-point",title:"The Unit Error",dateLabel:"23 Sep 1999",segments:[{kind:"fact",text:"The unit mismatch caused trajectory calculations to be wrong. The spacecraft entered the Martian atmosphere far lower than planned during its orbit-insertion attempt, and contact was lost."}]},{id:"ending",title:"Lost in the Atmosphere",segments:[{kind:"fact",text:"NASA's investigation concluded that Mars Climate Orbiter burned up in the atmosphere. This was an accidental mission loss, not a deliberate impact."},{kind:"creative",text:"I carried instruments to read the weather of Mars. I never reached the orbit from which I was meant to watch it."}]},{id:"legacy",title:"A Lesson Written in Units",segments:[{kind:"fact",text:"The failure became a major systems-engineering case study. It demonstrated why interface requirements, independent verification and communication between teams are mission-critical."}]}],
    endingType:"accidental-atmospheric-loss",endingExplanation:"The spacecraft was lost during Mars orbit insertion and NASA's investigation concluded it burned up in the Martian atmosphere. This was an accidental atmospheric loss, not an intentional impact.",
    sources:[{label:"NASA Science — Mars Climate Orbiter",url:"https://science.nasa.gov/mission/mars-climate-orbiter/"},{label:"NASA JPL — Mars Climate Orbiter",url:"https://www.jpl.nasa.gov/missions/mars-climate-orbiter/"},{label:"NASA JPL — Likely cause of loss",url:"https://www.jpl.nasa.gov/news/mars-climate-orbiter-team-finds-likely-cause-of-loss/"}],related:["mars-observer","mars-polar-lander-deep-space-2"]
  },
  {
    slug:"mars-polar-lander-deep-space-2",name:"Mars Polar Lander & Deep Space 2",mission:"Mars Surveyor '98",destination:"Mars",agency:"NASA / JPL",builder:"Lockheed Martin (lander); JPL (Deep Space 2 probes)",
    summary:"A lander intended to dig into Martian polar soil and two tiny impact probes all went silent during arrival. The likely failure began with a false touchdown signal that shut the lander's engines off too early.",
    hero:nasa("PIA04413","Mars surface and lander concept image used as mission context",{kind:"context",credit:"NASA/JPL"}),
    keyDates:[{label:"Launch",date:"3 Jan 1999"},{label:"Mars arrival",date:"3 Dec 1999"},{label:"Recovery ended",date:"17 Jan 2000"}],
    status:{kind:"Unknown",place:"Intended south-polar landing region, Mars",note:"The lander is believed to have crashed. Deep Space 2 probes were never heard from; their final physical condition and exact locations are unknown."},
    specs:{mass:"Mars Polar Lander approximately 576 kg at launch; Deep Space 2 probes about 2.4 kg each",dimensions:"Lander with deployable solar arrays and robotic arm; two compact penetrator probes",power:"Solar arrays and batteries on the lander; primary batteries in penetrators",propulsion:"Hydrazine descent engines on lander; penetrators designed to impact at high speed",designLife:"Planned 90-sol lander mission; Deep Space 2 short-duration technology demonstration",instruments:"MVACS, MARDI, lidar and microphone on lander; temperature and conductivity sensors in penetrators",structure:"Stationary lander with robotic arm and two separate impact probes carried during cruise",notes:"NASA's investigation found a false touchdown indication was the most likely cause of premature engine shutdown. The exact impact points were not located."},
    objective:"Study the Martian polar soil and climate, search for water ice with a robotic arm, and test miniature penetrator technology below the surface.",
    missionOverview:"Mars Polar Lander carried two Deep Space 2 penetrators. The lander was to soft-land near the south polar region; the penetrators were to strike the surface independently and send measurements from below ground.",
    chapters:[{id:"beginning",title:"A Search Beneath the Ice",dateLabel:"1999",segments:[{kind:"fact",text:"Mars Polar Lander was designed to land near the edge of the south polar cap and use a robotic arm to examine soil and possible water ice. Two Deep Space 2 probes travelled with it to test a new way of reaching beneath the surface."}]},{id:"journey",title:"Three Machines, One Arrival",dateLabel:"3 Jan – 3 Dec 1999",segments:[{kind:"fact",text:"The mission launched in January 1999. On 3 December, the lander began atmospheric entry and descent while the two penetrators were also released for their separate impact experiments."}]},{id:"turning-point",title:"The False Touchdown Signal",dateLabel:"3 Dec 1999",segments:[{kind:"fact",text:"The lander stopped communicating during descent. The investigation concluded that vibrations from the landing legs may have been interpreted as touchdown before the spacecraft actually reached the ground, shutting down the descent engines prematurely."}]},{id:"ending",title:"Three Silent Machines",segments:[{kind:"fact",text:"The lander is believed to have crashed. Neither Deep Space 2 probe established communication. Their exact physical conditions and locations remain unknown."},{kind:"creative",text:"We were sent to listen beneath the ice. The radio fell quiet before the first measurement could reach home."}]},{id:"legacy",title:"The Cost of a Missing Signal",segments:[{kind:"fact",text:"The failure review informed later entry, descent and landing practices, especially sensor interpretation, testing and fault management. The mission remains a reminder that arrival is among the most dangerous parts of planetary exploration."}]}],
    endingType:"communication-loss",endingExplanation:"NASA believes Mars Polar Lander crashed after a false touchdown signal likely shut down its engines prematurely. Deep Space 2 probes were also lost. The exact physical condition and location of all three vehicles remain unknown.",
    sources:[{label:"NASA Science — Mars Polar Lander / Deep Space 2",url:"https://science.nasa.gov/mission/mars-polar-lander-deep-space-2/"},{label:"NASA JPL — Mars Polar Lander / Deep Space 2",url:"https://www.jpl.nasa.gov/missions/mars-polar-lander-deep-space-2/"}],related:["mars-climate-orbiter","mars-observer","phoenix"]
  }
);

artifacts.push(
  {
    slug:"surveyors-1-2-4-5-6-7", name:"Surveyor 1, 2, 4, 5, 6 & 7", mission:"Surveyor Program", destination:"Moon", agency:"NASA / JPL", builder:"Hughes Aircraft Company",
    summary:"Six robotic scouts tested lunar landing before Apollo. Some landed and worked; others were lost during descent. Their combined evidence helped turn a lunar landing into an engineered capability.",
    hero:nasa("AS12-48-7134","Apollo 12 astronauts examine Surveyor 3; contextual image for the Surveyor program",{kind:"context"}),
    keyDates:[{label:"First launch",date:"30 May 1966"},{label:"Last launch",date:"7 Jan 1968"},{label:"Program",date:"1966–1968"}],
    status:{kind:"Approximate location",place:"Multiple lunar landing and impact sites",note:"Successful landers remain at their sites. Surveyor 2 crashed; Surveyor 4 is presumed to have impacted after signal loss. Exact coordinates are not provided here."},
    specs:{mass:"Approximately one-tonne-class spacecraft; configurations varied",dimensions:"Three-legged lander with solar panel, antenna and camera",power:"Solar panels and rechargeable batteries",propulsion:"Solid retrorockets and throttleable vernier engines",designLife:"Varied by mission",instruments:"Television cameras; selected missions carried soil samplers and chemical-analysis instruments",structure:"Tripod lander with crushable footpads",notes:"Surveyor 3 has a separate case file. This entry groups the other six Surveyor missions."},
    objective:"Demonstrate robotic soft landing, photograph lunar terrain and test whether lunar soil could support a crewed Lunar Module.",
    missionOverview:"Surveyor 1, 5, 6 and 7 landed and operated. Surveyor 2 crashed after a vernier engine failed; Surveyor 4 lost its signal during descent and is presumed to have crashed, though its cause was not confirmed.",
    chapters:[{id:"beginning",title:"Scouts Before Apollo",dateLabel:"1966–1968",segments:[{kind:"fact",text:"Before Apollo could land astronauts, NASA needed evidence that a spacecraft could touch down safely and that lunar soil could support a crewed lander. Surveyor was built to answer those questions directly."}]},{id:"journey",title:"Seven Attempts at a New Skill",dateLabel:"May 1966 – January 1968",segments:[{kind:"fact",text:"Seven Surveyor probes were launched. Surveyor 1 made the first successful U.S. soft landing on the Moon. Surveyor 5 performed chemical analysis, Surveyor 6 made a short hop to a new location, and Surveyor 7 landed in the lunar highlands."}]},{id:"turning-point",title:"When Descent Became the Test",segments:[{kind:"fact",text:"Surveyor 2 lost control after a vernier engine failed to ignite. Surveyor 4 stopped transmitting about two and a half minutes before its planned landing; a crash is presumed, but the cause was not definitively established."}]},{id:"ending",title:"Different Endings",segments:[{kind:"fact",text:"Successful landers remained at their sites after operations ended. Surveyor 2 is an impact remnant, while Surveyor 4's physical fate is inferred from its lost signal and descent timeline."}]},{id:"legacy",title:"The Ground Was Ready",segments:[{kind:"fact",text:"Surveyor data helped establish the engineering confidence needed for Apollo. Its legacy was a body of evidence about landing, soil mechanics and the lunar environment."}]}],
    endingType:"discarded-by-design", endingExplanation:"Successful Surveyors were left at their landing sites. Surveyor 2 crashed after an engine failure; Surveyor 4 is presumed to have crashed after signal loss. These outcomes are not identical.",
    sources:[{label:"NASA Science — Lunar Rangers and Surveyors",url:"https://science.nasa.gov/mission/lunar-rangers-and-surveyors/"},{label:"NASA NSSDCA — Spacecraft chronology",url:"https://nssdc.gsfc.nasa.gov/nmc/"}],related:["surveyor-3","apollo-11-eagle","ranger-7-8-9"]
  },
  {
    slug:"apollo-lunar-module-descent-stages", name:"Apollo Lunar Module Descent Stages", mission:"Apollo 12, 14, 15, 16 & 17", destination:"Moon", agency:"NASA", builder:"Grumman Aircraft Engineering Corporation",
    summary:"Five more Lunar Module descent stages joined Eagle on the Moon. Each became the platform from which its crew lifted off, while the upper stage followed a separate fate.",
    hero:nasa("as11-40-5927","Apollo 11 Eagle lunar module as a representative image",{kind:"context"}),
    keyDates:[{label:"First landing",date:"19 Nov 1969"},{label:"Last landing",date:"11 Dec 1972"},{label:"Missions",date:"Apollo 12, 14–17"}],
    status:{kind:"Confirmed location",place:"Apollo 12, 14, 15, 16 and 17 landing sites",note:"Descent stages remained at their landing sites. Ascent stages separated and had mission-specific disposal trajectories."},
    specs:{mass:"Varied by mission and configuration",dimensions:"Two-stage Lunar Module; descent stage carried legs and descent engine",power:"LM electrical power system",propulsion:"Throttleable descent engine; separate ascent engine",designLife:"One lunar landing and surface stay",instruments:"Landing radar, navigation and communications equipment; surface tools and experiments",structure:"Descent stage with legs, engine, propellant tanks and equipment bays",notes:"Apollo 11 Eagle is a separate record. Apollo 13 did not land."},
    objective:"Land crews on the Moon and provide a stable platform for surface exploration and ascent back to lunar orbit.",
    missionOverview:"The Lunar Module separated into descent and ascent stages. The descent stage remained after crew departure; the ascent stage carried astronauts back to lunar orbit and was later disposed of separately.",
    chapters:[{id:"beginning",title:"A Machine Designed to Separate",segments:[{kind:"fact",text:"The Lunar Module had two stages. The descent stage carried landing legs, descent engine, propellant and surface equipment. The ascent stage carried the crew cabin and engine that returned astronauts to lunar orbit."}]},{id:"journey",title:"Five More Landings",dateLabel:"1969–1972",segments:[{kind:"fact",text:"Apollo 12 landed on 19 November 1969; Apollo 14 on 5 February 1971; Apollo 15 on 30 July 1971; Apollo 16 on 20 April 1972; and Apollo 17 on 11 December 1972. Apollo 13 never landed."}]},{id:"turning-point",title:"Two Stages, Two Destinies",segments:[{kind:"fact",text:"After surface exploration, the ascent stage lifted off and rendezvoused with the Command/Service Module. It did not remain attached to the descent stage. Its later disposal varied by mission."}]},{id:"ending",title:"The Platform Stays",segments:[{kind:"fact",text:"The five descent stages in this record remain at their lunar landing sites. They are inactive artifacts left by design, not failed spacecraft."}]},{id:"legacy",title:"A Working Landing System",segments:[{kind:"fact",text:"The Lunar Module enabled the final five successful Apollo landings after Apollo 11. The lower stages now mark the places where crews explored another world."}]}],
    endingType:"discarded-by-design", endingExplanation:"Descent stages were intentionally left at lunar landing sites. Ascent stages separated and followed mission-specific disposal paths; the entire Lunar Module was not left intact.",
    sources:[{label:"NASA — Apollo programme",url:"https://www.nasa.gov/the-apollo-program/"},{label:"NASA NSSDCA — Apollo chronology",url:"https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo.html"}],related:["apollo-11-eagle","apollo-lunar-roving-vehicles","apollo-alsep"]
  },
  {
    slug:"dawn-spacecraft", name:"Dawn", mission:"Dawn", destination:"Other", destinationDetail:"Ceres · asteroid belt", agency:"NASA", builder:"Orbital Sciences Corporation",
    summary:"An ion-propelled explorer that orbited two worlds — Vesta and Ceres — before becoming a silent spacecraft around its final destination.",
    hero:nasa("as17-148-22727","Earth photographed during Apollo 17; contextual image for deep-space exploration",{kind:"context"}),
    keyDates:[{label:"Launch",date:"27 Sep 2007"},{label:"Vesta orbit",date:"2011"},{label:"Ceres orbit",date:"Mar 2015"},{label:"Mission end",date:"1 Nov 2018"}],
    status:{kind:"Approximate location",place:"Orbit around dwarf planet Ceres",note:"NASA planned a long-lived orbit that should avoid impact for at least 20 years after mission end, likely much longer."},
    specs:{mass:"Approximately 1,217 kg at launch",dimensions:"Solar-array span about 19.7 m when deployed",power:"Large solar arrays",propulsion:"Xenon ion engines; hydrazine thrusters for attitude control",designLife:"2007–2018 extended mission",instruments:"Framing cameras, visible and infrared spectrometer, gamma ray and neutron detector",structure:"Solar-electric spacecraft with large deployable arrays",notes:"Mission ended when hydrazine for attitude control was depleted, not when ion-propulsion xenon ran out."},
    objective:"Study the composition, geology and evolution of Vesta and Ceres, two large bodies in the asteroid belt.",
    missionOverview:"Dawn used ion propulsion to travel to and orbit Vesta and Ceres. When hydrazine for pointing and communications was exhausted, it could no longer maintain orientation toward the Sun and Earth.",
    chapters:[{id:"beginning",title:"Two Ancient Worlds",segments:[{kind:"fact",text:"Dawn was designed to investigate Vesta and Ceres, preserving clues about the early Solar System. It became the first spacecraft to orbit two extraterrestrial targets."}]},{id:"journey",title:"Ion Engines, Long Horizons",dateLabel:"2007–2015",segments:[{kind:"fact",text:"Dawn launched on 27 September 2007, orbited Vesta from 2011 to 2012 and entered orbit around Ceres in March 2015."}]},{id:"discoveries",title:"Worlds of Rock and Ice",segments:[{kind:"fact",text:"Dawn mapped Vesta and Ceres and investigated their composition and evolution, revealing distinct histories for these bodies."}]},{id:"ending",title:"The Fuel That Pointed Home",dateLabel:"1 Nov 2018",segments:[{kind:"fact",text:"Hydrazine used by attitude-control thrusters ran out. It was needed to point the solar arrays toward the Sun and the antenna toward Earth; xenon for the ion engines was not the limiting fuel at mission end."}]},{id:"remains",title:"Where It Remains",segments:[{kind:"fact",text:"Dawn remains in orbit around Ceres. NASA selected a long-lived orbit to avoid contaminating a world of astrobiological interest."}]},{id:"legacy",title:"An Explorer Becomes a Satellite",segments:[{kind:"fact",text:"Dawn's silent orbit is a planned scientific-protection outcome. The spacecraft continues around the dwarf planet it spent years studying."}]}],
    endingType:"power-loss", endingExplanation:"The mission ended because hydrazine for attitude control was depleted. Dawn remains in a planned long-lived orbit around Ceres.",
    sources:[{label:"NASA Science — Dawn",url:"https://science.nasa.gov/mission/dawn/"},{label:"NASA — Dawn mission ends",url:"https://www.jpl.nasa.gov/news/nasas-dawn-mission-to-asteroid-belt-ends"}],related:["lunar-prospector","mars-odyssey-orbiter"]
  },
  {
    slug:"near-shoemaker", name:"NEAR Shoemaker", mission:"Near Earth Asteroid Rendezvous", destination:"Other", destinationDetail:"433 Eros · near-Earth asteroid", agency:"NASA", builder:"Johns Hopkins University Applied Physics Laboratory",
    summary:"A spacecraft that landed where it was never designed to land. After completing its asteroid science mission, it touched down gently on Eros and kept returning data.",
    hero:nasa("as17-148-22727","Deep-space exploration context image; not a photograph of NEAR Shoemaker",{kind:"context"}),
    keyDates:[{label:"Launch",date:"17 Feb 1996"},{label:"Eros orbit",date:"14 Feb 2000"},{label:"Touchdown",date:"12 Feb 2001"},{label:"Last contact",date:"28 Feb 2001"}],
    status:{kind:"Confirmed location",place:"Surface of asteroid 433 Eros",note:"NEAR made a controlled descent and touchdown. It survived and transmitted data for about two weeks."},
    specs:{mass:"About 805 kg at launch including propellant",dimensions:"Spacecraft bus about 2.8 m across with solar arrays",power:"Solar arrays and batteries",propulsion:"Hydrazine monopropellant propulsion",designLife:"Orbital mission extended by a controlled touchdown",instruments:"Multispectral imager, near-infrared spectrometer, X-ray/gamma-ray spectrometer, magnetometer, laser rangefinder",structure:"Octagonal spacecraft bus with solar arrays, instruments and antenna",notes:"Touchdown was a successful controlled landing, not an accidental crash."},
    objective:"Study asteroid Eros and determine its composition, geology, mass distribution and internal structure.",
    missionOverview:"NEAR flew by Mathilde, entered orbit around Eros and later made a controlled descent to the asteroid's surface, surviving touchdown despite not being designed as a lander.",
    chapters:[{id:"beginning",title:"A Rendezvous With an Asteroid",dateLabel:"1996",segments:[{kind:"fact",text:"NEAR launched on 17 February 1996 to investigate near-Earth asteroid 433 Eros. It was later renamed in honour of geologist Eugene Shoemaker."}]},{id:"journey",title:"From Flyby to Orbit",dateLabel:"1997–2000",segments:[{kind:"fact",text:"The spacecraft flew past Mathilde and entered orbit around Eros in February 2000, becoming the first spacecraft to orbit an asteroid."}]},{id:"discoveries",title:"A Close Look at Eros",segments:[{kind:"fact",text:"NEAR mapped Eros and studied its composition, geology and internal structure."}]},{id:"turning-point",title:"A Landing Never Planned",dateLabel:"12 Feb 2001",segments:[{kind:"fact",text:"At mission end, NEAR performed a controlled descent and touched down at roughly 6.4 km/h. The spacecraft survived on the surface."}]},{id:"ending",title:"Two More Weeks of Data",dateLabel:"28 Feb 2001",segments:[{kind:"fact",text:"After touchdown, the spacecraft experienced extreme cold and eventually lost contact. NASA's later attempt to communicate with it in 2002 failed."}]},{id:"legacy",title:"A Successful Unplanned Ending",segments:[{kind:"fact",text:"NEAR Shoemaker became the first spacecraft to land on an asteroid. Its final descent extended a successful mission; it was not a crash."}]}],
    endingType:"communication-loss", endingExplanation:"NEAR made a controlled touchdown on Eros, survived and transmitted data for about two weeks before losing contact.",
    sources:[{label:"NASA Science — NEAR Shoemaker",url:"https://science.nasa.gov/mission/near-shoemaker/"},{label:"NASA NSSDCA — NEAR",url:"https://nssdc.gsfc.nasa.gov/nmc/"}],related:["dawn-spacecraft","pioneer-probes"]
  },
  {
    slug:"pioneer-probes", name:"Pioneer 10 & 11", mission:"Pioneer outer-planet missions", destination:"Other", destinationDetail:"Outbound heliocentric trajectories", agency:"NASA", builder:"TRW Inc.",
    summary:"Two early deep-space probes carried a message about Earth. Their transmitters fell silent, but the spacecraft continued outward on escape trajectories.",
    hero:nasa("as17-148-22727","Earth photographed by Apollo 17; contextual image for outbound deep-space probes",{kind:"context"}),
    keyDates:[{label:"Pioneer 10 launch",date:"2 Mar 1972"},{label:"Pioneer 11 launch",date:"5 Apr 1973"},{label:"Pioneer 10 last signal",date:"23 Jan 2003"},{label:"Pioneer 11 contact",date:"1995"}],
    status:{kind:"Unknown",place:"Outbound heliocentric trajectories beyond the outer planets",note:"Neither probe is on a planetary surface. Both continue outward; constellation directions do not imply close encounters with those stars."},
    specs:{mass:"Pioneer 10 about 258 kg at launch",dimensions:"Spin-stabilized spacecraft with high-gain dish antenna and RTG booms",power:"Radioisotope thermoelectric generators; output declined over time",propulsion:"Hydrazine attitude-control thrusters",designLife:"Pioneer 10 last weak signal in 2003; Pioneer 11 final useful contact in 1995",instruments:"Magnetometers, plasma analyzers, cosmic-ray and energetic-particle detectors, imaging photopolarimeter",structure:"Spin-stabilized bus, high-gain antenna, instrument booms and RTG sources",notes:"Both carried the Pioneer plaque. Their communication endings differed."},
    objective:"Explore the outer Solar System, study Jupiter and Saturn, and measure solar wind, magnetic fields and energetic particles.",
    missionOverview:"Pioneer 10 made the first direct close-up study of Jupiter; Pioneer 11 later flew by Jupiter and Saturn. Both carried a plaque depicting humans and Earth's location.",
    chapters:[{id:"beginning",title:"A Message on the Way Out",dateLabel:"1972–1973",segments:[{kind:"fact",text:"Pioneer 10 launched on 2 March 1972 and Pioneer 11 on 5 April 1973. Each carried a plaque depicting human figures and the location of Earth."}]},{id:"journey",title:"Beyond the Familiar Planets",dateLabel:"1973–1983",segments:[{kind:"fact",text:"Pioneer 10 made the first direct close-up study of Jupiter. Pioneer 11 followed with a Jupiter encounter and the first close-range observations of Saturn by a spacecraft."}]},{id:"ending",title:"The Signal Fades",dateLabel:"1995–2003",segments:[{kind:"fact",text:"Pioneer 10's last weak signal arrived on 23 January 2003 after routine contact ended in 1997. Pioneer 11's final useful contact was in September 1995, with limited engineering data reported later that year."},{kind:"fact",text:"Radioisotope generators gradually produced less electrical power. For Pioneer 11, changing geometry also made it impossible to keep the antenna pointed toward Earth."}]},{id:"remains",title:"Still Moving",segments:[{kind:"fact",text:"Neither spacecraft rests on a planet. Both continue along outbound trajectories through space. They are not predicted to pass close to the stars in the directions of their trajectories."}]},{id:"legacy",title:"Messages in Bottles",segments:[{kind:"fact",text:"Their instruments are silent, but the Pioneer plaques remain physical messages from Earth carried by two early outer-planet explorers."}]}],
    endingType:"power-loss", endingExplanation:"Power output declined over time and communications ended. Both probes continue on outbound heliocentric trajectories; neither was abandoned on a planetary surface.",
    sources:[{label:"NASA Science — Pioneer 10",url:"https://science.nasa.gov/mission/pioneer-10/"},{label:"NASA Science — Pioneer 11",url:"https://science.nasa.gov/mission/pioneer-11/"}],related:["dawn-spacecraft","kepler-space-telescope"]
  },
  {
    slug:"kepler-space-telescope", name:"Kepler Space Telescope", mission:"Kepler / K2", destination:"Other", destinationDetail:"Earth-trailing solar orbit", agency:"NASA", builder:"Ball Aerospace & Technologies",
    summary:"A planet hunter retired in a safe solar orbit. Its telescope stopped observing when fuel ran out, but its archived data continues to reveal worlds.",
    hero:nasa("as17-148-22727","Earth photographed from space; contextual image for Kepler's heliocentric orbit",{kind:"context"}),
    keyDates:[{label:"Launch",date:"6 Mar 2009"},{label:"K2 begins",date:"2014"},{label:"Retirement",date:"30 Oct 2018"}],
    status:{kind:"Approximate location",place:"Heliocentric orbit trailing Earth",note:"Kepler was not left orbiting Earth and did not crash into a planet. It remains in a safe orbit around the Sun."},
    specs:{mass:"About 1,052 kg at launch",dimensions:"0.95 m photometer aperture",power:"Solar array and batteries",propulsion:"Hydrazine thrusters for attitude control; reaction wheels for precision pointing",designLife:"Original mission 3.5 years; K2 operated through 2018",instruments:"0.95 m photometer measuring tiny repeated dips in starlight",structure:"Space telescope with photometer, sunshade, solar array and precision pointing system",notes:"A reaction-wheel failure ended the original pointing mode in 2013. Engineers developed K2 before hydrazine was exhausted."},
    objective:"Detect exoplanets by measuring repeated dips in the brightness of stars as planets pass in front of them.",
    missionOverview:"Kepler contributed more than 2,600 confirmed exoplanet discoveries. After a reaction-wheel failure, engineers reconfigured it as K2; the mission ended when attitude-control fuel ran out.",
    chapters:[{id:"beginning",title:"A Telescope Built to Find Other Earths",dateLabel:"2009",segments:[{kind:"fact",text:"Kepler launched on 6 March 2009 with a photometer designed to watch a large field of stars and search for tiny, repeated dimming caused by transiting planets."}]},{id:"discoveries",title:"Thousands of New Worlds",dateLabel:"2009–2018",segments:[{kind:"fact",text:"Kepler revolutionized exoplanet science and contributed more than 2,600 confirmed planet discoveries. Its archive continues to support new analysis after retirement."}]},{id:"turning-point",title:"A New Mission After Failure",dateLabel:"2013–2014",segments:[{kind:"fact",text:"A reaction-wheel failure in 2013 ended the original pointing mode. Engineers developed K2, using solar pressure and remaining wheels to stabilize the telescope for new observing campaigns."}]},{id:"ending",title:"Fuel Runs Out",dateLabel:"30 Oct 2018",segments:[{kind:"fact",text:"Kepler was retired after hydrazine needed for attitude control was exhausted. The telescope was not sent into Earth orbit or deliberately crashed."}]},{id:"remains",title:"A Safe Orbit Around the Sun",segments:[{kind:"fact",text:"Kepler remains in a heliocentric orbit trailing Earth. It is physically intact but no longer conducts science observations."}]},{id:"legacy",title:"The Archive Keeps Looking",segments:[{kind:"fact",text:"The telescope's operational life ended, but its data continues to shape the study of planets around other stars."}]}],
    endingType:"decommissioned", endingExplanation:"Kepler was retired when hydrazine for attitude control ran out. It remains in a safe heliocentric orbit trailing Earth; archived observations remain useful.",
    sources:[{label:"NASA Science — Kepler",url:"https://science.nasa.gov/mission/kepler/"},{label:"NASA — Kepler retirement",url:"https://www.nasa.gov/news-release/nasa-retires-kepler-space-telescope/"}],related:["pioneer-probes","dawn-spacecraft"]
  }

);

// Evidence-backed technical specifications for existing records. Unknown values are omitted rather than guessed.
const technicalSpecs: Record<string, TechnicalSpecs> = {
  "ranger-7-8-9": {mass:"Ranger 7: 365.6 kg",dimensions:"Ranger Block III spacecraft; dimensions vary by configuration",power:"Solar-cell and battery power",propulsion:"Mid-course correction and terminal impact trajectory",designLife:"Minutes of terminal imaging before planned lunar impact",instruments:"Six television cameras (Block III imaging system)",structure:"Instrumented spacecraft bus with wide- and narrow-angle camera channels",notes:"Ranger 7 returned 4,316 images according to NASA Science; some older NASA/JPL summaries list 4,308. Use NASA Science's current mission page and retain the discrepancy in research notes."},
  "surveyor-3": {mass:"997.9 kg spacecraft mass",dimensions:"Three-legged lunar lander; sampler arm reached about 1.5 m",power:"Solar panels and rechargeable batteries",propulsion:"Three vernier descent engines and solid retro rockets",designLife:"Designed for lunar surface operations; last contact 4 May 1967",instruments:"Television camera and surface sampler",structure:"Tripod lander with landing legs, solar panel, antenna and sampler arm"},
  "spirit": {mass:"1,062 kg spacecraft mass; rover itself about 185 kg",dimensions:"About 1.6 m long × 2.3 m wide × 1.5 m high",power:"Solar arrays and rechargeable batteries",propulsion:"Six-wheel rocker-bogie electric mobility system",designLife:"90 sols planned; operated over 2,200 sols",instruments:"Pancam, Navcam, Mini-TES, APXS, Mössbauer spectrometer, microscopic imager and Rock Abrasion Tool",structure:"Six-wheel rover with mast, robotic arm, solar arrays and insulated electronics bay"},
  "opportunity": {mass:"1,062 kg spacecraft mass; rover itself about 185 kg",dimensions:"About 1.6 m long × 2.3 m wide × 1.5 m high",power:"Solar arrays and rechargeable batteries",propulsion:"Six-wheel rocker-bogie electric mobility system",designLife:"90 sols planned; operated more than 14 Earth years",instruments:"Pancam, Navcam, Mini-TES, APXS, Mössbauer spectrometer, microscopic imager and Rock Abrasion Tool",structure:"Six-wheel rover with mast, robotic arm, solar arrays and insulated electronics bay"},
  "viking-landers": {mass:"About 657 kg per lander",dimensions:"Six-sided base; three landing legs with 2.21 m triangular footpad spacing",power:"Two SNAP-19 radioisotope thermoelectric generators per lander",propulsion:"Hydrazine monopropellant descent system",designLife:"Viking 1 operated until 1982; Viking 2 until 1980",instruments:"Cameras, GCMS, biology experiments, seismometer, X-ray fluorescence spectrometer, meteorology sensors and sampler arm",structure:"Aluminium base supported by three legs; RTGs mounted on opposite sides"},
  "phoenix": {mass:"About 350 kg landed spacecraft",dimensions:"Stationary lander with robotic arm; deployed solar arrays",power:"Solar arrays and batteries",propulsion:"Hydrazine thrusters for descent and attitude control",designLife:"90-sol primary mission; extended operations into Martian autumn",instruments:"Robotic arm, TEGA ovens, MECA wet chemistry lab, cameras, meteorology and lidar",structure:"Fixed three-legged platform with deployable solar arrays and sampling arm"},
  "insight": {mass:"694 kg total spacecraft at launch; lander about 358 kg",dimensions:"Lander about 1.56 m across with deployed solar arrays",power:"Two solar arrays and batteries",propulsion:"Hydrazine thrusters for cruise and landing; stationary after touchdown",designLife:"Two-year primary mission; extended until December 2022",instruments:"SEIS seismometer, HP3 heat-flow probe, RISE radio science, weather sensors and cameras",structure:"Stationary three-legged lander with instrument deck and deployable solar panels"},
  "apollo-11-eagle": {mass:"Descent stage dry mass and full landing mass varied; verify exact configuration before display",dimensions:"Apollo Lunar Module approx. 6.4 m high; 9.4 m across landing gear",power:"Fuel cells in ascent stage; descent stage supported landing systems",propulsion:"Throttleable descent engine; ascent stage had separate ascent engine",designLife:"One lunar landing and surface stay",instruments:"Apollo surface tools and experiments; ALSEP was deployed on later Apollo missions, not Apollo 11",structure:"Two-stage aluminium-alloy lander; descent stage with legs and engine remained on Moon"},
  "lunar-orbiter-1": {mass:"Approximately 385 kg spacecraft mass",dimensions:"Compact orbiter with deployable solar panels and high-gain antenna",power:"Solar panels and batteries",propulsion:"Liquid-propellant engine for lunar orbit insertion and manoeuvres",designLife:"Planned 1-year mission; operated in lunar orbit for about 2 months",instruments:"Dual-lens photographic system with film processing and readout; micrometeoroid and radiation experiments",structure:"Orbiter bus with camera assembly, film processor, solar panels and communications antenna"},
  "apollo-alsep": {mass:"Varied by Apollo landing site and instrument configuration; no single package mass",dimensions:"Distributed experiment stations; footprints and instrument layouts varied by mission",power:"SNAP-27 radioisotope thermoelectric generator at Apollo 12–17 stations",propulsion:"None; stationary surface experiments",designLife:"EASEP operated until 27 Aug 1969; ALSEP operations ended 30 Sep 1977",instruments:"Seismometers, heat-flow probes, magnetometers, solar-wind and active seismic experiments depending on site",structure:"Central station, antenna, cables, power source and separately deployed instruments",notes:"Apollo 11 deployed EASEP, not the full ALSEP configuration."},
  "lunar-retroreflectors": {mass:"Array mass varies by mission; not a powered spacecraft",dimensions:"Apollo arrays used corner-cube reflectors in a compact panel; array sizes differed",power:"None required; passive optical device",propulsion:"None; fixed on the lunar surface",designLife:"Long-lived passive experiment; laser ranging continues when conditions permit",instruments:"Corner-cube retroreflectors",structure:"Glass corner cubes mounted in an array and oriented toward Earth",notes:"Apollo arrays were deployed by NASA; Lunokhod reflectors are Soviet hardware and must be identified separately."},
  "lcross-centaur": {mass:"Two separate impactors with different masses; do not present a single combined spacecraft mass",dimensions:"Centaur upper stage plus shepherding spacecraft; dimensions differ",power:"Shepherding spacecraft used solar power; Centaur was a spent upper stage",propulsion:"Centaur impact trajectory followed by shepherding spacecraft impact",designLife:"One targeted impact experiment on 9 Oct 2009",instruments:"Shepherding spacecraft cameras and spectrometers observed the Centaur ejecta plume",structure:"Two-stage experiment: spent Centaur impactor and instrumented shepherding spacecraft",notes:"Both impacts were intentional; the Centaur stage and shepherding spacecraft are distinct physical artifacts."},
  "sojourner-pathfinder": {mass:"Sojourner rover: about 10.5 kg",dimensions:"About 65 cm long × 48 cm wide × 30 cm high",power:"Solar panel with primary batteries for early operations",propulsion:"Six-wheel rocker-bogie mobility; individual wheel and steering motors",designLife:"Planned 7-sol primary rover mission; rover operated for 83 sols",instruments:"Alpha Proton X-ray Spectrometer, cameras and Material Adherence Experiment",structure:"Six-wheel chassis with rocker-bogie suspension, solar panel, antenna and insulated electronics bay",notes:"The Pathfinder lander was the rover's communications relay; lander failure ended rover operations."},
  "perseverance-landing-hardware": {mass:"Component masses differ; do not treat the landing system as one artifact mass",dimensions:"Heat shield, backshell, parachute, descent stage and sky-crane components have separate dimensions",power:"Powered descent stage used onboard propellant; parachute and heat shield are passive",propulsion:"Supersonic parachute and rocket-powered sky-crane descent stage",designLife:"Single entry, descent and landing sequence on 18 Feb 2021",instruments:"MEDLI2 entry sensors; landing navigation and terrain-relative navigation systems",structure:"Aeroshell, heat shield, backshell, parachute, descent stage and bridle/cutter system",notes:"These components separated at different times and came to rest at different locations around Jezero Crater."}
};
for (const artifact of artifacts) {
  if (technicalSpecs[artifact.slug]) artifact.specs = technicalSpecs[artifact.slug];
}

// The four original story records are retained and completed with the same evidence-led exhibit fields.
const exhibitDefaults: Record<string, Pick<Artifact, "components" | "endingType" | "endingExplanation" | "challenge">> = {
  "apollo-11-eagle": {
    components: [{name:"Descent engine and propellant tanks",function:"Controlled powered descent to the lunar surface."},{name:"Landing legs and footpads",function:"Supported the lander at touchdown."},{name:"Structure and interfaces",function:"Held the descent stage together and supported electrical and communications connections."},{name:"Stowage",function:"Carried tools and experiments for surface operations."}],
    endingType:"discarded-by-design", endingExplanation:"The ascent stage lifted the crew off the Moon. The descent stage was intentionally left at Tranquility Base; it was not designed to take off again and was not a failed spacecraft.",
    challenge:{question:"Why did the Lunar Module have two stages?",hint:"One stage had to land; another had to carry the crew back to lunar orbit.",answer:"The descent stage carried the crew and supplies down and served as the launch platform. The ascent stage lifted the crew back to the command module."}
  },
  "surveyor-3": {
    components:[{name:"Television camera",function:"Returned images of the lunar surface."},{name:"Surface sampler scoop and arm",function:"Collected and moved lunar soil."},{name:"Landing radar",function:"Supported the final descent."},{name:"Power and thermal systems",function:"Supported operations on the lunar surface."}],
    endingType:"communication-loss",endingExplanation:"Reflective rocks confused Surveyor 3's landing radar and the engine did not shut off at the intended time. The craft bounced twice before settling. Contact ended in May 1967; the hardware remained on the Moon.",
    challenge:{question:"What made Surveyor 3 especially important to later lunar exploration?",hint:"Think about robotic soft landing, soil sampling and the Apollo 12 visit.",answer:"It demonstrated robotic soft landing and surface sampling. Apollo 12 later visited it and returned selected components for examination after lunar exposure."}
  },
  "spirit": {
    components:[{name:"Six-wheel mobility system",function:"Moved the rover across the Martian surface."},{name:"Panoramic and navigation cameras",function:"Imaged terrain and supported driving."},{name:"Robotic arm and geological instruments",function:"Examined rocks and soil."},{name:"Rock Abrasion Tool",function:"Exposed rock surfaces for study."},{name:"Solar arrays and batteries",function:"Supplied electrical energy."}],
    endingType:"immobilized",endingExplanation:"Spirit became stuck in soft soil in 2009 and a wheel had failed. It became a stationary science platform. NASA later lost contact, likely as winter cold and low power affected the rover. Its exact final physical condition is not directly confirmed.",
    challenge:{question:"Was Spirit confirmed destroyed when communication stopped?",hint:"Separate the confirmed mobility problem from the uncertain final physical condition.",answer:"No. Spirit became stuck and later stopped communicating. The guide says its exact final physical condition is not directly confirmed."}
  },
  "opportunity": {
    components:[{name:"Six wheels",function:"Provided mobility across Martian terrain."},{name:"Panoramic and navigation cameras",function:"Captured images for science and driving."},{name:"Microscopic imager",function:"Examined fine rock textures."},{name:"APXS and Mössbauer spectrometer",function:"Analyzed rock and soil composition."},{name:"Rock Abrasion Tool",function:"Exposed fresh rock surfaces for instruments."},{name:"Solar panels and batteries",function:"Supplied electrical power."}],
    endingType:"power-loss",endingExplanation:"A planet-wide dust storm blocked sunlight and reduced solar power. Opportunity stopped communicating on 10 June 2018. NASA tried more than a thousand recovery commands before declaring the mission over; physical destruction is not confirmed.",
    challenge:{question:"What caused Opportunity's final loss of contact?",hint:"Think about sunlight reaching the solar panels during a planet-wide dust storm.",answer:"The dust storm blocked sunlight and reduced solar power. Opportunity stopped communicating; NASA later declared the mission complete after recovery attempts failed."}
  }
};
for (const artifact of artifacts) {
  const defaults = exhibitDefaults[artifact.slug];
  if (defaults) Object.assign(artifact, defaults);
}

const missionBriefs: Record<string, { objective: string; missionOverview: string }> = {
  "apollo-11-eagle": { objective: "Land the first crew on the Moon, explore the surface and return the astronauts safely to Earth.", missionOverview: "Apollo 11 used the Saturn V, Command and Service Module, and Eagle Lunar Module. The descent stage carried the crew to the Sea of Tranquility and remained there when the ascent stage lifted off." },
  "surveyor-3": { objective: "Demonstrate a robotic soft landing and examine lunar surface conditions before crewed Apollo landings.", missionOverview: "Surveyor 3 used a television camera and a surface-sampler scoop to inspect and test lunar soil. Apollo 12 later visited the lander and returned selected components to Earth." },
  "lunar-orbiter-1": { objective: "Photograph candidate Apollo and Surveyor landing areas and map the lunar surface.", missionOverview: "Lunar Orbiter 1 mapped the Moon from orbit and returned an early image of Earth from near the Moon. Its mission ended with a deliberate impact on the lunar far side." },
  "apollo-alsep": { objective: "Measure the lunar environment after astronauts returned to Earth, including moonquakes, heat flow and magnetic fields.", missionOverview: "ALSEP stations combined a central station, antenna, cabling and power source with site-specific experiments. Mission control shut the experiments down on 30 September 1977." },
  "lunar-retroreflectors": { objective: "Measure the Earth–Moon distance precisely and test gravitational physics using laser pulses.", missionOverview: "Corner-cube retroreflector arrays were deployed on the Moon. They are passive devices: they need no battery or radio transmitter and can still support lunar laser ranging." },
  "lcross-centaur": { objective: "Test whether a permanently shadowed crater near the lunar south pole contained water ice.", missionOverview: "The spent Centaur upper stage struck Cabeus crater; the LCROSS Shepherding Spacecraft observed the ejecta plume, collected data, relayed it to Earth and then impacted the Moon as planned." },
  "ranger-7-8-9": { objective: "Transmit close-up images of the lunar surface before impact to assess terrain and landing hazards.", missionOverview: "Ranger 7, 8 and 9 returned thousands of images during their final approach and then impacted the Moon as planned. The impacts were the designed end of these imaging missions." },
  "sojourner-pathfinder": { objective: "Demonstrate a lower-cost Mars landing system and mobile robotic exploration while analyzing rocks, soil and weather.", missionOverview: "The Pathfinder lander provided communications relay for the Sojourner rover. When the lander stopped communicating after a power-system failure, rover operations ended; this does not establish that Sojourner was destroyed." },
  "spirit": { objective: "Investigate Martian rocks and soil for evidence of past water and reconstruct the geology of the landing region.", missionOverview: "Spirit explored Mars with a six-wheel rover, cameras and a robotic arm. It became stuck in soft soil, later lost contact, and NASA ended recovery efforts in 2011." },
  "opportunity": { objective: "Study Martian rocks and soil for evidence of past water activity.", missionOverview: "Opportunity used cameras and geological instruments to investigate Mars. A planet-wide dust storm reduced solar power; after more than a thousand recovery commands, NASA declared the mission complete in 2019." },
  "viking-landers": { objective: "Image the Martian surface, measure atmospheric and soil properties, and conduct biology experiments searching for evidence of life.", missionOverview: "Viking 1 and Viking 2 landers conducted long-duration surface investigations. Their lander operations ended in 1982 and 1980 respectively; the landers remain on Mars." },
  "phoenix": { objective: "Dig into Martian arctic soil, study subsurface water ice and analyze chemistry relevant to habitability.", missionOverview: "Phoenix used a robotic arm, scoop and analytical instruments to examine polar soil. Contact ended as the northern winter approached; the lander was not designed to survive the winter." },
  "insight": { objective: "Study Mars’ interior by measuring marsquakes, heat flow and planetary wobble.", missionOverview: "InSight deployed the SEIS seismometer and other instruments. Dust accumulation reduced solar power; NASA ended the mission in December 2022. The heat-flow probe did not reach its planned depth." },
  "perseverance-landing-hardware": { objective: "Slow and protect Perseverance through the Martian atmosphere and deliver the rover safely to the surface.", missionOverview: "The heat shield, backshell, parachute, descent stage and sky-crane hardware were discarded in sequence by design during landing. Their separation was part of a successful delivery, not a Perseverance failure." },
};

for (const artifact of artifacts) {
  const brief = missionBriefs[artifact.slug];
  if (brief) Object.assign(artifact, brief);
}

export const getArtifact = (slug: string) => artifacts.find((a) => a.slug === slug);
