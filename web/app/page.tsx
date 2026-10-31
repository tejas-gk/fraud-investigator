"use client";

import { useMemo, useState } from "react";
import "./styles.css";

type Role = "Public" | "Employee" | "Client" | "Moderator";

const offerings = [
  ["01", "Core banking", "Connected conventional and Islamic core banking foundations."],
  ["02", "Digital banking", "Onboarding, omnichannel banking and payment experiences."],
  ["03", "Lending", "Configurable lending journeys for retail and corporate banking."],
  ["04", "Risk & compliance", "Financial-crime monitoring, investigation and regulatory workflows."],
  ["05", "Trade & treasury", "Trade finance, treasury, risk and investment operations."],
  ["06", "Collective intelligence", "Governed client observations transformed into shared, de-identified learning."],
];

const observations = [
  { title: "Seasonality context in SME analysis", meta: "Lending · South Asia · 3 organisations", status: "Approved", body: "Seasonal cash-flow patterns can produce inconsistent interpretations when comparison periods are not made explicit." },
  { title: "More context needed in transaction alerts", meta: "Risk & compliance · MEA · 4 organisations", status: "Approved", body: "Investigators benefit when alerts surface behavioural history and connected entities alongside rule triggers." },
  { title: "Faster digital onboarding hand-offs", meta: "Digital banking · APAC · 3 organisations", status: "Approved", body: "Clients report friction when identity checks require a manual hand-off without a clear progress state." },
];

const experiments = [
  { title: "Financial Analysis Intelligence", owner: "Banking AI Lab", status: "Under review", desc: "Seasonality-aware comparison explanations using synthetic SME statements." },
  { title: "AMLOCK Investigation Copilot", owner: "Risk & Compliance", status: "In progress", desc: "Evidence-first summaries for synthetic transaction-monitoring cases." },
  { title: "Digital Onboarding Assistant", owner: "Digital Banking", status: "Proposed", desc: "Guided synthetic onboarding with transparent validation and escalation." },
];

export default function Home() {
  const [role, setRole] = useState<Role>("Public");
  const [activeOffering, setActiveOffering] = useState(0);
  const [draft, setDraft] = useState("");
  const [share, setShare] = useState("Private to me");
  const [submitted, setSubmitted] = useState(false);
  const offering = useMemo(() => offerings[activeOffering], [activeOffering]);

  return (
    <main className="site-shell">
      <header className="nav-wrap">
        <a href="#top" className="brand"><span className="brand-word">azentio</span><span className="brand-dot">.ai</span></a>
        <nav><a href="#solutions">Banking</a><a href="#learning">Collective learning</a><a href="#portal">Portal</a><a href="#aira">AIRA</a></nav>
        <div className="role-switcher">
          <span>VIEW AS</span>
          <select value={role} onChange={(e) => setRole(e.target.value as Role)}>{["Public","Employee","Client","Moderator"].map(r => <option key={r}>{r}</option>)}</select>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-grid"/><div className="hero-orb hero-orb-a"/><div className="hero-orb hero-orb-b"/>
        <div className="hero-copy">
          <p className="kicker">AZENTIO.AI / BANKING INTELLIGENCE / 2026</p>
          <h1>Build intelligence.<span>Create shared value.</span></h1>
          <div className="hero-bottom">
            <p>An enterprise AI experience for banking: discover Azentio capabilities, explore governed sandboxes and turn market observations into collective learning without exposing private client information.</p>
            <a href="#portal" className="round-cta"><span>Enter</span><strong>↓</strong></a>
          </div>
        </div>
        <div className="ticker"><div>CORE BANKING · DIGITAL · LENDING · RISK & COMPLIANCE · TRADE FINANCE · TREASURY · COLLECTIVE LEARNING ·</div></div>
      </section>

      <section className="statement-section">
        <div className="section-label">BANKING, FORWARD</div>
        <p className="statement">Technology for financial institutions that connects deep banking capability with purposeful AI, governed collaboration and human oversight.</p>
      </section>

      <section id="solutions" className="pipeline-section">
        <div className="section-label light">BANKING CAPABILITIES</div>
        <div className="pipeline-row offering-grid">
          {offerings.map((item, i) => <button key={item[0]} onClick={() => setActiveOffering(i)} className={`pipeline-card offering-card ${i===activeOffering?"selected":""}`}><div className="pipeline-num">{item[0]}</div><h2>{item[1]}</h2><p>{item[2]}</p></button>)}
        </div>
        <div className="feature-callout"><span>SELECTED CAPABILITY</span><strong>{offering[1]}</strong><p>{offering[2]} The prototype uses synthetic data and simulated outputs only.</p></div>
      </section>

      <section id="learning" className="cases-section">
        <div className="case-heading-row"><div><div className="section-label">COLLECTIVE LEARNING</div><h2>Learn together. Share safely.</h2></div><p>Approved, de-identified observations become searchable evidence for authorised participants. Private drafts remain private.</p></div>
        <div className="insight-grid">{observations.map((x,i)=><article className="insight-card" key={x.title}><span>0{i+1} / {x.status.toUpperCase()}</span><h3>{x.title}</h3><p>{x.body}</p><small>{x.meta}</small></article>)}</div>
      </section>

      <section id="portal" className="portal-section">
        <div className="portal-head"><div><div className="section-label light">SECURE COLLABORATION PORTAL</div><h2>{role} experience</h2></div><div className="identity-pill"><i/> Demo identity · {role}</div></div>
        {role === "Public" && <div className="role-panel"><div className="role-copy"><span>PUBLIC DISCOVERY</span><h3>Explore products, insights and approved media.</h3><p>Public visitors can discover Azentio banking capabilities, request a demo and register interest without access to private workspaces or internal content.</p></div><div className="permission-card"><b>Available</b><p>Product catalogue</p><p>Approved insights</p><p>Demo enquiry</p><p>Events</p></div></div>}
        {role === "Employee" && <div className="experiment-grid">{experiments.map(x=><article className="experiment" key={x.title}><span>{x.status}</span><h3>{x.title}</h3><p>{x.desc}</p><small>{x.owner}</small></article>)}</div>}
        {role === "Client" && <div className="client-grid"><div className="workspace-card"><span>ACTIVE WORKSPACE</span><h3>Northstar Bank · Sandbox</h3><p>Entitled demos: Digital Banking, Lending, Risk & Compliance</p><div className="mini-stats"><b>3<small>Entitlements</small></b><b>2<small>Observations</small></b><b>1<small>Idea update</small></b></div></div><div className="permission-card"><b>Workspace controls</b><p>Tenant-isolated demo runs</p><p>Private contribution tracking</p><p>Approved shared learning</p><p>Invitation-only briefings</p></div></div>}
        {role === "Moderator" && <div className="moderation-card"><div><span>REVIEW QUEUE / 03</span><h3>Seasonal SME cash-flow treatment</h3><p>Proposed shared copy has been de-identified. Review evidence quality and audience before publication.</p></div><div className="moderation-actions"><button>Request clarification</button><button>Reject</button><button className="primary">Publish approved copy</button></div></div>}
      </section>

      <section className="contribution-section">
        <div className="contribution-copy"><div className="section-label">OBSERVATION CAPTURE</div><h2>Private first.<br/>Shared by choice.</h2><p>Do not enter customer identities, account numbers, transaction-level data, credentials or confidential contractual information. This hackathon experience uses synthetic information only.</p></div>
        <div className="contribution-form"><label>Market observation<textarea value={draft} onChange={e=>{setDraft(e.target.value);setSubmitted(false)}} placeholder="Example: We are seeing seasonal SME cash flow create inconsistent comparison outcomes..."/></label><label>Who can see this version?<select value={share} onChange={e=>setShare(e.target.value)}><option>Private to me</option><option>My organisation</option><option>Propose for learning community</option></select></label><button onClick={()=>setSubmitted(Boolean(draft.trim()))}>Save {share === "Private to me" ? "private draft" : "observation"}</button>{submitted && <p className="success-note">Saved as {share.toLowerCase()}. Shared publication still requires moderation.</p>}</div>
      </section>

      <section id="aira" className="aira-section"><div className="aira-mark">AIRA</div><div><span>AI-ASSISTED SYNTHESIS</span><h2>Answers grounded in permitted evidence.</h2><p>AIRA summarises authorised, approved contributions with evidence references. Retrieval and synthesis do not automatically retrain a model, and withdrawn shared material is excluded from future retrieval.</p><div className="aira-answer"><small>DEMO QUERY</small><b>What are clients observing about SME seasonality?</b><p>Three synthetic organisations report that seasonal cash-flow context can affect comparison consistency. The sample is small; treat this as an emerging theme, not proof of market prevalence.</p><em>Evidence · 3 approved contributions · Synthetic demo</em></div></div></section>

      <section className="closing-section"><p>PUBLIC DISCOVERY · EMPLOYEE INNOVATION · CLIENT COLLABORATION</p><h2>intelligence,<br/>governed.</h2><div className="closing-foot"><span>azentio.ai / Hackathon prototype / Dummy backend</span><a href="https://www.azentio.com/" target="_blank">Azentio ↗</a></div></section>
    </main>
  );
}
