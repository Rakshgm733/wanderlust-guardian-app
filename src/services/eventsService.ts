
export interface CulturalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  attendees: number;
  imageUrl?: string;
  price?: string;
}

export const getCulturalEvents = async (lat: number, lng: number): Promise<CulturalEvent[]> => {
  try {
    // Using Eventbrite API or similar events API
    const apiKey = localStorage.getItem('events_api_key');
    
    if (apiKey) {
      const response = await fetch(
        `https://www.eventbriteapi.com/v3/events/search/?location.latitude=${lat}&location.longitude=${lng}&location.within=10km&categories=103,105,110&token=${apiKey}`
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.events.slice(0, 5).map((event: any) => ({
          id: event.id,
          title: event.name.text,
          description: event.description.text || 'Local cultural event',
          date: new Date(event.start.utc).toLocaleDateString(),
          location: event.venue ? event.venue.name : 'Local venue',
          category: 'Culture',
          attendees: Math.floor(Math.random() * 500) + 50,
          price: event.is_free ? 'Free' : '$15-25'
        }));
      }
    }
    
    // Fallback mock data
    return [
      {
        id: '1',
        title: "Traditional Music Festival",
        description: "Experience local traditional music and dance performances",
        date: "Today, 7:00 PM",
        location: "Central Park",
        category: "Music",
        attendees: 250,
        price: "Free"
      },
      {
        id: '2',
        title: "Historical Walking Tour",
        description: "Guided tour through the historic district with local stories",
        date: "Tomorrow, 10:00 AM",
        location: "Old Town Square",
        category: "History",
        attendees: 45,
        price: "$15"
      },
      {
        id: '3',
        title: "Street Food Market",
        description: "Sample authentic local cuisine from various vendors",
        date: "This Weekend",
        location: "Market Street",
        category: "Food",
        attendees: 500,
        price: "Free entry"
      }
    ];
  } catch (error) {
    console.log('Events API error:', error);
    return [];
  }
};
