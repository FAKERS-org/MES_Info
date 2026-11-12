import { describe, expect, it } from "bun:test";
import { getShiftBadgeConfig, SHIFT_FILTER_CONFIG } from "./shift-styles";

describe("shift-styles", () => {
  it("provides valid filter configuration for all shifts", () => {
    expect(SHIFT_FILTER_CONFIG.Morning.iconColor).toContain("amber");
    expect(SHIFT_FILTER_CONFIG.Afternoon.iconColor).toContain("orange");
    expect(SHIFT_FILTER_CONFIG.Evening.iconColor).toContain("indigo");
    expect(SHIFT_FILTER_CONFIG.Weekend.iconColor).toContain("teal");
  });

  it("resolves badge config case-insensitively with correct icons and classes", () => {
    const morning = getShiftBadgeConfig("Morning");
    expect(morning.iconColor).toContain("amber");

    const afternoonUpper = getShiftBadgeConfig("AFTERNOON");
    expect(afternoonUpper.iconColor).toContain("orange");

    const eveningLower = getShiftBadgeConfig("evening");
    expect(eveningLower.iconColor).toContain("indigo");

    const weekend = getShiftBadgeConfig("Weekend");
    expect(weekend.iconColor).toContain("teal");
  });

  it("falls back to clock icon for undefined or unknown shifts", () => {
    const fallback = getShiftBadgeConfig(undefined);
    expect(fallback.badge).toContain("muted");
  });
});
