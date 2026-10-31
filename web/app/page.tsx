"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities=[
 {n:"01",title:"Core Banking",tag:"Connected foundations",body:"Configurable conventional and Islamic banking foundations for modern financial institutions."},
 {n:"02",title:"Digital Banking",tag:"Human digital journeys",body:"Onboarding, servicing, payments and omnichannel journeys connected around the customer."},
 {n:"03",title:"Lending",tag:"Credit with context",body:"Retail and corporate lending experiences with transparent workflows and human oversight."},
 {n:"04",title:"Risk & Compliance",tag:"Evidence-first intelligence",body:"Financial-crime monitoring and investigation that brings signals, context and evidence together."},
 {n:"05",title:"Trade & Treasury",tag:"Complexity made clear",body:"Trade finance, treasury and risk operations organised into one coherent experience."}
];
const observations=[
 {theme:"Seasonality context",area:"Lending",body:"Seasonal SME cash-flow patterns need clearer context when comparing performance periods."},
 {theme:"Alert context",area:"Risk & Compliance",body:"Investigators value behavioural history and connected-entity evidence alongside rule triggers."},
 {theme:"Onboarding hand-offs",area:"Digital Banking",body:"Clear progress states reduce friction when identity checks move into human review."}
];
const experiments=[
 {title:"Financial Analysis Intelligence",area:"Lending",status:"Under review"},
 {title:"Investigation Copilot",area:"Risk & Compliance",status:"In progress"},
 {title:"Digital Onboarding Assistant",area:"Digital Banking",status:"Proposed"}
];

export default function Home(){
 const root=useRef<HTMLElement>(null); const [active,setActive]=useState(0); const selected=useMemo(()=>capabilities[active],[active]);
 useEffect(()=>{const ctx=gsap.context(()=>{
  gsap.from(".hero-copy > *",{opacity:0,y:35,stagger:.09,duration:.85,ease:"power3.out"});
  gsap.to(".hero-orb-a",{y:-70,x:40,scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
  gsap.to(".hero-orb-b",{y:80,x:-50,scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el=>gsap.from(el,{opacity:0,y:45,duration:.8,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%"}}));
  const cards=gsap.utils.toArray<HTMLElement>(".stack-card"); cards.forEach((card,i)=>gsap.set(card,{y:i*14,scale:1-i*.035,zIndex:cards.length-i}));
  if(cards.length) ScrollTrigger.create({trigger:".sticky-showcase",start:"top top",end:"+=2600",pin:true,scrub:1,onUpdate:self=>{const p=self.progress*cards.length;cards.forEach((card,i)=>{const d=p-i;if(d>0)gsap.set(card,{y:-Math.min(d,1)*700,rotation:Math.min(d,1)*-5,scale:1});else gsap.set(card,{y:(i-p)*14,rotation:0,scale:1-(i-p)*.035});});}});
 },root);return()=>ctx.revert()},[]);
 return <main ref={root} className="site">
  <header className="nav-shell"><a className="brand" href="#top">azentio<span>.ai</span></a><nav><a href="#solutions">Solutions</a><a href="#learning">Learning</a><a href="#lab">AI Lab</a><a href="#aira">AIRA</a></nav><a className="nav-action" href="/portal">Enter portal</a></header>
  <section id="top" className="hero container"><div className="hero-copy"><div className="eyebrow"><i/> Enterprise AI for banking</div><h1>Intelligence for<br/><em>banking that moves.</em></h1><p>Discover banking capabilities, experiment safely and turn governed client learning into better products—without blurring private and shared information.</p><div className="hero-actions"><a className="primary" href="#solutions">Explore the platform <span>↗</span></a><a className="secondary" href="/portal">Enter secure portal</a></div><div className="hero-proof"><div><b>05</b><span>Banking capabilities</span></div><div><b>03+</b><span>Organisations per safe theme</span></div><div><b>100%</b><span>Synthetic demo data</span></div></div></div><div className="hero-canvas"><div className="hero-grid"/><div className="hero-orb hero-orb-a"/><div className="hero-orb hero-orb-b"/><div className="hero-rings"><i/><i/><i/><i/></div><div className="hero-core"><small>AIRA / 2026</small><strong>Evidence<br/>becomes<br/><em>clarity.</em></strong></div><div className="hero-flow"><span>PRIVATE</span><b>→</b><span>REVIEWED</span><b>→</b><span>SHARED</span></div></div></section>
  <section className="marquee"><div>CORE BANKING ✦ DIGITAL BANKING ✦ LENDING ✦ RISK & COMPLIANCE ✦ TRADE & TREASURY ✦ COLLECTIVE INTELLIGENCE ✦ AIRA ✦ CORE BANKING ✦ DIGITAL BANKING ✦</div></section>
  <section id="solutions" className="section container"><SectionIntro number="01" label="Banking capabilities" title={<>One ecosystem.<br/><em>Many moving parts.</em></>} text="A banking platform should feel connected. Hover through the capability system to see how each layer contributes to the whole."/><div className="capability-layout"><div className="capability-list">{capabilities.map((x,i)=><button key={x.title} className={active===i?"active":""} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)}><span>{x.n}</span><strong>{x.title}</strong><em>{x.tag}</em><i>↗</i></button>)}</div><article className="capability-feature"><div className="feature-top"><span>{selected.n} / SELECTED</span><b>CONNECTED BANKING</b></div><h3>{selected.title}</h3><p>{selected.body}</p><div className="feature-mesh"><i/><i/><i/><i/><span>AI</span></div></article></div></section>
  <section className="kinetic-band"><div className="kinetic-word">DISCOVER · COLLABORATE · LEARN ·</div><div className="kinetic-copy"><span>02 / COLLECTIVE INTELLIGENCE</span><p>Useful knowledge does not need to look like another dashboard. The experience itself shows the journey from private signal to governed shared learning.</p></div></section>
  <section id="learning" className="sticky-showcase"><div className="stack-heading"><span>03 / GOVERNED LEARNING</span><h2>Private first.<br/><em>Shared by choice.</em></h2><p>Scroll through the lifecycle. Each stage keeps a clear boundary between private source material and the approved shared representation.</p></div><div className="stack-stage"><article className="stack-card card-one"><span>01 / CAPTURE</span><h3>Observe privately.</h3><p>A client records a market observation inside its own workspace. Saving never means publishing.</p><div className="mini-ui"><small>MARKET OBSERVATION</small><b>Seasonal SME cash flow needs more context.</b><i>PRIVATE DRAFT</i></div></article><article className="stack-card card-two"><span>02 / MODERATE</span><h3>Review what can travel.</h3><p>A moderator can clarify, redact, reject or create a de-identified representation.</p><div className="redaction"><b>Client name</b><i/><b>Account detail</b><i/><b>Safe theme</b><em>Seasonality context</em></div></article><article className="stack-card card-three"><span>03 / PUBLISH</span><h3>Turn evidence into learning.</h3><p>Only approved material enters authorised search, themes and AIRA retrieval.</p><div className="signal-map"><i/><i/><i/><strong>3+</strong><small>distinct synthetic organisations</small></div></article></div></section>
  <section className="section container"><SectionIntro number="04" label="Signals" title={<>What the network<br/><em>is learning.</em></>} text="Three synthetic examples demonstrate evidence-backed themes without exposing private drafts."/><div className="insight-grid">{observations.map((x,i)=><article key={x.theme} data-reveal><div className="insight-meta"><span>0{i+1}</span><b>APPROVED / SYNTHETIC</b></div><div className={`generative-mark mark-${i}`}><i/><i/><i/></div><h3>{x.theme}</h3><p>{x.body}</p><footer><span>{x.area}</span><span>3+ organisations</span></footer></article>)}</div></section>
  <section id="lab" className="lab-section"><div className="container"><div className="lab-head"><div><span>05 / AI LAB</span><h2>Experiments with<br/><em>room to move.</em></h2></div><p>Internal experiments and entitled client sandboxes use synthetic data, evidence and explicit human oversight.</p></div><div className="experiment-table">{experiments.map((x,i)=><div key={x.title}><span>0{i+1}</span><h3>{x.title}</h3><em>{x.area}</em><b>{x.status}</b><i>↗</i></div>)}</div></div></section>
  <section id="aira" className="aira-immersive"><div className="aira-orbit"><i/><i/><i/><span>AIRA</span></div><div className="aira-copy"><span>06 / AI-ASSISTED SYNTHESIS</span><h2>Ask the evidence.<br/><em>See the evidence.</em></h2><p>AIRA synthesises permitted evidence and keeps supporting contributions visible. Retrieval and summarisation do not automatically retrain a model.</p><div className="aira-query"><small>QUESTION</small><b>What are clients observing about SME seasonality?</b><p>Three fictional organisations report that seasonal cash-flow context can affect comparison consistency. Treat this as an emerging theme, not market prevalence.</p><footer><span>03 evidence links</span><span>Confidence · limited sample</span></footer></div></div></section>
  <section className="portal-cta"><div className="container"><span>07 / SECURE COLLABORATION</span><h2>Public discovery ends here.<br/><em>Collaboration starts inside.</em></h2><p>Employees, client organisations and learning moderators have separate permission-aware experiences in the secure portal.</p><a href="/portal">Enter the portal <b>↗</b></a></div></section>
  <footer className="footer"><div className="footer-marquee">BUILD INTELLIGENCE · CREATE SHARED VALUE ·</div><div className="container footer-bottom"><a className="brand" href="#top">azentio<span>.ai</span></a><div><span>HACKATHON PROTOTYPE / 2026</span><span>DUMMY BACKEND / SYNTHETIC DATA</span></div></div></footer>
 </main>
}
function SectionIntro({number,label,title,text}:{number:string;label:string;title:React.ReactNode;text:string}){return <div className="section-intro" data-reveal><div className="section-index"><span>{number}</span><b>{label}</b></div><h2>{title}</h2><p>{text}</p></div>}
