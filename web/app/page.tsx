"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type Role = "Public" | "Employee" | "Client" | "Moderator";
type DemoUser = { email:string; password:string; role:Role; org:string; name:string; workspace:string };

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

const demoUsers:DemoUser[] = [
  { email:"employee@azentio.demo", password:"demo123", role:"Employee", org:"Azentio", name:"Aanya Mehta", workspace:"Banking AI Lab" },
  { email:"client@northstar.demo", password:"demo123", role:"Client", org:"Northstar Bank", name:"Daniel Wong", workspace:"Northstar Bank · Sandbox" },
  { email:"moderator@azentio.demo", password:"demo123", role:"Moderator", org:"Azentio", name:"Mira Rao", workspace:"Learning Moderation" },
];

const archiveItems = [
  { order:1, title:"AMLOCK Investigation Copilot", kind:"Risk & Compliance", status:"Under review", desc:"Evidence-first case summaries for synthetic transaction monitoring alerts." },
  { order:2, title:"Financial Analysis Intelligence", kind:"Lending", status:"In progress", desc:"Seasonality-aware SME analysis using synthetic financial statements." },
  { order:3, title:"Digital Onboarding Assistant", kind:"Digital Banking", status:"Proposed", desc:"Transparent guided onboarding with clear validation and human escalation." },
  { order:4, title:"Connected-Entity Explorer", kind:"Fraud Graph", status:"Ready", desc:"Visualise shared devices, IPs and beneficiaries across synthetic accounts." },
  { order:5, title:"AIRA Evidence Synthesis", kind:"Collective Learning", status:"Ready", desc:"Summarise approved shared contributions with evidence links and uncertainty." },
  { order:6, title:"Policy Guardrail Simulator", kind:"Governance", status:"Ready", desc:"Demonstrate prompt-injection defence, redaction and policy decisions." },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [role, setRole] = useState<Role>("Public");
  const [active, setActive] = useState(0);
  const [draft, setDraft] = useState("");
  const [visibility, setVisibility] = useState("Private to me");
  const [saved, setSaved] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const filtered = archiveItems.filter(x => `${x.title} ${x.kind} ${x.status}`.toLowerCase().includes(deferredQuery));
  const selected = useMemo(() => offerings[active], [active]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("client@northstar.demo");
  const [password, setPassword] = useState("demo123");
  const [user, setUser] = useState<DemoUser|null>(null);
  const [authError, setAuthError] = useState("");
  const [workspaceTab, setWorkspaceTab] = useState("Overview");

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

  const login = () => {
    const found = demoUsers.find(x => x.email === email.trim().toLowerCase() && x.password === password);
    if (!found) { setAuthError("Invalid demo credentials."); return; }
    setUser(found); setRole(found.role); setLoginOpen(false); setAuthError(""); setWorkspaceTab("Overview");
    setTimeout(() => document.querySelector("#workspace")?.scrollIntoView({ behavior:"smooth" }), 50);
  };

  return (
    <main ref={root} className="site">
      <header className="floating-header">
        <a className="logo" href="#top"><b>azentio</b><i>.ai</i></a>
        <div className="menu-pill"><a href="#banking">Banking</a><a href="#experiments">Experiments</a><a href="#learning">Learning</a><a href="#portal">Portal</a><a href="#aira">AIRA</a></div>
        <div className="view-pill">{user ? <button className="identity-button" onClick={()=>setLoginOpen(true)}>{user.name} · {user.role}</button> : <button className="identity-button" onClick={()=>setLoginOpen(true)}>Demo login</button>}</div>
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

      <section id="experiments" className="archive section-pad">
        <div className="archive-masthead" data-reveal>
          <div className="archive-eyebrow"><span/> Interactive archive, 2026</div>
          <h2>AI<br/><i>Experiments</i></h2>
          <div className="archive-meta"><p>Internal experiments, client sandboxes and governed AI prototypes.</p><strong>{archiveItems.length}</strong><span>Experiments</span></div>
        </div>
        <div className="archive-tools"><label htmlFor="archive-search">Index / Search</label><input id="archive-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filter the archive"/><span>{filtered.length} results</span></div>
        <div className="experiment-list">{filtered.map(x=><button key={x.title} className="experiment-row" onClick={()=>{ setRole("Employee"); setWorkspaceTab("Experiments"); document.querySelector("#workspace")?.scrollIntoView({behavior:"smooth"}); }}><span>{String(x.order).padStart(2,"0")}</span><div><h3>{x.title}</h3><p>{x.desc}</p></div><em>{x.kind}</em><b>{x.status}</b><i>↗</i></button>)}</div>
      </section>

      <section id="learning" className="learning section-pad">
        <SectionHead title="Collective learning" lines={["Private first.", "Shared by choice."]}>Clients submit observations as private drafts. Only reviewed, appropriately de-identified contributions become shared learning for authorised participants.</SectionHead>
        <div className="learning-grid">{learning.map((x,i)=><article key={x[0]} data-reveal><div><span>0{i+1}</span><small>APPROVED / SYNTHETIC</small></div><h3>{x[0]}</h3><p>{x[2]}</p><footer>{x[1]} · 3+ organisations</footer></article>)}</div>
      </section>

      <section id="portal" className="portal section-pad">
        <SectionHead title="The portal" lines={["Identity aware.", "Tenant aware."]}>The prototype mirrors the challenge&apos;s distinct public, employee, client and moderation experiences. Demo login changes the workspace, entitlements and visible actions.</SectionHead>
        <div className="portal-toolbar"><div><i/>DEMO IDENTITY</div>{(["Public","Employee","Client","Moderator"] as Role[]).map(x=><button className={role===x?"active":""} key={x} onClick={()=>setRole(x)}>{x}</button>)}</div>
        <RoleExperience role={role}/>
      </section>

      <section id="workspace" className="workspace section-pad">
        <div className="workspace-top"><div><span>SECURE WORKSPACE / SYNTHETIC DEMO</span><h2>{user ? user.workspace : "Sign in to a demo workspace"}</h2><p>{user ? `${user.name} · ${user.org} · ${user.role}` : "Use one of the supplied fictional identities to preview server-side role and tenant concepts from the challenge."}</p></div><button onClick={()=>setLoginOpen(true)}>{user ? "Switch identity" : "Demo login"} ↗</button></div>
        {user ? <Workspace user={user} tab={workspaceTab} setTab={setWorkspaceTab}/> : <div className="workspace-locked"><span>NO ACTIVE IDENTITY</span><h3>Client and employee content stays behind authentication.</h3><p>The production version would use provisioned employee identity or invitation-based client access. This hackathon version uses fictional credentials only.</p><button onClick={()=>setLoginOpen(true)}>Open demo login</button></div>}
      </section>

      <section className="capture section-pad">
        <div className="capture-copy" data-reveal><span>OBSERVATION CAPTURE</span><h2>Private first.<br/><i>Shared by choice.</i></h2><p>Do not enter customer identities, account numbers, transaction-level data, credentials or confidential contractual terms. The hackathon uses synthetic information.</p></div>
        <div className="capture-form" data-reveal><label>Market observation<textarea value={draft} onChange={e=>{setDraft(e.target.value);setSaved(false)}} placeholder="What are you observing in the market?"/></label><label>Audience<select value={visibility} onChange={e=>setVisibility(e.target.value)}><option>Private to me</option><option>My organisation</option><option>Propose for learning community</option></select></label><button onClick={()=>setSaved(!!draft.trim())}>Save observation <b>↗</b></button>{saved&&<small>Saved as {visibility.toLowerCase()}. Community publication still requires moderation.</small>}</div>
      </section>

      <section id="aira" className="aira section-pad">
        <div className="aira-label">AIRA</div><div className="aira-content" data-reveal><span>AI-ASSISTED SYNTHESIS</span><h2>Evidence in.<br/>Clarity out.</h2><p>AIRA summarises only permitted evidence and cites approved contributions. Retrieval and synthesis are not model retraining.</p><div className="answer"><small>DEMO QUERY / SYNTHETIC DATA</small><h3>What are clients observing about SME seasonality?</h3><p>Three fictional organisations report that seasonal cash-flow context can affect comparison consistency. The sample is small; treat this as an emerging theme, not proof of prevalence.</p><footer><span>03 approved contributions</span><span>Confidence / limited sample</span></footer></div></div>
      </section>

      <section className="finale"><div className="finale-grid">{["PUBLIC","EMPLOYEE","CLIENT","LEARNING","AIRA","GOVERNED","BANKING","AI","AZENTIO"].map((x,i)=><div key={x} className={i===8?"brand-cell":""}>{x}</div>)}</div><h2>Build intelligence.<br/><i>Create shared value.</i></h2><div className="finale-foot"><span>azentio.ai / Hackathon prototype</span><span>Dummy backend · Synthetic data</span></div></section>

      {loginOpen && <div className="login-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setLoginOpen(false)}}><div className="login-card"><button className="login-close" onClick={()=>setLoginOpen(false)}>×</button><span>DEMO AUTHENTICATION</span><h2>Enter a workspace.</h2><p>Fictional accounts only. No production authentication or real customer data.</p><label>Email<input value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></label>{authError&&<small className="auth-error">{authError}</small>}<button className="login-submit" onClick={login}>Sign in ↗</button><div className="demo-creds">{demoUsers.map(x=><button key={x.email} onClick={()=>{setEmail(x.email);setPassword(x.password)}}><b>{x.role}</b><span>{x.email}</span><em>demo123</em></button>)}</div></div></div>}
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

function Workspace({user,tab,setTab}:{user:DemoUser;tab:string;setTab:(x:string)=>void}){
 const tabs = user.role === "Employee" ? ["Overview","Experiments","Ideas","Knowledge"] : user.role === "Client" ? ["Overview","Sandboxes","Observations","Shared learning"] : ["Overview","Review queue","Audit","Withdrawals"];
 return <div className="workspace-shell"><aside><div className="workspace-id"><span>ACTIVE IDENTITY</span><strong>{user.name}</strong><small>{user.org}</small></div>{tabs.map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}<span>↗</span></button>)}</aside><div className="workspace-main"><div className="workspace-bar"><span>{tab.toUpperCase()}</span><span>{user.role} · {user.org}</span></div><WorkspaceContent user={user} tab={tab}/></div></div>
}

function WorkspaceContent({user,tab}:{user:DemoUser;tab:string}){
 if(tab==="Experiments") return <div className="workspace-list">{archiveItems.slice(0,4).map(x=><div key={x.title}><span>{String(x.order).padStart(2,"0")}</span><h3>{x.title}</h3><em>{x.status}</em><i>↗</i></div>)}</div>;
 if(tab==="Sandboxes") return <div className="workspace-list">{["Digital onboarding sandbox","Lending decision sandbox","AMLOCK investigation sandbox"].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><em>Entitled</em><i>↗</i></div>)}</div>;
 if(tab==="Observations") return <div className="workspace-list">{["Seasonal SME behaviour","Manual review hand-off friction"].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><em>{i?"Organisation":"Private"}</em><i>↗</i></div>)}</div>;
 if(tab==="Review queue") return <div className="workspace-list">{["Seasonal SME cash-flow treatment","Alert context for connected entities","Onboarding hand-off transparency"].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><em>{i===0?"Ready":"Needs review"}</em><i>↗</i></div>)}</div>;
 return <div className="workspace-dashboard"><article><span>ACTIVE WORKSPACE</span><strong>{user.workspace}</strong><p>Fictional tenant and synthetic data only.</p></article><article><span>ENTITLEMENTS</span><strong>{user.role==="Client"?"03":"06"}</strong><p>Experiences visible to this identity.</p></article><article><span>PENDING</span><strong>{user.role==="Moderator"?"03":"02"}</strong><p>Items requiring review or follow-up.</p></article><article className="wide"><span>RECENT ACTIVITY</span><h3>{user.role==="Client"?"A private observation was saved to Northstar Bank.":user.role==="Moderator"?"One shared contribution is ready for publication review.":"An AI experiment moved to under review."}</h3><footer>Synthetic demo event · Just now</footer></article></div>;
}
