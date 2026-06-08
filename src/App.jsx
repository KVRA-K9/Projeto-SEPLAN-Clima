import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './components/HomePage';
import Header from './components/Header';
import KPICards from './components/KPICards';
import ChartsSection from './components/ChartsSection';
import ProjectsTable from './components/ProjectsTable';
import InstrumentosLegais from './components/InstrumentosLegais';
import ThemeToggle from './components/ThemeToggle';
import ODSModal from './components/ODSModal';
import AnimatedSection from './components/AnimatedSection';
import Footer from './components/Footer';

function ODSBadge({ ods, onSelect }) {
  const ref = React.useRef(null);
  return (
    <span
      ref={ref}
      style={{ cursor: 'pointer', transition: 'transform 0.2s', display: 'inline-block' }}
      onClick={() => {
        const rect = ref.current.getBoundingClientRect();
        onSelect({ top: rect.bottom + 8, left: rect.left + rect.width / 2 }, ods.cod);
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <img
        src={ods.img}
        alt={ods.label}
        style={{ width: 115, height: 115, borderRadius: 8, objectFit: 'contain', display: 'block' }}
        loading="lazy"
      />
    </span>
  );
}

const odsLista = [
  { cod: 'ODS 1', label: 'ODS 1 - Erradicação da pobreza', img: '/ods/01_1.png' },
  { cod: 'ODS 2', label: 'ODS 2 - Fome zero e agricultura sustentável', img: '/ods/02_0.png' },
  { cod: 'ODS 3', label: 'ODS 3 - Saúde e bem-estar', img: '/ods/03_0.png' },
  { cod: 'ODS 4', label: 'ODS 4 - Educação de qualidade', img: '/ods/04_0.png' },
  { cod: 'ODS 5', label: 'ODS 5 - Igualdade de gênero', img: '/ods/05_0.png' },
  { cod: 'ODS 6', label: 'ODS 6 - Água potável e saneamento', img: '/ods/06_0.png' },
  { cod: 'ODS 7', label: 'ODS 7 - Energia acessível e limpa', img: '/ods/07_0.png' },
  { cod: 'ODS 8', label: 'ODS 8 - Trabalho decente e crescimento econômico', img: '/ods/08_0.png' },
  { cod: 'ODS 9', label: 'ODS 9 - Indústria, inovação e infraestrutura', img: '/ods/09_0.png' },
  { cod: 'ODS 10', label: 'ODS 10 - Redução das desigualdades', img: '/ods/10_0.png' },
  { cod: 'ODS 11', label: 'ODS 11 - Cidades e comunidades sustentáveis', img: '/ods/11_0.png' },
  { cod: 'ODS 12', label: 'ODS 12 - Consumo e produção responsáveis', img: '/ods/12_0.png' },
  { cod: 'ODS 13', label: 'ODS 13 - Ação contra a mudança global do clima', img: '/ods/13_0.png' },
  { cod: 'ODS 14', label: 'ODS 14 - Vida na água', img: '/ods/14_0.png' },
  { cod: 'ODS 15', label: 'ODS 15 - Vida terrestre', img: '/ods/15_0.png' },
  { cod: 'ODS 16', label: 'ODS 16 - Paz, justiça e instituições eficazes', img: '/ods/16_0.png' },
  { cod: 'ODS 17', label: 'ODS 17 - Parcerias e meios de implementação', img: '/ods/17_0.png' },
  { cod: 'ODS 18', label: 'ODS 18 - Igualdade étnico-racial', img: '/ods/18_0.png' }
];

function Dashboard() {
  const [abaAtiva, setAbaAtiva] = React.useState('analises');
  const [odsSelecionado, setOdsSelecionado] = React.useState(null);
  const [odsPosicao, setOdsPosicao] = React.useState(null);
  const [odsRevelados, setOdsRevelados] = React.useState(0);
  const navigate = useNavigate();

  const abas = ['analises', 'acoes', 'instrumentos', 'ods'];
  const avancarAba = () => {
    const idxAtual = abas.indexOf(abaAtiva);
    if (idxAtual < abas.length - 1) {
      setAbaAtiva(abas[idxAtual + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const voltarAba = () => {
    const idxAtual = abas.indexOf(abaAtiva);
    if (idxAtual > 0) {
      setAbaAtiva(abas[idxAtual - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const ehPrimeiraAba = abaAtiva === abas[0];
  const ehUltimaAba = abaAtiva === abas[abas.length - 1];

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  React.useEffect(() => {
    if (abaAtiva === 'ods') {
      setOdsRevelados(0);
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setOdsRevelados(count);
        if (count >= odsLista.length) {
          clearInterval(interval);
        }
      }, 160);
      return () => clearInterval(interval);
    }
  }, [abaAtiva]);

  return (
    <div className="dashboard-container">
      <Header />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 16px 0' }}>
        <button className="btn-voltar" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'instant' }); }}>
          ← Voltar à página inicial
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {!ehPrimeiraAba && (
            <button
              onClick={voltarAba}
              style={{
                background: 'transparent',
                border: '1px solid var(--accent-light)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--accent)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--card-bg-hover)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title="Aba anterior"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {!ehUltimaAba && (
            <div
              style={{ position: 'relative' }}
              onMouseEnter={(e) => {
                const tip = e.currentTarget.querySelector('.tooltip-proxima');
                if (tip) tip.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const tip = e.currentTarget.querySelector('.tooltip-proxima');
                if (tip) tip.style.opacity = '0';
              }}
            >
              <button
                onClick={avancarAba}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--accent-light)',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--accent)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--card-bg-hover)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title="Próxima aba"
              >
                <ChevronRight size={18} />
              </button>
              <span
                className="tooltip-proxima"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 'calc(100% + 8px)',
                  transform: 'translateY(-50%)',
                  background: '#1a1a1a',
                  border: '1px solid var(--accent-light)',
                  color: 'var(--accent)',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 12,
                  whiteSpace: 'nowrap',
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'opacity 0.2s ease',
                  zIndex: 100
                }}
              >
                Próxima aba
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="main-area" style={{ position: 'relative' }}>
        <div className="tabs-header">
          <button
            className={`tab-btn ${abaAtiva === 'analises' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('analises')}
          >
            Análises
          </button>
          <button
            className={`tab-btn ${abaAtiva === 'acoes' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('acoes')}
          >
            Detalhamento
          </button>
          <button
            className={`tab-btn ${abaAtiva === 'instrumentos' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('instrumentos')}
          >
            Instrumentos Legais
          </button>
          <button
            className={`tab-btn ${abaAtiva === 'ods' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('ods')}
          >
            ODS
          </button>
        </div>

        <div className="tab-content">
          {abaAtiva === 'analises' && (
            <>
              <AnimatedSection style={{ marginBottom: 20 }}>
                <div className="section" style={{ marginBottom: 20 }}>
                  <div className="section-title" style={{ marginBottom: 8 }}>Visão Geral dos Indicadores</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
                    Monitoramento e análise de projetos de orçamento climático no estado do Acre. Acompanhe o orçamento total previsto, os valores já aplicados e os recursos ainda disponíveis para execução nas ações climáticas do estado.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection style={{ marginBottom: 20 }}>
                <KPICards />
              </AnimatedSection>
              <ChartsSection />
            </>
          )}

          {abaAtiva === 'acoes' && (
            <AnimatedSection>
              <ProjectsTable />
            </AnimatedSection>
          )}

          {abaAtiva === 'instrumentos' && (
            <AnimatedSection>
              <InstrumentosLegais />
            </AnimatedSection>
          )}

          {abaAtiva === 'ods' && (
            <AnimatedSection>
              <div className="section">
                <AnimatedSection>
                  <div className="section-title" style={{ fontSize: 16, marginBottom: 12 }}>Objetivos de Desenvolvimento Sustentável (ODS) Contemplados</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
                    O Orçamento Climático do Acre está alinhado aos Objetivos de Desenvolvimento Sustentável da Agenda 2030, contribuindo diretamente para as seguintes metas globais:
                  </p>
                </AnimatedSection>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '14px', justifyItems: 'start', maxWidth: 1200, margin: '0', padding: '0 0 0 24px' }}>
                  {odsLista.map((ods, index) => {
                    const isRevelado = index < odsRevelados;
                    return (
                      <div
                        key={ods.cod}
                        style={{
                          opacity: isRevelado ? 1 : 0,
                          transform: isRevelado ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(60px)',
                          transition: 'opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)'
                        }}
                      >
                        <ODSBadge
                          ods={ods}
                          onSelect={(posicao, cod) => {
                            setOdsPosicao(posicao);
                            setOdsSelecionado(cod);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.6, marginTop: 16, textAlign: 'left', fontStyle: 'italic' }}>
                  (Clique no ODS desejado para visualizar os indicadores contemplados em cada eixo temático)
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>

      </div>

      {abaAtiva === 'analises' && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '16px 0' }}>
          <button className="btn-voltar" onClick={() => navigate('/')}>
            ← Voltar à página inicial
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {!ehUltimaAba && (
              <div
                style={{ position: 'relative' }}
                onMouseEnter={(e) => {
                  const tip = e.currentTarget.querySelector('.tooltip-proxima');
                  if (tip) tip.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  const tip = e.currentTarget.querySelector('.tooltip-proxima');
                  if (tip) tip.style.opacity = '0';
                }}
              >
                <button
                  onClick={avancarAba}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--accent-light)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--accent)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--card-bg-hover)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title="Próxima aba"
                >
                  <ChevronRight size={18} />
                </button>
                <span
                  className="tooltip-proxima"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: 'calc(100% + 8px)',
                    transform: 'translateY(-50%)',
                    background: '#1a1a1a',
                    border: '1px solid var(--accent-light)',
                    color: 'var(--accent)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.2s ease',
                    zIndex: 100
                  }}
                >
                  Próxima aba
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {(abaAtiva === 'acoes' || abaAtiva === 'instrumentos') && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0', gap: 8 }}>
          {!ehPrimeiraAba && (
            <button
              onClick={voltarAba}
              style={{
                background: 'transparent',
                border: '1px solid var(--accent-light)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--accent)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--card-bg-hover)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title="Aba anterior"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {!ehUltimaAba && (
            <div
              style={{ position: 'relative' }}
              onMouseEnter={(e) => {
                const tip = e.currentTarget.querySelector('.tooltip-proxima');
                if (tip) tip.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const tip = e.currentTarget.querySelector('.tooltip-proxima');
                if (tip) tip.style.opacity = '0';
              }}
            >
              <button
                onClick={avancarAba}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--accent-light)',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--accent)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--card-bg-hover)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title="Próxima aba"
              >
                <ChevronRight size={18} />
              </button>
              <span
                className="tooltip-proxima"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 'calc(100% + 8px)',
                  transform: 'translateY(-50%)',
                  background: '#1a1a1a',
                  border: '1px solid var(--accent-light)',
                  color: 'var(--accent)',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 12,
                  whiteSpace: 'nowrap',
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'opacity 0.2s ease',
                  zIndex: 100
                }}
              >
                Próxima aba
              </span>
            </div>
          )}
        </div>
      )}

      {odsSelecionado && (
        <ODSModal ods={odsSelecionado} posicao={odsPosicao} onClose={() => { setOdsSelecionado(null); setOdsPosicao(null); }} />
      )}

      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-transition-wrapper" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DataProvider>
          <AnimatedRoutes />
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
