// Bakes section desk backgrounds (grid + edge fade) into static WebP tiles.
// Same recipe as hero-desk: two gradient layers + radial mask-image become
// one texture decoded once. Per background color so sections keep their look.
import sharp from 'sharp';

async function sectionBg(name, base, line, alpha) {
  const W = 1600, H = 1000;
  const buf = Buffer.alloc(W * H * 3);
  const cx = W / 2;
  const smooth = (a, b, t) => {
    t = Math.min(1, Math.max(0, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  for (let y = 0; y < H; y++) {
    const vLine = (y % 72) < 1;
    for (let x = 0; x < W; x++) {
      const hLine = (((x - cx) % 72 + 72) % 72) < 1;
      const mdx = (x - 0.5 * W) / (1.2 * W);
      const mdy = (y - 0.35 * H) / (0.9 * H);
      const mt = Math.sqrt(mdx * mdx + mdy * mdy);
      const m = 1 - smooth(0.45, 1.0, mt);
      let r = base[0], g = base[1], b = base[2];
      if (hLine || vLine) {
        const a = alpha * m;
        r += (line[0] - r) * a;
        g += (line[1] - g) * a;
        b += (line[2] - b) * a;
      }
      const i = (y * W + x) * 3;
      buf[i] = r; buf[i + 1] = g; buf[i + 2] = b;
    }
  }
  await sharp(buf, { raw: { width: W, height: H, channels: 3 } })
    .webp({ quality: 70 })
    .toFile(`public/images/textures/${name}.webp`);
  console.log(name, 'done');
}

(async () => {
  await sectionBg('section-emerald', [6, 69, 58], [233, 244, 238], 0.075);
  await sectionBg('section-cream-warm', [241, 234, 216], [34, 39, 31], 0.07);
  await sectionBg('section-cream', [246, 241, 228], [34, 39, 31], 0.07);
  await sectionBg('section-paper', [251, 248, 239], [34, 39, 31], 0.07);
})();
