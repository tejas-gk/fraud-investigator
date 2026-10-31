"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type Role = "Public" | "Employee" | "Client" | "Moderator";

const offerings = [
  { n:"01", title:"Core banking", short:"One connected foundation.", body:"Conventional and Islamic banking foundations designed for modern financial institutions." },
  { n:"02", title:"Digital banking", short:"Every channel, connected.", body:"Digital onboarding, omnichannel experiences and payments shaped around the customer journey." },
  { n:"03", title:"Lending", short:"Credit journeys, configurable.", body:"Retail and corporate lending experiences with transparent workflows and human oversight." },
  { n:"04", title:"Risk & compliance", short:"See risk in context.", body:"Financial-crime monitoring, investigation and regulatory workflows with evidence-first intelligence." },
  { n:"05", title:"Trade & treasury", short:"Complex operations, made clear.", body:"Trade finance, treasury, investment and risk operations brought into one coherent experience." },
  { n:"06", title:"Collective intelligence", short:"Learn together. Share safely.", body:"Governed client observations become de-identified, moderated learning for authorised participants." },
];

const learning = [
  ["Seasonality context", "Lending", "Three fictional organisations observe inconsistent treatment of seasonal SME cash flow."],
  ["Alert context", "Risk & compliance", "Investigators value behavioural history and connected-entity evidence alongside rule triggers."],
  ["Onboarding hand-offs", "Digital banking", "Clear progress states reduce friction when identity checks move into human review."],
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [role, setRole] = useState<Role>("Public");
  const [active, setActive] = useState(0);
  const [draft, setDraft] = useState("");
  const [visibility, setVisibility] = useState("Private to me");
  const [saved, setSaved] = useState(false);
  const selected = useMemo(() => offerings[active], [active]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: .09, wheelMultiplier: .8, smoothWheel: true });
    let raf = 0;
    const loop = (t:number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    lenis.on("scroll", ScrollTrigger.update);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth > 900) {
        gsap.to(".hero-line", { xPercent: -52, ease:"none", scrollTrigger:{ trigger:".hero-track", start:"top top", end:"bottom bottom", scrub:.6 } });
        gsap.fromTo(".hero-line", { opacity:0, y:80 }, { opacity:1, y:0, duration:1.1, ease:"expo.out" });
        gsap.to(".orbit-1", { x:"-28vw", scrollTrigger:{ trigger:".principles", start:"top bottom", end:"center center", scrub:1 } });
        gsap.to(".orbit-3", { x:"28vw", scrollTrigger:{ trigger:".principles", start:"top bottom", end:"center center", scrub:1 } });
      }
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => gsap.from(el, { y:60, opacity:0, duration:1, ease:"expo.out", scrollTrigger:{ trigger:el, start:"top 86%" } }));
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="site">
      <header className="floating-header">
        <a className="logo" href="#top"><b>azentio</b><i>.ai</i></a>
        <div className="menu-pill"><a href="#banking">Banking</a><a href="#learning">Learning</a><a href="#portal">Portal</a><a href="#aira">AIRA</a></div>
        <div className="view-pill"><span>View as</span><select value={role} onChange={e=>setRole(e.target.value as Role)}>{["Public","Employee","Client","Moderator"].map(x=><option key={x}>{x}</option>)}</select></div>
      </header>

      <section id="top" className="hero-track">
        <div className="hero-sticky">
          <div className="ambient a"/><div className="ambient b"/>
          <div className="hero-meta"><span>ENTERPRISE AI FOR BANKING</span><span>HACKATHON / 2026</span></div>
          <h1 className="hero-line">Build intelligence. Create shared value.</h1>
          <div className="hero-note"><span>01 / AZENTIO.AI</span><p>Public discovery. Employee innovation. Client collaboration. Governed collective learning that improves the offering.</p></div>
        </div>
      </section>

      <section className="intro section-pad">
        <SectionHead title="The platform" lines={["Banking,", "built forward."]}>An enterprise AI website and secure collaboration portal where banking expertise, synthetic sandboxes and governed learning live as one experience.</SectionHead>
      </section>

      <section className="principles">
        <div className="principle-sticky">
          <div className="orbit orbit-1"><span>DISCOVER</span></div><div className="orbit orbit-2"><span>COLLABORATE</span></div><div className="orbit orbit-3"><span>LEARN</span></div>
          <div className="principle-word">AZENTIO</div>
        </div>
      </section>

      <section id="banking" className="banking section-pad">
        <SectionHead title="Banking" lines={["Deep capability.", "One ecosystem."]}>From core banking to risk and compliance, the public experience makes Azentio&apos;s banking capability understandable before a visitor ever enters a workspace.</SectionHead>
        <div className="service-list">
          {offerings.map((x,i)=><button key={x.n} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)} className={active===i?"active":""}><span>{x.n}</span><strong>{x.title}</strong><em>{x.short}</em><b>↗</b></button>)}
        </div>
        <div className="selected-service"><span>{selected.n} / SELECTED</span><h3>{selected.title}</h3><p>{selected.body}</p><div className="service-art"><i/><i/><i/><i/></div></div>
      </section>

      <section id="learning" className="learning section-pad">
        <SectionHead title="Collective learning" lines={["Private first.", "Shared by choice."]}>Clients submit observations as private drafts. Only reviewed, appropriately de-identified contributions become shared learning for authorised participants.</SectionHead>
        <div className="learning-grid">{learning.map((x,i)=><article key={x[0]} data-reveal><div><span>0{i+1}</span><small>APPROVED / SYNTHETIC</small></div><h3>{x[0]}</h3><p>{x[2]}</p><footer>{x[1]} · 3+ organisations</footer></article>)}</div>
      </section>

      <section id="portal" className="portal section-pad">
        <SectionHead title="The portal" lines={["Identity aware.", "Tenant aware."]}>The challenge calls for distinct public, employee and client experiences. This prototype lets judges move between them while the real backend remains intentionally mocked.</SectionHead>
        <div className="portal-toolbar"><div><i/>DEMO IDENTITY</div>{(["Public","Employee","Client","Moderator"] as Role[]).map(x=><button className={role===x?"active":""} key={x} onClick={()=>setRole(x)}>{x}</button>)}</div>
        <RoleExperience role={role}/>
      </section>

      <section className="capture section-pad">
        <div className="capture-copy" data-reveal><span>OBSERVATION CAPTURE</span><h2>Private first.<br/><i>Shared by choice.</i></h2><p>Do not enter customer identities, account numbers, transaction-level data, credentials or confidential contractual terms. The hackathon uses synthetic information.</p></div>
        <div className="capture-form" data-reveal><label>Market observation<textarea value={draft} onChange={e=>{setDraft(e.target.value);setSaved(false)}} placeholder="What are you observing in the market?"/></label><label>Audience<select value={visibility} onChange={e=>setVisibility(e.target.value)}><option>Private to me</option><option>My organisation</option><option>Propose for learning community</option></select></label><button onClick={()=>setSaved(!!draft.trim())}>Save observation <b>↗</b></button>{saved&&<small>Saved as {visibility.toLowerCase()}. Community publication still requires moderation.</small>}</div>
      </section>

      <section id="aira" className="aira section-pad">
        <div className="aira-label">AIRA</div><div className="aira-content" data-reveal><span>AI-ASSISTED SYNTHESIS</span><h2>Evidence in.<br/>Clarity out.</h2><p>AIRA summarises only permitted evidence and cites approved contributions. Retrieval and synthesis are not model retraining.</p><div className="answer"><small>DEMO QUERY / SYNTHETIC DATA</small><h3>What are clients observing about SME seasonality?</h3><p>Three fictional organisations report that seasonal cash-flow context can affect comparison consistency. The sample is small; treat this as an emerging theme, not proof of prevalence.</p><footer><span>03 approved contributions</span><span>Confidence / limited sample</span></footer></div></div>
      </section>

      <section className="finale"><div className="finale-grid">{["PUBLIC","EMPLOYEE","CLIENT","LEARNING","AIRA","GOVERNED","BANKING","AI","AZENTIO"].map((x,i)=><div key={x} className={i===8?"brand-cell":""}>{x}</div>)}</div><h2>Build intelligence.<br/><i>Create shared value.</i></h2><div className="finale-foot"><span>azentio.ai / Hackathon prototype</span><span>Dummy backend · Synthetic data</span></div></section>
    </main>
  );
}

function SectionHead({title,lines,children}:{title:string;lines:string[];children:React.ReactNode}){return <div className="section-head" data-reveal><h2>{title}</h2><div className="head-lines">{lines.map(x=><span key={x}>{x}</span>)}</div><p>{children}</p></div>}

function RoleExperience({role}:{role:Role}){
 const data={
  Public:["Public discovery","Understand the offering before signing in.",["Product catalogue","Approved insights","Media & events","Demo enquiries"]],
  Employee:["Employee innovation","A private place to experiment and improve.",["Internal Playground","Experiments","Live sessions","Improvement ideas"]],
  Client:["Northstar Bank","A tenant-isolated workspace with entitled experiences.",["Entitled sandboxes","My observations","Shared learning","Idea updates"]],
  Moderator:["Learning moderation","Review what is safe to share across the community.",["Review queue","Redaction","Publish / reject","Reports & withdrawal"]],
 } as const;
 const x=data[role];
 return <div className="role-experience"><div><span>{role.toUpperCase()} EXPERIENCE</span><h3>{x[0]}</h3><p>{x[1]}</p></div><div className="role-links">{x[2].map((y,i)=><div key={y}><span>0{i+1}</span><b>{y}</b><i>↗</i></div>)}</div></div>
}
