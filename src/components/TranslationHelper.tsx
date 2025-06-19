
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare } from 'lucide-react';

const TranslationHelper = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const commonPhrases = [
    { english: "Hello", local: "Hola", pronunciation: "OH-lah" },
    { english: "Thank you", local: "Gracias", pronunciation: "GRAH-see-ahs" },
    { english: "Where is...?", local: "¿Dónde está...?", pronunciation: "DOHN-deh ehs-TAH" },
    { english: "How much?", local: "¿Cuánto cuesta?", pronunciation: "KWAN-toh KWEH-stah" },
    { english: "Help!", local: "¡Ayuda!", pronunciation: "ah-YOO-dah" },
    { english: "I don't understand", local: "No entiendo", pronunciation: "noh ehn-tee-EHN-doh" }
  ];

  const handleTranslate = () => {
    // Simple mock translation (in real app, would integrate with translation API)
    if (inputText.toLowerCase().includes('hello')) {
      setTranslatedText('Hola');
    } else if (inputText.toLowerCase().includes('thank')) {
      setTranslatedText('Gracias');
    } else {
      setTranslatedText('Translation would appear here (Connect translation API)');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Translation Helper</h2>
      </div>
      
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg">Quick Translate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTranslate}>Translate</Button>
          </div>
          {translatedText && (
            <div className="p-3 bg-secondary rounded-lg">
              <p className="font-medium">{translatedText}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg">Common Phrases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commonPhrases.map((phrase, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{phrase.english}</p>
                    <p className="text-primary">{phrase.local}</p>
                    <p className="text-sm text-muted-foreground">{phrase.pronunciation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslationHelper;
