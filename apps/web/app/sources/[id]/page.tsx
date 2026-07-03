import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSources, getSourceById } from "@/lib/sourceRegistry";

function formatValue(value: boolean | string) {
  if (typeof value === "boolean") {
    return value ? "yes" : "no";
  }

  return value.replaceAll("_", " ");
}

export function generateStaticParams() {
  return getAllSources().map((source) => ({ id: source.id }));
}

export default function SourceDetailPage({ params }: { params: { id: string } }) {
  const source = getSourceById(params.id);

  if (!source) {
    notFound();
  }

  return (
    <article className="case-page">
      <div className="result-meta">
        <span className="pill">{source.type.replaceAll("_", " ")}</span>
        <span className="pill">{source.accessMethod.replaceAll("_", " ")}</span>
        <span className="pill">{source.priority.replaceAll("_", " ")}</span>
      </div>

      <div>
        <p className="eyebrow">Source detail</p>
        <h1>{source.name}</h1>
        <p>{source.notes}</p>
      </div>

      <div className="case-layout">
        <section className="panel">
          <h2>Use policy</h2>
          <p>
            This page captures the current ingestion posture for this source. It should be checked before importing, storing, summarizing, or redistributing materials from the source.
          </p>
          <dl className="metadata-list">
            <div><dt>Recommended use</dt><dd>{source.recommendedUse.replaceAll("_", " ")}</dd></div>
            <div><dt>Attribution required</dt><dd>{source.attributionRequired ? "yes" : "no"}</dd></div>
            <div><dt>Store full text</dt><dd>{formatValue(source.canStoreFullText)}</dd></div>
            <div><dt>Redistribute</dt><dd>{formatValue(source.canRedistribute)}</dd></div>
          </dl>
          <p className="warning">Before live ingestion, confirm the current terms, API limits, attribution requirements, and redistribution rules.</p>
        </section>

        <aside className="sidebar">
          <section className="panel">
            <h3>Access</h3>
            <dl className="metadata-list">
              <div><dt>Homepage</dt><dd><a href={source.homepageUrl}>{source.homepageUrl}</a></dd></div>
              {source.apiUrl && <div><dt>API</dt><dd><a href={source.apiUrl}>{source.apiUrl}</a></dd></div>}
              <div><dt>Source ID</dt><dd>{source.id}</dd></div>
            </dl>
          </section>
          <section className="panel">
            <h3>Machine-readable</h3>
            <div className="button-row">
              <Link className="secondary-button" href={`/api/sources/${source.id}`}>JSON</Link>
              <Link className="secondary-button" href="/sources">All sources</Link>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
