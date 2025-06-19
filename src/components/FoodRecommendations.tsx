
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Food } from 'lucide-react';

const FoodRecommendations = () => {
  const restaurants = [
    {
      id: 1,
      name: "Mama's Kitchen",
      cuisine: "Traditional",
      rating: 4.8,
      distance: "0.2 km",
      price: "$$",
      specialty: "Authentic local dishes",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Street Corner Café",
      cuisine: "Fusion",
      rating: 4.6,
      distance: "0.5 km",
      price: "$",
      specialty: "Modern twist on classics",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Heritage Brewery",
      cuisine: "Pub Food",
      rating: 4.7,
      distance: "0.8 km",
      price: "$$",
      specialty: "Local craft beers",
      image: "/placeholder.svg"
    }
  ];

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Food className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Food Recommendations</h2>
      </div>
      
      <div className="grid gap-4">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                <Badge variant="outline">{restaurant.price}</Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span>{restaurant.distance}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-500">{renderStars(restaurant.rating)}</span>
                <span className="text-sm font-medium">{restaurant.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">{restaurant.specialty}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodRecommendations;
