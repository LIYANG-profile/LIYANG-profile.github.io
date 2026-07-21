// 一次性脚本：把 public/posters 下的 jpg 限宽 800px 并用 mozjpeg 压缩，原地覆盖
import { readdir, rename, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const postersDir = fileURLToPath(new URL('../public/posters', import.meta.url))

const files = (await readdir(postersDir)).filter((name) => name.endsWith('.jpg'))

for (const name of files) {
  const filePath = join(postersDir, name)
  const tempPath = `${filePath}.tmp`
  const before = (await stat(filePath)).size

  await sharp(filePath)
    .resize({ width: 800, withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(tempPath)

  const after = (await stat(tempPath)).size
  if (after < before) {
    await rename(tempPath, filePath)
    console.log(`${name}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
  } else {
    const { rm } = await import('node:fs/promises')
    await rm(tempPath)
    console.log(`${name}: kept original (${Math.round(before / 1024)}KB)`)
  }
}
