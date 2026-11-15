import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { artifacts } from "@/data/artifacts";
import { ArchiveImg } from "@/components/archive/ArchiveImg";
import { SiteFooter, SiteHeader } from "@/components/archive/SiteHeader";

export const Route = createFileRoute("/archive")({
  head: () => ({ meta: [
    { title: "Artifact Archive — Echoes of Exploration" },
    { name: "description", content: "Investigate the spacecraft, instruments and mission hardware left across the Moon, Mars and deep space." }
  ]}),
  component: ArchivePage,
});

const destinations = ["All", "Moon", "Mars", "Other"] as const;
const endings = ["All endings", "intentional-impact", "power-loss", "communication-loss", "immobilized", "decommissioned", "discarded-by-design", "still-scientifically-useful", "accidental-atmospheric-loss"] as const;
const endingNames: Record<string,string> = {
 "intentional-impact":"Intentional impact","power-loss":"Power loss","communication-loss":"Communication lost","immobilized":"Immobilized",
 "decommissioned":"Decommissioned","discarded-by-design":"Discarded by design","still-scientifically-useful":"Still scientifically useful","accidental-atmospheric-loss":"Atmospheric loss"
};

function ArchivePage() {
 const [destination,setDestination]=useState<(typeof destinations)[number]>("All");
 const [ending,setEnding]=useState<(typeof endings)[number]>("All endings");
 const [query,setQuery]=useState("");
 const records=useMemo(()=>artifacts.filter(a=>(destination==="All"||a.destination===destination)&&(ending==="All endings"||a.endingType===ending)&&(!query.trim()||`${a.name} ${a.mission} ${a.agency} ${a.destinationDetail??""}`.toLowerCase().includes(query.trim().toLowerCase()))),[destination,ending,query]);
 const count=(d:string)=>artifacts.filter(a=>d==="All"||a.destination===d).length;
 return <div className="archive-page">
  <SiteHeader/>
  <main>
   <section className="archive-masthead">
    <div className="archive-masthead-image"><img src="https://images-assets.nasa.gov/image/PIA00405/PIA00405~large.jpg" alt="Lunar surface under hard sunlight"/></div>
    <div className="archive-masthead-content">
     <p className="archive-overline"><span>FIELD INDEX 01</span><i/> THE HUMAN FOOTPRINT BEYOND EARTH</p>
     <h1>Objects left.<br/><em>Stories remain.</em></h1>
     <p className="archive-lede">A living catalogue of machines, instruments and spacecraft that became part of other worlds. Follow the evidence. Understand the ending. Find the science that survived.</p>
     <div className="archive-masthead-meta"><span>{artifacts.length} DOCUMENTED INVESTIGATIONS</span><span>MOON / MARS / DEEP SPACE</span></div>
    </div>
    <div className="archive-index-mark">ARCHIVE<br/>— 2026</div>
   </section>
   <section className="archive-workspace">
    <div className="archive-toolbar">
     <div><p className="archive-overline">THE COLLECTION</p><h2>Browse the evidence</h2></div>
     <div className="archive-search"><Search size={17}/><input aria-label="Search artifacts" placeholder="Search a mission, object or agency" value={query} onChange={e=>setQuery(e.target.value)}/><span>↵</span></div>
    </div>
    <div className="archive-filters">
     <div className="destination-tabs" role="group" aria-label="Filter by destination">{destinations.map(d=><button key={d} onClick={()=>setDestination(d)} className={destination===d?"selected":""} aria-pressed={destination===d}><span>{d==="All"?"00":d==="Moon"?"01":d==="Mars"?"02":"03"}</span>{d}<b>{count(d).toString().padStart(2,"0")}</b></button>)}</div>
     <label className="ending-filter"><SlidersHorizontal size={15}/><select value={ending} onChange={e=>setEnding(e.target.value as (typeof endings)[number])}>{endings.map(e=><option key={e} value={e}>{e==="All endings"?e:endingNames[e]}</option>)}</select></label>
    </div>
    <div className="archive-resultline"><span>SHOWING <b>{records.length.toString().padStart(2,"0")}</b> OF {artifacts.length.toString().padStart(2,"0")} RECORDS</span><span>SELECT A RECORD TO OPEN ITS CASE FILE <ArrowDown size={13}/></span></div>
    <div className="archive-card-grid">
     {records.map((a,i)=><Link to="/artifacts/$slug" params={{slug:a.slug}} className="archive-record" key={a.slug}>
      <div className="archive-record-image"><ArchiveImg image={a.hero} showCredit={false} className="h-full w-full"/><span className="archive-record-index">EE / {String(i+1).padStart(3,"0")}</span><span className="archive-record-destination">{a.destinationDetail??a.destination}</span><span className="archive-record-open"><ArrowUpRight size={18}/></span></div>
      <div className="archive-record-body"><p className="archive-record-mission">{a.mission} <span>·</span> {a.agency}</p><h3>{a.name}</h3><p className="archive-record-summary">{a.summary}</p><div className="archive-record-bottom"><span>{endingNames[a.endingType??""]??"MISSION RECORD"}</span><b>OPEN CASE FILE <ArrowUpRight size={13}/></b></div></div>
     </Link>)}
    </div>
    {records.length===0&&<div className="archive-empty">No records match this combination. Try another destination or search term.</div>}
   </section>
  </main>
  <SiteFooter/>
 </div>;
}
