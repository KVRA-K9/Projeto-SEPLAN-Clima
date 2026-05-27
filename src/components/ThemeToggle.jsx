import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { tema, alternarTema } = useTheme();

  return (
    <label className="switch" title={tema === 'claro' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}>
      <input
        type="checkbox"
        className="circle"
        checked={tema === 'claro'}
        onChange={alternarTema}
      />
      <svg className="moon svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
      <span className="sun">
        <span className="dot"></span>
      </span>
    </label>
  );
}
