import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import '../style/languagSwitcher.css';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English',  flag: '🇬🇧' },
  { code: 'es', name: 'Español',  flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'de', name: 'Deutsch',  flag: '🇩🇪' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find(l => l.code === i18n.language) ?? languages[0];

  // Ferme au clic en dehors
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="lng_switcher" ref={ref}>
      <button
        className="lng_trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <Globe size={14} />
        <span>{current.flag} {current.code.toUpperCase()}</span>
        <ChevronDown size={12} className={`lng_chevron ${open ? 'lng_chevron--open' : ''}`} />
      </button>

      {open && (
        <div className="lng_dropdown">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`lng_option ${lang.code === i18n.language ? 'lng_option--active' : ''}`}
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};