"use client";

import { useEffect, useMemo, useState } from "react";
import type { LocalSubmission, SubmissionStatus } from "@/lib/submissions";

const STORAGE_KEY = "agentcounsel-submissions";
const statuses: SubmissionStatus[] = ["pending", "accepted", "needs_more_info", "rejected"];

type StoredSubmission = Partial<LocalSubmission> & Record<string, unknown>;

function normalizeSubmission(item: StoredSubmission, index: number): LocalSubmission {
  return {
    id: typeof item.id === "string" ? item.id : `local-${index}`,
    type: typeof item.type === "string" ? item.type : "Unknown",
    title: typeof item.title === "string" ? item.title : "Untitled submission",
    url: typeof item.url === "string" ? item.url : "",
    jurisdiction: typeof item.jurisdiction === "string" ? item.jurisdiction : "",
    topics: typeof item.topics === "string" ? item.topics : "",
    description: typeof item.description === "string" ? item.description : "",
    contact: typeof item.contact === "string" ? item.contact : "",
    submittedAt: typeof item.submittedAt === "string" ? item.submittedAt : new Date().toISOString(),
    status: statuses.includes(item.status as SubmissionStatus) ? item.status as SubmissionStatus : "pending",
    triageNotes: Array.isArray(item.triageNotes) ? item.triageNotes.map(String) : []
  };
}

export function LocalSubmissionReviewPanel() {
  const [submissions, setSubmissions] = useState<LocalSubmission[]>([]);
  const [message, setMessage] = useState("Loading local submissions...");

  function load() {
    try {
      const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as StoredSubmission[];
      const normalized = raw.map(normalizeSubmission);
      setSubmissions(normalized);
      setMessage(normalized.length ? "Loaded local submissions." : "No local submissions yet.");
    } catch {
      setMessage("Could not read local submissions.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const counts = useMemo(() => {
    return statuses.reduce<Record<SubmissionStatus, number>>((accumulator, status) => {
      accumulator[status] = submissions.filter((item) => item.status === status).length;
      return accumulator;
    }, { pending: 0, accepted: 0, needs_more_info: 0, rejected: 0 });
  }, [submissions]);

  function updateStatus(id: string, status: SubmissionStatus) {
    const next = submissions.map((item) => item.id === id ? { ...item, status } : item);
    setSubmissions(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next, null, 2));
  }

  function clearAll() {
    window.localStorage.removeItem(STORAGE_KEY);
    setSubmissions([]);
    setMessage("Local submissions cleared.");
  }

  return (
    <section className="panel search-panel">
      <div className="result-meta">
        <span className="status">{message}</span>
        {statuses.map((status) => <span className="status" key={status}>{status.replaceAll("_", " ")}: {counts[status]}</span>)}
      </div>
      <div className="button-row">
        <button className="secondary-button" type="button" onClick={load}>Refresh</button>
        <button className="secondary-button" type="button" onClick={clearAll}>Clear local submissions</button>
      </div>

      <div className="results-grid">
        {submissions.map((submission) => (
          <article className="result-card" key={submission.id}>
            <div className="result-meta">
              <span className="pill">{submission.type}</span>
              <span className="pill">{submission.status.replaceAll("_", " ")}</span>
              <span className="pill">{new Date(submission.submittedAt).toLocaleDateString()}</span>
            </div>
            <div>
              <h3>{submission.title}</h3>
              <p>{submission.description || "No description provided."}</p>
            </div>
            <dl className="metadata-list">
              <div><dt>URL</dt><dd>{submission.url ? <a href={submission.url}>{submission.url}</a> : "No URL"}</dd></div>
              <div><dt>Jurisdiction</dt><dd>{submission.jurisdiction || "Unspecified"}</dd></div>
              <div><dt>Topics</dt><dd>{submission.topics || "Unspecified"}</dd></div>
              <div><dt>Contact</dt><dd>{submission.contact || "None"}</dd></div>
            </dl>
            {submission.triageNotes.length > 0 && (
              <div className="notice">
                <strong>Triage notes</strong>
                <ul>
                  {submission.triageNotes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              </div>
            )}
            <div className="button-row">
              {statuses.map((status) => (
                <button className="secondary-button" type="button" key={status} onClick={() => updateStatus(submission.id, status)}>
                  Mark {status.replaceAll("_", " ")}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
