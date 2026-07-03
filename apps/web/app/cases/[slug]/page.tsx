import Link from "next/link";
import { notFound } from "next/navigation";
import { SaveCaseButton } from "@/components/SaveCaseButton";
import { formatBluebookLite, formatNeutralCitation } from "@/lib/citations";
import { getAllCases, getCaseBySlug, getRelatedCases } from "@/lib/data";

export function generateStaticParams() {
  return getAllCases().map((caseRecord) => ({ slug: caseRecord.slug }));
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const caseRecord = getCaseBySlug(params.slug);

  if (!caseRecord) {
    notFound();
  }

  const cites = getRelatedCases(caseRecord.citedCaseIds);
  const citedBy = getRelatedCases(caseRecord.citedByCaseIds);

  return (
    <article className="case-page">
      <div className="result-meta">
        <span className="pill">{caseRecord.citations[0]}</span>
        <span className="pill">{caseRecord.court}</span>
        <span className="pill">{caseRecord.dateDecided}</span>
      </div>

      <div>
        <p className="eyebrow">Case record</p>
        <h1>{caseRecord.name}</h1>
        <p>{caseRecord.summary}</p>
      </div>

      <div className="case-layout">
        <div className="results-grid">
          <section className="panel">
            <h2>Holding</h2>
            <p>{caseRecord.holding}</p>
          </section>

          <section className="panel">
            <h2>Procedural posture</h2>
            <p>{caseRecord.proceduralPosture}</p>
          </section>

          <section className="panel">
            <h2>Citation graph</h2>
            <div className="results-grid">
              <div>
                <h3>Cites</h3>
                {cites.length ? (
                  <div className="results-grid">
                    {cites.map((item) => (
                      <Link className="result-card" href={`/cases/${item.slug}`} key={item.id}>
                        <strong>{item.name}</strong>
                        <span className="status">{item.citations[0]}</span>
                      </Link>
                    ))}
                  </div>
                ) : <p>No cited cases in the seed graph.</p>}
              </div>
              <div>
                <h3>Cited by</h3>
                {citedBy.length ? (
                  <div className="results-grid">
                    {citedBy.map((item) => (
                      <Link className="result-card" href={`/cases/${item.slug}`} key={item.id}>
                        <strong>{item.name}</strong>
                        <span className="status">{item.citations[0]}</span>
                      </Link>
                    ))}
                  </div>
                ) : <p>No citing cases in the seed graph.</p>}
              </div>
            </div>
          </section>

          <section className="panel">
            <h2>Treatment signals</h2>
            {caseRecord.treatmentSignals.length ? (
              <div className="results-grid">
                {caseRecord.treatmentSignals.map((signal) => (
                  <div className="notice" key={`${signal.citingCaseId}-${signal.citedCaseId}-${signal.treatment}`}>
                    <strong>{signal.treatment}</strong>
                    <p>{signal.evidence}</p>
                    <div className="tag-row">
                      <span className="tag">confidence: {Math.round(signal.confidence * 100)}%</span>
                      <span className="tag">{signal.reviewStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No treatment signals in the seed graph yet.</p>
            )}
            <p className="warning">Treatment signals are experimental and must be verified against primary sources.</p>
          </section>
        </div>

        <aside className="sidebar">
          <section className="panel">
            <h3>Metadata</h3>
            <dl className="metadata-list">
              <div><dt>Citation</dt><dd>{caseRecord.citations.join(", ")}</dd></div>
              <div><dt>Suggested citation</dt><dd>{formatBluebookLite(caseRecord)}</dd></div>
              <div><dt>Neutral export</dt><dd>{formatNeutralCitation(caseRecord)}</dd></div>
              <div><dt>Judges</dt><dd>{caseRecord.judges.join(", ") || "Unknown"}</dd></div>
              <div><dt>Source</dt><dd><a href={caseRecord.sourceUrl}>{caseRecord.sourceName}</a></dd></div>
              <div><dt>Review status</dt><dd>{caseRecord.attorneyReviewed ? "Human reviewed" : "AI-assisted seed metadata, unreviewed"}</dd></div>
            </dl>
          </section>

          <section className="panel">
            <h3>Topics</h3>
            <div className="tag-row">
              {caseRecord.topics.map((topic) => <span className="tag" key={topic}>{topic}</span>)}
            </div>
          </section>

          <section className="panel">
            <h3>AI-readable views</h3>
            <div className="button-row">
              <Link className="secondary-button" href={`/cases/${caseRecord.slug}/json`}>JSON</Link>
              <Link className="secondary-button" href={`/cases/${caseRecord.slug}/markdown`}>Markdown</Link>
              <Link className="secondary-button" href={`/api/cases/${caseRecord.slug}`}>API</Link>
            </div>
          </section>

          <SaveCaseButton caseRecord={caseRecord} />
        </aside>
      </div>
    </article>
  );
}
