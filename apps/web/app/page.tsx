import Link from "next/link";
import { CaseSearch } from "@/components/CaseSearch";
import { getAllCases, getAllCourts, getAllGuidance, getAllJurisdictions, getAllTopics } from "@/lib/data";

export default function HomePage() {
  const cases = getAllCases();
  const guidance = getAllGuidance();

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Open legal research infrastructure</p>
          <h1>The law, structured for people and agents.</h1>
          <p>
            AgentCounsel Hub is a prototype for an open, no-account legal research platform: case search, citation graphs,
            practical guidance indexes, local research folders, and AI-readable endpoints.
          </p>
          <div className="button-row">
            <Link className="button" href="/cases">Search cases</Link>
            <Link className="secondary-button" href="/guidance">Browse guidance</Link>
          </div>
        </div>
        <aside className="hero-card">
          <span className="eyebrow">Prototype snapshot</span>
          <div className="stat-grid">
            <div className="stat"><strong>{cases.length}</strong><span>seed cases</span></div>
            <div className="stat"><strong>{guidance.length}</strong><span>guidance links</span></div>
            <div className="stat"><strong>0</strong><span>accounts required</span></div>
            <div className="stat"><strong>JSON</strong><span>machine-readable</span></div>
          </div>
          <p>
            MVP data is intentionally small. The structure is the point: search, metadata, local saves, citation relationships,
            and source-aware AI fields.
          </p>
        </aside>
      </section>

      <CaseSearch
        cases={cases}
        courts={getAllCourts()}
        jurisdictions={getAllJurisdictions()}
        topics={getAllTopics()}
      />
    </>
  );
}
