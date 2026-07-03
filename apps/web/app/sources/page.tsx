import Link from "next/link";
import { getAllSources, getSourceStats } from "@/lib/sourceRegistry";

function formatBooleanLike(value: boolean | string) {
  if (typeof value === "boolean") {
    return value ? "yes" : "no";
  }

  return value.replaceAll("_", " ");
}

export default function SourcesPage() {
  const sources = getAllSources();
  const stats = getSourceStats();

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Source registry</p>
          <h1>Every source needs provenance.</h1>
          <p>
            AgentCounsel Hub should not treat public access as permission to copy. This registry tracks data origins, access methods, and reuse cautions before ingestion.
          </p>
          <div className="button-row">
            <Link className="secondary-button" href="/sources/schema">View registry contract</Link>
            <Link className="secondary-button" href="/api/sources/schema">Schema JSON</Link>
          </div>
        </div>
        <aside className="hero-card">
          <span className="eyebrow">Registry snapshot</span>
          <div className="stat-grid">
            <div className="stat"><strong>{stats.total}</strong><span>sources</span></div>
            <div className="stat"><strong>{stats.caseLaw}</strong><span>case-law sources</span></div>
            <div className="stat"><strong>{stats.guidance}</strong><span>guidance sources</span></div>
            <div className="stat"><strong>{stats.mvpPriority}</strong><span>MVP priority</span></div>
          </div>
        </aside>
      </section>

      <section className="guidance-grid">
        {sources.map((source) => (
          <article className="guidance-card" key={source.id}>
            <div className="result-meta">
              <span className="pill">{source.type.replaceAll("_", " ")}</span>
              <span className="pill">{source.accessMethod.replaceAll("_", " ")}</span>
              <span className="pill">{source.priority.replaceAll("_", " ")}</span>
            </div>
            <div>
              <h2>{source.name}</h2>
              <p>{source.notes}</p>
            </div>
            <dl className="metadata-list">
              <div><dt>Recommended use</dt><dd>{source.recommendedUse.replaceAll("_", " ")}</dd></div>
              <div><dt>Attribution required</dt><dd>{source.attributionRequired ? "yes" : "no"}</dd></div>
              <div><dt>Store full text</dt><dd>{formatBooleanLike(source.canStoreFullText)}</dd></div>
              <div><dt>Redistribute</dt><dd>{formatBooleanLike(source.canRedistribute)}</dd></div>
            </dl>
            <div className="button-row">
              <Link className="button" href={`/sources/${source.id}`}>View details</Link>
              <a className="secondary-button" href={source.homepageUrl}>Visit</a>
              {source.apiUrl && <a className="secondary-button" href={source.apiUrl}>API</a>}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
