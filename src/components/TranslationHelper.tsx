
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Loader2, Volume2 } from 'lucide-react';
import { translateText, Translation } from '@/services/translationService';
import { useToast } from '@/hooks/use-toast';

const TranslationHelper = () => {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const commonPhrases = [
    { english: "Hello", local: "Hola", pronunciation: "OH-lah" },
    { english: "Thank you", local: "Gracias", pronunciation: "GRAH-see-ahs" },
    { english: "Where is...?", local: "¿Dónde está...?", pronunciation: "DOHN-deh ehs-TAH" },
    { english: "How much?", local: "¿Cuánto cuesta?", pronunciation: "KWAN-toh KWEH-stah" },
    { english: "Help!", local: "¡Ayuda!", pronunciation: "ah-YOO-dah" },
    { english: "I don't understand", local: "No entiendo", pronunciation: "noh ehn-tee-EHN-doh" }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to translate",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await translateText(inputText, 'es');
      setTranslation(result);
    } catch (error) {
      toast({
        title: "Translation Error",
        description: "Failed to translate text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhraseTranslate = async (phrase: string) => {
    setInputText(phrase);
    setLoading(true);
    try {
      const result = await translateText(phrase, 'es');
      setTranslation(result);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      speechSynthesis.speak(utterance);
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
              onKeyPress={(e) => e.key === 'Enter' && handleTranslate()}
            />
            <Button onClick={handleTranslate} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Translate'}
            </Button>
          </div>
          
          {translation && (
            <div className="p-4 bg-secondary rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Original ({translation.sourceLanguage})</p>
                  <p className="font-medium">{translation.original}</p>
                </div>
              </div>
              <div className="border-t pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Translation ({translation.targetLanguage})</p>
                    <p className="font-medium text-primary">{translation.translated}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(translation.translated)}
                    className="ml-2"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
              <div 
                key={index} 
                className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                onClick={() => handlePhraseTranslate(phrase.english)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{phrase.english}</p>
                    <p className="text-primary">{phrase.local}</p>
                    <p className="text-sm text-muted-foreground">{phrase.pronunciation}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(phrase.local);
                    }}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
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
