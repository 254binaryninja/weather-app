'use client'

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { TemperatureUnit } from '@/types';

interface TemperatureContextType {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: React.Dispatch<React.SetStateAction<TemperatureUnit>>;
  toggleTemperatureUnit: () => void;
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

interface TemperatureProviderProps {
  children: ReactNode;
  initialUnit?: TemperatureUnit;
}

export function TemperatureProvider({
  children,
  initialUnit = 'celsius',
}: TemperatureProviderProps) {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(initialUnit);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prevUnit => prevUnit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const contextValue = useMemo(() => ({
    temperatureUnit,
    setTemperatureUnit,
    toggleTemperatureUnit
  }), [temperatureUnit]);

  return (
    <TemperatureContext.Provider
      value={contextValue}
    >
      {children}
    </TemperatureContext.Provider>
  );
}

export function useTemperatureContext() {
  const context = useContext(TemperatureContext);
  if (context === undefined) {
    throw new Error('useTemperatureContext must be used within a TemperatureProvider');
  }
  return context;
}
