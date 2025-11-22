// constants/palette.ts
// Central color well for Orbit. Other styling should pull from here over time.

export const PALETTE = {
  // Deep sea / ink
  deepSea: '#074F57',

  // Moving water / current
  tealCurrent: '#077187',

  // Soft moss / sage
  moss: '#74A57F',

  // Pale green light
  paleLeaf: '#9ECE9A',

  // Sand / page / skin
  sand: '#E4C5AF',

  // Dusk sky backgrounds
  dusk: '#4C5A69',
  deepDusk: '#394751',
} as const;

export type PaletteKey = keyof typeof PALETTE;

export const MOOD_COLORS: Record<string, PaletteKey> = {
  soft: 'moss',
  curious: 'tealCurrent',
  electric: 'tealCurrent',
  quiet: 'deepSea',
  cozy: 'sand',
  reflective: 'moss',
  wild: 'tealCurrent',
};
