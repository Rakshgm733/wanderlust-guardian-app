
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Map } from 'lucide-react';

const InteractiveMap = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied or unavailable');
          // Default to a sample location (New York)
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    }
  }, []);

  const nearbyPlaces = [
    { name: "Historic Museum", type: "Culture", distance: "0.3 km", rating: 4.5 },
    { name: "Local Market", type: "Food", distance: "0.5 km", rating: 4.2 },
    { name: "Art Gallery", type: "Culture", distance: "0.7 km", rating: 4.7 },
    { name: "Traditional Restaurant", type: "Food", distance: "0.9 km", rating: 4.6 },
    { name: "Police Station", type: "Safety", distance: "1.2 km", rating: null }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Culture': return 'text-purple-600';
      case 'Food': return 'text-green-600';
      case 'Safety': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Map className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Explore Nearby</h2>
      </div>

      {!mapboxToken && (
        <Card className="border-travel-ocean/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Setup Map</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Mapbox public token to enable interactive maps. Get one at{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                mapbox.com
              </a>
            </p>
            <Input
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </CardContent>
        </Card>
      )}

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg">Your Location</CardTitle>
        </CardHeader>
        <CardContent>
          {userLocation ? (
            <div className="space-y-2">
              <p className="text-sm">
                📍 Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}
              </p>
              <div className="w-full h-40 bg-gradient-to-br from-travel-ocean to-travel-sky rounded-lg flex items-center justify-center">
                <p className="text-white font-medium">Interactive Map Area</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Getting your location...</p>
          )}
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg">Nearby Places</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nearbyPlaces.map((place, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="font-medium">{place.name}</p>
                  <p className={`text-sm ${getTypeColor(place.type)}`}>{place.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{place.distance}</p>
                  {place.rating && (
                    <p className="text-sm text-yellow-600">★ {place.rating}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveMap;
