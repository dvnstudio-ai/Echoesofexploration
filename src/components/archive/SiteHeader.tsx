import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Orbit } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="brand-lockup" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Orbit size={22} strokeWidth={1.5} /></span>
          <span><strong>ECHOES<span> / </span>EXPLORATION</strong><small>AN ARCHIVE OF HUMAN PRESENCE</small></span>
        </Link>
        <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><Menu size={21}/></button>
        <div className={`nav-links ${open ? "nav-open" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>The expedition</Link>
          <Link to="/archive" onClick={() => setOpen(false)}>Artifact archive</Link>
          <Link to="/method" onClick={() => setOpen(false)}>Research method</Link>
        </div>
        <Link to="/archive" className="nav-cta">Explore the records <ArrowUpRight size={15}/></Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div><p className="footer-brand">ECHOES / EXPLORATION</p><p>Worlds explored. Stories left behind.</p></div>
        <p className="footer-note">An independent, evidence-led archive of human-made objects beyond Earth. NASA and mission-source links accompany each investigation. Creative passages are labelled separately. Not affiliated with or endorsed by NASA.</p>
        <Link to="/archive" className="footer-link">Return to the archive ↗</Link>
      </div>
    </footer>
  );
}
