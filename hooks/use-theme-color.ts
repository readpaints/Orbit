// hooks/use-theme-color.ts
import { Colors } from '@/constants/Colors';
import { useColorScheme } from './use-color-scheme';

type ThemeProps = {
  light?: string;
  dark?: string;
};

type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Look up a color by name, using the system color scheme (light/dark).
 * This version is defensive: if anything is missing, it falls back
 * to simple defaults instead of crashing.
 */
export function useThemeColor(
  props: ThemeProps,
  colorName: ColorName
): string {
  // Prefer the system color scheme; default to 'light'
  const systemScheme = useColorScheme();
  const colorScheme: 'light' | 'dark' =
    systemScheme === 'dark' ? 'dark' : 'light';

  // 1) If caller provided an explicit color, use that
  const colorFromProps = props[colorScheme];
  if (colorFromProps) {
    return colorFromProps;
  }

  // 2) Try to read from our Colors object, but very defensively
  try {
    const paletteForScheme = (Colors as any)?.[colorScheme] ?? {};
    const value = paletteForScheme[colorName];

    if (typeof value === 'string' && value.length > 0) {
      return value;
    }
  } catch {
    // ignore and fall through to defaults
  }

  // 3) Final fallback: simple safe defaults
  if (colorScheme === 'dark') {
    // Dark mode: light text on dark background
    if (colorName === 'background') return '#000000';
    if (colorName === 'text') return '#ffffff';
    return '#ffffff';
  } else {
    // Light mode: dark text on light background
    if (colorName === 'background') return '#ffffff';
    if (colorName === 'text') return '#000000';
    return '#000000';
  }
}
