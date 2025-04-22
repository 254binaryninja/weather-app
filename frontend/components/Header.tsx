'use client'

import React from 'react'
import { useTemperatureConverter } from '@/hooks/useTemperatureConverter'

function Header() {
  const { temperatureUnit, toggleTemperatureUnit } = useTemperatureConverter()
  
  return (
    <div className='flex justify-between items-center w-full p-4 bg-white shadow-md'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-bold text-primary'>Weather App</h1>
      </div>
      
      <div className='flex items-center gap-2'>
        <span className='text-sm font-medium'>°C</span>
        <label className="switch relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={temperatureUnit === 'fahrenheit'} 
            onChange={toggleTemperatureUnit}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-focus:ring-4 peer-focus:ring-primary-light"></div>
          <div className="absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
        </label>
        <span className='text-sm font-medium'>°F</span>
      </div>
    </div>
  )
}

export default Header