"use client";

import { useEffect, useMemo, useState } from "react";
import { readReviewQueue, type ReviewItem } from "@/lib/reviewQueue";
import { buildApprovedSourceProposals, exportSourceProposals } from "@/lib/sourceProposals";

export function SourceProposalPanel() {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [exportText, setExportText] = useState("");

  function refresh() {
    setItems(readReviewQueue());
  }

  useEffect(() => {
    refresh();
  }, []);

  const approvedItems = useMemo(() => items.filter((item) => item.reviewStatus === "approved"), [items]);
  const proposals = useMemo(() => buildApprovedSourceProposals(items), [items]);

  return (
    <section className="panel search-panel">
      <div className="stat-grid">
        <div className="stat"><strong>{items.length}</strong><span>review items</span></div>
        <div className="stat"><strong>{approvedItems.length}</strong><span>approved</span></div>
        <div className="stat"><strong>{proposals.length}</strong><span>proposals</span></div>
        <div className="stat"><strong>{new Set(proposals.map((proposal) => proposal.type)).size}</strong><span>types</span></div>
      </div>

      <div className="button-row">
        <button className="button" type="button" onClick={() => setExportText(exportSourceProposals(items))} disabled={!proposals.length}>Show proposal JSON</button>
        <button className="secondary-button" type="button" onClick={refresh}>Refresh</button>
      </div>

      {exportText && <textarea className="textarea" readOnly value={exportText} aria-label="Source proposal export JSON" />}

      <div className="results-grid">
        {proposals.length === 0 && <p>No approved review items yet. Approve review items to generate source registry proposals.</p>}
        {proposals.map((proposal) => (
          <article className="result-card" key={`${proposal.proposedFromReviewId}-${proposal.id}`}>
            <div className="result-meta">
              <span className="pill">{proposal.type.replaceAll("_", " ")}</span>
              <span className="pill">{proposal.priority.replaceAll("_", " ")}</span>
              <span className="pill">{proposal.accessMethod}</span>
            </div>
            <h3>{proposal.name}</h3>
            <p>{proposal.notes}</p>
            <dl className="metadata-list">
              <div><dt>Proposal ID</dt><dd>{proposal.id}</dd></div>
              <div><dt>Homepage</dt><dd><a href={proposal.homepageUrl}>{proposal.homepageUrl}</a></dd></div>
              <div><dt>Recommended use</dt><dd>{proposal.recommendedUse.replaceAll("_", " ")}</dd></div>
              <div><dt>Review item</dt><dd>{proposal.proposedFromReviewId}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
