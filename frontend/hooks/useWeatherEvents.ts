'use client'

import { useState, useEffect } from 'react';
import { eventBus, EVENTS } from '../services/eventBus';
import { CurrentWeatherData, ForecastData, WeatherState } from '@/types';
import { weatherService } from '../services/weatherService';

/**
 * Hook to subscribe to weather-related events and manage weather state
 */
export function useWeatherEvents(): {
  weatherState: WeatherState;
  selectCity: (city: string) => void;
} {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    current: null,
    forecast: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    // Set up cache refresh every 2 hours
    const cleanupRefresh = weatherService.scheduleCacheRefresh(2);

    // Subscribe to weather events
    const weatherSub = eventBus.subscribe<CurrentWeatherData>(EVENTS.WEATHER_UPDATED, (data) => {
      setWeatherState(prev => ({
        ...prev,
        current: data,
        loading: false,
      }));
    });

    const forecastSub = eventBus.subscribe<ForecastData>(EVENTS.FORECAST_UPDATED, (data) => {
      setWeatherState(prev => ({
        ...prev,
        forecast: data,
        loading: false,
      }));
    });

    // Fixed: Changed incorrect type to 'Error' for proper typing
    const errorSub = eventBus.subscribe<Error>(EVENTS.WEATHER_ERROR, (error) => {
      setWeatherState(prev => ({
        ...prev,
        error,
        loading: false,
      }));
    });

    // Cleanup subscriptions on unmount
    return () => {
      weatherSub();
      forecastSub();
      errorSub();
      cleanupRefresh();
    };
  }, []);

  // Function to select a new city
  const selectCity = (city: string) => {
    if (!city) return;
    
    // Set loading state
    setWeatherState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));
    
    // Emit city selected event
    eventBus.emit(EVENTS.CITY_SELECTED, city);
  };

  return {
    weatherState,
    selectCity,
  };
}
