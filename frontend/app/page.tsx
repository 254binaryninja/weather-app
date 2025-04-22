'use client'

import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import { useEffect } from "react";
import { useWeatherEvents } from "@/hooks/useWeatherEvents";

export default function Home() {
  const { selectCity } = useWeatherEvents();

  // Load default city on first render
  useEffect(() => {
    selectCity("Nairobi");
  }, [selectCity]);

  return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 flex justify-center">
            <SearchBox />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WeatherCard />
            <ForecastCard />
          </div>
        </main>
        
        <footer className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>Weather App - Pawa IT Assessment 2025</p>
        </footer>
      </div>
  );
}
