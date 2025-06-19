
export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export const getWeatherData = async (lat: number, lng: number): Promise<WeatherData> => {
  try {
    // Using OpenWeatherMap API (free tier available)
    const apiKey = localStorage.getItem('weather_api_key') || 'demo_key';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data unavailable');
    }
    
    const data = await response.json();
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };
  } catch (error) {
    console.log('Weather API error:', error);
    // Return mock data as fallback
    return {
      temperature: 24,
      condition: 'Clear',
      humidity: 65,
      windSpeed: 5.2
    };
  }
};
