// constants/Colors.ts

const tintColorLight = '#ff8a3d';
const tintColorDark = '#ffb46a';

const Colors = {
  light: {
    // Core expo keys
    text: '#3e3024',
    background: '#fff7ea',
    tint: tintColorLight,
    tabIconDefault: '#b5987b',
    tabIconSelected: tintColorLight,

    // Extra Orbit-y helpers
    card: '#ffe7cf',
    cardSoft: '#fff3df',
    muted: '#c2a78a',
    accent: '#ff8a3d',
    border: '#f5d7b8',
  },

  dark: {
    text: '#f6eee4',
    background: '#201913',
    tint: tintColorDark,
    tabIconDefault: '#9b7f63',
    tabIconSelected: tintColorDark,

    card: '#3a2b1d',
    cardSoft: '#261b12',
    muted: '#b79a7c',
    accent: '#ffb46a',
    border: '#4b3623',
  },
} as const;

export default Colors;
