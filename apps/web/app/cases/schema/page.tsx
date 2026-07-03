import Link from "next/link";
import { getCaseRecordSchema, getCaseRecordSchemaFields } from "@/lib/caseSchema";

function describeDefinition(definition: unknown): string {
  if (!definition || typeof definition !== "object") {
    return "No description provided.";
  }

  const typed = definition as {
    description?: string;
    type?: string;
    enum?: string[];
    items?: { type?: string };
    properties?: Record<string, unknown>;
  };

  const parts = [typed.description];

  if (typed.type) {
    parts.push(`Type: ${typed.type}.`);
  }

  if (typed.items?.type) {
    parts.push(`Items: ${typed.items.type}.`);
  }

  if (typed.enum) {
    parts.push(`Allowed: ${typed.enum.join(", ")}.`);
  }

  if (typed.properties) {
    parts.push(`Object fields: ${Object.keys(typed.properties).join(", ")}.`);
  }

  return parts.filter(Boolean).join(" ");
}

export default function CaseSchemaPage() {
  const schema = getCaseRecordSchema();
  const fields = getCaseRecordSchemaFields();

  return (
    <article className="case-page">
      <div>
        <p className="eyebrow">Case record contract</p>
        <h1>{schema.title}</h1>
        <p>{schema.description}</p>
        <div className="button-row">
          <Link className="button" href="/api/cases/schema">Schema JSON</Link>
          <Link className="secondary-button" href="/cases">Back to cases</Link>
        </div>
      </div>

      <section className="panel">
        <h2>Normalized record fields</h2>
        <p>
          These fields define the handoff between ingestion pipelines and the web app. The validator checks normalized case output in CI before it is converted into app-ready seed data.
        </p>
        <div className="results-grid">
          {fields.map((field) => (
            <article className="result-card" key={field.name}>
              <div className="result-meta">
                <span className="pill">{field.required ? "required" : "optional"}</span>
              </div>
              <h3>{field.name}</h3>
              <p>{describeDefinition(field.definition)}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
