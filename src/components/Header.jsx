import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="dashboard-header">
      <div className="seplan-logo">
        <div className="logo-text" style={{ color: '#15803d' }}>SEPLAN</div>
        <div className="logo-divider" style={{ background: '#d4a843' }}></div>
        <div className="logo-sub" style={{ color: 'var(--text-primary)' }}>
          Secretaria de<br/>Estado de<br/>Planejamento
        </div>
      </div>
      <div className="header-actions">
        <ThemeToggle />
      </div>
    </header>
  );
}
