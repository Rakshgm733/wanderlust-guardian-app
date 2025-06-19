
export interface Place {
  id: string;
  name: string;
  rating: number;
  distance: string;
  type: string;
  price?: string;
  photos?: string[];
  address: string;
}

export const getNearbyRestaurants = async (lat: number, lng: number): Promise<Place[]> => {
  try {
    const apiKey = localStorage.getItem('google_places_api_key') || 'demo_key';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Places data unavailable');
    }
    
    const data = await response.json();
    return data.results.slice(0, 6).map((place: any) => ({
      id: place.place_id,
      name: place.name,
      rating: place.rating || 4.0,
      distance: `${(Math.random() * 2).toFixed(1)} km`,
      type: 'Restaurant',
      price: ['$', '$$', '$$$'][Math.floor(Math.random() * 3)],
      address: place.vicinity
    }));
  } catch (error) {
    console.log('Places API error:', error);
    // Return mock data as fallback
    return [
      {
        id: '1',
        name: "Mama's Kitchen",
        rating: 4.8,
        distance: "0.2 km",
        type: 'Traditional',
        price: '$$',
        address: 'Downtown District'
      },
      {
        id: '2',
        name: "Street Corner Café",
        rating: 4.6,
        distance: "0.5 km",
        type: 'Fusion',
        price: '$',
        address: 'Market Street'
      }
    ];
  }
};

export const getNearbyAttractions = async (lat: number, lng: number): Promise<Place[]> => {
  try {
    const apiKey = localStorage.getItem('google_places_api_key') || 'demo_key';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=tourist_attraction&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Attractions data unavailable');
    }
    
    const data = await response.json();
    return data.results.slice(0, 5).map((place: any) => ({
      id: place.place_id,
      name: place.name,
      rating: place.rating || 4.2,
      distance: `${(Math.random() * 3).toFixed(1)} km`,
      type: 'Attraction',
      address: place.vicinity
    }));
  } catch (error) {
    console.log('Attractions API error:', error);
    return [
      {
        id: '1',
        name: "Historic Museum",
        rating: 4.5,
        distance: "0.3 km",
        type: 'Culture',
        address: 'Old Town'
      }
    ];
  }
};
