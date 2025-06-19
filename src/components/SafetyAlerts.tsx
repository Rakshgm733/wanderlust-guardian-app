
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SOS } from 'lucide-react';

const SafetyAlerts = () => {
  const safetyInfo = [
    {
      id: 1,
      area: "Downtown District",
      level: "Low",
      description: "Well-lit area with regular police patrols",
      tips: "Safe for evening walks, popular tourist area"
    },
    {
      id: 2,
      area: "Industrial Zone",
      level: "Medium",
      description: "Less crowded during evenings",
      tips: "Travel in groups after 8 PM, well-connected transport"
    },
    {
      id: 3,
      area: "Market Area",
      level: "Low",
      description: "Busy during day, moderate security",
      tips: "Watch for pickpockets in crowded areas"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <SOS className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Safety Information</h2>
      </div>
      
      <div className="grid gap-4">
        {safetyInfo.map((info) => (
          <Card key={info.id} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{info.area}</CardTitle>
                <Badge className={`${getLevelColor(info.level)} text-white`}>
                  {info.level} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
              <p className="text-sm text-primary font-medium">💡 {info.tips}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SafetyAlerts;
