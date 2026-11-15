/**
 * Mass and weight ledger for the 31 curated archive records.
 *
 * Mass is invariant and is always expressed in kg.
 * Earth-equivalent weight is calculated as mass × 9.80665 m/s².
 * A destination-surface weight is shown ONLY when the listed mass is
 * a landed/surface vehicle mass and the surface gravity is applicable.
 * Launch/entry mass, dry mass, landed mass and component mass are never
 * silently substituted for one another. Grouped records may have several
 * separately identified objects or no single comparable mass.
 */
export type MassItem = {
  label: string;
  massKg: number;
  basis: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type MassWeightRecord = {
  items: MassItem[];
  status: "verified" | "partial" | "not-published";
  surfaceGravityMps2?: number;
  surfaceLabel?: string;
  note: string;
};

const moon = 1.62;
const mars = 3.71;

export const massWeightLedger: Record<string, MassWeightRecord> = {
  "apollo-11-eagle": {
    items: [],
    status: "not-published",
    note: "The archive record is specifically the Eagle descent stage. Do not substitute the complete Lunar Module mass: ascent and descent stages had different masses, and the descent-stage value depends on whether dry, landing or post-ascent configuration is meant. A single stage-specific figure is not asserted here.",
  },
  "surveyor-3": {
    items: [{ label: "Surveyor 3 spacecraft", massKg: 997.9, basis: "Launch spacecraft mass; not the mass remaining after landing", sourceLabel: "NASA Science — Surveyor 3", sourceUrl: "https://science.nasa.gov/mission/surveyor-3/" }],
    status: "verified",
    note: "NASA publishes 997.9 kg as spacecraft mass. This is not a measured landed mass, so a lunar-surface weight is deliberately not calculated from it.",
  },
  "spirit": {
    items: [{ label: "Spirit rover", massKg: 170, basis: "Rover-only mass; excludes cruise stage, backshell, parachute and lander", sourceLabel: "NASA — Comparing Two Mars Rover Projects", sourceUrl: "https://mars.nasa.gov/internal_resources/698/" }],
    status: "verified",
    surfaceGravityMps2: mars,
    surfaceLabel: "Mars surface reference",
    note: "NASA's rover comparison gives 170 kg for each Mars Exploration Rover. A separate 1,062 kg figure refers to the larger spacecraft/landing system, not the rover alone.",
  },
  "opportunity": {
    items: [{ label: "Opportunity rover", massKg: 170, basis: "Rover-only mass; excludes cruise stage, backshell, parachute and lander", sourceLabel: "NASA — Comparing Two Mars Rover Projects", sourceUrl: "https://mars.nasa.gov/internal_resources/698/" }],
    status: "verified",
    surfaceGravityMps2: mars,
    surfaceLabel: "Mars surface reference",
    note: "NASA's rover comparison gives 170 kg for each Mars Exploration Rover. Do not confuse rover mass with the full 1,062 kg spacecraft/landing system.",
  },
  "lunar-orbiter-1": {
    items: [{ label: "Lunar Orbiter 1", massKg: 385, basis: "Spacecraft mass; orbital mission before its planned impact", sourceLabel: "NASA NSSDCA — Lunar Orbiter 1", sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-073A" }],
    status: "verified",
    note: "This was an orbiter, not a landed vehicle. Earth-equivalent weight is a reference calculation only; actual orbital free-fall is not a fixed surface weight.",
  },
  "apollo-alsep": {
    items: [],
    status: "not-published",
    note: "EASEP and the later ALSEP stations were different, site-specific packages made of separately deployed instruments, cables, a central station and power hardware. There is no single mass that correctly represents this grouped record.",
  },
  "lunar-retroreflectors": {
    items: [],
    status: "not-published",
    note: "The record groups arrays from different Apollo sites and separately identifies Soviet Lunokhod reflectors. Array designs and masses differ; no single group mass is asserted.",
  },
  "lcross-centaur": {
    items: [],
    status: "not-published",
    note: "This record contains two separate impactors: the spent Centaur upper stage and the LCROSS Shepherding Spacecraft. A combined mass would be misleading, and launch mass would not equal impact mass after propellant use.",
  },
  "ranger-7-8-9": {
    items: [],
    status: "not-published",
    note: "The record groups three Block III Ranger spacecraft. Their individual mass values and configurations must be kept separate; no single shared mass is assigned to all three.",
  },
  "sojourner-pathfinder": {
    items: [
      { label: "Sojourner rover", massKg: 10.5, basis: "Rover-only mass", sourceLabel: "NASA JPL — Mars Pathfinder / Sojourner", sourceUrl: "https://mars.nasa.gov/MPF/rover/sojourner.html" },
      { label: "Mars Pathfinder lander", massKg: 360, basis: "Landed spacecraft mass; separate from the rover", sourceLabel: "NASA — Mars lander comparison", sourceUrl: "https://www.nasa.gov/wp-content/uploads/2024/02/10-2024-architecture-workshop-white-paper-mars-challenges.pdf" },
    ],
    status: "verified",
    surfaceGravityMps2: mars,
    surfaceLabel: "Mars surface reference",
    note: "The rover and its stationary lander are two different objects. The Mars surface-weight calculations below use the stated rover-only and landed-lander masses, not the combined launch stack.",
  },
  "viking-landers": {
    items: [
      { label: "Viking 1 lander", massKg: 657, basis: "Lander mass as listed in NASA spacecraft specifications", sourceLabel: "NASA Science — Viking spacecraft and science", sourceUrl: "https://science.nasa.gov/mission/viking/spacecraft-and-science/" },
      { label: "Viking 2 lander", massKg: 657, basis: "Lander mass as listed in NASA spacecraft specifications", sourceLabel: "NASA Science — Viking 2", sourceUrl: "https://science.nasa.gov/mission/viking-2/" },
    ],
    status: "partial",
    surfaceGravityMps2: mars,
    surfaceLabel: "Mars surface reference",
    note: "The cited specification is a lander mass, not a claim that both landers retained that exact mass at every mission phase. NASA's Mars lander comparison separately reports landed-system masses; those bases should not be mixed.",
  },
  "phoenix": {
    items: [{ label: "Phoenix lander", massKg: 350, basis: "Landed spacecraft mass", sourceLabel: "NASA Science — Phoenix", sourceUrl: "https://science.nasa.gov/mission/phoenix/" }],
    status: "verified",
    surfaceGravityMps2: mars,
    surfaceLabel: "Mars surface reference",
    note: "The displayed mass is the landed spacecraft mass. Weight is calculated at the conventional Mars surface gravity of 3.71 m/s².",
  },
  "insight": {
    items: [{ label: "InSight lander", massKg: 358, basis: "Lander mass at the Martian surface; cruise/entry mass is larger", sourceLabel: "NASA Science — InSight spacecraft", sourceUrl: "https://science.nasa.gov/mission/insight/spacecraft/" }],
    status: "verified",
    surfaceGravityMps2: mars,
    surfaceLabel: "Mars surface reference",
    note: "The mass refers to the stationary lander on Mars, not the complete launch configuration. NASA's source describes the lander and its deployed instruments.",
  },
  "perseverance-landing-hardware": {
    items: [{ label: "Mars 2020 entry system", massKg: 3369, basis: "Entry mass of the complete Mars 2020 entry/descent/landing configuration; not one surface artifact", sourceLabel: "NASA — Mars EDL comparison", sourceUrl: "https://www.nasa.gov/wp-content/uploads/2024/12/acr24-compiled-white-papers.pdf" }],
    status: "partial",
    note: "The heat shield, backshell, parachute, descent stage and sky-crane hardware separated at different times and landed at different places. The 3,369 kg figure is the integrated entry mass, not the mass of any one discarded component; no single surface weight is calculated.",
  },
  "curiosity-rover": {
    items: [{ label: "Curiosity rover", massKg: 899, basis: "Rover mass", sourceLabel: "NASA Science — Curiosity", sourceUrl: "https://science.nasa.gov/mission/msl-curiosity/" }],
    status: "verified",
    surfaceGravityMps2: mars,
    surfaceLabel: "Mars surface reference",
    note: "NASA reports 899 kg mass and separately gives an approximate Mars-gravity weight in pounds. This ledger calculates force in newtons from the mass and 3.71 m/s².",
  },
  "perseverance-rover": {
    items: [{ label: "Perseverance rover", massKg: 1025, basis: "Rover mass, including its robotic arm and turret; separate from cruise and landing hardware", sourceLabel: "NASA JPL — Perseverance quick facts", sourceUrl: "https://www.jpl.nasa.gov/news/press_kits/mars_2020/landing/quick_facts/" }],
    status: "verified",
    surfaceGravityMps2: mars,
    surfaceLabel: "Mars surface reference",
    note: "This is the rover itself. The aeroshell, cruise stage, descent stage and other landing hardware are separate objects and are not added to this mass.",
  },
  "ingenuity-helicopter": {
    items: [{ label: "Ingenuity helicopter", massKg: 1.8, basis: "Flight vehicle mass", sourceLabel: "NASA JPL — Ingenuity Mars Helicopter", sourceUrl: "https://science.nasa.gov/mission/mars-2020/ingenuity-mars-helicopter/" }],
    status: "verified",
    surfaceGravityMps2: mars,
    surfaceLabel: "Mars surface reference",
    note: "The value is the helicopter's mass, not its weight. The Mars-surface force is a reference calculation; the aircraft's flight loads varied during operation.",
  },
  "mars-odyssey-orbiter": {
    items: [{ label: "2001 Mars Odyssey", massKg: 725, basis: "Spacecraft total mass reported by NASA; orbital spacecraft", sourceLabel: "NASA Science — Mars Odyssey", sourceUrl: "https://science.nasa.gov/mission/odyssey/" }],
    status: "verified",
    note: "Odyssey is an orbiter. It is in orbital free-fall, so a single Mars-surface weight is not its actual operating weight; the Earth-equivalent value is shown only as a reference.",
  },
  "mars-reconnaissance-orbiter": {
    items: [{ label: "Mars Reconnaissance Orbiter", massKg: 2180, basis: "Launch mass; NASA planetary-protection table separately lists 981 kg dry mass", sourceLabel: "NASA Mars planetary-protection primer", sourceUrl: "https://sma.nasa.gov/docs/default-source/sma-disciplines-and-programs/planetary-protection/mars-planetary-protection-primer_cat-iii_2026.pdf" }],
    status: "verified",
    note: "The published value is launch mass, not dry mass. NASA's same comparison source lists a separate 981 kg dry-mass figure; these values describe different mission configurations.",
  },
  "maven-orbiter": {
    items: [{ label: "MAVEN", massKg: 2454, basis: "Launch mass; NASA planetary-protection table separately lists 809 kg dry mass", sourceLabel: "NASA Mars planetary-protection primer", sourceUrl: "https://sma.nasa.gov/docs/default-source/sma-disciplines-and-programs/planetary-protection/mars-planetary-protection-primer_cat-iii_2026.pdf" }],
    status: "verified",
    note: "The value is launch mass. NASA's planetary-protection comparison lists 809 kg dry mass, so the two figures must not be interchanged.",
  },
  "apollo-lunar-roving-vehicles": {
    items: [{ label: "Apollo Lunar Roving Vehicle (each)", massKg: 210, basis: "Empty rover mass; payload capacity is additional", sourceLabel: "NASA OCHMO technical brief", sourceUrl: "https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-023-extraterrestrial-surface-transport-vehicles-rovers.pdf" }],
    status: "verified",
    surfaceGravityMps2: moon,
    surfaceLabel: "Moon surface reference",
    note: "Three LRVs were deployed on Apollo 15, 16 and 17. Each had an empty mass of 210 kg; the 490 kg payload capacity is not part of empty mass.",
  },
  "lunar-prospector": {
    items: [{ label: "Lunar Prospector", massKg: 296, basis: "Spacecraft launch mass; deliberate impact at end of mission", sourceLabel: "NASA Science — Lunar Prospector", sourceUrl: "https://science.nasa.gov/mission/lunar-prospector/" }],
    status: "partial",
    note: "This was a lunar orbiter that later made a deliberate impact. Launch mass is not the mass at impact; no surface weight is calculated.",
  },
  "mars-observer": {
    items: [{ label: "Mars Observer", massKg: 1018, basis: "Spacecraft mass at launch", sourceLabel: "NASA Science — Mars Observer", sourceUrl: "https://science.nasa.gov/mission/mars-observer/" }],
    status: "verified",
    note: "Mars Observer was an orbiter that lost communication before orbit insertion. Its launch mass is not a landed mass and it has no Mars-surface weight.",
  },
  "mars-climate-orbiter": {
    items: [{ label: "Mars Climate Orbiter", massKg: 629, basis: "Total mass at launch: 338 kg spacecraft plus 291 kg propellant", sourceLabel: "NASA Mars Climate Orbiter quick facts", sourceUrl: "https://mars.nasa.gov/internal_resources/818/" }],
    status: "verified",
    note: "NASA's quick facts give 629 kg total, including propellant. This is launch mass; the spacecraft was lost during Mars arrival and did not become a surface artifact.",
  },
  "mars-polar-lander-deep-space-2": {
    items: [
      { label: "Mars Polar Lander entry configuration", massKg: 576, basis: "Total launch/entry stack: lander, propellant, cruise stage and aeroshell/heat shield", sourceLabel: "NASA Mars mission quick facts", sourceUrl: "https://mars.nasa.gov/internal_resources/818/" },
      { label: "Mars Polar Lander vehicle", massKg: 290, basis: "Lander vehicle component; separate from cruise stage and aeroshell", sourceLabel: "NASA Mars mission quick facts", sourceUrl: "https://mars.nasa.gov/internal_resources/818/" },
      { label: "Deep Space 2 penetrator (each)", massKg: 2.4, basis: "Each of two independent penetrators", sourceLabel: "NASA Mars mission quick facts", sourceUrl: "https://mars.nasa.gov/internal_resources/818/" },
    ],
    status: "partial",
    note: "This is a multi-object record. The 576 kg figure is the full launch/entry stack, not the lander alone; Deep Space 2 consisted of two separate 2.4 kg probes. Exact touchdown masses were not recovered.",
  },
  "surveyors-1-2-4-5-6-7": {
    items: [],
    status: "not-published",
    note: "This record groups six different Surveyor missions. Their launch configurations and masses differ. A single 'one-tonne-class' estimate is not sufficiently precise for a verified mass/weight display; individual mission values should be added as separately sourced rows.",
  },
  "apollo-lunar-module-descent-stages": {
    items: [],
    status: "not-published",
    note: "Apollo 12, 14, 15, 16 and 17 descent stages varied by mission, payload, propellant remaining and configuration. A single group mass would be misleading; each landing site needs its own stage-specific source and mass basis.",
  },
  "dawn-spacecraft": {
    items: [
      { label: "Dawn spacecraft at launch", massKg: 1217.7, basis: "Fueled launch mass", sourceLabel: "NASA Planetary Data System — Dawn spacecraft", sourceUrl: "https://pds.nasa.gov/ds-view/pds/viewContext.jsp?identifier=urn%3Anasa%3Apds%3Acontext%3Ainstrument_host%3Aspacecraft.dawn&version=1.2" },
      { label: "Dawn spacecraft dry", massKg: 747.1, basis: "Dry mass after excluding propellant", sourceLabel: "NASA Planetary Data System — Dawn spacecraft", sourceUrl: "https://pds.nasa.gov/ds-view/pds/viewContext.jsp?identifier=urn%3Anasa%3Apds%3Acontext%3Ainstrument_host%3Aspacecraft.dawn&version=1.2" },
    ],
    status: "verified",
    note: "NASA PDS distinguishes the 1,217.7 kg fueled launch mass from the 747.1 kg dry mass. Dawn was an orbiter at Vesta and Ceres; neither number is a surface weight.",
  },
  "near-shoemaker": {
    items: [{ label: "NEAR Shoemaker", massKg: 805, basis: "Spacecraft mass at launch; later propellant consumption changed mass", sourceLabel: "NASA Science — NEAR Shoemaker", sourceUrl: "https://science.nasa.gov/mission/near-shoemaker/" }],
    status: "verified",
    note: "The spacecraft was not designed as a lander but made a controlled touchdown on Eros. The 805 kg figure is launch mass, not mass at touchdown; no Eros-surface weight is inferred from it.",
  },
  "pioneer-probes": {
    items: [
      { label: "Pioneer 10", massKg: 258, basis: "Spacecraft mass at launch", sourceLabel: "NASA Science — Pioneer 10", sourceUrl: "https://science.nasa.gov/mission/pioneer-10/" },
      { label: "Pioneer 11", massKg: 258.5, basis: "Spacecraft mass at launch", sourceLabel: "NASA Science — Pioneer 11", sourceUrl: "https://science.nasa.gov/mission/pioneer-11/" },
    ],
    status: "verified",
    note: "These are two separate outbound spacecraft. Neither is on a planetary surface; a destination-surface weight is not applicable.",
  },
  "kepler-space-telescope": {
    items: [{ label: "Kepler Space Telescope", massKg: 1052, basis: "Spacecraft launch mass", sourceLabel: "NASA Science — Kepler", sourceUrl: "https://science.nasa.gov/mission/kepler/" }],
    status: "verified",
    note: "Kepler operated in an Earth-trailing heliocentric orbit. It has no single planetary-surface weight; the Earth-equivalent force is only a comparison.",
  },
};

export function getMassWeight(slug: string): MassWeightRecord | undefined {
  return massWeightLedger[slug];
}

export function earthWeightNewtons(massKg: number): number {
  return massKg * 9.80665;
}

export function surfaceWeightNewtons(massKg: number, gravityMps2: number): number {
  return massKg * gravityMps2;
}
