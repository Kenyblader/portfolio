import { useTranslation } from 'react-i18next';
import StyledIconText from './StyledIconText';
import { Globe } from 'lucide-react';
import '../style/languagSwitcher.css'
import { useState } from 'react';

const languages = [
  { code: 'fr', name: 'Français'},
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  { code: 'de', name: 'Deutsch' }
];



export const LanguageSwitcher =() =>{
  const [active,setActive]= useState(false)
  const { i18n } = useTranslation();
  return (
    <div className='languageSwitcher' onClick={()=>{setActive(!active); }} >
      <StyledIconText className="lngIcon" icon={Globe} text={i18n.language} />
      <div className={`languages_container ${active?'active': ''}`}>
        {
          languages.map((lang)=>(
            <span onClick={()=>{i18n.changeLanguage(lang.code)}}  key={lang.code}>{lang.name }</span>
          ))
        }
      </div>
    </div>
  )
}