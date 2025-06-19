
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, MapPin, Star, Loader2 } from 'lucide-react';
import { getNearbyRestaurants, Place } from '@/services/placesService';

const FoodRecommendations = () => {
  const [restaurants, setRestaurants] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              setUserLocation(location);
              const data = await getNearbyRestaurants(location.lat, location.lng);
              setRestaurants(data);
              setLoading(false);
            },
            async () => {
              // Default to mock location if permission denied
              const mockLocation = { lat: 40.7128, lng: -74.0060 };
              setUserLocation(mockLocation);
              const data = await getNearbyRestaurants(mockLocation.lat, mockLocation.lng);
              setRestaurants(data);
              setLoading(false);
            }
          );
        }
      } catch (error) {
        console.error('Error loading restaurants:', error);
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <ChefHat className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Food Recommendations</h2>
        </div>
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading restaurants...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <ChefHat className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Food Recommendations</h2>
      </div>
      
      <div className="grid gap-4">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                {restaurant.price && (
                  <Badge variant="outline">{restaurant.price}</Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{restaurant.address}</span>
                <span>•</span>
                <span>{restaurant.distance}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                </div>
                <span className="text-yellow-500 text-sm">{renderStars(restaurant.rating)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{restaurant.type} cuisine</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodRecommendations;
