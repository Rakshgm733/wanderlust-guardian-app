
import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import CulturalEvents from '@/components/CulturalEvents';
import FoodRecommendations from '@/components/FoodRecommendations';
import SafetyAlerts from '@/components/SafetyAlerts';
import TranslationHelper from '@/components/TranslationHelper';
import InteractiveMap from '@/components/InteractiveMap';
import ApiKeyManager from '@/components/ApiKeyManager';

const Index = () => {
  const [activeSection, setActiveSection] = useState('events');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'map':
        return <InteractiveMap />;
      case 'events':
        return <CulturalEvents />;
      case 'food':
        return <FoodRecommendations />;
      case 'safety':
        return <SafetyAlerts />;
      case 'translate':
        return <TranslationHelper />;
      case 'settings':
        return <ApiKeyManager />;
      default:
        return <CulturalEvents />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Header />
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <div className="animate-fade-in">
          {renderActiveSection()}
        </div>

        <div className="mt-8 p-4 bg-card rounded-lg border text-center">
          <p className="text-sm text-muted-foreground">
            🌍 Your Local Cultural Guide - Stay informed, stay safe, explore more
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Configure API keys in the APIs section for real-time data
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
