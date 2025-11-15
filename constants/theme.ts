// constants/theme.ts

export type TimeOfDay = 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export type OrbitColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
  border: string;
  chipBackground: string;
  chipText: string;
  tabBarBackground: string;
  tabBarBorder: string;
};

export type OrbitTheme = {
  name: string;
  timeOfDay: TimeOfDay;
  colors: OrbitColors;
  gradient: [string, string];
};

export const getTimeOfDay = (date: Date = new Date()): TimeOfDay => {
  const hour = date.getHours(); // 0–23, device local time

  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 14) return 'midday';
  if (hour >= 14 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
};

export const themesByTimeOfDay: Record<TimeOfDay, OrbitTheme> = {
  morning: {
    name: 'Morning Glow',
    timeOfDay: 'morning',
    colors: {
      // soft warm + high contrast text
      background: '#FFF7ED',       // warm, peachy
      surface: '#FFFBEB',          // light warm card
      surfaceAlt: '#FDEAD7',
      text: '#1F2933',
      textMuted: '#6B7280',
      accent: '#EA580C',           // warm orange
      accentSoft: '#FED7AA',
      accentStrong: '#C2410C',
      border: '#FED7AA',
      chipBackground: '#FED7AA',
      chipText: '#7C2D12',
      tabBarBackground: '#FFFBEB',
      tabBarBorder: '#FED7AA',
    },
    gradient: ['#FFEDD5', '#FEF3C7'],
  },
  midday: {
    name: 'Midday Clear',
    timeOfDay: 'midday',
    colors: {
      // bright neutral + blue accent
      background: '#F9FAFB',
      surface: '#FFFFFF',
      surfaceAlt: '#F3F4F6',
      text: '#111827',
      textMuted: '#6B7280',
      accent: '#2563EB',           // blue
      accentSoft: '#DBEAFE',
      accentStrong: '#1D4ED8',
      border: '#E5E7EB',
      chipBackground: '#DBEAFE',
      chipText: '#1E3A8A',
      tabBarBackground: '#FFFFFF',
      tabBarBorder: '#E5E7EB',
    },
    gradient: ['#EFF6FF', '#FFFFFF'],
  },
  afternoon: {
    name: 'Golden Afternoon',
    timeOfDay: 'afternoon',
    colors: {
      background: '#FEF3C7',       // soft golden
      surface: '#FFFBEB',
      surfaceAlt: '#FDE68A',
      text: '#1F2933',
      textMuted: '#6B7280',
      accent: '#D97706',           // amber
      accentSoft: '#FDE68A',
      accentStrong: '#B45309',
      border: '#FACC15',
      chipBackground: '#FDE68A',
      chipText: '#78350F',
      tabBarBackground: '#FFFBEB',
      tabBarBorder: '#FACC15',
    },
    gradient: ['#FFF7ED', '#FEF3C7'],
  },
  evening: {
    name: 'Evening Dusk',
    timeOfDay: 'evening',
    colors: {
      background: '#020617',       // near-black navy
      surface: '#020617',
      surfaceAlt: '#0F172A',
      text: '#E5E7EB',
      textMuted: '#9CA3AF',
      accent: '#F97316',           // warm orange pop
      accentSoft: '#4B5563',
      accentStrong: '#FB923C',
      border: '#1F2937',
      chipBackground: '#111827',
      chipText: '#F9FAFB',
      tabBarBackground: '#020617',
      tabBarBorder: '#1F2937',
    },
    gradient: ['#020617', '#0F172A'],
  },
  night: {
    name: 'Midnight Orbit',
    timeOfDay: 'night',
    colors: {
      background: '#020617',       // deep dark
      surface: '#020617',
      surfaceAlt: '#020617',
      text: '#E5E7EB',
      textMuted: '#9CA3AF',
      accent: '#22D3EE',           // cyan / neon-y
      accentSoft: '#0E7490',
      accentStrong: '#06B6D4',
      border: '#111827',
      chipBackground: '#111827',
      chipText: '#E5E7EB',
      tabBarBackground: '#020617',
      tabBarBorder: '#0F172A',
    },
    gradient: ['#020617', '#020617'],
  },
};

export const getThemeForTime = (date: Date = new Date()): OrbitTheme => {
  const tod = getTimeOfDay(date);
  return themesByTimeOfDay[tod];
};

// Convenience helper for components.
// Call this in your screens/layouts at render time.
export const getCurrentOrbitTheme = (): OrbitTheme => {
  return getThemeForTime(new Date());
};
