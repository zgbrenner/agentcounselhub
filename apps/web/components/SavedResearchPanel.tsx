"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { deleteSavedCase, exportSavedCases, getSavedCases } from "@/lib/localResearch";
import type { SavedCase } from "@/lib/types";

export function SavedResearchPanel() {
  const [savedCases, setSavedCases] = useState<SavedCase[]>([]);
  const [status, setStatus] = useState("Loading local research...");
  const [exportText, setExportText] = useState("");

  async function refresh() {
    try {
      const items = await getSavedCases();
      setSavedCases(items);
      setStatus(items.length ? "Loaded from this browser." : "No saved cases in this browser yet.");
    } catch {
      setStatus("Could not read local research in this browser.");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const grouped = useMemo(() => {
    return savedCases.reduce<Record<string, SavedCase[]>>((accumulator, item) => {
      accumulator[item.folder] ??= [];
      accumulator[item.folder].push(item);
      return accumulator;
    }, {});
  }, [savedCases]);

  async function remove(id: string) {
    await deleteSavedCase(id);
    await refresh();
  }

  return (
    <section className="panel search-panel">
      <div className="result-meta">
        <span className="status">{status}</span>
        <span className="status">Stored locally with IndexedDB</span>
      </div>

      <div className="button-row">
        <button className="button" type="button" onClick={() => setExportText(exportSavedCases(savedCases))} disabled={!savedCases.length}>Show export JSON</button>
        <button className="secondary-button" type="button" onClick={refresh}>Refresh</button>
      </div>

      {exportText && <textarea className="textarea" readOnly value={exportText} aria-label="Saved research export JSON" />}

      {Object.entries(grouped).map(([folder, items]) => (
        <div className="results-grid" key={folder}>
          <h2>{folder}</h2>
          {items.map((item) => (
            <article className="result-card" key={item.id}>
              <div className="result-meta">
                <span className="pill">{item.citation}</span>
                <span className="pill">Saved {new Date(item.savedAt).toLocaleDateString()}</span>
              </div>
              <h3><Link href={`/cases/${item.slug}`}>{item.name}</Link></h3>
              {item.note && <p>{item.note}</p>}
              <div className="button-row">
                <Link className="button" href={`/cases/${item.slug}`}>Open</Link>
                <button className="secondary-button" type="button" onClick={() => remove(item.id)}>Remove</button>
              </div>
            </article>
          ))}
        </div>
      ))}
    </section>
  );
}
