import React from 'react';
import { LANGUAGES } from '../constants/languages';

export default function LanguageSelector({ selectedId, onChange }) {
  return (
    <select
      className="language-select"
      value={selectedId}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
