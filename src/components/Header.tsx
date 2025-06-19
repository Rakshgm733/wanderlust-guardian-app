
import React, { useState, useEffect } from 'react';
import SOSButton from './SOSButton';
import { Bell, Compass, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getWeatherData, WeatherData } from '@/services/weatherService';

const Header = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const weatherData = await getWeatherData(
                position.coords.latitude, 
                position.coords.longitude
              );
              setWeather(weatherData);
            },
            async () => {
              // Default location weather
              const weatherData = await getWeatherData(40.7128, -74.0060);
              setWeather(weatherData);
            }
          );
        }
      } catch (error) {
        console.error('Weather loading error:', error);
      }
    };

    loadWeather();
  }, []);

  return (
    <div className="bg-gradient-to-r from-travel-ocean to-travel-sky text-white p-6 rounded-lg mb-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Compass className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Cultural Guide</h1>
            <p className="text-sm opacity-90">Discover, Explore, Stay Safe</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
            </Button>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Live alerts
            </Badge>
          </div>
          <SOSButton />
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm opacity-75">Events Today</p>
          <p className="text-xl font-bold">5</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm opacity-75">Safety Level</p>
          <p className="text-xl font-bold text-green-300">Good</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center justify-center space-x-1">
            <Thermometer className="h-4 w-4" />
            <p className="text-sm opacity-75">Weather</p>
          </div>
          <p className="text-xl font-bold">
            {weather ? `${weather.temperature}°C` : '24°C'}
          </p>
          <p className="text-xs opacity-75">
            {weather ? weather.condition : 'Clear'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
