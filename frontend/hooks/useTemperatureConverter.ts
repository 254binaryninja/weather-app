'use client'

import { UseTemperatureConverterReturn } from '@/types';
import { useTemperatureContext } from '@/context/TemperatureContext';

/**
 * A custom hook for converting temperatures from Kelvin to Celsius or Fahrenheit
 * using the global temperature context.
 */
export function useTemperatureConverter(): UseTemperatureConverterReturn {
  const { temperatureUnit, toggleTemperatureUnit } = useTemperatureContext();

  /**
   * Converts Kelvin to the currently selected temperature unit
   */
  const convertTemperature = (kelvin: number): number => {
    if (temperatureUnit === 'celsius') {
      return kelvinToCelsius(kelvin);
    } else {
      return kelvinToFahrenheit(kelvin);
    }
  };

  /**
   * Formats the temperature with the unit symbol
   */
  const formatTemperature = (kelvin: number): string => {
    const temperature = convertTemperature(kelvin);
    const symbol = temperatureUnit === 'celsius' ? '°C' : '°F';
    return `${Math.round(temperature)}${symbol}`;
  };

  return {
    convertTemperature,
    temperatureUnit,
    toggleTemperatureUnit,
    formatTemperature,
  };
}

/**
 * Converts Kelvin to Celsius
 * Formula: C = K - 273.15
 */
function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

/**
 * Converts Kelvin to Fahrenheit
 * Formula: F = (K - 273.15) * 9/5 + 32
 */
function kelvinToFahrenheit(kelvin: number): number {
  return (kelvin - 273.15) * (9/5) + 32;
}
