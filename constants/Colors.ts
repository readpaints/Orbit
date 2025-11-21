// constants/Colors.ts

const tintColorLight = '#ff8a3d';
const tintColorDark = '#ffb46a';

const Colors = {
  light: {
    // Core keys
    text: '#3e3024',
    background: '#fff7ea',
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
    text: '#f5e6d3',
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
