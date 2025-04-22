import { eventBus, EVENTS } from './eventBus';
import { CacheEntry, CurrentWeatherData, ForecastData, WeatherApiResponse } from '@/types';
import dotenv from 'dotenv';
dotenv.config({path: '.env.local' });

/**
 * Weather Service class implementing caching and retry logic
 */
class WeatherService {
  // In-memory cache
  private weatherCache: Record<string, CacheEntry<any>> = {};
  
  // Cache duration in milliseconds (1 hour by default)
  private CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  
  // Maximum retry attempts
  private MAX_RETRIES = 3;

  // Base URL for API calls
  private baseUrl: string;

  constructor() {
    // Set the base URL, defaulting to a fallback if env variable is not available
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:9000';

    // Subscribe to city selection events
    eventBus.subscribe(EVENTS.CITY_SELECTED, (city: string) => {
      this.fetchWeatherForCity(city);
    });
    
    console.log(`Weather service initialized with base URL: ${this.baseUrl}`);
  }

  /**
   * Fetch all weather data for a city and emit events
   */
  private async fetchWeatherForCity(city: string): Promise<void> {
    if (!city) return;
    
    try {
      // Fetch current weather and forecast in parallel
      const [currentData, forecastData] = await Promise.all([
        this.fetchCurrentWeatherData(city),
        this.fetchForecastData(city),
      ]);
      
      // Emit events with the fetched data
      eventBus.emit(EVENTS.WEATHER_UPDATED, currentData);
      eventBus.emit(EVENTS.FORECAST_UPDATED, forecastData);
    } catch (error) {
      // Emit error event
      eventBus.emit(EVENTS.WEATHER_ERROR, error);
    }
  }

  /**
   * Generic function to fetch data with retry logic
   */
  private async fetchWithRetry<T>(url: string, options?: RequestInit): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < this.MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json() as T;
      } catch (error) {
        lastError = error as Error;
        console.warn(`Attempt ${attempt + 1} failed. Retrying...`, error);
        
        // Wait a bit longer between each retry (exponential backoff)
        if (attempt < this.MAX_RETRIES - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
      }
    }
    
    throw lastError || new Error('Failed after multiple attempts');
  }

  /**
   * Check if cache is valid based on timestamp
   */
  private isCacheValid(timestamp: number): boolean {
    const now = Date.now();
    return (now - timestamp) < this.CACHE_DURATION;
  }

  /**
   * Get data with caching
   */
  private async getWithCache<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    // Check if we have valid cached data
    const cachedEntry = this.weatherCache[key];
    
    if (cachedEntry && this.isCacheValid(cachedEntry.timestamp)) {
      console.log(`Using cached data for ${key}`);
      return cachedEntry.data;
    }
    
    // Fetch fresh data if cache miss or expired
    try {
      console.log(`Fetching fresh data for ${key}`);
      const data = await fetchFn();
      
      // Update cache
      this.weatherCache[key] = {
        data,
        timestamp: Date.now()
      };
      
      return data;
    } catch (error) {
      // If fetch fails but we have cached data (even if expired), return that as fallback
      if (cachedEntry) {
        console.warn('Fetch failed. Using stale cache as fallback:', error);
        return cachedEntry.data;
      }
      throw error;
    }
  }

  /**
   * Function to fetch current weather data from backend with caching
   */
  public async fetchCurrentWeatherData(city: string): Promise<CurrentWeatherData> {
    const cacheKey = `current-${city.toLowerCase()}`;
    const url = `${this.baseUrl}/api/weather/current-city?city=${encodeURIComponent(city)}`;
    
    console.log(`Fetching current weather from: ${url}`);
    return this.getWithCache<CurrentWeatherData>(cacheKey, () => 
      this.fetchWithRetry<CurrentWeatherData>(url)
    );
  }

  /**
   * Function to fetch forecast data from backend with caching
   */
  public async fetchForecastData(city: string): Promise<ForecastData> {
    const cacheKey = `forecast-${city.toLowerCase()}`;
    const url = `${this.baseUrl}/api/weather/forecast?city=${encodeURIComponent(city)}`;
    
    console.log(`Fetching forecast from: ${url}`);
    return this.getWithCache<ForecastData>(cacheKey, async () => {
      // Handle the wrapped API response format
      const response = await this.fetchWithRetry<WeatherApiResponse>(url);
      return response.data;
    });
  }

  /**
   * Manually invalidate cache to force fresh data fetch
   */
  public invalidateCache(city?: string): void {
    if (city) {
      // Invalidate specific city data
      const cityLower = city.toLowerCase();
      delete this.weatherCache[`current-${cityLower}`];
      delete this.weatherCache[`forecast-${cityLower}`];
    } else {
      // Invalidate all cache
      this.weatherCache = {};
    }
  }

  /**
   * Schedule cache refresh based on provided interval (in hours)
   */
  public scheduleCacheRefresh(hours = 1): () => void {
    const intervalMs = hours * 60 * 60 * 1000;
    
    // Start periodic refresh
    const intervalId = setInterval(() => {
      console.log('Performing scheduled cache invalidation');
      this.invalidateCache();
    }, intervalMs);
    
    // Return function to cancel the scheduled refresh
    return () => clearInterval(intervalId);
  }
}

// Export a singleton instance
export const weatherService = new WeatherService();

// Export methods from the singleton for direct use
export const {
  fetchCurrentWeatherData,
  fetchForecastData,
  invalidateCache,
  scheduleCacheRefresh
} = weatherService;

