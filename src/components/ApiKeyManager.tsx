
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Key, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApiKeyManager = () => {
  const [keys, setKeys] = useState({
    weather: localStorage.getItem('weather_api_key') || '',
    places: localStorage.getItem('google_places_api_key') || '',
    translation: localStorage.getItem('translation_api_key') || '',
    events: localStorage.getItem('events_api_key') || '',
    safety: localStorage.getItem('safety_api_key') || ''
  });
  const { toast } = useToast();

  const handleSaveKey = (keyType: string, value: string) => {
    localStorage.setItem(`${keyType}_api_key`, value);
    setKeys(prev => ({ ...prev, [keyType]: value }));
    toast({
      title: "API Key Saved",
      description: `${keyType} API key has been saved locally`,
    });
  };

  const keyConfigs = [
    {
      key: 'weather',
      name: 'Weather API',
      description: 'OpenWeatherMap API key for weather data',
      url: 'https://openweathermap.org/api'
    },
    {
      key: 'places',
      name: 'Google Places API',
      description: 'Google Places API key for restaurants and attractions',
      url: 'https://developers.google.com/places/web-service'
    },
    {
      key: 'translation',
      name: 'Translation API',
      description: 'Google Translate API key for language translation',
      url: 'https://cloud.google.com/translate'
    },
    {
      key: 'events',
      name: 'Events API',
      description: 'Eventbrite API key for cultural events',
      url: 'https://www.eventbrite.com/platform/api'
    },
    {
      key: 'safety',
      name: 'Safety API',
      description: 'Criminal IP API key for safety information',
      url: 'https://www.criminalip.io'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">API Configuration</h2>
      </div>
      
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>API Keys Setup</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Configure API keys to enable real-time data. Keys are stored locally in your browser.
          </p>
          
          {keyConfigs.map((config) => (
            <div key={config.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{config.name}</p>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {keys[config.key as keyof typeof keys] && (
                    <Badge variant="outline" className="text-green-600">
                      <Check className="h-3 w-3 mr-1" />
                      Configured
                    </Badge>
                  )}
                  <a 
                    href={config.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    Get API Key
                  </a>
                </div>
              </div>
              <div className="flex space-x-2">
                <Input
                  type="password"
                  placeholder={`Enter ${config.name} key...`}
                  value={keys[config.key as keyof typeof keys]}
                  onChange={(e) => setKeys(prev => ({ ...prev, [config.key]: e.target.value }))}
                />
                <Button 
                  size="sm"
                  onClick={() => handleSaveKey(config.key, keys[config.key as keyof typeof keys])}
                >
                  Save
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyManager;
