
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SOSButton = () => {
  const [isActivated, setIsActivated] = useState(false);
  const { toast } = useToast();

  const handleSOSActivation = () => {
    setIsActivated(true);
    
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('SOS Activated - Location:', { latitude, longitude });
          
          toast({
            title: "SOS Activated",
            description: `Emergency alert sent with your location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            variant: "destructive",
          });
          
          // In a real app, this would send to emergency services or contacts
          setTimeout(() => setIsActivated(false), 3000);
        },
        (error) => {
          console.error('Location error:', error);
          toast({
            title: "SOS Activated",
            description: "Emergency alert sent (location unavailable)",
            variant: "destructive",
          });
          setTimeout(() => setIsActivated(false), 3000);
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <Button
        onClick={handleSOSActivation}
        disabled={isActivated}
        className={`w-20 h-20 rounded-full text-white font-bold text-lg transition-all duration-300 ${
          isActivated 
            ? 'bg-red-600 animate-pulse-gentle scale-110' 
            : 'bg-red-500 hover:bg-red-600 hover:scale-105'
        }`}
      >
        {isActivated ? '...' : 'SOS'}
      </Button>
      <span className="text-sm text-muted-foreground text-center">
        Emergency Help
      </span>
    </div>
  );
};

export default SOSButton;
