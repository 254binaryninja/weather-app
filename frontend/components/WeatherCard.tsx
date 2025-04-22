'use client'

import React from 'react'
import Image from 'next/image'
import { useWeatherEvents } from '@/hooks/useWeatherEvents'
import { WeatherState } from '@/types'
import { useTemperatureConverter } from '@/hooks/useTemperatureConverter'

function WeatherCard() {
  const { weatherState } = useWeatherEvents();
  const { formatTemperature } = useTemperatureConverter();
  
  // Format the current date
  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) return '';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // If weather data is not available yet, display a loading state
  if (!weatherState.current) {
    return (
      <div className='flex flex-col gap-4 items-center justify-center min-h-[400px]'>
        <div className="loading loading-spinner loading-lg"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  const { current } = weatherState;
  const temperature = formatTemperature(current.main.temp);
  const description = current.weather[0].description;
  const formattedDate = formatDate(current.dt);
  const iconCode = current.weather[0].icon;
  const windSpeed = current.wind.speed;
  const humidity = current.main.humidity;

  return (
    <div className='flex flex-col md:flex-row gap-8 w-full'>
      {/* Main weather display */}
      <div className='flex flex-col gap-6 items-center justify-start max-w-[400px]'>
        <div className='py-8 px-6 bg-base-100 rounded-lg shadow-lg w-full'>
          <div className="flex justify-center mb-4">
            <Image
              src={`/images/${iconCode}.png`}
              alt={description}
              width={120}
              height={120}
              className="weather-icon"
            />
          </div>
          <div className='text-center'>
            <h2 className='text-6xl font-extrabold mb-2'>{temperature}</h2>
            <p className='text-xl font-medium capitalize mb-4'>{description}</p>
            <p className='text-base font-medium text-gray-600'>{formattedDate}</p>
            <h3 className='text-2xl font-bold mt-2'>{current.name}</h3>
          </div>
        </div>
      </div>

      {/* Weather details section */}
      <div className='flex flex-col gap-4 flex-1'>
        <div className='bg-base-100 rounded-lg shadow-lg p-6'>
          <h3 className='text-xl font-bold mb-4'>Today's Highlights</h3>
          
          {/* Wind status - requirement #9 */}
          <div className='p-4 bg-base-200 rounded-lg mb-4'>
            <h4 className='text-md font-semibold mb-2'>Wind Status</h4>
            <div className='flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <p className='text-2xl font-bold'>{windSpeed} <span className='text-sm font-normal'>m/s</span></p>
            </div>
          </div>
          
          {/* Humidity information - requirement #10 */}
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
    </div>
  )
}

export default WeatherCard