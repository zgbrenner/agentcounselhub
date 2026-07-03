import guidanceResourceSchema from "../../../data/guidance/guidance-resource.schema.json";

export type GuidanceResourceSchema = typeof guidanceResourceSchema;

export function getGuidanceResourceSchema(): GuidanceResourceSchema {
  return guidanceResourceSchema;
}

export function getGuidanceResourceSchemaFields() {
  const itemSchema = guidanceResourceSchema.items;
  const properties = itemSchema.properties;
  const required = itemSchema.required;

  return Object.entries(properties).map(([name, definition]) => ({
    name,
    required: required.includes(name),
    definition
  }));
}
