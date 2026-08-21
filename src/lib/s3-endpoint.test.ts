import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { S3_ENDPOINT, S3_ENDPOINT_HOST } from "./s3-endpoint";

/**
 * Guards the FIL-627 sweep. The endpoint is quoted in copy-paste samples across
 * ~20 files plus two static files under public/ that React never touches, so
 * centralising it can only ever be partial — nothing stops the next landing page
 * from pasting a literal hostname back in. A customer who copies a stale sample
 * configures their tooling against a host that fails TLS, and the two llms.txt
 * files are explicitly crawlable by GPTBot/ClaudeBot/PerplexityBot, so a stale
 * value there gets ingested and repeated back to people.
 *
 * Runs under the suite's default jsdom environment rather than node: the shared
 * setup file (src/test/setup.ts) touches `window`, so an environment override
 * here would fail before any test ran. Node builtins are available either way.
 */
const LEGACY_HOST = ["s3", "fil", "one"].join(".");

const SELF = fileURLToPath(import.meta.url);
const ROOT = join(dirname(SELF), "..", "..");
const SCANNED_EXTENSIONS = [".ts", ".tsx", ".txt", ".html", ".json", ".mjs"];

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return filesUnder(path);
    return SCANNED_EXTENSIONS.some((ext) => path.endsWith(ext)) ? [path] : [];
  });
}

describe("s3 endpoint", () => {
  it("points at the dedicated user-data domain", () => {
    expect(S3_ENDPOINT).toBe(`https://${S3_ENDPOINT_HOST}`);
    expect(S3_ENDPOINT_HOST).toContain("filonecontent.com");
  });

  it("is not on the front-of-house domain", () => {
    expect(S3_ENDPOINT).not.toContain(LEGACY_HOST);
  });

  // Deliberately scans source rather than the constant: the point is to catch a
  // hostname pasted in directly, bypassing the constant altogether.
  it.for([["src"], ["public"], ["scripts"]])(
    "has no hardcoded legacy endpoint under %s/",
    ([dir]) => {
      const offenders = filesUnder(join(ROOT, dir))
        .filter((path) => path !== SELF)
        .filter((path) => readFileSync(path, "utf8").includes(LEGACY_HOST))
        .map((path) => path.slice(ROOT.length + 1));

      expect(offenders, "import S3_ENDPOINT from @/lib/s3-endpoint instead").toEqual([]);
    },
  );

  // www.fil.one and docs.fil.one are legitimate and must not be swept up, or the
  // check above would be unfixable and someone would just delete it.
  it("matches only the s3 host, not other fil.one hostnames", () => {
    expect("https://www.fil.one/pricing").not.toContain(LEGACY_HOST);
    expect("https://docs.fil.one").not.toContain(LEGACY_HOST);
    expect(`https://eu-west-1.${LEGACY_HOST}`).toContain(LEGACY_HOST);
  });
});
