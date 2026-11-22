// bring-the-humans-03 entry program (Node 22, standard library only).
//
// The ad itself is a TikTok video; this repository only hands the grader
// the video's address. This program reads VIDEO.json from the repository
// root and places an identical copy in the output directory.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const sourcePath = join(repoRoot, "VIDEO.json");
const targetPath = join(outputDir, "VIDEO.json");

const parsed = JSON.parse(readFileSync(sourcePath, "utf8"));
if (typeof parsed.url !== "string" || !parsed.url.startsWith("https://www.tiktok.com/")) {
  throw new Error("VIDEO.json must hold a TikTok video URL under url");
}
if (!/\/video\/\d+/.test(parsed.url)) {
  throw new Error("VIDEO.json url must be a TikTok video address (/video/<id>), not a photo post or short link");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, targetPath);
console.log(`Wrote ${targetPath} for ${parsed.url}`);
