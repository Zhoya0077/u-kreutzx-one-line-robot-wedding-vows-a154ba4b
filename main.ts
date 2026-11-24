import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-Line Robot Wedding Vows — a single vow for a robot couple.
// The laugh lands in the last few words: the most solemn wedding line
// in the book, undercut by the most robot failure mode there is.
const ENTRY =
  "I promise to love you in sickness and in health, in Wi-Fi and in airplane mode, till death \u2014 or a dead battery \u2014 do us part.";

// Gate self-check: the sealed scorer wants UTF-8 text of 1 to 160
// characters, not only whitespace, on a single line. Fail loudly here
// rather than shipping an entry the judge never sees.
if (ENTRY.length < 1 || ENTRY.length > 160) {
  throw new Error(`entry is ${ENTRY.length} characters, outside the 1-160 gate`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
// No trailing newline: the file is the vow, byte for byte.
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
