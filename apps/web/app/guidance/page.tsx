import Link from "next/link";
import { getAllGuidance } from "@/lib/data";

export default function GuidancePage() {
  const guidance = getAllGuidance();

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <p className="eyebrow">Practical guidance index</p>
          <h1>Public resources, source-first.</h1>
          <p>
            This index links to public guidance and templates with concise metadata. The MVP intentionally avoids copying full articles or forms unless reuse terms are clear.
          </p>
          <div className="button-row">
            <Link className="secondary-button" href="/guidance/schema">View guidance contract</Link>
            <Link className="secondary-button" href="/api/guidance/schema">Schema JSON</Link>
          </div>
        </div>
      </section>

      <section className="guidance-grid">
        {guidance.map((resource) => (
          <article className="guidance-card" key={resource.id}>
            <div className="result-meta">
              <span className="pill">{resource.category}</span>
              <span className="pill">{resource.jurisdiction}</span>
              <span className="pill">{resource.publisher}</span>
            </div>
            <div>
              <h2>{resource.title}</h2>
              <p>{resource.summary}</p>
            </div>
            <div className="tag-row">
              {resource.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
            <div className="notice">
              <strong>Reuse note</strong>
              <p>{resource.licenseNote}</p>
            </div>
            <div className="button-row">
              <a className="button" href={resource.url}>Open source</a>
              <Link className="secondary-button" href="/submit">Suggest related resource</Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
