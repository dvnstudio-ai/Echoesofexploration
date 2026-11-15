import { describe, expect, it } from "vitest";
import {
  massWeightLedger,
  surfaceWeightNewtons,
} from "./mass-weight";

describe("mass and weight evidence ledger", () => {
  it("covers all 31 curated archive records", () => {
    expect(Object.keys(massWeightLedger)).toHaveLength(31);
  });

  it("uses positive finite masses and clickable HTTP(S) sources", () => {
    for (const [slug, record] of Object.entries(massWeightLedger)) {
      for (const item of record.items) {
        expect(item.massKg, slug + ": " + item.label).toBeGreaterThan(0);
        expect(Number.isFinite(item.massKg), slug + ": " + item.label).toBe(true);
        expect(item.label.trim().length).toBeGreaterThan(0);
        expect(item.basis.trim().length).toBeGreaterThan(0);
        expect(item.sourceLabel.trim().length).toBeGreaterThan(0);
        expect(() => new URL(item.sourceUrl)).not.toThrow();
        expect(item.sourceUrl).toMatch(/^https:\/\//);
        for (const source of item.relatedSources ?? []) {
          expect(() => new URL(source.url)).not.toThrow();
          expect(source.url).toMatch(/^https:\/\//);
          expect(source.label.trim().length).toBeGreaterThan(0);
        }
      }
      if (record.status === "not-published") {
        expect(record.items, slug).toHaveLength(0);
      }
      if (record.surfaceGravityMps2 !== undefined) {
        expect(record.surfaceGravityMps2).toBeGreaterThan(0);
        expect(Number.isFinite(record.surfaceGravityMps2)).toBe(true);
      }
    }
  });

  it("keeps the requested rover and lander values tied to their correct mass basis", () => {
    expect(massWeightLedger.spirit.items[0].massKg).toBe(185);
    expect(massWeightLedger.opportunity.items[0].massKg).toBe(185);
    expect(massWeightLedger["curiosity-rover"].items[0].massKg).toBe(899);
    expect(massWeightLedger["perseverance-rover"].items[0].massKg).toBe(1025);
    expect(massWeightLedger["sojourner-pathfinder"].items[0].massKg).toBe(10.5);
    expect(massWeightLedger["sojourner-pathfinder"].items[1].massKg).toBe(264);
    expect(massWeightLedger.insight.items[0].massKg).toBe(360);
    expect(massWeightLedger.phoenix.items[0].massKg).toBe(364);
    expect(massWeightLedger["viking-landers"].items[0].massKg).toBe(603);
  });

  it("calculates surface weight as mass multiplied by local gravity", () => {
    expect(surfaceWeightNewtons(100, 3.71)).toBeCloseTo(371);
    expect(surfaceWeightNewtons(100, 1.62)).toBeCloseTo(162);
  });
});
