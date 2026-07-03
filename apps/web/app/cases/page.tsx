import { CaseSearch } from "@/components/CaseSearch";
import { getAllCases, getAllCourts, getAllJurisdictions, getAllTopics } from "@/lib/data";

export default function CasesPage() {
  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <p className="eyebrow">Case search</p>
          <h1>Search open case metadata.</h1>
          <p>
            Filter by case name, citation, court, jurisdiction, and topic. This MVP uses seed data, but the interface is built for real ingestion from open legal data sources.
          </p>
        </div>
      </section>
      <CaseSearch
        cases={getAllCases()}
        courts={getAllCourts()}
        jurisdictions={getAllJurisdictions()}
        topics={getAllTopics()}
      />
    </>
  );
}
