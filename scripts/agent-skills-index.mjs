import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const indexPath = path.join(repoRoot, ".well-known", "agent-skills", "index.json");
const writeMode = process.argv.includes("--write");

function digestFile(filePath) {
  const bytes = fs.readFileSync(filePath);
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function resolveSkillPath(urlValue) {
  if (typeof urlValue !== "string" || !urlValue) {
    throw new Error(`Invalid skill url: ${urlValue}`);
  }

  if (urlValue.startsWith("http://") || urlValue.startsWith("https://")) {
    const parsed = new URL(urlValue);
    return path.join(repoRoot, decodeURIComponent(parsed.pathname));
  }

  const relativePath = urlValue.startsWith("/") ? urlValue.slice(1) : urlValue;
  return path.join(repoRoot, decodeURIComponent(relativePath));
}

function main() {
  const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  const mismatches = [];

  for (const skill of index.skills ?? []) {
    const artifactPath = resolveSkillPath(skill.url);
    if (!fs.existsSync(artifactPath)) {
      throw new Error(`Missing skill artifact: ${skill.url}`);
    }

    const computedDigest = digestFile(artifactPath);
    if (writeMode) {
      skill.digest = computedDigest;
    } else if (skill.digest !== computedDigest) {
      mismatches.push({
        name: skill.name,
        expected: skill.digest,
        actual: computedDigest,
      });
    }
  }

  if (writeMode) {
    fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
    console.log(`Updated digests in ${path.relative(repoRoot, indexPath)}`);
    return;
  }

  if (mismatches.length > 0) {
    for (const mismatch of mismatches) {
      console.error(
        `Digest mismatch for ${mismatch.name}: expected ${mismatch.expected}, actual ${mismatch.actual}`
      );
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Agent skills index verified: ${index.skills.length} entries`);
}

main();
