"use client";

import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";

type Role = "Employee" | "Client" | "Moderator";
type DemoUser = { email:string; password:string; role:Role; org:string; name:string };

const capabilities = [
  { n:"01", title:"Core Banking", tag:"Connected foundations", body:"A modern foundation for conventional and Islamic banking, designed around configurable products, operations and customer journeys." },
  { n:"02", title:"Digital Banking", tag:"Human digital journeys", body:"Onboarding, servicing and omnichannel experiences that connect customers, teams and banking operations." },
  { n:"03", title:"Lending", tag:"Credit with context", body:"Configurable retail and corporate lending journeys with transparent decisions and human oversight." },
  { n:"04", title:"Risk & Compliance", tag:"Evidence-first intelligence", body:"Financial-crime monitoring and investigation experiences that bring signals, context and evidence together." },
  { n:"05", title:"Trade & Treasury", tag:"Complexity made clear", body:"Trade finance, treasury and risk workflows organised into a coherent operational experience." },
];

const observations = [
  { theme:"Seasonality context", area:"Lending", orgs:"3 organisations", body:"Seasonal SME cash-flow patterns need clearer context when comparing performance periods." },
  { theme:"Alert context", area:"Risk & Compliance", orgs:"4 organisations", body:"Investigators value behavioural history and connected-entity evidence alongside rule triggers." },
  { theme:"Onboarding hand-offs", area:"Digital Banking", orgs:"3 organisations", body:"Clear progress states reduce friction when identity checks move into human review." },
];

const experiments = [
  { title:"Financial Analysis Intelligence", area:"Lending", status:"Under review", body:"Seasonality-aware analysis using synthetic SME financial statements." },
  { title:"Investigation Copilot", area:"Risk & Compliance", status:"In progress", body:"Evidence-led summaries for synthetic transaction-monitoring investigations." },
  { title:"Digital Onboarding Assistant", area:"Digital Banking", status:"Proposed", body:"Guided onboarding with transparent validation and human escalation." },
];

const demoUsers:DemoUser[] = [
  { email:"employee@azentio.demo", password:"demo123", role:"Employee", org:"Azentio", name:"Aanya Mehta" },
  { email:"client@northstar.demo", password:"demo123", role:"Client", org:"Northstar Bank", name:"Daniel Wong" },
  { email:"moderator@azentio.demo", password:"demo123", role:"Moderator", org:"Azentio", name:"Mira Rao" },
];

export default function Home(){
  const [active,setActive]=useState(0);
  const [loginOpen,setLoginOpen]=useState(false);
  const [email,setEmail]=useState("client@northstar.demo");
  const [password,setPassword]=useState("demo123");
  const [user,setUser]=useState<DemoUser|null>(null);
  const [authError,setAuthError]=useState("");
  const [tab,setTab]=useState("Overview");
  const [draft,setDraft]=useState("");
  const [visibility,setVisibility]=useState("Private to me");
  const [saved,setSaved]=useState(false);
  const selected=useMemo(()=>capabilities[active],[active]);

  useEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.from(".hero-copy > *",{opacity:0,y:28,stagger:.1,duration:.8,ease:"power3.out"});
      gsap.from(".hero-visual",{opacity:0,scale:.96,duration:1,ease:"power3.out"});
    });
    return()=>ctx.revert();
  },[]);

  const login=()=>{
    const found=demoUsers.find(x=>x.email===email.trim().toLowerCase()&&x.password===password);
    if(!found){setAuthError("Invalid demo credentials.");return;}
    setUser(found);setTab("Overview");setAuthError("");setLoginOpen(false);
    setTimeout(()=>document.querySelector("#workspace")?.scrollIntoView({behavior:"smooth"}),50);
  };

  return <main className="site">
    <header className="nav-shell">
      <a className="brand" href="#top">azentio<span>.ai</span></a>
      <nav><a href="#solutions">Solutions</a><a href="#learning">Collective learning</a><a href="#aira">AIRA</a><a href="#workspace">Portal</a></nav>
      <button className="nav-action" onClick={()=>setLoginOpen(true)}>{user?`${user.name} · ${user.role}`:"Sign in"}</button>
    </header>

    <section id="top" className="hero container">
      <div className="hero-copy">
        <div className="eyebrow"><i/> Enterprise AI for banking</div>
        <h1>Banking intelligence,<br/><em>built to be shared.</em></h1>
        <p>A public discovery experience and secure collaboration portal for employees and clients to explore banking AI, test ideas and turn governed learning into better products.</p>
        <div className="hero-actions"><a className="primary" href="#solutions">Explore banking AI <span>↗</span></a><button className="secondary" onClick={()=>setLoginOpen(true)}>Enter demo portal</button></div>
        <div className="hero-proof"><div><b>06</b><span>Banking capabilities</span></div><div><b>03+</b><span>Organisations per shared theme</span></div><div><b>100%</b><span>Synthetic demo data</span></div></div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="visual-label">COLLECTIVE INTELLIGENCE / 2026</div>
        <div className="visual-orbit orbit-a"><span>01</span></div><div className="visual-orbit orbit-b"><span>AI</span></div><div className="visual-orbit orbit-c"><span>03</span></div>
        <div className="visual-core"><small>AIRA</small><strong>Evidence<br/>→ insight</strong></div>
        <div className="visual-foot"><span>PRIVATE</span><i>→</i><span>REVIEWED</span><i>→</i><span>SHARED</span></div>
      </div>
    </section>

    <section className="ticker"><div>CORE BANKING <i/> DIGITAL BANKING <i/> LENDING <i/> RISK & COMPLIANCE <i/> TRADE & TREASURY <i/> COLLECTIVE INTELLIGENCE <i/> AIRA</div></section>

    <section id="solutions" className="section container">
      <SectionIntro number="01" label="Banking capabilities" title={<>Deep banking expertise.<br/><em>One intelligent ecosystem.</em></>} text="Explore the capabilities that connect Azentio's banking experience, from core operations to governed AI collaboration."/>
      <div className="capability-layout">
        <div className="capability-list">{capabilities.map((x,i)=><button key={x.title} className={active===i?"active":""} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)}><span>{x.n}</span><strong>{x.title}</strong><em>{x.tag}</em><i>↗</i></button>)}</div>
        <article className="capability-feature"><div className="feature-top"><span>{selected.n} / SELECTED CAPABILITY</span><b>AZENTIO BANKING</b></div><h3>{selected.title}</h3><p>{selected.body}</p><div className="feature-diagram"><div/><div/><div/><span>CONNECTED<br/>INTELLIGENCE</span></div></article>
      </div>
    </section>

    <section className="contrast-section">
      <div className="container">
        <SectionIntro number="02" label="How it works" title={<>From private signal<br/><em>to shared value.</em></>} text="A governed path keeps client knowledge useful without making private information public by default." dark/>
        <div className="journey-grid">
          <article><span>01</span><div className="journey-icon">✦</div><h3>Capture privately</h3><p>Observations begin as private drafts inside the active client workspace.</p></article>
          <article><span>02</span><div className="journey-icon">◎</div><h3>Review & de-identify</h3><p>Moderators review, redact, clarify and approve a safe shared representation.</p></article>
          <article><span>03</span><div className="journey-icon">↗</div><h3>Learn collectively</h3><p>Approved evidence becomes searchable learning for authorised participants and AIRA.</p></article>
        </div>
      </div>
    </section>

    <section id="learning" className="section container">
      <SectionIntro number="03" label="Collective learning" title={<>What the network<br/><em>is learning.</em></>} text="Synthetic examples show how repeated observations can become evidence-backed themes without exposing private client drafts."/>
      <div className="insight-grid">{observations.map((x,i)=><article key={x.theme}><div className="insight-meta"><span>0{i+1}</span><b>APPROVED / SYNTHETIC</b></div><div className="insight-mark">{i===0?"◒":i===1?"⌁":"◉"}</div><h3>{x.theme}</h3><p>{x.body}</p><footer><span>{x.area}</span><span>{x.orgs}</span></footer></article>)}</div>
    </section>

    <section className="lab-section">
      <div className="container">
        <div className="lab-head"><div><span>04 / AI LAB</span><h2>Experiments that move<br/>banking <em>forward.</em></h2></div><p>Internal experiments and entitled client sandboxes use synthetic data, structured evidence and explicit human oversight.</p></div>
        <div className="experiment-table">{experiments.map((x,i)=><div key={x.title}><span>0{i+1}</span><div><h3>{x.title}</h3><p>{x.body}</p></div><em>{x.area}</em><b>{x.status}</b><i>↗</i></div>)}</div>
      </div>
    </section>

    <section id="aira" className="section container aira-section">
      <div className="aira-copy"><span>05 / AIRA</span><h2>Ask the evidence.<br/><em>Not the noise.</em></h2><p>AIRA synthesises only permitted evidence and keeps the supporting approved contributions visible. Retrieval and summarisation do not automatically retrain a model.</p><div className="aira-pills"><span>Evidence linked</span><span>Permission aware</span><span>Uncertainty shown</span></div></div>
      <div className="aira-panel"><div className="panel-top"><span>AIRA / COLLECTIVE LEARNING</span><i>● ONLINE</i></div><div className="query"><small>QUESTION</small><p>What are clients observing about SME seasonality?</p></div><div className="response"><small>SYNTHESIS / 3 APPROVED CONTRIBUTIONS</small><p>Three fictional organisations report that seasonal cash-flow context can affect comparison consistency. The evidence suggests an emerging theme, but the sample is too small to infer market prevalence.</p><div><span>Evidence 01</span><span>Evidence 02</span><span>Evidence 03</span></div></div><footer>Confidence · limited sample <span>↗</span></footer></div>
    </section>

    <section id="workspace" className="workspace-section">
      <div className="container">
        <div className="workspace-heading"><span>06 / SECURE COLLABORATION</span><h2>{user?<>Welcome back,<br/><em>{user.name.split(" ")[0]}.</em></>:<>One portal.<br/><em>Different permissions.</em></>}</h2><p>{user?`${user.org} · ${user.role} demo workspace`:"Employee innovation, client collaboration and moderation remain distinct experiences. Sign in with a fictional identity to preview each one."}</p><button onClick={()=>setLoginOpen(true)}>{user?"Switch demo identity":"Open demo login"} ↗</button></div>
        {user?<Workspace user={user} tab={tab} setTab={setTab}/>:<div className="role-preview">{["Employee","Client","Moderator"].map((x,i)=><button key={x} onClick={()=>{setEmail(demoUsers[i].email);setPassword("demo123");setLoginOpen(true)}}><span>0{i+1}</span><h3>{x}</h3><p>{x==="Employee"?"Experiments, internal learning and improvement ideas.":x==="Client"?"Entitled sandboxes, private observations and shared learning.":"Review, redact, publish, reject and withdraw shared contributions."}</p><i>Preview role ↗</i></button>)}</div>}
      </div>
    </section>

    <section className="section container contribution">
      <div className="contribution-copy"><span>07 / CONTRIBUTE</span><h2>Private first.<br/><em>Shared by choice.</em></h2><p>Do not enter customer identities, account numbers, transaction-level data, credentials or confidential contractual terms. This prototype uses synthetic information.</p></div>
      <div className="contribution-form"><label>Market observation<textarea value={draft} onChange={e=>{setDraft(e.target.value);setSaved(false)}} placeholder="What are you observing in the market?"/></label><label>Visibility<select value={visibility} onChange={e=>setVisibility(e.target.value)}><option>Private to me</option><option>My organisation</option><option>Propose for learning community</option></select></label><button onClick={()=>setSaved(Boolean(draft.trim()))}>Save observation <span>↗</span></button>{saved&&<small>Saved as {visibility.toLowerCase()}. Community publication still requires review.</small>}</div>
    </section>

    <footer className="footer"><div className="container"><div><a className="brand" href="#top">azentio<span>.ai</span></a><h2>Build intelligence.<br/><em>Create shared value.</em></h2></div><div className="footer-meta"><span>HACKATHON PROTOTYPE / 2026</span><span>DUMMY BACKEND / SYNTHETIC DATA</span></div></div></footer>

    {loginOpen&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setLoginOpen(false)}}><div className="login-modal"><button className="modal-close" onClick={()=>setLoginOpen(false)}>×</button><div className="eyebrow"><i/> Secure demo portal</div><h2>Choose your<br/><em>workspace.</em></h2><p>Fictional identities only. Select a role below or enter the supplied credentials.</p><div className="role-choices">{demoUsers.map(x=><button key={x.role} className={email===x.email?"active":""} onClick={()=>{setEmail(x.email);setPassword(x.password)}}><span>{x.role}</span><small>{x.org}</small></button>)}</div><label>Email<input value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></label>{authError&&<small className="auth-error">{authError}</small>}<button className="login-submit" onClick={login}>Enter workspace <span>↗</span></button><small className="credential-note">All demo accounts use password <b>demo123</b></small></div></div>}
  </main>
}

function SectionIntro({number,label,title,text,dark=false}:{number:string;label:string;title:React.ReactNode;text:string;dark?:boolean}){return <div className={`section-intro ${dark?"dark":""}`}><div className="section-index"><span>{number}</span><b>{label}</b></div><h2>{title}</h2><p>{text}</p></div>}

function Workspace({user,tab,setTab}:{user:DemoUser;tab:string;setTab:(x:string)=>void}){
  const tabs=user.role==="Employee"?["Overview","Experiments","Ideas","Knowledge"]:user.role==="Client"?["Overview","Sandboxes","Observations","Shared learning"]:["Overview","Review queue","Audit","Withdrawals"];
  const rows=user.role==="Employee"?experiments.map(x=>[x.title,x.area,x.status]):user.role==="Client"?[["Digital onboarding sandbox","Digital Banking","Entitled"],["SME analysis sandbox","Lending","Entitled"],["Alert investigation sandbox","Risk & Compliance","Entitled"]]:[["Seasonal cash-flow observation","Lending","Awaiting review"],["Alert context observation","Risk & Compliance","Clarification"],["Onboarding hand-off observation","Digital Banking","Ready to publish"]];
  return <div className="workspace-ui"><aside><div className="workspace-user"><small>ACTIVE WORKSPACE</small><strong>{user.org}</strong><span>{user.name} · {user.role}</span></div>{tabs.map(x=><button className={tab===x?"active":""} key={x} onClick={()=>setTab(x)}>{x}<span>↗</span></button>)}</aside><div className="workspace-content"><header><span>{tab.toUpperCase()}</span><b>SYNTHETIC DEMO</b></header>{tab==="Overview"?<div className="workspace-stats"><article><span>AVAILABLE</span><strong>{user.role==="Client"?"03":"06"}</strong><p>{user.role==="Client"?"Entitled experiences":"Active items"}</p></article><article><span>PENDING</span><strong>{user.role==="Moderator"?"03":"02"}</strong><p>Items requiring attention</p></article><article className="wide"><span>RECENT ACTIVITY</span><h3>{user.role==="Client"?"Your observation remains private until you choose a broader audience.":user.role==="Employee"?"Financial Analysis Intelligence moved to under review.":"A de-identified contribution is ready for publication review."}</h3><p>All data shown in this prototype is fictional.</p></article></div>:<div className="workspace-rows">{rows.map((r,i)=><div key={r[0]}><span>0{i+1}</span><div><h3>{r[0]}</h3><p>{r[1]}</p></div><b>{r[2]}</b><i>↗</i></div>)}</div>}</div></div>
}
