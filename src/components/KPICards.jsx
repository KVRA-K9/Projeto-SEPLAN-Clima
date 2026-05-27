import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useData } from '../context/DataContext';
import { TrendingUp, DollarSign, Coins, Hourglass, Info, X } from 'lucide-react';

function KPICard({ titulo, valor, icone: Icone, subtitulo }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <div>
          <div className="kpi-label">{titulo}</div>
          <div className="kpi-value">{valor}</div>
          <div className="kpi-sub">{subtitulo}</div>
        </div>
        <div className="kpi-icon">
          <Icone size={28} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

function KPICardNaoExclusivo({ titulo, valor, icone: Icone, subtitulo }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const infoBtnRef = useRef(null);

  const abrirPopup = useCallback(() => {
    if (!infoBtnRef.current) return;
    const rect = infoBtnRef.current.getBoundingClientRect();
    const popupWidth = 200;
    const popupHeight = 120;
    
    // Position: above and slightly to the left of the "i" button
    let left = rect.left - popupWidth + 30;
    let top = rect.top - popupHeight - 10;
    
    // Boundary checks
    if (left < 10) left = 10;
    if (left + popupWidth > window.innerWidth - 10) left = window.innerWidth - popupWidth - 10;
    if (top < 10) top = rect.bottom + 10;
    
    setPopupPos({ top, left });
    setShowPopup(true);
  }, []);

  return (
    <div className="kpi-card" style={{ position: 'relative' }}>
      <div className="kpi-header">
        <div>
          <div className="kpi-label">{titulo}</div>
          <div className="kpi-value">{valor}</div>
          <div className="kpi-sub">{subtitulo}</div>
        </div>
        <div className="kpi-icon">
          <Icone size={28} strokeWidth={1.5} />
        </div>
      </div>

      {/* Botão de informação */}
      <button
        ref={infoBtnRef}
        onClick={abrirPopup}
        className="info-btn"
        style={{
          position: 'absolute',
          bottom: 6,
          right: 6,
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: '2px solid currentColor',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          fontSize: 13,
          fontWeight: 800,
          fontFamily: 'serif',
          transition: 'all 0.2s ease',
          opacity: 1
        }}
        title="Informação"
      >
        i
      </button>

      {/* Pop-up renderizado via portal */}
      {showPopup && createPortal(
        <InfoPopup onClose={() => setShowPopup(false)} popupPos={popupPos} />,
        document.body
      )}
    </div>
  );
}

function InfoPopup({ onClose, popupPos }) {
  return (
    <>
      {/* Overlay escuro sutil */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          zIndex: 9998,
          backdropFilter: 'blur(1px)'
        }}
        onClick={onClose}
      />

      {/* Modal discreto próximo ao botão */}
      <div
        style={{
          position: 'fixed',
          top: popupPos.top,
          left: popupPos.left,
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 10,
          padding: '14px 18px',
          zIndex: 9999,
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          width: 200,
          textAlign: 'center',
          animation: 'popDiscreet 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}
      >
        {/* Seta apontando para o botão */}
        <div
          style={{
            position: 'absolute',
            bottom: -6,
            right: 18,
            width: 12,
            height: 12,
            backgroundColor: 'var(--card-bg)',
            borderRight: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)',
            transform: 'rotate(45deg)',
            zIndex: 1
          }}
        />

        {/* Botão fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <X size={14} />
        </button>

        {/* Ícone de informação */}
        <div style={{ marginBottom: 8 }}>
          <Info size={24} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
        </div>

        {/* Título */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 4
          }}
        >
          Gasto Não Exclusivo
        </div>

        {/* Mensagem */}
        <div
          style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.4
          }}
        >
          Em fase de validação
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes popDiscreet {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}



function KPICards() {
  const { totalProjetos, totalOrcamentoClimatico, gastoExclusivo, gastoNaoExclusivo } = useData();

  const fmt = (n) => {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' bi';
    if (n >= 1_000_000) return (n / 1_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' MI';
    if (n >= 1_000) return (n / 1_000).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' mil';
    return n.toLocaleString('pt-BR');
  };

  const base = totalOrcamentoClimatico || 0;
  const pctExclusivo = base > 0 ? ((gastoExclusivo / base) * 100).toFixed(1) : 0;
  const pctNaoExclusivo = base > 0 ? ((gastoNaoExclusivo / base) * 100).toFixed(1) : 0;

  return (
    <div className="kpi-grid">
      <KPICard titulo="Órgãos Atuantes" valor={48} icone={TrendingUp} subtitulo="Identificados" />
      <KPICard titulo="Orçamento Climático Planejado" valor={fmt(base)} icone={DollarSign} subtitulo="100% do total" />
      <KPICard titulo="Gasto Exclusivo" valor={fmt(gastoExclusivo)} icone={Coins} subtitulo={`${pctExclusivo}% do total`} />
      <KPICardNaoExclusivo titulo="Gasto Não Exclusivo" valor={fmt(gastoNaoExclusivo)} icone={Hourglass} subtitulo={`${pctNaoExclusivo}% do total`} />
    </div>
  );
}

export default React.memo(KPICards);
