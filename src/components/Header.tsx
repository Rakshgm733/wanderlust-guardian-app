
import React from 'react';
import SOSButton from './SOSButton';
import { Bell, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-travel-ocean to-travel-sky text-white p-6 rounded-lg mb-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Compass className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Cultural Guide</h1>
            <p className="text-sm opacity-90">Discover, Explore, Stay Safe</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
            </Button>
            <Badge variant="secondary" className="bg-white/20 text-white">
              3 alerts
            </Badge>
          </div>
          <SOSButton />
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm opacity-75">Events Today</p>
          <p className="text-xl font-bold">5</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm opacity-75">Safety Level</p>
          <p className="text-xl font-bold text-green-300">Good</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm opacity-75">Temperature</p>
          <p className="text-xl font-bold">24°C</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
