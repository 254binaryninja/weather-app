'use client'

import React from 'react'
import Image from 'next/image'
import { useWeatherEvents } from '@/hooks/useWeatherEvents'
import { useTemperatureConverter } from '@/hooks/useTemperatureConverter'
import { ForecastItem } from '@/types'

/**
 * ForecastCard component that displays a 3-day weather forecast
 * Requirement #8 from the assessment
 */
function ForecastCard() {
  const { weatherState } = useWeatherEvents()
  const { formatTemperature } = useTemperatureConverter()
  const { forecast } = weatherState

  // Format the date from timestamp
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  // Group forecast items by day (using the date part of dt_txt)
  const groupedForecast = React.useMemo(() => {
    if (!forecast) return []

    const grouped: { [key: string]: ForecastItem[] } = {}
    
    forecast.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0]
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(item)
    })

    // Get daily average or mid-day forecast for each day
    return Object.keys(grouped)
      .map(date => {
        const items = grouped[date]
        // Try to get mid-day forecast (around 12:00 - 15:00)
        const midDayForecast = items.find(item => 
          item.dt_txt.includes('12:00') || item.dt_txt.includes('15:00')
        ) || items[0]
        
        return midDayForecast
      })
      .slice(1, 4) // Get next 3 days (skip today)
  }, [forecast])

  if (!forecast || groupedForecast.length === 0) {
    return <div className="mt-4 text-center">No forecast data available</div>
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">3-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groupedForecast.map((item, index) => (
          <div 
            key={index} 
            className="bg-base-100 p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <p className="font-medium text-lg">{formatDate(item.dt)}</p>
            <div className="my-2">
              <Image
                src={`/images/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                width={50}
                height={50}
              />
            </div>
            <p className="text-3xl font-bold">{formatTemperature(item.main.temp)}</p>
            <p className="text-sm capitalize">{item.weather[0].description}</p>
            <div className="mt-2 text-sm">
              <p>Wind: {item.wind.speed} m/s</p>
              <p>Humidity: {item.main.humidity}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastCard