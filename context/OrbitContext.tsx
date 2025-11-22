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
  CURIOUS_VENUES: 'orbit:curiousVenues',
  CONNECTIONS_VISIBILITY: 'orbit:connectionsVisibility',
  ORBIT_PROFILE: 'orbit:orbitProfile',
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

export type ConnectionsVisibility = 'private' | 'overlaps' | 'open';

export type TimeOfDayPreference =
  | 'dawn'
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'late'
  | null;

export interface OrbitProfile {
  firstName: string;
  lastInitial?: string;
  bio: string;
  favoriteVenueIds: string[];
  timeOfDayPreference: TimeOfDayPreference;
  moodPalette: string[]; // mood keys like 'soft', 'curious', etc.
}

export interface OrbitContextValue {
  // Raw state
  checkins: Checkin[];
  selectedMood: MoodValue;
  onboardingComplete: boolean;
  isHydrated: boolean;

  // Curious venues (saved / starred)
  curiousVenueIds: string[];
  toggleCuriousVenue: (venueId: string) => void;
  isCuriousVenue: (venueId: string) => boolean;

  // Mood controls
  setSelectedMood: (mood: MoodValue) => void;

  // Check-ins
  addCheckin: (
    input: Omit<Checkin, 'id' | 'timestamp'> & { timestamp?: string }
  ) => void;
  clearQuickCheckinsForVenue: (venueId: string) => void;
  getVenueCheckins: (venueId: string) => Checkin[];
  getRecentCheckins: (limit?: number) => Checkin[];

  // Onboarding
  setOnboardingComplete: (complete: boolean) => void;

  // Connections
  connectionsVisibility: ConnectionsVisibility;
  setConnectionsVisibility: (mode: ConnectionsVisibility) => void;

  orbitProfile: OrbitProfile;
  updateOrbitProfile: (update: Partial<OrbitProfile>) => void;
}

const OrbitContext = createContext<OrbitContextValue | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

const defaultOrbitProfile: OrbitProfile = {
  firstName: '',
  lastInitial: '',
  bio: '',
  favoriteVenueIds: [],
  timeOfDayPreference: null,
  moodPalette: [],
};

export const OrbitProvider: React.FC<ProviderProps> = ({ children }) => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [selectedMood, setSelectedMoodState] = useState<MoodValue>(null);
  const [onboardingComplete, setOnboardingCompleteState] =
    useState<boolean>(false);
  const [curiousVenueIds, setCuriousVenueIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Connections state
  const [connectionsVisibility, setConnectionsVisibilityState] =
    useState<ConnectionsVisibility>('private');
  const [orbitProfile, setOrbitProfile] =
    useState<OrbitProfile>(defaultOrbitProfile);

  // --- Hydration from AsyncStorage -----------------------------------------
  useEffect(() => {
    const hydrate = async () => {
      try {
        const [
          storedCheckins,
          storedMood,
          storedOnboarding,
          storedCuriousVenues,
          storedConnectionsVisibility,
          storedOrbitProfile,
        ] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.CHECKINS),
          AsyncStorage.getItem(STORAGE_KEYS.SELECTED_MOOD),
          AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE),
          AsyncStorage.getItem(STORAGE_KEYS.CURIOUS_VENUES),
          AsyncStorage.getItem(STORAGE_KEYS.CONNECTIONS_VISIBILITY),
          AsyncStorage.getItem(STORAGE_KEYS.ORBIT_PROFILE),
        ]);

        if (storedCheckins) {
          try {
            const parsed = JSON.parse(storedCheckins);
            if (Array.isArray(parsed)) {
              setCheckins(parsed);
            }
          } catch {
            // ignore malformed data
          }
        }

        if (storedMood) {
          setSelectedMoodState(storedMood);
        }

        if (storedOnboarding) {
          setOnboardingCompleteState(storedOnboarding === 'true');
        }

        if (storedCuriousVenues) {
          try {
            const parsed = JSON.parse(storedCuriousVenues);
            if (Array.isArray(parsed)) {
              setCuriousVenueIds(parsed.filter((id) => typeof id === 'string'));
            }
          } catch {
            // ignore malformed data
          }
        }

        if (storedConnectionsVisibility) {
          if (
            storedConnectionsVisibility === 'private' ||
            storedConnectionsVisibility === 'overlaps' ||
            storedConnectionsVisibility === 'open'
          ) {
            setConnectionsVisibilityState(
              storedConnectionsVisibility as ConnectionsVisibility
            );
          }
        }

        if (storedOrbitProfile) {
          try {
            const parsed = JSON.parse(storedOrbitProfile);
            if (parsed && typeof parsed === 'object') {
              setOrbitProfile((prev) => ({
                ...prev,
                ...parsed,
              }));
            }
          } catch {
            // ignore malformed profile
          }
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
      await AsyncStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify(next));
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

  const persistCuriousVenues = async (next: string[]) => {
    setCuriousVenueIds(next);
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.CURIOUS_VENUES,
        JSON.stringify(next)
      );
    } catch (err) {
      console.warn('OrbitContext: error saving curious venues', err);
    }
  };

  const persistConnectionsVisibility = async (mode: ConnectionsVisibility) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.CONNECTIONS_VISIBILITY,
        mode
      );
    } catch (err) {
      console.warn('OrbitContext: error saving connections visibility', err);
    }
  };

  const persistOrbitProfile = async (profile: OrbitProfile) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ORBIT_PROFILE,
        JSON.stringify(profile)
      );
    } catch (err) {
      console.warn('OrbitContext: error saving orbit profile', err);
    }
  };

  // --- Public API: moods, check-ins, onboarding -----------------------------

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

  const toggleCuriousVenue = (venueId: string) => {
    setCuriousVenueIds((current) => {
      const set = new Set(current);
      if (set.has(venueId)) {
        set.delete(venueId);
      } else {
        set.add(venueId);
      }
      const next = Array.from(set);
      void persistCuriousVenues(next);
      return next;
    });
  };

  const isCuriousVenue = (venueId: string): boolean => {
    return curiousVenueIds.includes(venueId);
  };

  // --- Public API: connections ----------------------------------------------

  const setConnectionsVisibility = (mode: ConnectionsVisibility) => {
    setConnectionsVisibilityState(mode);
    void persistConnectionsVisibility(mode);
  };

  const updateOrbitProfile = (update: Partial<OrbitProfile>) => {
    setOrbitProfile((prev) => {
      const next: OrbitProfile = {
        ...prev,
        ...update,
      };
      void persistOrbitProfile(next);
      return next;
    });
  };

  const value: OrbitContextValue = {
    checkins,
    selectedMood,
    onboardingComplete,
    isHydrated,

    curiousVenueIds,
    toggleCuriousVenue,
    isCuriousVenue,

    setSelectedMood,
    addCheckin,
    clearQuickCheckinsForVenue,
    getVenueCheckins,
    getRecentCheckins,
    setOnboardingComplete,

    connectionsVisibility,
    setConnectionsVisibility,

    orbitProfile,
    updateOrbitProfile,
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
