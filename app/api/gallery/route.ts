import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery')
    if (!fs.existsSync(galleryPath)) {
      return NextResponse.json({ categories: [] })
    }

    const entries = fs.readdirSync(galleryPath, { withFileTypes: true })
    const categories = entries
      .filter((d) => d.isDirectory())
      .map((dir) => {
        const dirPath = path.join(galleryPath, dir.name)
        const files = fs.readdirSync(dirPath)
          .filter((f) => /\.(jpe?g|png|webp|gif|avif|mp4)$/i.test(f))
          .map((f) => `/images/gallery/${encodeURIComponent(dir.name)}/${encodeURIComponent(f)}`)
        return { name: dir.name, images: files }
      })

    // Also allow top-level images (optional)
    const topFiles = fs.readdirSync(galleryPath)
      .filter((f) => fs.statSync(path.join(galleryPath, f)).isFile())
      .filter((f) => /\.(jpe?g|png|webp|gif|avif|mp4)$/i.test(f))
      .map((f) => `/images/gallery/${encodeURIComponent(f)}`)

    if (topFiles.length) {
      categories.unshift({ name: 'uncategorized', images: topFiles })
    }

    return NextResponse.json({ categories })
  } catch (err) {
    return NextResponse.json({ categories: [], error: String(err) })
  }
}
