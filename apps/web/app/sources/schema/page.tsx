import Link from "next/link";
import { getSourceSchema, getSourceSchemaFields } from "@/lib/sourceSchema";

function describeDefinition(definition: unknown): string {
  if (!definition || typeof definition !== "object") {
    return "No description provided.";
  }

  const typed = definition as { description?: string; type?: string; enum?: string[]; oneOf?: Array<{ type?: string }> };
  const parts = [typed.description];

  if (typed.type) {
    parts.push(`Type: ${typed.type}.`);
  }

  if (typed.enum) {
    parts.push(`Allowed: ${typed.enum.join(", ")}.`);
  }

  if (typed.oneOf) {
    parts.push(`Allowed value types: ${typed.oneOf.map((item) => item.type).filter(Boolean).join(" or ")}.`);
  }

  return parts.filter(Boolean).join(" ");
}

export default function SourceSchemaPage() {
  const schema = getSourceSchema();
  const fields = getSourceSchemaFields();

  return (
    <article className="case-page">
      <div>
        <p className="eyebrow">Source registry contract</p>
        <h1>{schema.title}</h1>
        <p>{schema.description}</p>
        <div className="button-row">
          <Link className="button" href="/api/sources/schema">Schema JSON</Link>
          <Link className="secondary-button" href="/sources">Back to sources</Link>
        </div>
      </div>

      <section className="panel">
        <h2>Required fields</h2>
        <p>
          These fields define the provenance and reuse contract for every source record. The validator checks this contract in CI before source registry changes are merged.
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
