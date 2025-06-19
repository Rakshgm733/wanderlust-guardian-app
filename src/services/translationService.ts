
export interface Translation {
  original: string;
  translated: string;
  sourceLanguage: string;
  targetLanguage: string;
  pronunciation?: string;
}

export const translateText = async (text: string, targetLang: string = 'es'): Promise<Translation> => {
  try {
    // Using Google Translate API (or LibreTranslate as free alternative)
    const apiKey = localStorage.getItem('translation_api_key');
    
    if (apiKey) {
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          format: 'text'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return {
          original: text,
          translated: data.data.translations[0].translatedText,
          sourceLanguage: data.data.translations[0].detectedSourceLanguage || 'en',
          targetLanguage: targetLang
        };
      }
    }
    
    // Fallback to mock translations
    const mockTranslations: Record<string, string> = {
      'hello': 'hola',
      'thank you': 'gracias',
      'where is': 'dónde está',
      'how much': 'cuánto cuesta',
      'help': 'ayuda',
      'excuse me': 'disculpe'
    };
    
    const lowerText = text.toLowerCase();
    const translated = mockTranslations[lowerText] || `${text} (traducido)`;
    
    return {
      original: text,
      translated,
      sourceLanguage: 'en',
      targetLanguage: targetLang
    };
  } catch (error) {
    console.log('Translation API error:', error);
    return {
      original: text,
      translated: `${text} (translation unavailable)`,
      sourceLanguage: 'en',
      targetLanguage: targetLang
    };
  }
};
