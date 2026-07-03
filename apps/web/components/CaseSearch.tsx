"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseRecord } from "@/lib/types";
import { formatBluebookLite } from "@/lib/citations";

export function CaseSearch({
  cases,
  courts,
  jurisdictions,
  topics
}: {
  cases: CaseRecord[];
  courts: string[];
  jurisdictions: string[];
  topics: string[];
}) {
  const [query, setQuery] = useState("");
  const [court, setCourt] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [topic, setTopic] = useState("");

  const filteredCases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return cases.filter((caseRecord) => {
      const haystack = [
        caseRecord.name,
        caseRecord.citations.join(" "),
        caseRecord.court,
        caseRecord.jurisdiction,
        caseRecord.summary,
        caseRecord.holding,
        caseRecord.topics.join(" ")
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!normalizedQuery || haystack.includes(normalizedQuery))
        && (!court || caseRecord.court === court)
        && (!jurisdiction || caseRecord.jurisdiction === jurisdiction)
        && (!topic || caseRecord.topics.includes(topic))
      );
    });
  }, [cases, court, jurisdiction, query, topic]);

  return (
    <section className="panel search-panel" aria-label="Case search">
      <div className="search-controls">
        <input
          className="input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by case, citation, topic, holding..."
          aria-label="Search cases"
        />
        <select className="select" value={court} onChange={(event) => setCourt(event.target.value)} aria-label="Filter by court">
          <option value="">All courts</option>
          {courts.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="select" value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)} aria-label="Filter by jurisdiction">
          <option value="">All jurisdictions</option>
          {jurisdictions.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className="select" value={topic} onChange={(event) => setTopic(event.target.value)} aria-label="Filter by topic">
          <option value="">All topics</option>
          {topics.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>

      <div className="result-meta">
        <span className="status">{filteredCases.length} result{filteredCases.length === 1 ? "" : "s"}</span>
        <span className="status">Seed data prototype</span>
      </div>

      <div className="results-grid">
        {filteredCases.map((caseRecord) => (
          <article className="result-card" key={caseRecord.id}>
            <div className="result-meta">
              <span className="pill">{caseRecord.citations[0]}</span>
              <span className="pill">{caseRecord.dateDecided}</span>
              <span className="pill">{caseRecord.court}</span>
            </div>
            <div>
              <h3><Link href={`/cases/${caseRecord.slug}`}>{caseRecord.name}</Link></h3>
              <p>{caseRecord.summary}</p>
            </div>
            <div className="tag-row">
              {caseRecord.topics.slice(0, 4).map((item) => <span className="tag" key={item}>{item}</span>)}
            </div>
            <div className="button-row">
              <Link className="button" href={`/cases/${caseRecord.slug}`}>Open case</Link>
              <span className="status">{formatBluebookLite(caseRecord)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
