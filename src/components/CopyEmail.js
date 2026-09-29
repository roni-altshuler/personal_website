"use client";
import { useEffect, useState } from "react";
import { EMAIL } from "../data/site";
export default function CopyEmail() {
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  async function copy() {
    try { await navigator.clipboard.writeText(EMAIL); setMessage("Email address copied."); }
    catch { setMessage("Copy unavailable. Select the email address above to copy it."); }
  }
  return <div className="copy-email"><button style={{ display: ready ? undefined : "none" }} className="button button-secondary" onClick={copy} type="button">Copy email address</button><p className="copy-status" role="status">{message}</p></div>;
}
