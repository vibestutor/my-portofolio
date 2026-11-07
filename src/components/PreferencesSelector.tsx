import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { PreferencesContext } from '../context/PreferencesContext';

const PREF_OPTIONS = [
  { locale: 'id', currency: 'IDR', flag: '🇮🇩', label: 'Indonesian' },
  { locale: 'en-US', currency: 'USD', flag: '🇺🇸', label: 'English' },
  { locale: 'ja', currency: 'JPY', flag: '🇯🇵', label: 'Japanese' },
  { locale: 'ko', currency: 'KRW', flag: '🇰🇷', label: 'Korean' },
  { locale: 'zh-CN', currency: 'CNY', flag: '🇨🇳', label: 'Chinese' },
  { locale: 'de', currency: 'EUR', flag: '🇩🇪', label: 'German' },
  { locale: 'fr', currency: 'EUR', flag: '🇫🇷', label: 'French' },
];

export default function PreferencesSelector() {
  const { t } = useTranslation();
  const { locale, currency, updatePreferences } = useContext(PreferencesContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newLocale: string, newCurrency: string) => {
    updatePreferences(newLocale, newCurrency);
    setIsOpen(false); 
  };

  const handleAutoLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      const countryToLocale: Record<string, string> = {
        'ID': 'id',
        'US': 'en-US',
        'JP': 'ja',
        'KR': 'ko',
        'CN': 'zh-CN',
        'DE': 'de',
        'FR': 'fr',
      };

      const detectedLocale = countryToLocale[data.country_code] || 'en-US';
      const detectedCurrency = data.currency || 'USD';

      updatePreferences(detectedLocale, detectedCurrency);
      setIsOpen(false);
    } catch (error) {
      console.error("Gagal mendeteksi lokasi:", error);
      alert("Tidak dapat mendeteksi lokasi secara otomatis saat ini. Pastikan adblocker Anda dimatikan atau koneksi internet stabil.");
    }
  };

  return (
    <div className="fab-prefs" id="fab-prefs">
      <button 
        className="fab-prefs__btn" 
        id="fab-prefs-btn" 
        aria-expanded={isOpen} 
        aria-controls="fab-prefs-sheet"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-solid fa-earth-asia"></i>
        <span className="fab-prefs__current">
          {locale.toUpperCase()} · {currency}
        </span>
        <i className={`fa-solid fa-chevron-${isOpen ? 'down' : 'up'} fab-prefs__chev`}></i>
      </button>

      {isOpen && (
        <div className="fab-prefs__sheet" id="fab-prefs-sheet">
          <div className="fab-prefs__head">
            <strong>{t('Language & Currency')}</strong>
            <button 
              type="button" 
              className="fab-prefs__close" 
              id="fab-prefs-close" 
              aria-label={t('Close')}
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="fab-prefs__list" id="fab-prefs-list">
            <button type="button" className="fab-prefs__opt" onClick={handleAutoLocation}>
              <span>🌍 {t('Auto Location')}</span>
            </button>

            {PREF_OPTIONS.map((opt) => (
              <button 
                key={opt.locale}
                type="button" 
                className="fab-prefs__opt"
                onClick={() => handleSelect(opt.locale, opt.currency)}
              >
                {opt.flag} {t(opt.label)} · {opt.currency}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}