// hooks/use-theme-color.ts

import { useColorScheme } from 'react-native';

import Colors, {
  ThemeColorName,
  ThemeName,
} from '@/constants/Colors';

type ThemeProps = {
  light?: string;
  dark?: string;
};

/**
 * useThemeColor
 *
 * Given optional overrides for light/dark and a color name,
 * returns a concrete color string from the current theme.
 *
 * If you pass lightColor/darkColor, those win.
 * Otherwise we fall back to Colors[theme][colorName].
 */
export function useThemeColor(
  props: ThemeProps,
  colorName: ThemeColorName
): string {
  const theme = (useColorScheme() ?? 'dark') as ThemeName;
  const { light, dark } = props;

  if (theme === 'light' && light) {
    return light;
  }

  if (theme === 'dark' && dark) {
    return dark;
  }

  return Colors[theme][colorName];
}
