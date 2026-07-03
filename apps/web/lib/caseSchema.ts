import caseRecordSchema from "../../../data/cases/case-record.schema.json";

export type CaseRecordSchema = typeof caseRecordSchema;

export function getCaseRecordSchema(): CaseRecordSchema {
  return caseRecordSchema;
}

export function getCaseRecordSchemaFields() {
  const recordProperties = caseRecordSchema.properties.records.items.properties;
  const required = caseRecordSchema.properties.records.items.required;

  return Object.entries(recordProperties).map(([name, definition]) => ({
    name,
    required: required.includes(name),
    definition
  }));
}
