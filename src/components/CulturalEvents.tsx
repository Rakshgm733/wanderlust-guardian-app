
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const CulturalEvents = () => {
  const events = [
    {
      id: 1,
      title: "Traditional Music Festival",
      date: "Today, 7:00 PM",
      location: "Central Park",
      category: "Music",
      description: "Experience local traditional music and dance performances",
      attendees: 250
    },
    {
      id: 2,
      title: "Historical Walking Tour",
      date: "Tomorrow, 10:00 AM",
      location: "Old Town Square",
      category: "History",
      description: "Guided tour through the historic district with local stories",
      attendees: 45
    },
    {
      id: 3,
      title: "Street Food Market",
      date: "This Weekend",
      location: "Market Street",
      category: "Food",
      description: "Sample authentic local cuisine from various vendors",
      attendees: 500
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Music': return 'bg-purple-500';
      case 'History': return 'bg-amber-500';
      case 'Food': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

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
              <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
              <p className="text-xs text-primary font-medium">{event.attendees} people interested</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CulturalEvents;
