"use client";

import { useState } from "react";
import { saveCaseLocally } from "@/lib/localResearch";
import type { CaseRecord } from "@/lib/types";

export function SaveCaseButton({ caseRecord }: { caseRecord: CaseRecord }) {
  const [folder, setFolder] = useState("General research");
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  async function handleSave() {
    try {
      await saveCaseLocally({
        id: caseRecord.id,
        slug: caseRecord.slug,
        name: caseRecord.name,
        citation: caseRecord.citations[0] ?? "citation unavailable",
        folder: folder.trim() || "General research",
        savedAt: new Date().toISOString()
      });
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="panel">
      <h3>Save locally</h3>
      <p>Saved research stays in this browser through IndexedDB. It is not synced or sent to AgentCounsel Hub.</p>
      <label>
        <span className="status">Folder</span>
        <input className="input" value={folder} onChange={(event) => setFolder(event.target.value)} />
      </label>
      <div className="button-row" style={{ marginTop: "0.75rem" }}>
        <button className="button" type="button" onClick={handleSave}>Save case</button>
        {status === "saved" && <span className="status">Saved locally</span>}
        {status === "error" && <span className="status warning">Could not save</span>}
      </div>
    </div>
  );
}
