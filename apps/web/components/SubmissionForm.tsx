"use client";

import { useState } from "react";

const submissionTypes = ["Case", "Guidance link", "Template", "Statutory update", "Public agency material", "Correction"];

export function SubmissionForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const existing = JSON.parse(window.localStorage.getItem("agentcounsel-submissions") ?? "[]") as unknown[];
    window.localStorage.setItem(
      "agentcounsel-submissions",
      JSON.stringify([...existing, { ...payload, submittedAt: new Date().toISOString(), reviewStatus: "local_mock_pending" }], null, 2)
    );
    event.currentTarget.reset();
    setStatus("Submission saved locally for this prototype. A real review queue can replace this next.");
  }

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <label>
        <span className="status">Submission type</span>
        <select className="select" name="type" required>
          {submissionTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>
      <label>
        <span className="status">Title</span>
        <input className="input" name="title" required placeholder="Resource or case title" />
      </label>
      <label>
        <span className="status">Source URL</span>
        <input className="input" name="url" required type="url" placeholder="https://..." />
      </label>
      <label>
        <span className="status">Jurisdiction</span>
        <input className="input" name="jurisdiction" placeholder="United States, California, Delaware..." />
      </label>
      <label>
        <span className="status">Topic tags</span>
        <input className="input" name="topics" placeholder="privacy, contracts, civil procedure..." />
      </label>
      <label>
        <span className="status">Why this matters</span>
        <textarea className="textarea" name="description" placeholder="Briefly explain what this source is and why it should be indexed." />
      </label>
      <label>
        <span className="status">Optional contact</span>
        <input className="input" name="contact" placeholder="Name or email, optional" />
      </label>
      <button className="button" type="submit">Submit for review</button>
      {status && <p>{status}</p>}
    </form>
  );
}
