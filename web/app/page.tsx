"use client";

import { useMemo, useState } from "react";
import "./styles.css";

const scenarios = [
  {
    id: "account-takeover",
    eyebrow: "01 / ACCOUNT TAKEOVER",
    title: "A new device. An impossible transfer. One decision in milliseconds.",
    score: 94,
    decision: "PEND",
    type: "Possible account takeover",
    amount: "₹85,000",
    account: "ACC-9281",
    device: "DEVICE-NEW-881",
    beneficiary: "BEN-774",
    evidence: [
      "New device fingerprint",
      "18.4× normal transaction amount",
      "7 transactions in 10 minutes",
      "First-time beneficiary",
      "Location inconsistent with customer history",
    ],
  },
  {
    id: "fraud-ring",
    eyebrow: "02 / NETWORK FRAUD",
    title: "Four accounts. One device. One beneficiary. A pattern hiding in plain sight.",
    score: 97,
    decision: "REJECT",
    type: "Fraud ring detected",
    amount: "₹2.4L",
    account: "ACC-551",
    device: "DEVICE-77",
    beneficiary: "BEN-900",
    evidence: [
      "Shared device across 4 accounts",
      "Shared IP across flagged transactions",
      "Beneficiary connected to 5 risky accounts",
      "Burst transfer pattern",
      "Graph risk above critical threshold",
    ],
  },
  {
    id: "false-positive",
    eyebrow: "03 / HUMAN REVIEW",
    title: "High value does not always mean high risk. Context keeps good customers moving.",
    score: 52,
    decision: "REVIEW",
    type: "Explainable anomaly",
    amount: "₹70,000",
    account: "ACC-204",
    device: "DEVICE-204-A",
    beneficiary: "BEN-014",
    evidence: [
      "Known device",
      "Known beneficiary",
      "Historically similar transfer",
      "Amount above baseline",
      "Manual review recommended",
    ],
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const caseData = useMemo(() => scenarios[active], [active]);

  return (
    <main className="site-shell">
      <header className="nav-wrap">
        <a href="#top" className="brand" aria-label="Fraud Investigator home">
          <span className="brand-mark">FI</span>
          <span>Fraud Investigator</span>
        </a>
        <nav>
          <a href="#system">System</a>
          <a href="#cases">Cases</a>
          <a href="#investigate">Investigate</a>
          <a href="http://localhost:8000/docs" target="_blank">API ↗</a>
        </nav>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />

        <div className="hero-copy">
          <p className="kicker">REAL-TIME FRAUD INTELLIGENCE / 2026</p>
          <h1>
            Catch fraud
            <span>before money moves.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              A risk engine that combines behavioral signals, rules, network intelligence and explainable investigation evidence into one decision surface.
            </p>
            <a href="#investigate" className="round-cta" aria-label="Explore investigation demo">
              <span>Explore</span>
              <strong>↓</strong>
            </a>
          </div>
        </div>

        <div className="ticker" aria-hidden="true">
          <div>ALLOW · PEND · REJECT · INVESTIGATE · EXPLAIN · ALLOW · PEND · REJECT · INVESTIGATE · EXPLAIN ·</div>
        </div>
      </section>

      <section id="system" className="statement-section">
        <div className="section-label">THE SYSTEM</div>
        <p className="statement">
          Fraud detection should not be a black box. Every score should come with a reason, every reason with evidence, and every action with an audit trail.
        </p>
      </section>

      <section className="pipeline-section">
        <div className="section-label light">HOW IT THINKS</div>
        <div className="pipeline-row">
          {[
            ["01", "Observe", "Device, velocity, amount, location, beneficiary and history."],
            ["02", "Score", "Rules, behavioral features and graph risk become a unified score."],
            ["03", "Investigate", "Connected entities expose rings, reused devices and hidden relationships."],
            ["04", "Decide", "Allow, pend, reject or escalate with a human-readable evidence trail."],
          ].map(([num, title, body]) => (
            <article className="pipeline-card" key={num}>
              <div className="pipeline-num">{num}</div>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cases" className="cases-section">
        <div className="case-heading-row">
          <div>
            <div className="section-label">DEMO CASES</div>
            <h2>Patterns worth stopping for.</h2>
          </div>
          <p>Three seeded scenarios show how the same engine reacts differently when context changes.</p>
        </div>

        <div className="case-list">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.id}
              className={`case-row ${active === index ? "active" : ""}`}
              onClick={() => setActive(index)}
            >
              <span>{scenario.eyebrow}</span>
              <strong>{scenario.title}</strong>
              <span className="case-score">{scenario.score}/100</span>
            </button>
          ))}
        </div>
      </section>

      <section id="investigate" className="investigation-section">
        <div className="investigation-header">
          <div>
            <div className="section-label light">LIVE INVESTIGATION</div>
            <h2>{caseData.type}</h2>
          </div>
          <div className={`decision decision-${caseData.decision.toLowerCase()}`}>
            {caseData.decision}
          </div>
        </div>

        <div className="investigation-grid">
          <div className="risk-panel">
            <div className="risk-topline">
              <span>RISK SCORE</span>
              <span>CASE / {caseData.id.toUpperCase()}</span>
            </div>
            <div className="risk-score">{caseData.score}<small>/100</small></div>
            <div className="risk-meter"><span style={{ width: `${caseData.score}%` }} /></div>
            <p>{caseData.title}</p>
          </div>

          <div className="facts-panel">
            <div className="fact"><span>AMOUNT</span><strong>{caseData.amount}</strong></div>
            <div className="fact"><span>ACCOUNT</span><strong>{caseData.account}</strong></div>
            <div className="fact"><span>DEVICE</span><strong>{caseData.device}</strong></div>
            <div className="fact"><span>BENEFICIARY</span><strong>{caseData.beneficiary}</strong></div>
          </div>

          <div className="network-panel">
            <div className="network-canvas">
              <div className="node node-account">ACCOUNT</div>
              <div className="node node-device">DEVICE</div>
              <div className="node node-ip">IP</div>
              <div className="node node-beneficiary">BENEFICIARY</div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <line x1="26" y1="50" x2="50" y2="24" />
                <line x1="26" y1="50" x2="53" y2="76" />
                <line x1="50" y1="24" x2="78" y2="51" />
                <line x1="53" y1="76" x2="78" y2="51" />
              </svg>
            </div>
            <p>Entity graph connects accounts, devices, IPs and beneficiaries so suspicious reuse becomes visible.</p>
          </div>

          <div className="evidence-panel">
            <div className="evidence-title">EVIDENCE</div>
            {caseData.evidence.map((item, index) => (
              <div className="evidence-item" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <p>FROM TRANSACTION</p>
        <h2>to evidence.<br />to action.</h2>
        <div className="closing-foot">
          <span>Fraud Investigator / Hackathon Prototype</span>
          <a href="https://github.com/tejas-gk/fraud-investigator" target="_blank">View source ↗</a>
        </div>
      </section>
    </main>
  );
}
