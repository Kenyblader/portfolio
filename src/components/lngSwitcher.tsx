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
  { code: 'al', name: 'Allemand' }
];

// export function LanguageSwitcher() {
//   const { i18n } = useTranslation();

//   return (
//     <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//       {languages.map((lang) => (
//         <button
//           key={lang.code}
//           onClick={() => i18n.changeLanguage(lang.code)}
//           style={{
//             padding: '0.5rem 1rem',
//             backgroundColor: i18n.language === lang.code ? '#3b82f6' : 'transparent',
//             color: i18n.language === lang.code ? 'white' : 'inherit',
//             border: '1px solid #ccc',
//             borderRadius: '0.5rem',
//             cursor: 'pointer',
//             transition: 'all 0.3s',
//             fontSize: '0.875rem',
//           }}
//         >
//           <span style={{ marginRight: '0.5rem' }}>{lang.flag}</span>
//           {lang.name}
//         </button>
//       ))}
//     </div>
//   );
// }

export const LanguageSwitcher =() =>{
  const [active,setActive]= useState(false)
  const { i18n } = useTranslation();

  return (
    <div className='languageSwitcher' onClick={()=>{setActive(!active); }} >
      <StyledIconText icon={Globe} text={i18n.language} />
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