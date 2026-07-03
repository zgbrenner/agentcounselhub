"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { exportReviewQueue, readReviewQueue, removeReviewItem, updateReviewItem, type ReviewItem, type ReviewStatus } from "@/lib/reviewQueue";

const statuses: ReviewStatus[] = ["pending", "needs_info", "approved", "rejected"];

export function ReviewQueuePanel() {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [exportText, setExportText] = useState("");

  function refresh() {
    setItems(readReviewQueue());
  }

  useEffect(() => {
    refresh();
  }, []);

  const stats = useMemo(() => {
    return statuses.reduce<Record<ReviewStatus, number>>((accumulator, status) => {
      accumulator[status] = items.filter((item) => item.reviewStatus === status).length;
      return accumulator;
    }, { pending: 0, needs_info: 0, approved: 0, rejected: 0 });
  }, [items]);

  function updateStatus(id: string, reviewStatus: ReviewStatus) {
    setItems(updateReviewItem(id, { reviewStatus }));
  }

  function updateNote(id: string, reviewerNote: string) {
    setItems(updateReviewItem(id, { reviewerNote }));
  }

  function remove(id: string) {
    setItems(removeReviewItem(id));
  }

  return (
    <section className="panel search-panel">
      <div className="stat-grid">
        <div className="stat"><strong>{stats.pending}</strong><span>pending</span></div>
        <div className="stat"><strong>{stats.needs_info}</strong><span>needs info</span></div>
        <div className="stat"><strong>{stats.approved}</strong><span>approved</span></div>
        <div className="stat"><strong>{stats.rejected}</strong><span>rejected</span></div>
      </div>

      <div className="button-row">
        <button className="button" type="button" onClick={() => setExportText(exportReviewQueue(items))} disabled={!items.length}>Show export JSON</button>
        <button className="secondary-button" type="button" onClick={refresh}>Refresh</button>
        <Link className="secondary-button" href="/review/audit">Audit log</Link>
      </div>

      {exportText && <textarea className="textarea" readOnly value={exportText} aria-label="Review queue export JSON" />}

      <div className="results-grid">
        {items.length === 0 && <p>No local review items yet. Submit a source or correction to populate this queue.</p>}
        {items.map((item) => (
          <article className="result-card" key={item.id}>
            <div className="result-meta">
              <span className="pill">{item.type}</span>
              <span className="pill">{item.reviewStatus.replaceAll("_", " ")}</span>
              <span className="pill">{new Date(item.submittedAt).toLocaleString()}</span>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description || "No description provided."}</p>
            </div>
            <dl className="metadata-list">
              <div><dt>URL</dt><dd><a href={item.url}>{item.url}</a></dd></div>
              <div><dt>Jurisdiction</dt><dd>{item.jurisdiction || "Unspecified"}</dd></div>
              <div><dt>Topics</dt><dd>{item.topics || "Unspecified"}</dd></div>
              <div><dt>Contact</dt><dd>{item.contact || "Not provided"}</dd></div>
            </dl>
            <label>
              <span className="status">Reviewer note</span>
              <textarea className="textarea" defaultValue={item.reviewerNote ?? ""} onBlur={(event) => updateNote(item.id, event.target.value)} />
            </label>
            <div className="button-row">
              <button className="secondary-button" type="button" onClick={() => updateStatus(item.id, "pending")}>Pending</button>
              <button className="secondary-button" type="button" onClick={() => updateStatus(item.id, "needs_info")}>Needs info</button>
              <button className="secondary-button" type="button" onClick={() => updateStatus(item.id, "approved")}>Approve</button>
              <button className="secondary-button" type="button" onClick={() => updateStatus(item.id, "rejected")}>Reject</button>
              <button className="secondary-button" type="button" onClick={() => remove(item.id)}>Remove</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
