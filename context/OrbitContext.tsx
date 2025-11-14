// context/OrbitContext.tsx
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

export type OrbitCheckin = {
  id: string;
  venueId: string;
  venueName: string;
  tags: string[];
  note: string;
  createdAt: string; // ISO timestamp
};

type AddCheckinInput = {
  venueId: string;
  venueName: string;
  tags: string[];
  note: string;
};

type OrbitContextType = {
  checkins: OrbitCheckin[];
  addCheckin: (input: AddCheckinInput) => void;
};

const OrbitContext = createContext<OrbitContextType | undefined>(undefined);

export const OrbitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [checkins, setCheckins] = useState<OrbitCheckin[]>([]);

  const addCheckin = useCallback((input: AddCheckinInput) => {
    setCheckins((prev) => {
      const newCheckin: OrbitCheckin = {
        id: `${input.venueId}-${Date.now()}`,
        venueId: input.venueId,
        venueName: input.venueName,
        tags: input.tags,
        note: input.note.trim(),
        createdAt: new Date().toISOString(),
      };

      // Newest first
      return [newCheckin, ...prev];
    });
  }, []);

  const value = useMemo(
    () => ({
      checkins,
      addCheckin,
    }),
    [checkins, addCheckin]
  );

  return (
    <OrbitContext.Provider value={value}>{children}</OrbitContext.Provider>
  );
};

export const useOrbit = (): OrbitContextType => {
  const ctx = useContext(OrbitContext);
  if (!ctx) {
    throw new Error('useOrbit must be used within an OrbitProvider');
  }
  return ctx;
};
