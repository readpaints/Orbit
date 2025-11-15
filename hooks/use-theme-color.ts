// hooks/use-theme-color.ts
import Colors from '@/constants/Colors';
import { useColorScheme } from './use-color-scheme';

type ThemeName = 'light' | 'dark';

type ThemeProps = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  props: ThemeProps = {}, // default so props is never undefined
  colorName: keyof (typeof Colors)['light']
) {
  const systemScheme = useColorScheme() ?? 'light';

  // Normalize anything weird to just 'light' | 'dark'
  const theme: ThemeName = systemScheme === 'dark' ? 'dark' : 'light';

  // If the caller passed an explicit override, use it
  const colorFromProps = props[theme];
  if (colorFromProps != null) {
    return colorFromProps;
  }

  // Safe: we know Colors.light & Colors.dark exist
  const themeColors = Colors[theme];

  return themeColors[colorName];
}
