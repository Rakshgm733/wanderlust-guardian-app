
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Map, Bell, Calendar, ChefHat, AlertTriangle, MessageSquare } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'map', label: 'Map', icon: Map },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'food', label: 'Food', icon: ChefHat },
    { id: 'safety', label: 'Safety', icon: AlertTriangle },
    { id: 'translate', label: 'Translate', icon: MessageSquare },
  ];

  return (
    <Card className="mb-6 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-center space-x-2 overflow-x-auto">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-all duration-200 min-w-[70px] ${
                activeSection === id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Navigation;
