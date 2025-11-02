import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
  },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      className='language-switcher'
      onChange={e => changeLanguage(e.target.value)}
      value={i18n.language}
    >
      {languages.map(language => (
        <option key={language.code} value={language.code}>
          {language.flag} {language.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
