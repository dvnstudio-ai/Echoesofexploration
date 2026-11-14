import { Link } from "@tanstack/react-router";
import { Compass, Globe2, Orbit, Rocket, Telescope } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="brand-lockup">
          <span className="brand-mark"><Orbit size={27} strokeWidth={1.6} /></span>
          <span><strong>ECHOES OF<br />EXPLORATION</strong><small>Worlds explored. Stories left behind.</small></span>
        </Link>
        <div className="nav-links">
          <Link to="/" activeProps={{ className: "active" }}><Compass size={16} /> Home</Link>
          <Link to="/archive"><Orbit size={16} /> Moon & Mars</Link>
          <Link to="/archive"><Telescope size={16} /> Artifacts</Link>
          <Link to="/method"><Globe2 size={16} /> Our evidence</Link>
        </div>
        <Link to="/archive" className="nav-cta"><Rocket size={15} /> Start exploring</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div><p className="footer-brand">ECHOES OF EXPLORATION</p><p>Worlds explored. Stories left behind.</p></div>
        <p className="footer-note">A student-friendly, evidence-led archive. Research snapshot: 11 November 2026.<br />NASA and mission-source links are provided with each investigation. Creative passages are labelled separately.</p>
      </div>
    </footer>
  );
}
