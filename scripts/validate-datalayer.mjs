#!/usr/bin/env node
/**
 * Validate dataLayer payloads against contracts from the tracking governance repo.
 *
 * Usage (from simonask.io repo root):
 *   npm run validate:tracking
 *   TRACKING_ROOT=../tracking node scripts/validate-datalayer.mjs
 *
 * Expects tracking.config.json in the repo root and ../tracking as the default hub clone.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const warnOnly = process.argv.includes('--warn-only');
const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(siteRoot, 'tracking.config.json');

if (!fs.existsSync(configPath)) {
  console.error('Missing tracking.config.json at repo root.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const trackingRoot =
  process.env.TRACKING_ROOT ||
  path.join(siteRoot, '..', 'tracking');

if (!fs.existsSync(trackingRoot)) {
  console.error(
    `Tracking repo not found at ${trackingRoot}. Clone SimonAndreAsk/tracking alongside this repo or set TRACKING_ROOT.`,
  );
  process.exit(1);
}

const catalogPath = path.join(
  trackingRoot,
  'datalayer-contracts',
  'extensions',
  config.property,
  'catalog.json',
);

if (!fs.existsSync(catalogPath)) {
  console.error(`Missing catalog: ${catalogPath}`);
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);

/** @type {Map<string, import('ajv').ValidateFunction>} */
const validatorsByEvent = new Map();

for (const { event, path: contractRel } of catalog.contracts ?? []) {
  const contractPath = path.join(trackingRoot, contractRel);
  const schema = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  validatorsByEvent.set(event, ajv.compile(schema));
}

/**
 * @param {string} fixturePath
 */
function validateFixture(fixturePath) {
  const raw = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  const payloads = Array.isArray(raw) ? raw : [raw];
  const rel = path.relative(siteRoot, fixturePath);
  for (const payload of payloads) {
    const event = payload?.event;
    if (!event) {
      fail(`${rel}: missing "event" field`);
      continue;
    }
    const validate = validatorsByEvent.get(event);
    if (!validate) {
      fail(`${rel}: no contract for event "${event}"`);
      continue;
    }
    if (!validate(payload)) {
      const msg = (validate.errors ?? [])
        .map((e) => `${e.instancePath} ${e.message}`)
        .join('; ');
      fail(`${rel} (event=${event}): ${msg}`);
    }
  }
}

const errors = [];

function fail(message) {
  errors.push(message);
  const fn = warnOnly ? console.warn : console.error;
  fn(warnOnly ? `WARN: ${message}` : `ERROR: ${message}`);
}

let checked = 0;
const fixtureRoots = (config.fixturePaths ?? ['tests/fixtures/datalayer']).map(
  (p) => path.join(siteRoot, p.replace(/\*\*/g, '').replace(/\*/g, '')),
);

for (const root of fixtureRoots) {
  walkJson(root, (file) => {
    validateFixture(file);
    checked += 1;
  });
}

if (checked === 0) {
  console.warn(
    'No fixture JSON files found — add tests/fixtures/datalayer/*.json with sample pushes.',
  );
}

if (errors.length > 0 && !warnOnly) {
  process.exit(1);
}

console.log(
  `OK: validated ${checked} fixture file(s) against ${validatorsByEvent.size} contract(s) from ${path.relative(siteRoot, trackingRoot) || trackingRoot}.`,
);

/**
 * @param {string} dir
 * @param {(file: string) => void} onFile
 */
function walkJson(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkJson(full, onFile);
    else if (entry.name.endsWith('.json')) onFile(full);
  }
}
