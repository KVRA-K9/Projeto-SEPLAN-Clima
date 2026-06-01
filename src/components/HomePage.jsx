import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Leaf,
  TrendingDown,
  ShieldCheck,
  Users,
  FileText,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AnimatedSection from './AnimatedSection';
import Footer from './Footer';
import orcamentoReal from '../data/orcamento_real.json';

const fmtHome = (n) => {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' bi';
  if (n >= 1_000_000) return (n / 1_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' MI';
  if (n >= 1_000) return (n / 1_000).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' mil';
  return n.toLocaleString('pt-BR');
};

const eixos = [
  {
    numero: '01',
    titulo: 'Desenvolvimento Sustentável e Bioeconomia',
    descricao: 'Incentivo a cadeias produtivas sustentáveis que valorizam a floresta em pé e geram renda para comunidades locais.',
    icone: Leaf,
    cor: '#4ade80'
  },
  {
    numero: '02',
    titulo: 'Mitigação das Mudanças Climáticas',
    descricao: 'Ações para reduzir a emissão de gases de efeito estufa e aumentar a absorção de carbono pela floresta amazônica.',
    icone: TrendingDown,
    cor: '#38bdf8'
  },
  {
    numero: '03',
    titulo: 'Adaptação Climática',
    descricao: 'Estratégias para preparar cidades e comunidades rurais aos impactos das mudanças climáticas na Amazônia.',
    icone: ShieldCheck,
    cor: '#fbbf24'
  },
  {
    numero: '04',
    titulo: 'Justiça Climática e Inclusão Social',
    descricao: 'Proteção de populações e territórios vulneráveis, garantindo equidade nos benefícios das ações climáticas.',
    icone: Users,
    cor: '#f472b6'
  },
  {
    numero: '05',
    titulo: 'Governança Ambiental e Transparência',
    descricao: 'Fortalecimento da gestão pública com monitoramento, fiscalização e acesso à informação ambiental.',
    icone: FileText,
    cor: '#a78bfa'
  },
  {
    numero: '06',
    titulo: 'Educação Ambiental e Inovação',
    descricao: 'Promoção do conhecimento, pesquisa e tecnologias limpas para a transição sustentável.',
    icone: Lightbulb,
    cor: '#fb923c'
  },
  {
    numero: '07',
    titulo: 'Gestão de Riscos e Proteção Civil',
    descricao: 'Prevenção e resposta a desastres naturais, incêndios florestais e eventos climáticos extremos.',
    icone: AlertTriangle,
    cor: '#ef4444'
  }
];

const destaques = [
  'Reduzir os impactos das mudanças climáticas (mitigação);',
  'Preparar o Estado para enfrentar esses impactos (adaptação);',
  'Proteger populações e territórios vulneráveis;',
  'Valorizar os recursos naturais e culturais da Amazônia.'
];

function InfoCard({ title, text, onClose }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 10px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 280,
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: '14px 18px',
        zIndex: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        textAlign: 'justify'
      }}
    >
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
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Info size={20} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{title}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
        {text}
      </div>
      <div style={{
        position: 'absolute',
        top: -6,
        left: '50%',
        width: 12,
        height: 12,
        backgroundColor: 'var(--card-bg)',
        borderTop: '1px solid var(--border-color)',
        borderLeft: '1px solid var(--border-color)',
        transform: 'translateX(-50%) rotate(45deg)'
      }} />
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [showEixoInfo, setShowEixoInfo] = useState(false);
  const [showExercicioInfo, setShowExercicioInfo] = useState(false);
  const [showDotacaoInfo, setShowDotacaoInfo] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
    <div className="homepage-container">
      <div className="homepage-header" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="seplan-logo">
          <div className="logo-text" style={{ color: '#15803d', fontSize: 32, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>SEPLAN</div>
          <div className="logo-divider" style={{ background: '#d4a843', width: 2, height: 36 }}></div>
          <div className="logo-sub" style={{ color: 'var(--text-primary)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 1.4 }}>
            Secretaria de<br/>Estado de<br/>Planejamento
          </div>
        </div>
        <ThemeToggle />
      </div>
      {/* Hero Section */}
      <AnimatedSection className="hero-section">
        <div className="hero-top-row">
          <h1 className="hero-title">
            <span style={{ color: '#4ade80' }}>Orçamento Climático<br/>do Estado do Acre</span>
          </h1>
          <div className="hero-stats">
            <div className="stat-card" style={{ position: 'relative' }}>
              <div className="stat-value">7</div>
              <div className="stat-label">Eixos Temáticos</div>
              <button
                onClick={() => setShowEixoInfo(!showEixoInfo)}
                className="eixo-info-btn"
                style={{
                  position: 'absolute',
                  bottom: 4,
                  right: 12,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'serif',
                  transition: 'all 0.2s ease'
                }}
                title="Informação"
              >
                i
              </button>
              {showEixoInfo && (
                <InfoCard
                  title="Eixos Temáticos"
                  text="Eixos temáticos são áreas principais que organizam assuntos, objetivos e indicadores de um projeto ou planejamento, agrupando temas relacionados e facilitando a análise das informações."
                  onClose={() => setShowEixoInfo(false)}
                />
              )}
            </div>
            <div className="stat-card" style={{ position: 'relative' }}>
              <div className="stat-value">2026</div>
              <div className="stat-label">Exercício Anual</div>
              <button
                onClick={() => setShowExercicioInfo(!showExercicioInfo)}
                className="eixo-info-btn"
                style={{
                  position: 'absolute',
                  bottom: 4,
                  right: 12,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'serif',
                  transition: 'all 0.2s ease'
                }}
                title="Informação"
              >
                i
              </button>
              {showExercicioInfo && (
                <InfoCard
                  title="Exercício Anual"
                  text="Período correspondente ao ano de 2026 utilizado para o planejamento, execução e acompanhamento das atividades, receitas, despesas e resultados."
                  onClose={() => setShowExercicioInfo(false)}
                />
              )}
            </div>
            <div className="stat-card" style={{ position: 'relative' }}>
              <div className="stat-value">{fmtHome(orcamentoReal.total_orcamento_climatico || 0)}</div>
              <div className="stat-label">Dotação Planejada</div>
              <button
                onClick={() => setShowDotacaoInfo(!showDotacaoInfo)}
                className="eixo-info-btn"
                style={{
                  position: 'absolute',
                  bottom: 4,
                  right: 12,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'serif',
                  transition: 'all 0.2s ease'
                }}
                title="Informação"
              >
                i
              </button>
              {showDotacaoInfo && (
                <InfoCard
                  title="Dotação Planejada"
                  text="Valor previsto no orçamento público para financiar ações, programas e projetos definidos previamente."
                  onClose={() => setShowDotacaoInfo(false)}
                />
              )}
            </div>
          </div>
        </div>
        <p className="hero-subtitle">
          Ferramenta inédita para organizar e acompanhar os gastos públicos
          destinados à proteção ambiental e ao enfrentamento das mudanças climáticas.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>
            Acessar Dados
            <ArrowRight size={18} />
          </button>
        </div>
      </AnimatedSection>

      {/* Sobre Section */}
      <section className="sobre-section">
        <div className="sobre-grid">
          <AnimatedSection className="sobre-conteudo">
            <h2 className="sobre-titulo" style={{ color: '#4ade80' }}>Sobre o Orçamento Climático</h2>
            <p className="sobre-texto">
              O Orçamento Climático é uma ferramenta inédita no Estado do Acre, criada para
              organizar e acompanhar os gastos públicos destinados à proteção ambiental e ao
              enfrentamento das mudanças climáticas, conforme estabelece a{' '}
              <strong>Lei nº 4.679, de 10 de novembro de 2025</strong>, que dispõe sobre o
              Orçamento Climático do Estado do Acre.
            </p>
            <p className="sobre-texto">
              Mais do que um instrumento contábil, trata-se de um modelo inovador de gestão,
              que permite identificar, monitorar e avaliar todas as ações governamentais que
              contribuem para:
            </p>
            <ul className="destaques-lista">
              {destaques.map((item, idx) => (
                <li key={idx} className="destaque-item">
                  <span className="destaque-bullet" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection className="sobre-destaque">
            <a
              href="https://seplan.ac.gov.br/wp-content/uploads/2025/11/ORCAMENTO-CLIMATICO.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="capa-link"
            >
              <img
                src="/orcamento-climatico.png"
                alt="Capa do Relatório Orçamento Climático do Estado do Acre"
                className="capa-imagem"
              />
              <span className="capa-overlay">
                <span className="capa-overlay-text">Clique para acessar o relatório</span>
              </span>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Eixos Section */}
      <section className="eixos-section">
        <AnimatedSection className="section-header">
          <h2 className="section-header-titulo" style={{ color: '#4ade80' }}>Eixos Temáticos</h2>
          <p className="section-header-sub">
            Aplicado de forma transversal e integrada a todas as áreas do governo — como saúde,
            educação, infraestrutura, agricultura, meio ambiente e assistência social — o Orçamento
            Climático estrutura-se em sete eixos temáticos:
          </p>
        </AnimatedSection>
        <div className="eixos-grid">
          {eixos.map((eixo) => {
            const Icone = eixo.icone;
            return (
              <AnimatedSection key={eixo.numero} style={{ display: 'inline-block' }}>
                <div className="eixo-card">
                  <div className="eixo-numero" style={{ color: eixo.cor }}>
                    {eixo.numero}
                  </div>
                  <div className="eixo-icone" style={{ background: `${eixo.cor}15`, color: eixo.cor }}>
                    <Icone size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="eixo-titulo">{eixo.titulo}</h3>
                  <p className="eixo-descricao">{eixo.descricao}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection className="cta-section">
        <div className="cta-content">
          <h2 style={{ color: '#4ade80' }}>Explore os dados do Orçamento Climático</h2>
          <p>
            Com essa ferramenta, o Acre busca mensurar com precisão quanto investe em ações
            climáticas, avaliar a efetividade dos projetos, atrair recursos nacionais e
            internacionais e fortalecer políticas públicas voltadas à sustentabilidade.
          </p>
          <button className="btn-primary btn-large" onClick={() => navigate('/dashboard')}>
            Acessar Dados
            <ArrowRight size={20} />
          </button>
        </div>
      </AnimatedSection>
    </div>
    <Footer />
    </>
  );
}
