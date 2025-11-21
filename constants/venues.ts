// constants/venues.ts

import { MADRID_VENUES } from './madrid_venues';

export type Venue = {
  id: string;
  name: string;
  neighborhood?: string;
  description?: string;
  tags?: string[];
};

// 1) Your hand-curated venues live here.
// For now this is empty so nothing breaks if you paste this before copying over your old data.
// Later, you can take the venue objects from your previous VENUES array
// and drop them into CORE_VENUES below.

// --------------------------------------------------------------
// CORE VENUES (manually curated)
// --------------------------------------------------------------
const CORE_VENUES: Venue[] = [
  // Example:
  // {
  //   id: 'acid-cafe',
  //   name: 'Acid Café',
  //   neighborhood: 'Lavapiés',
  //   description: 'Tiny corner café with good light, strong coffee, and slow afternoons.',
  //   tags: ['cafe', 'neighborhood'],
  // },
];

// --------------------------------------------------------------
// UTIL — Normalize
// --------------------------------------------------------------
function normalize(str?: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

// --------------------------------------------------------------
// MERGE FUNCTION
// Ensures no duplicates across both core + seed venues.
// --------------------------------------------------------------
function mergeVenues(core: Venue[], seeds: Venue[]): Venue[] {

  // 🔥 NEW GUARD (prevents “cannot convert undefined to object”)
  if (!Array.isArray(seeds)) seeds = [];
  if (!Array.isArray(core)) core = [];

  const seen = new Set<string>();
  const merged: Venue[] = [];

  // First, add all core venues
  for (const v of core) {
    const key = `${normalize(v.name)}|${normalize(v.neighborhood)}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(v);
    }
  }

  // Then: add seed venues only if they don’t duplicate existing places
  for (const v of seeds) {
    const key = `${normalize(v.name)}|${normalize(v.neighborhood)}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(v);
    }
  }

  return merged;
}

// --------------------------------------------------------------
// FINAL VENUE EXPORT
// --------------------------------------------------------------
export const VENUES: Venue[] = mergeVenues(CORE_VENUES, MADRID_VENUES);
