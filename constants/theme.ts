// constants/theme.ts

export type TimeOfDay = 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export type OrbitTheme = {
  background: string;
  cardBackground: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  tagBackground: string;
  tagText: string;
};

const THEMES: Record<TimeOfDay, OrbitTheme> = {
  morning: {
    // TODO: replace these with your chosen palette
    background: '#F5F4FF',
    cardBackground: '#FFFFFF',
    cardBorder: '#E0DEFF',
    textPrimary: '#171123',
    textSecondary: '#555066',
    textMuted: '#8D88A0',
    accent: '#FFB347',
    tagBackground: '#EFE9FF',
    tagText: '#4E3FB8',
  },
  midday: {
    background: '#FFFFFF',
    cardBackground: '#F7F7FB',
    cardBorder: '#E0E0F0',
    textPrimary: '#151515',
    textSecondary: '#505060',
    textMuted: '#9090A0',
    accent: '#3C82F6',
    tagBackground: '#E3EEFF',
    tagText: '#2153B8',
  },
  afternoon: {
    background: '#FFF7EC',
    cardBackground: '#FFF1DD',
    cardBorder: '#FFD6A3',
    textPrimary: '#291400',
    textSecondary: '#7A4B1A',
    textMuted: '#AA7A47',
    accent: '#F59E0B',
    tagBackground: '#FFE6B8',
    tagText: '#7A4B1A',
  },
  evening: {
    background: '#050509',
    cardBackground: '#111118',
    cardBorder: '#252535',
    textPrimary: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textMuted: '#777788',
    accent: '#F97316',
    tagBackground: '#222233',
    tagText: '#CFCFFF',
  },
  night: {
    background: '#02020A',
    cardBackground: '#070713',
    cardBorder: '#1A1A2B',
    textPrimary: '#F5F5FF',
    textSecondary: '#A4A4C4',
    textMuted: '#6F6F8C',
    accent: '#A855F7',
    tagBackground: '#18182A',
    tagText: '#D5C6FF',
  },
};

export const getTimeOfDay = (date: Date = new Date()): TimeOfDay => {
  const hour = date.getHours();

  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 14) return 'midday';
  if (hour >= 14 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
};

export const getCurrentTheme = (): OrbitTheme => {
  const tod = getTimeOfDay();
  return THEMES[tod];
};
