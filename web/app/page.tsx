async function getScenarios() {
  const res = await fetch(`${process.env.API_URL ?? "http://api:8000"}/demo/scenarios`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const scenarios = await getScenarios();

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      <h1>Fraud Investigator</h1>
      <p>Real-time transaction risk scoring and investigation prototype.</p>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: 24 }}>
        {scenarios.map((scenario: any) => (
          <article key={scenario.name} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 18 }}>
            <h2 style={{ fontSize: 18 }}>{scenario.name}</h2>
            <p>{scenario.description}</p>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, background: "#f6f6f6", padding: 12, borderRadius: 8 }}>
              {JSON.stringify(scenario.transaction, null, 2)}
            </pre>
          </article>
        ))}
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>How to test</h2>
        <p>Open the FastAPI docs at <code>http://localhost:8000/docs</code> and call <code>POST /transactions/evaluate</code> with any scenario above.</p>
      </section>
    </main>
  );
}
