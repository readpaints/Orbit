// constants/Colors.ts

const tintColorLight = '#ff8a3d';
const tintColorDark = '#ffb46a';

// Shared dusk background for now.
// To audition a deeper variant, change this to '#394751'.
const DUSK_BACKGROUND = '#4C5A69';

const Colors = {
  light: {
    // Core keys
    text: '#3e3024',
    background: DUSK_BACKGROUND,
    tint: tintColorLight,
    tabIconDefault: '#b5987b',
    tabIconSelected: tintColorLight,

    // Extra Orbit helpers
    card: '#ffe7cf',
    cardSoft: '#fff3dd',
    muted: '#a58a6c',
    accent: '#ff8a3d',
    border: '#e0c4a4',
  },
  dark: {
    // Core keys
    text: '#f5e6d3',
    background: DUSK_BACKGROUND,
    tint: tintColorDark,
    tabIconDefault: '#9b7f63',
    tabIconSelected: tintColorDark,

    // Extra Orbit helpers
    card: '#3a2b1d',
    cardSoft: '#261b12',
    muted: '#b79a7c',
    accent: '#ffb46a',
    border: '#4b3623',
  },
} as const;

export type ThemeName = keyof typeof Colors;
export type ThemeColorName = keyof (typeof Colors)['light'];

export default Colors;
