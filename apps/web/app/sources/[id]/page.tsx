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
        <span className="pill">{source.priority.replaceAll("_", " ")}</span>
        <span className="pill">{source.accessMethod.replaceAll("_", " ")}</span>
      </div>

      <div>
        <p className="eyebrow">Source record</p>
        <h1>{source.name}</h1>
        <p>{source.notes}</p>
      </div>

      <div className="case-layout">
        <section className="panel">
          <h2>Use guidance</h2>
          <p>
            Recommended use: <strong>{source.recommendedUse.replaceAll("_", " ")}</strong>.
          </p>
          <p>
            Before storing text from this source, verify the latest terms, attribution requirements, and redistribution limits.
          </p>
          <div className="button-row">
            <a className="button" href={source.homepageUrl}>Open homepage</a>
            {source.apiUrl && <a className="secondary-button" href={source.apiUrl}>Open API</a>}
            <Link className="secondary-button" href={`/api/sources/${source.id}`}>JSON</Link>
          </div>
        </section>

        <aside className="sidebar">
          <section className="panel">
            <h3>Registry metadata</h3>
            <dl className="metadata-list">
              <div><dt>ID</dt><dd>{source.id}</dd></div>
              <div><dt>Type</dt><dd>{source.type.replaceAll("_", " ")}</dd></div>
              <div><dt>Access method</dt><dd>{source.accessMethod.replaceAll("_", " ")}</dd></div>
              <div><dt>Priority</dt><dd>{source.priority.replaceAll("_", " ")}</dd></div>
              <div><dt>Attribution required</dt><dd>{formatValue(source.attributionRequired)}</dd></div>
              <div><dt>Store full text</dt><dd>{formatValue(source.canStoreFullText)}</dd></div>
              <div><dt>Redistribute</dt><dd>{formatValue(source.canRedistribute)}</dd></div>
            </dl>
          </section>
        </aside>
      </div>
    </article>
  );
}
