'use client'

import { useEffect, useState, useCallback } from 'react';
import { fetchCurrentWeatherData, fetchForecastData, scheduleCacheRefresh } from '../services/weatherService';
import { WeatherState } from '@/types';



export function useWeather(city: string) {
  const [state, setState] = useState<WeatherState>({
    current: null,
    forecast: null,
    loading: true,
    error: null,
  });

  // Function to fetch all weather data
  const fetchWeather = useCallback(async () => {
    if (!city) return;
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Fetch both current and forecast data in parallel
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeatherData(city),
        fetchForecastData(city),
      ]);
      
      setState({
        current: currentData,
        forecast: forecastData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error : new Error('Failed to fetch weather data'),
      }));
    }
  }, [city]);

  // Set up automatic refresh
  useEffect(() => {
    // Schedule cache refresh every 2 hours
    const cleanupRefresh = scheduleCacheRefresh(2);
    
    return () => {
      cleanupRefresh();
    };
  }, []);

  // Fetch weather data when city changes
  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city, fetchWeather]);

  // Return state and refetch function
  return {
    ...state,
    refetch: fetchWeather,
  };
}
