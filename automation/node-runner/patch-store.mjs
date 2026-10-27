// Reading/writing ui-rowfields.json (the hand-maintained control overlay).
// Every write is preceded by a timestamped backup under flows/.backup/.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { norm } from './flow-loader.mjs';

const here = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(here, '../..');
export const OVERLAY = join(ROOT, 'ui-rowfields.json');

export function loadOverlay(file = OVERLAY) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

export function backupOverlay(file = OVERLAY) {
  const dir = join(ROOT, 'flows', '.backup');
  mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const dst = join(dir, `ui-rowfields.${stamp}.json`);
  copyFileSync(file, dst);
  return dst;
}

function cleanEntry(entry) {
  const out = {};
  for (const [k, v] of Object.entries(entry)) {
    if (v === undefined || v === null) continue;
    if (k === 'old') continue;
    out[k] = v;
  }
  return out;
}

// Merge one control entry into the overlay for a screen.
// An existing entry with the same label is replaced (not duplicated): a stale
// namePattern must not shadow the selector the human just verified.
export function applyControlEntries(screenKey, entries, file = OVERLAY) {
  const doc = loadOverlay(file);
  doc.rowfields = doc.rowfields || {};
  const list = doc.rowfields[screenKey] = doc.rowfields[screenKey] || [];
  const changes = [];
  for (const raw of entries) {
    const entry = cleanEntry(raw);
    delete entry.sample; // sample is validation evidence, not runtime data
    const i = list.findIndex((e) => norm(e.label) === norm(entry.label));
    if (i >= 0) {
      const before = list[i];
      const merged = { ...before, ...entry };
      if (entry.selector) { delete merged.namePattern; delete merged.selectorTemplate; delete merged.parts; }
      if (entry.selectorTemplate) { delete merged.selector; }
      if (entry.parts) { delete merged.selector; delete merged.selectorTemplate; delete merged.namePattern; }
      list[i] = merged;
      changes.push({ label: entry.label, action: 'updated', before, after: merged });
    } else {
      list.push(entry);
      changes.push({ label: entry.label, action: 'added', after: entry });
    }
  }
  const bak = backupOverlay(file);
  writeFileSync(file, JSON.stringify(doc, null, 1) + '\n', 'utf8');
  return { changes, backup: bak };
}

export function existingEntry(screenKey, label, file = OVERLAY) {
  const doc = loadOverlay(file);
  return (doc.rowfields?.[screenKey] || []).find((e) => norm(e.label) === norm(label)) || null;
}

// Apply several screens at once with one backup and one write.
export function applyControlGroups(groups, file = OVERLAY) {
  const doc = loadOverlay(file);
  doc.rowfields = doc.rowfields || {};
  const changes = [];
  for (const { screenKey, entries } of groups) {
    const list = doc.rowfields[screenKey] = doc.rowfields[screenKey] || [];
    for (const raw of entries) {
      const entry = cleanEntry(raw);
      delete entry.sample;
      const i = list.findIndex((e) => norm(e.label) === norm(entry.label));
      if (i >= 0) {
        const before = list[i];
        const merged = { ...before, ...entry };
        if (entry.selector) { delete merged.namePattern; delete merged.selectorTemplate; delete merged.parts; }
        if (entry.selectorTemplate) { delete merged.selector; }
        if (entry.parts) { delete merged.selector; delete merged.selectorTemplate; delete merged.namePattern; }
        list[i] = merged;
        changes.push({ screenKey, label: entry.label, action: 'updated', before, after: merged });
      } else {
        list.push(entry);
        changes.push({ screenKey, label: entry.label, action: 'added', after: entry });
      }
    }
  }
  const bak = backupOverlay(file);
  writeFileSync(file, JSON.stringify(doc, null, 1) + '\n', 'utf8');
  return { changes, backup: bak };
}
