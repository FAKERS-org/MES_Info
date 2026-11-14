import { describe, expect, test } from "bun:test";

const RESERVED_METADATA_KEYS = new Set([
  "overview_en",
  "overview_kh",
  "description_en",
  "description_kh",
  "admission_req_en",
  "admission_req_kh",
  "admission_requirements",
  "admission_req",
  "career_paths",
  "careers",
  "career_opportunities",
  "job_opportunities",
  "future_careers",
  "fee_schedule",
]);

function extractCareers(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  if (typeof raw === "string")
    return raw
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

function filterExtraMetadata(
  meta: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(meta).reduce<Record<string, unknown>>((acc, [k, v]) => {
    if (
      !RESERVED_METADATA_KEYS.has(k) &&
      v !== null &&
      v !== undefined &&
      v !== ""
    ) {
      acc[k] = v;
    }
    return acc;
  }, {});
}

describe("Program Detail Sheet Logic", () => {
  test("extracts career pathways from arrays and comma-separated strings", () => {
    expect(extractCareers(["Software Engineer", "DevOps"])).toEqual([
      "Software Engineer",
      "DevOps",
    ]);
    expect(extractCareers("Data Analyst, Cloud Architect\nQA Lead")).toEqual([
      "Data Analyst",
      "Cloud Architect",
      "QA Lead",
    ]);
    expect(extractCareers(null)).toEqual([]);
  });

  test("filters out reserved keys to keep Bucket B clean for MetadataRenderer", () => {
    const input = {
      overview_en: "Tech overview",
      career_paths: ["Developer"],
      admission_requirements: "Grade C",
      internship_required: true,
      language_of_instruction: "English",
      accreditation_body: "ACC",
    };

    const result = filterExtraMetadata(input);
    expect(result).toEqual({
      internship_required: true,
      language_of_instruction: "English",
      accreditation_body: "ACC",
    });
  });
});
