// context/OrbitContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

const STORAGE_KEYS = {
  CHECKINS: 'orbit:checkins',
  SELECTED_MOOD: 'orbit:selectedMood',
  ONBOARDING_COMPLETE: 'orbit:onboardingComplete',
} as const;

// You can refine these later if you like.
// For now we keep them flexible and simple.
export type MoodValue = string | null;

export interface Checkin {
  id: string;
  venueId: string;
  timestamp: string; // ISO string
  type: 'quick' | 'meaningful';
  mood?: string | null;
  note?: string | null;
}

export interface OrbitContextValue {
  // Raw state
  checkins: Checkin[];
  selectedMood: MoodValue;
  onboardingComplete: boolean;
  isHydrated: boolean;

  // Mood controls
  setSelectedMood: (mood: MoodValue) => void;

  // Check-ins
  addCheckin: (input: Omit<Checkin, 'id' | 'timestamp'> & { timestamp?: string }) => void;
  clearQuickCheckinsForVenue: (venueId: string) => void;
  getVenueCheckins: (venueId: string) => Checkin[];
  getRecentCheckins: (limit?: number) => Checkin[];

  // Onboarding
  setOnboardingComplete: (complete: boolean) => void;
}

const OrbitContext = createContext<OrbitContextValue | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const OrbitProvider: React.FC<ProviderProps> = ({ children }) => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [selectedMood, setSelectedMoodState] = useState<MoodValue>(null);
  const [onboardingComplete, setOnboardingCompleteState] = useState<boolean>(
    false
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // --- Hydration from AsyncStorage -----------------------------------------
  useEffect(() => {
    const hydrate = async () => {
      try {
        const [storedCheckins, storedMood, storedOnboarding] =
          await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.CHECKINS),
            AsyncStorage.getItem(STORAGE_KEYS.SELECTED_MOOD),
            AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE),
          ]);

        if (storedCheckins) {
          setCheckins(JSON.parse(storedCheckins));
        }

        if (storedMood) {
          setSelectedMoodState(storedMood);
        }

        if (storedOnboarding) {
          setOnboardingCompleteState(storedOnboarding === 'true');
        }
      } catch (err) {
        console.warn('OrbitContext: error hydrating state', err);
      } finally {
        setIsHydrated(true);
      }
    };

    hydrate();
  }, []);

  // --- Persistence helpers --------------------------------------------------
  const persistCheckins = async (next: Checkin[]) => {
    setCheckins(next);
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.CHECKINS,
        JSON.stringify(next)
      );
    } catch (err) {
      console.warn('OrbitContext: error saving checkins', err);
    }
  };

  const persistSelectedMood = async (mood: MoodValue) => {
    setSelectedMoodState(mood);
    try {
      if (mood == null) {
        await AsyncStorage.removeItem(STORAGE_KEYS.SELECTED_MOOD);
      } else {
        await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_MOOD, String(mood));
      }
    } catch (err) {
      console.warn('OrbitContext: error saving selected mood', err);
    }
  };

  const persistOnboardingComplete = async (complete: boolean) => {
    setOnboardingCompleteState(complete);
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_COMPLETE,
        complete ? 'true' : 'false'
      );
    } catch (err) {
      console.warn('OrbitContext: error saving onboarding flag', err);
    }
  };

  // --- Public API -----------------------------------------------------------

  const setSelectedMood = (mood: MoodValue) => {
    void persistSelectedMood(mood);
  };

  const addCheckin: OrbitContextValue['addCheckin'] = (input) => {
    const newCheckin: Checkin = {
      id: `${input.venueId}-${Date.now()}`,
      venueId: input.venueId,
      type: input.type,
      timestamp: input.timestamp ?? new Date().toISOString(),
      mood: input.mood ?? null,
      note: input.note ?? null,
    };

    const next = [newCheckin, ...checkins];
    void persistCheckins(next);
  };

  const clearQuickCheckinsForVenue = (venueId: string) => {
    const next = checkins.filter(
      (c) => !(c.venueId === venueId && c.type === 'quick')
    );
    void persistCheckins(next);
  };

  const getVenueCheckins = (venueId: string): Checkin[] => {
    return checkins.filter((c) => c.venueId === venueId);
  };

  const getRecentCheckins = (limit: number = 10): Checkin[] => {
    // checkins are already stored newest-first in addCheckin
    return checkins.slice(0, limit);
  };

  const setOnboardingComplete = (complete: boolean) => {
    void persistOnboardingComplete(complete);
  };

  const value: OrbitContextValue = {
    checkins,
    selectedMood,
    onboardingComplete,
    isHydrated,
    setSelectedMood,
    addCheckin,
    clearQuickCheckinsForVenue,
    getVenueCheckins,
    getRecentCheckins,
    setOnboardingComplete,
  };

  return (
    <OrbitContext.Provider value={value}>
      {children}
    </OrbitContext.Provider>
  );
};

export const useOrbit = (): OrbitContextValue => {
  const ctx = useContext(OrbitContext);
  if (!ctx) {
    throw new Error('useOrbit must be used within an OrbitProvider');
  }
  return ctx;
};
