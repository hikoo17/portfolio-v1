import { stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, 'public/og-image.png')

const WIDTH = 1200
const HEIGHT = 630

const grid = Array.from({ length: 16 }, (_, i) => i * 72)
  .map(
    (x) =>
      `<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" />` +
      `<line x1="0" y1="${x}" x2="${WIDTH}" y2="${x}" />`,
  )
  .join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="62%" cy="-10%" r="80%">
      <stop offset="0%" stop-color="#7ac9af" stop-opacity="0.22" />
      <stop offset="65%" stop-color="#7ac9af" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#06453a" />
  <g stroke="#e9f4ee" stroke-opacity="0.07" stroke-width="1">${grid}</g>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

  <text x="80" y="150" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="36" fill="#f9e9a8">portfolio</text>

  <text x="80" y="300" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="800" font-size="92" fill="#f6f1e4">Keyza Zaki Arkana</text>

  <text x="80" y="382" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="600" font-size="38" fill="#e9f4ee" fill-opacity="0.82">Junior Web Developer — Tasikmalaya, Indonesia</text>

  <rect x="80" y="440" width="140" height="7" fill="#f9e9a8" />

  <text x="80" y="520" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="30" fill="#e9f4ee" fill-opacity="0.6">Clean, purposeful web experiences.</text>
  <text x="80" y="566" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="26" fill="#e9f4ee" fill-opacity="0.45">kezadev.my.id</text>
</svg>`

await sharp(Buffer.from(svg)).png({ quality: 90, compressionLevel: 9 }).toFile(output)

const { size } = await stat(output)
console.log(`Generated ${output} (${WIDTH}x${HEIGHT}, ${(size / 1024).toFixed(1)} kB)`)
