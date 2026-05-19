#!/usr/bin/env node
/**
 * Validates that file paths referenced in agent docs exist.
 * Run: node scripts/validate-agent-docs.mjs
 */
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const DOC_ROOTS = [
  'memories',
  path.join('.cursor', 'rules'),
  'AGENTS.md',
]

const PATH_IN_BACKTICKS =
  /`((?:nextjs-simonask\.io|studio-simonask\.io|memories|\.cursor)(?:\/[^`\s]+)+)`/g

const SKIP_SUFFIXES = ['.md', '.mdc'] // link targets to other docs — checked separately

function collectDocFiles() {
  const files = []
  for (const entry of DOC_ROOTS) {
    const full = path.join(ROOT, entry)
    if (!fs.existsSync(full)) continue
    const stat = fs.statSync(full)
    if (stat.isFile()) {
      files.push(full)
    } else {
      walk(full, files)
    }
  }
  return files
}

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full, out)
    else if (/\.(md|mdc)$/.test(name)) out.push(full)
  }
}

function extractPaths(content) {
  const found = new Set()
  let m
  while ((m = PATH_IN_BACKTICKS.exec(content)) !== null) {
    let p = m[1].replace(/\/+$/, '')
    if (p.includes('node_modules') || p.includes('*')) continue
    found.add(p)
  }
  return [...found]
}

function resolveExists(relPath) {
  const full = path.join(ROOT, relPath)
  return fs.existsSync(full)
}

function main() {
  const docFiles = collectDocFiles()
  const missing = []
  const checked = new Set()

  for (const file of docFiles) {
    const content = fs.readFileSync(file, 'utf8')
    for (const rel of extractPaths(content)) {
      const key = `${rel}`
      if (checked.has(key)) continue
      checked.add(key)

      if (SKIP_SUFFIXES.some((s) => rel.endsWith(s))) {
        if (!resolveExists(rel)) {
          missing.push({path: rel, citedIn: path.relative(ROOT, file)})
        }
        continue
      }

      if (!resolveExists(rel)) {
        missing.push({path: rel, citedIn: path.relative(ROOT, file)})
      }
    }
  }

  if (missing.length === 0) {
    console.log(`OK: ${checked.size} doc path(s) validated across ${docFiles.length} file(s).`)
    process.exit(0)
  }

  console.error('Agent doc validation failed — broken path references:\n')
  for (const {path: p, citedIn} of missing) {
    console.error(`  - ${p}  (in ${citedIn})`)
  }
  console.error('\nFix paths or update docs per memories/doc-sync.md')
  process.exit(1)
}

main()
