
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import { getCulturalEvents, CulturalEvent } from '@/services/eventsService';

const CulturalEvents = () => {
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const data = await getCulturalEvents(position.coords.latitude, position.coords.longitude);
              setEvents(data);
              setLoading(false);
            },
            async () => {
              // Default location if permission denied
              const data = await getCulturalEvents(40.7128, -74.0060);
              setEvents(data);
              setLoading(false);
            }
          );
        }
      } catch (error) {
        console.error('Error loading events:', error);
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Music': return 'bg-purple-500';
      case 'History': return 'bg-amber-500';
      case 'Food': return 'bg-green-500';
      case 'Culture': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Cultural Events</h2>
        </div>
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading events...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Cultural Events</h2>
      </div>
      
      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <Badge className={`${getCategoryColor(event.category)} text-white`}>
                  {event.category}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{event.date} • {event.location}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-primary font-medium">
                  <Users className="h-3 w-3" />
                  <span>{event.attendees} people interested</span>
                </div>
                {event.price && (
                  <Badge variant="secondary">{event.price}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CulturalEvents;
