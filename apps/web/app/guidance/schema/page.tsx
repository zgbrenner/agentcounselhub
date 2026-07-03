import Link from "next/link";
import { getGuidanceResourceSchema, getGuidanceResourceSchemaFields } from "@/lib/guidanceSchema";

function describeDefinition(definition: unknown): string {
  if (!definition || typeof definition !== "object") {
    return "No description provided.";
  }

  const typed = definition as {
    description?: string;
    type?: string;
    enum?: string[];
    items?: { type?: string };
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

  return parts.filter(Boolean).join(" ");
}

export default function GuidanceSchemaPage() {
  const schema = getGuidanceResourceSchema();
  const fields = getGuidanceResourceSchemaFields();

  return (
    <article className="case-page">
      <div>
        <p className="eyebrow">Guidance resource contract</p>
        <h1>{schema.title}</h1>
        <p>{schema.description}</p>
        <div className="button-row">
          <Link className="button" href="/api/guidance/schema">Schema JSON</Link>
          <Link className="secondary-button" href="/guidance">Back to guidance</Link>
        </div>
      </div>

      <section className="panel">
        <h2>Guidance metadata fields</h2>
        <p>
          These fields define how public practical guidance, templates, agency materials, and court resources are described without copying source materials unnecessarily.
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
