import sourceSchema from "../../../data/sources/legal-data-sources.schema.json";

export type SourceSchema = typeof sourceSchema;

export function getSourceSchema(): SourceSchema {
  return sourceSchema;
}

export function getSourceSchemaFields() {
  return Object.entries(sourceSchema.items.properties).map(([name, definition]) => ({
    name,
    required: sourceSchema.items.required.includes(name),
    definition
  }));
}
