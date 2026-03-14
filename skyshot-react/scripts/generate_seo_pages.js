#!/usr/bin/env node
/**
 * Generate scalable SEO landing pages for SkyShot.
 * Topics: aerial photography, drone filming, cinematic video production,
 * and global location-based visual storytelling.
 * Run: npm run generate:seo or node scripts/generate_seo_pages.js
 * Output: writes HTML to public/seo-pages/ for static export.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'https://skyshot.space'
const OUT_DIR = path.join(__dirname, '../public/seo-pages')

const TOPICS = [
  { slug: 'aerial-photography', title: 'Aerial Photography', description: 'World-class aerial photography for brands, tourism, sports, and events. Global coverage and cinematic imagery.' },
  { slug: 'drone-filming', title: 'Drone Filming', description: 'Cinematic drone filming for brands, events, and content. Professional aerial video production worldwide.' },
  { slug: 'drone-photography', title: 'Drone Photography', description: 'Aerial drone photography and imagery by SkyShot. High-resolution stills and perspectives.' },
  { slug: 'cinematic-video-production', title: 'Cinematic Video Production', description: 'Cinematic video production with aerial and drone footage. From concept to delivery.' },
  { slug: 'aerial-cinematography', title: 'Aerial Cinematography', description: 'Aerial cinematography and drone cinematography for film, advertising, and digital content.' },
  { slug: 'aerial-video', title: 'Aerial Video', description: 'Professional aerial video production and drone filming. Visual storytelling for brands and creatives.' },
  { slug: 'lake-garda-video', title: 'Lake Garda Video', description: 'Aerial and drone video production around Lake Garda, Italy. Location-based visual storytelling.' },
  { slug: 'visual-storytelling', title: 'Visual Storytelling', description: 'Visual storytelling through aerial video, drone cinematography, and photography. Narrative-driven content worldwide.' }
]

function escapeHtml (s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildPage (topic) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(topic.title)} — SkyShot Lab</title>
  <meta name="description" content="${escapeHtml(topic.description)}" />
  <link rel="canonical" href="${BASE_URL}/seo-pages/${topic.slug}.html" />
  <meta property="og:title" content="${escapeHtml(topic.title)} — SkyShot Lab" />
  <meta property="og:description" content="${escapeHtml(topic.description)}" />
  <meta property="og:url" content="${BASE_URL}/seo-pages/${topic.slug}.html" />
  <meta property="og:type" content="website" />
</head>
<body>
  <h1>${escapeHtml(topic.title)}</h1>
  <p>${escapeHtml(topic.description)}</p>
  <p><a href="${BASE_URL}">SkyShot Lab</a> — Drone &amp; outdoor visuals.</p>
</body>
</html>
`
}

function main () {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true })
  }
  for (const topic of TOPICS) {
    const filePath = path.join(OUT_DIR, `${topic.slug}.html`)
    fs.writeFileSync(filePath, buildPage(topic), 'utf8')
    console.log('Wrote', filePath)
  }
  console.log('Done. Generated', TOPICS.length, 'SEO landing pages.')
}

main()
