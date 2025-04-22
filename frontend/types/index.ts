// Temperature calculation types
export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface UseTemperatureConverterReturn {
    convertTemperature: (kelvin: number) => number;
    temperatureUnit: TemperatureUnit;
    toggleTemperatureUnit: () => void;
    formatTemperature: (kelvin: number) => string;
}

// Weather API response interfaces
export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf?: number;
}

export interface CloudData {
  all: number; // Cloud coverage percentage
}

export interface WindData {
  speed: number;
  deg: number;
  gust: number;
}

export interface RainData {
  '3h'?: number; // Rainfall volume for last 3 hours
}

export interface SysData {
  pod?: string; // Part of day (d = day, n = night)
  country?: string;
  sunrise?: number;
  sunset?: number;
}

export interface CityData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastItem {
  dt: number; // Timestamp
  main: MainWeatherData;
  weather: WeatherInfo[];
  clouds: CloudData;
  wind: WindData;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: RainData;
  sys: SysData;
  dt_txt: string; // Date/time in text format
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: CityData;
}

export interface WeatherApiResponse {
  data: ForecastData;
  status: number;
}

export interface CurrentWeatherData {
  name: string;
  main: MainWeatherData;
  weather: WeatherInfo[];
  wind: WindData;
  clouds: CloudData;
  rain?: RainData;
  sys: SysData;
  dt: number; // Timestamp of data calculation
  visibility: number;
}

export interface WeatherState {
  current: CurrentWeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: Error | null;
}

// Cache entry interface
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}