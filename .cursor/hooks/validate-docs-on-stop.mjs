#!/usr/bin/env node
/**
 * Optional Cursor stop hook: run agent-doc path validation; nudge agent if refs are broken.
 * Disabled by default in .cursor/hooks.json (empty hooks) to avoid extra agent turns.
 * Re-enable by adding to hooks.json: "stop": [{ "command": "node .cursor/hooks/validate-docs-on-stop.mjs" }]
 */
import {spawnSync} from 'child_process'
import path from 'path'
import {fileURLToPath} from 'url'

const hookDir = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(hookDir, '../..')
const script = path.join(root, 'scripts/validate-agent-docs.mjs')

// Consume stdin (hook payload) so the pipe does not hang
try {
  process.stdin.setEncoding('utf8')
  process.stdin.resume()
  process.stdin.on('data', () => {})
} catch {
  /* ignore */
}

const result = spawnSync(process.execPath, [script], {
  cwd: root,
  encoding: 'utf8',
})

if (result.status === 0) {
  process.exit(0)
}

const detail = [result.stdout, result.stderr].filter(Boolean).join('\n').trim()

console.log(
  JSON.stringify({
    followup_message: [
      'Agent documentation has broken file path references.',
      detail,
      'Update the cited memories or rules (see memories/doc-sync.md) and run: node scripts/validate-agent-docs.mjs',
    ].join('\n\n'),
  }),
)

process.exit(0)
