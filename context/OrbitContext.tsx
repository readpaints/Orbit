// context/OrbitContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

export type OrbitCheckin = {
  venueId: string;
  timestamp: number;
};

type OrbitContextType = {
  checkins: OrbitCheckin[];
  addCheckin: (venueId: string) => void;
};

const OrbitContext = createContext<OrbitContextType | undefined>(undefined);

export const OrbitProvider = ({ children }: { children: ReactNode }) => {
  const [checkins, setCheckins] = useState<OrbitCheckin[]>([]);

  const addCheckin = (venueId: string) => {
    setCheckins((prev) => [
      ...prev,
      {
        venueId,
        timestamp: Date.now(),
      },
    ]);
  };

  return (
    <OrbitContext.Provider value={{ checkins, addCheckin }}>
      {children}
    </OrbitContext.Provider>
  );
};

export const useOrbit = () => {
  const ctx = useContext(OrbitContext);
  if (!ctx) {
    throw new Error('useOrbit must be used inside an OrbitProvider');
  }
  return ctx;
};
