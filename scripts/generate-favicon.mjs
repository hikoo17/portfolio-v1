import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(root, 'public')

const BRAND = '#06453a'
const INK = '#f9e9a8'

// Monogram "K" matching the "Keyzar" wordmark. Drawn as plain paths so the
// result never depends on a font being installed on the build machine.
function markSvg({ rounded }) {
  const frame = rounded
    ? `<rect width="64" height="64" rx="14" fill="${BRAND}"/>`
    : `<rect width="64" height="64" fill="${BRAND}"/>`

  const border = rounded
    ? `<rect x="2.5" y="2.5" width="59" height="59" rx="11.5" fill="none" stroke="#e9f4ee" stroke-opacity="0.14" stroke-width="1.5"/>`
    : `<rect x="2.5" y="2.5" width="59" height="59" fill="none" stroke="#e9f4ee" stroke-opacity="0.12" stroke-width="1.5"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  ${frame}
  ${border}
  <g transform="rotate(-4 32 32)" stroke="${INK}" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M24.5 16.5v31"/>
    <path d="M24.5 33.5 42.5 16.5"/>
    <path d="M24.5 33.5 43.5 47.5"/>
  </g>
</svg>`
}

function render(svg, size) {
  return sharp(Buffer.from(svg))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer()
}

// Minimal ICO container (PNG payloads, supported by every modern browser).
function buildIco(entries) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(entries.length, 4)

  let offset = 6 + entries.length * 16
  const dirs = entries.map((entry) => {
    const dir = Buffer.alloc(16)
    dir.writeUInt8(entry.size >= 256 ? 0 : entry.size, 0)
    dir.writeUInt8(entry.size >= 256 ? 0 : entry.size, 1)
    dir.writeUInt8(0, 2)
    dir.writeUInt8(0, 3)
    dir.writeUInt16LE(1, 4)
    dir.writeUInt16LE(32, 6)
    dir.writeUInt32LE(entry.data.length, 8)
    dir.writeUInt32LE(offset, 12)
    offset += entry.data.length
    return dir
  })

  return Buffer.concat([header, ...dirs, ...entries.map((entry) => entry.data)])
}

const rounded = markSvg({ rounded: true })
const square = markSvg({ rounded: false })

await mkdir(publicDir, { recursive: true })

// Google Search only accepts raster favicons (BMP, GIF, ICO, PNG, JPEG, PPM,
// TIFF) and recommends a square that is larger than 48x48px, so ship explicit
// 48/96/192px PNGs in addition to the small browser-tab sizes.
const [p16, p32, p48, p96, p192, p180] = await Promise.all([
  render(rounded, 16),
  render(rounded, 32),
  render(rounded, 48),
  render(rounded, 96),
  render(rounded, 192),
  render(square, 180),
])

await writeFile(resolve(publicDir, 'favicon.svg'), `${rounded}\n`)
await writeFile(resolve(publicDir, 'favicon-16x16.png'), p16)
await writeFile(resolve(publicDir, 'favicon-32x32.png'), p32)
await writeFile(resolve(publicDir, 'favicon-48x48.png'), p48)
await writeFile(resolve(publicDir, 'favicon-96x96.png'), p96)
await writeFile(resolve(publicDir, 'favicon-192x192.png'), p192)
await writeFile(resolve(publicDir, 'apple-touch-icon.png'), p180)
await writeFile(
  resolve(publicDir, 'favicon.ico'),
  buildIco([
    { size: 16, data: p16 },
    { size: 32, data: p32 },
    { size: 48, data: p48 },
  ]),
)

console.log(
  'Generated favicon.svg, favicon.ico, favicon-16x16.png, favicon-32x32.png, favicon-48x48.png, favicon-96x96.png, favicon-192x192.png and apple-touch-icon.png',
)
