import { rm, cp } from "node:fs/promises";
import path from "node:path";
import tailwind from "bun-plugin-tailwind";
import { Glob } from "bun";

const outdir = path.join(process.cwd(), "dist");
await rm(outdir, { recursive: true, force: true });

const glob = new Glob("src/**/*.html");
const entrypoints = await Array.fromAsync(glob.scan("."));

const result = await Bun.build({
  entrypoints,
  outdir,
  plugins: [tailwind],
  minify: true,
  target: "browser",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "global.__DEV__": "false",
  },
  splitting: true,
  sourcemap: "external",
});

// Copy public assets if available
try {
  await cp(path.join(process.cwd(), "public"), outdir, { recursive: true });
} catch {
  // Ignore if public directory does not exist
}

console.log("\nBuild Summary:");
console.log("===============");

let totalSize = 0;
for (const output of result.outputs) {
  const relativePath = path.relative(process.cwd(), output.path);
  const sizeKB = (output.size / 1024).toFixed(1);
  console.log(` ${relativePath.padEnd(50)} ${sizeKB} KB`);
  totalSize += output.size;
}

console.log(`\nTotal size: ${(totalSize / 1024).toFixed(1)} KB`);
console.log(`Build completed successfully!`);