"use client";

import { useEffect, useMemo, useState } from "react";
import { clearReviewAuditLog, exportReviewAuditLog, readReviewAuditLog, type ReviewAuditAction, type ReviewAuditEvent } from "@/lib/reviewQueue";

const actions: ReviewAuditAction[] = ["created", "status_changed", "note_updated", "removed"];

function actionLabel(action: ReviewAuditAction) {
  return action.replaceAll("_", " ");
}

export function ReviewAuditPanel() {
  const [events, setEvents] = useState<ReviewAuditEvent[]>([]);
  const [exportText, setExportText] = useState("");

  function refresh() {
    setEvents(readReviewAuditLog());
  }

  useEffect(() => {
    refresh();
  }, []);

  const stats = useMemo(() => {
    return actions.reduce<Record<ReviewAuditAction, number>>((accumulator, action) => {
      accumulator[action] = events.filter((event) => event.action === action).length;
      return accumulator;
    }, { created: 0, status_changed: 0, note_updated: 0, removed: 0 });
  }, [events]);

  function clearAudit() {
    clearReviewAuditLog();
    setEvents([]);
    setExportText("");
  }

  return (
    <section className="panel search-panel">
      <div className="stat-grid">
        <div className="stat"><strong>{stats.created}</strong><span>created</span></div>
        <div className="stat"><strong>{stats.status_changed}</strong><span>status changes</span></div>
        <div className="stat"><strong>{stats.note_updated}</strong><span>note updates</span></div>
        <div className="stat"><strong>{stats.removed}</strong><span>removed</span></div>
      </div>

      <div className="button-row">
        <button className="button" type="button" onClick={() => setExportText(exportReviewAuditLog(events))} disabled={!events.length}>Show audit JSON</button>
        <button className="secondary-button" type="button" onClick={refresh}>Refresh</button>
        <button className="secondary-button" type="button" onClick={clearAudit} disabled={!events.length}>Clear local audit</button>
      </div>

      {exportText && <textarea className="textarea" readOnly value={exportText} aria-label="Review audit export JSON" />}

      <div className="results-grid">
        {events.length === 0 && <p>No local audit events yet. Create or update review items to populate the audit trail.</p>}
        {events.map((event) => (
          <article className="result-card" key={event.id}>
            <div className="result-meta">
              <span className="pill">{actionLabel(event.action)}</span>
              <span className="pill">{new Date(event.createdAt).toLocaleString()}</span>
            </div>
            <h3>{event.itemTitle}</h3>
            <dl className="metadata-list">
              <div><dt>Item ID</dt><dd>{event.itemId}</dd></div>
              {event.fromStatus && <div><dt>From</dt><dd>{event.fromStatus.replaceAll("_", " ")}</dd></div>}
              {event.toStatus && <div><dt>To</dt><dd>{event.toStatus.replaceAll("_", " ")}</dd></div>}
              {event.note && <div><dt>Note snapshot</dt><dd>{event.note}</dd></div>}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
