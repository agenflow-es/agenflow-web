// One-off: bundle the official brand PNGs into a multi-size favicon.ico.
// Source of truth: design/agenflow-brand/favicon/favicon-{16,32,48}.png
// Run: node scripts/gen-favicon.cjs   (no dependencies; pure ICO assembly)
const fs = require("fs");
const path = require("path");

const brand = path.join(__dirname, "..", "design", "agenflow-brand", "favicon");
const outPath = path.join(__dirname, "..", "src", "app", "favicon.ico");
const sources = [
  { size: 16, file: "favicon-16.png" },
  { size: 32, file: "favicon-32.png" },
  { size: 48, file: "favicon-48.png" },
];

const pngs = sources.map((s) => fs.readFileSync(path.join(brand, s.file)));

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sources.length, 4); // image count

let offset = 6 + sources.length * 16;
const entries = pngs.map((png, i) => {
  const s = sources[i].size;
  const e = Buffer.alloc(16);
  e.writeUInt8(s >= 256 ? 0 : s, 0); // width
  e.writeUInt8(s >= 256 ? 0 : s, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(png.length, 8); // image size
  e.writeUInt32LE(offset, 12); // image offset
  offset += png.length;
  return e;
});

fs.writeFileSync(outPath, Buffer.concat([header, ...entries, ...pngs]));
console.log(`favicon.ico from official PNGs: ${sources.map((s) => s.size).join("/")}`);
