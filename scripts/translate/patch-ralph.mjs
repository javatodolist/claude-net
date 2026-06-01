/**
 * 修补 ralph-loop-agent 的 ESM 导入（缺少 .js 扩展名）
 * 在 npm install 后自动运行
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'node_modules/ralph-loop-agent/dist')

const filesToPatch = ['index.js', 'ralph-loop-agent.js', 'ralph-context-manager.js', 'ralph-stop-condition.js']

let patched = 0
for (const file of filesToPatch) {
  const filePath = path.join(distDir, file)
  if (!fs.existsSync(filePath)) continue

  let content = fs.readFileSync(filePath, 'utf-8')
  // 匹配 from './xxx' 但不匹配已经有 .js 的
  const updated = content.replace(/from '(\.\/[^']+?)(?<!\.js)'/g, "from '$1.js'")

  if (updated !== content) {
    fs.writeFileSync(filePath, updated)
    patched++
  }
}

console.log(`patched ${patched} files in ralph-loop-agent/dist`)
