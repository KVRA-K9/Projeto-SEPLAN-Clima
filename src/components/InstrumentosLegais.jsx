import React from 'react';
import { FileText, Scale, BookOpen, Gavel, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const instrumentos = [
  {
    categoria: 'Publicações Oficiais',
    icone: BookOpen,
    itens: [
      {
        titulo: 'Orçamento Climático do Estado do Acre',
        descricao: 'Documento oficial da Secretaria de Estado de Planejamento apresentando o orçamento climático do estado, com diretrizes, metas e ações para mitigação e adaptação às mudanças climáticas.',
        url: 'https://seplan.ac.gov.br/wp-content/uploads/2025/11/ORCAMENTO-CLIMATICO.pdf'
      },
      {
        titulo: 'Agenda Acre 10 anos',
        descricao: 'Principal instrumento de planejamento estratégico de longo prazo do Governo do Estado do Acre, voltado ao desenvolvimento socioeconômico sustentável.',
        url: 'https://seplan.ac.gov.br/desenvolvimento-regional/agenda-acre-10-anos/'
      },
      {
        titulo: 'Decreto Nº 11.374, de 28 de novembro de 2023',
        descricao: 'Dispõe sobre a Rede de Governança Ambiental do Acre e dá outras providências.',
        url: 'https://legis.ac.gov.br/detalhar/5814'
      },
      {
        titulo: 'PPCDQ – Fase 3',
        descricao: 'Plano Estadual de Prevenção e Controle do Desmatamento e Queimada no Acre – PPCDQ-AC, em concordância com as diretrizes do Plano de Ação para Prevenção e Controle do Desmatamento na Amazônia Legal – PPCDAm.',
        url: 'https://sema.ac.gov.br/wp-content/uploads/2024/06/PPCDQ-AC-DIGITAL-13-MAIO_FINAL.pdf'
      },
      {
        titulo: 'Plano Emergencial de Enfrentamento às Enchentes',
        descricao: 'Ferramenta de articulação de ações efetivas de curto, médio e longo prazo entre o poder público e a sociedade civil para combater as causas do problema, recuperar a infraestrutura urbana e rural atingida, reduzir o impacto socioeconômico das enchentes e adaptar as cidades e comunidades rurais à nova realidade climática.',
        url: 'https://seplan.ac.gov.br/wp-content/uploads/2024/05/Plano-Emergencial-Enchentes-Acre-2024.pdf'
      }
    ]
  },
  {
    categoria: 'Constituição Federal',
    icone: BookOpen,
    itens: [
      {
        titulo: 'CF/88 - Art. 225',
        descricao: 'Direito ao meio ambiente ecologicamente equilibrado, impondo ao Poder Público e à coletividade o dever de defendê-lo e preservá-lo para as presentes e futuras gerações.',
        url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#art225'
      },
      {
        titulo: 'CF/88 - Art. 23, VI e VII',
        descricao: 'Competência comum da União, dos Estados, do Distrito Federal e dos Municípios: \nVI - proteger o meio ambiente e combater a poluição em qualquer de suas formas;\nVII - preservar as florestas, a fauna e a flora.',
        url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#art23'
      }
    ]
  },
  {
    categoria: 'Leis Estaduais',
    icone: Scale,
    itens: [
      { titulo: 'Lei nº 4.679, de 10 de novembro de 2025', descricao: 'Dispõe sobre o Orçamento Climático do Estado do Acre.', url: 'https://legis.ac.gov.br/detalhar/6600' },
      { titulo: 'Lei nº 3.880, de 17 de dezembro de 2021', subtitulo: 'Altera a Lei nº 2.308, de 22 de outubro de 2010', url: 'https://legis.ac.gov.br/detalhar/4977' },
      { titulo: 'Lei nº 2.308/10 - SISA/AC', descricao: 'Sistema de Incentivo a Serviços Ambientais do Estado do Acre.', url: 'https://legis.ac.gov.br/detalhar/475' }
    ]
  },
  {
    categoria: 'Leis Federais',
    icone: Gavel,
    itens: [
      { titulo: 'Lei nº 12.187/2009 (PNMC)', descricao: 'Política Nacional sobre Mudança do Clima, estabelecendo a meta de redução de emissões e o papel dos estados na implementação de ações climáticas.', url: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12187.htm' },
      { titulo: 'Plano Nacional sobre Mudança do Clima (Plano Clima 2024-2035)', descricao: 'Estratégia de longo prazo para a descarbonização da economia brasileira, com metas setoriais de mitigação e adaptação às mudanças climáticas.', url: 'https://www.gov.br/mma/pt-br/composicao/smc/plano-clima' }
    ]
  }
];

export default function InstrumentosLegais() {
  return (
    <div className="instrumentos-legais">
      <AnimatedSection className="section" style={{ marginBottom: 24 }}>
        <div className="section-title">
          <Scale size={18} />
          Marco Legal do Orçamento Climático
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
          Conjunto de normas jurídicas e publicações oficiais que fundamentam e regulamentam as ações de orçamento climático
          no Estado do Acre, incluindo leis estaduais, instrumentos federais e documentos técnicos aplicáveis.
        </p>
      </AnimatedSection>

      <div className="instrumentos-grid">
        {instrumentos.map((grupo, idx) => {
          const Icone = grupo.icone;
          return (
            <AnimatedSection key={idx}>
              <div className="instrumento-grupo">
                <div className="instrumento-header">
                  <Icone size={20} strokeWidth={1.5} />
                  <span style={{ color: '#4ade80' }}>{grupo.categoria}</span>
                </div>
                <div className="instrumento-lista" style={grupo.categoria === 'Constituição Federal' ? { display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '120px' } : undefined}>
                  {grupo.itens.map((item, i) => (
                    <div key={i} className="instrumento-item">
                      <div className="instrumento-titulo">
                        {item.url ? (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="instrumento-link"
                          >
                            {item.titulo}
                            <ExternalLink size={12} style={{ marginLeft: 6, verticalAlign: 'middle' }} />
                          </a>
                        ) : (
                          item.titulo
                        )}
                      </div>
                      {item.subtitulo && (
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, marginBottom: 4 }}>
                          {item.subtitulo}
                        </div>
                      )}
                      {item.descricao && (
                        <div className="instrumento-descricao">{item.descricao}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
