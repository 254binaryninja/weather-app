'use client'

import React, { memo } from 'react'
import Image from 'next/image'
import { useWeatherEvents } from '@/hooks/useWeatherEvents'
import { WeatherState, CurrentWeatherData } from '@/types'
import { useTemperatureConverter } from '@/hooks/useTemperatureConverter'
import { SkeletonLoader } from './SkeletonLoader'

// Format the current date - moved outside component
const formatDate = (timestamp: number | undefined) => {
  if (!timestamp) return '';
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

// WeatherIcon component
const WeatherIcon = memo(({ iconCode, description }: { iconCode: string; description: string }) => {
  return (
    <div className="flex justify-center mb-4">
      <Image
        src={`/images/${iconCode}.png`}
        alt={description}
        width={120}
        height={120}
        className="weather-icon"
      />
    </div>
  );
});
WeatherIcon.displayName = 'WeatherIcon';

// Weather details component for wind status and humidity
const WeatherDetails = memo(({ windSpeed, humidity }: { windSpeed: number; humidity: number }) => {
  return (
    <div className='flex flex-col gap-4 flex-1'>
      <div className='bg-base-100 rounded-lg shadow-lg p-6'>
        <h3 className='text-xl font-bold mb-4'>Today's Highlights</h3>
        
        {/* Wind status */}
        <div className='p-4 bg-base-200 rounded-lg mb-4'>
          <h4 className='text-md font-semibold mb-2'>Wind Status</h4>
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <p className='text-2xl font-bold'>{windSpeed} <span className='text-sm font-normal'>m/s</span></p>
          </div>
        </div>
        
        {/* Humidity information */}
        <div className='p-4 bg-base-200 rounded-lg'>
          <h4 className='text-md font-semibold mb-2'>Humidity</h4>
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <p className='text-2xl font-bold'>{humidity}<span className='text-sm font-normal'>%</span></p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${humidity}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
});
WeatherDetails.displayName = 'WeatherDetails';

// Error Display Component
const ErrorDisplay = memo(({ error }: { error: Error | null }) => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-[400px] bg-red-50 rounded-lg p-8'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className='text-xl font-bold text-red-700'>Error Loading Weather Data</h3>
      <p className='text-red-600'>{error?.message || 'An unknown error occurred'}</p>
      <p className='text-sm text-gray-600'>Please try again later or check your connection</p>
    </div>
  );
});
ErrorDisplay.displayName = 'ErrorDisplay';

// Main WeatherCard component
function WeatherCard() {
  const { weatherState } = useWeatherEvents();
  const { formatTemperature } = useTemperatureConverter();
  
  // Handle loading state
  if (weatherState.loading || !weatherState.current) {
    return <SkeletonLoader />;
  }

  // Handle error state
  if (weatherState.error) {
    return <ErrorDisplay error={weatherState.error} />;
  }

  const { current } = weatherState;
  
  // Add proper null checking and default values
  const temperature = formatTemperature(current?.main?.temp ?? 0);
  const weatherData = current?.weather?.[0] || {};
  const description = weatherData.description || 'Unknown weather';
  const formattedDate = formatDate(current?.dt);
  const iconCode = weatherData.icon || '01d'; // Default to clear sky icon
  const windSpeed = current?.wind?.speed ?? 0;
  const humidity = current?.main?.humidity ?? 0;

  return (
    <div className='flex flex-col md:flex-row gap-8 w-full'>
      {/* Main weather display */}
      <div className='flex flex-col gap-6 items-center justify-start max-w-[400px]'>
        <div className='py-8 px-6 bg-base-100 rounded-lg shadow-lg w-full'>
          <WeatherIcon iconCode={iconCode} description={description} />
          <div className='text-center'>
            <h2 className='text-4xl font-bold mb-2'>{temperature}</h2>
            <p className='text-lg text-gray-600'>{description}</p>
            <p className='text-sm text-gray-500'>{formattedDate}</p>
          </div>
        </div>
      </div>
      <WeatherDetails windSpeed={windSpeed} humidity={humidity} />
    </div>
  );
}

export default WeatherCard;

