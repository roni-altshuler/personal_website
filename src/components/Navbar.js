"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../data/nav";

export default function Navbar() {
  const pathname = usePathname();
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => { if (media.matches) dialog.current?.close(); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const links = (mobile = false) => NAV_ITEMS.map(({ href, label }) => (
    <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={mobile ? () => dialog.current?.close() : undefined}>{label}</Link>
  ));
  return <>
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-current={pathname === "/" ? "page" : undefined}><span className="brand-dot" aria-hidden="true" />Roni Altshuler</Link>
        <nav className="desktop-nav" aria-label="Primary">{links()}</nav>
        <div className="header-actions"><button ref={trigger} type="button" className="menu-button" aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" style={{ visibility: ready ? "visible" : "hidden" }} onClick={() => { dialog.current.showModal(); setOpen(true); }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button></div>
      </div>
    </header>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-dialog" aria-label="Mobile navigation" onKeyDown={event => {
      if (event.key !== "Tab") return;
      const items = [...dialog.current.querySelectorAll('a[href], button:not([disabled])')];
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }} onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={event => { if (event.target === dialog.current) { const r = dialog.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.current.close(); } }}>
      <div className="dialog-heading"><span className="eyebrow">Explore</span><button className="icon-button" type="button" aria-label="Close navigation menu" onClick={() => dialog.current.close()} autoFocus><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button></div>
      <nav aria-label="Mobile">{links(true)}</nav>
    </dialog>
    <noscript><nav className="nojs-nav" aria-label="Mobile navigation">{links()}</nav></noscript>
  </>;
}
