import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface PreferencesContextType {
  locale: string;
  currency: string;
  updatePreferences: (newLocale: string, newCurrency: string) => void;
}

export const PreferencesContext = createContext<PreferencesContextType>({
  locale: 'en',
  currency: 'USD',
  updatePreferences: () => {},
});

interface PreferencesProviderProps {
  children: ReactNode;
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const { i18n } = useTranslation();
  
  const [locale, setLocale] = useState<string>(localStorage.getItem('locale') || 'en');
  const [currency, setCurrency] = useState<string>(localStorage.getItem('currency') || 'USD');

  const updatePreferences = (newLocale: string, newCurrency: string) => {
    setLocale(newLocale);
    setCurrency(newCurrency);
    
    localStorage.setItem('locale', newLocale);
    localStorage.setItem('currency', newCurrency);
    
    i18n.changeLanguage(newLocale);
  };

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale && storedLocale !== i18n.language) {
      i18n.changeLanguage(storedLocale);
    }
  }, [i18n]);

  return (
    <PreferencesContext.Provider value={{ locale, currency, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}