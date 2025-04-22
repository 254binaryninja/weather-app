'use client'

import React, { useState, FormEvent } from 'react'
import { useWeatherEvents } from '@/hooks/useWeatherEvents'

/**
 * SearchBox component that allows users to search for cities
 * Requirement #1 and #2 from the assessment
 */
function SearchBox() {
  const [query, setQuery] = useState('')
  const { selectCity, weatherState } = useWeatherEvents()
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      selectCity(query.trim())
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            className="input input-primary w-full py-3 pl-4 pr-16 rounded-lg"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for a city"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {weatherState.loading && (
              <div className="loading loading-spinner loading-sm"></div>
            )}
          </div>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary ml-2"
          disabled={weatherState.loading || !query.trim()}
        >
          Search
        </button>
      </form>
      
      {weatherState.error && (
        <div className="text-error text-sm mt-2">
          {weatherState.error.message || 'Failed to fetch weather data'}
        </div>
      )}
    </div>
  )
}

export default SearchBox