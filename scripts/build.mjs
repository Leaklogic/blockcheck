import { copyFile, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const requestedSiteUrl = process.env.SITE_URL || "https://hedz-blockcheck.vercel.app";
const siteUrl = new URL(requestedSiteUrl);

if (!["http:", "https:"].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password ||
    siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
  throw new Error("SITE_URL must be an HTTP(S) origin, for example https://hedz-blockcheck.vercel.app");
}

const siteOrigin = siteUrl.origin;
const pageDirectories = [
  "about", "blog", "combustion-leak-tester",
  "combustion-leak-tester-head-gasket-tester-bloc-sniff-tester-combustion-leak-detector-uk",
  "delivery-returns", "guides", "manuals"
];
const assetDirectories = ["assets", "css", "js", "docs"];
const rootFiles = new Set([
  "apple-touch-icon.png", "favicon.ico", "favicon-16x16.png", "favicon-32x32.png",
  "favicon-48x48.png", "robots.txt", "sitemap.xml", "site.webmanifest"
]);
const textExtensions = new Set([".html", ".css", ".js", ".xml", ".txt", ".webmanifest"]);
const oldSiteUrl = /https?:\/\/(?:www\.)?leaklogicuk\.co\.uk(?=\/|[?#\s"'<>]|$)/gi;
let copiedFiles = 0;

// Rebuild only the fixed output directory inside this checkout.
if (path.relative(root, output) !== "dist") {
  throw new Error("Build output must be the checkout's dist directory");
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && (entry.name.endsWith(".html") || rootFiles.has(entry.name))) {
    await copySiteFile(entry.name);
  }
}
for (const directory of [...pageDirectories, ...assetDirectories]) {
  await copyDirectory(directory);
}

console.log(`Built ${copiedFiles} website files in dist for ${siteOrigin}`);

async function copyDirectory(relativeDirectory) {
  for (const entry of await readdir(path.join(root, relativeDirectory), { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const relativeFile = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(relativeFile);
    } else if (entry.isFile()) {
      await copySiteFile(relativeFile);
    }
  }
}

async function copySiteFile(relativeFile) {
  const source = path.join(root, relativeFile);
  const destination = path.join(output, relativeFile);
  await mkdir(path.dirname(destination), { recursive: true });
  if (textExtensions.has(path.extname(relativeFile))) {
    const original = await readFile(source, "utf8");
    await writeFile(destination, original.replace(oldSiteUrl, siteOrigin));
  } else {
    await copyFile(source, destination);
  }
  copiedFiles += 1;
}
