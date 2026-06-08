import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const nomesEixos = {
  1: 'Desenvolvimento Sustentável e Bioeconomia',
  2: 'Mitigação das Mudanças Climáticas',
  3: 'Adaptação Climática',
  4: 'Justiça Climática e Inclusão Social',
  5: 'Governança Ambiental e Transparência',
  6: 'Educação Ambiental e Inovação',
  7: 'Gestão de Riscos e Proteção Civil'
};

const odsConteudo = {
  'ODS 1': {
    titulo: 'ODS 1 - Erradicação da pobreza',
    indicadores: [
      { texto: 'Indicador 1.5.3: Número de países que adotaram e implementaram estratégias nacionais de redução de risco de desastres em linha com o Quadro de Sendai para a Redução de Risco de Desastres 2015-2030', eixo: '7' },
      { texto: 'Indicador 1.5.4: Proporção de governos locais que adotam e implementam estratégias locais de redução de risco de desastres em linha com as estratégias nacionais de redução de risco de desastres', eixo: '7' },
    ]
  },
  'ODS 2': {
    titulo: 'ODS 2 - Fome zero e agricultura sustentável',
    indicadores: [
      { texto: 'Indicador 2.4.1: Proporção da área agrícola sob agricultura produtiva e sustentável', eixo: '1' },
    ]
  },
  'ODS 3': {
    titulo: 'ODS 3 - Saúde e bem-estar',
    indicadores: [
      { texto: 'Indicador 3.9.1: Taxa de mortalidade por poluição ambiental (externa e doméstica) do ar (EM CONSTRUÇÃO)', eixo: '7' },
      { texto: 'Indicador 3.9.2: Taxa de mortalidade atribuída a fontes de água inseguras, saneamento inseguro e falta de higiene', eixo: '7' },
      { texto: 'Indicador 3.9.3: Taxa de mortalidade atribuída a intoxicação não intencional', eixo: '7' },
    ]
  },
  'ODS 4': {
    titulo: 'ODS 4 - Educação de qualidade',
    indicadores: [
      { texto: 'Indicador 4.7.1: Grau em que a (i) a educação para a cidadania global e (ii) a educação para o desenvolvimento sustentável são integradas nas (a) políticas nacionais de educação; (b) currículos escolares; (c) formação de professores; e (d) avaliação de estudantes (EM CONSTRUÇÃO)', eixo: '6' },
      { texto: 'Indicador 4.a.1: Proporção de escolas com acesso a: (a) eletricidade; (b) internet para fins pedagógicos; (c) computadores para fins pedagógicos; (d) infraestrutura e materiais adaptados para alunos com deficiência; (e) água potável; (f) instalações sanitárias separadas por sexo; e (g) instalações básicas para lavagem das mãos (de acordo com as definições dos indicadores WASH)', eixo: '4' },
    ]
  },
  'ODS 5': {
    titulo: 'ODS 5 - Igualdade de gênero',
    indicadores: [
      { texto: 'Indicador 5.a.2: Proporção de países onde as estruturas legais (incluindo o direito consuetudinário) garantem às mulheres direitos iguais à propriedade e/ou controle da terra', eixo: '4' },
    ]
  },
  'ODS 6': {
    titulo: 'ODS 6 - Água potável e saneamento',
    indicadores: [
      { texto: 'Indicador 6.1.1: Proporção da população que utiliza serviços de água potável gerenciados de forma segura', eixo: '4' },
      { texto: 'Indicador 6.2.1: Proporção da população que utiliza (a) serviços de saneamento gerenciados de forma segura e (b) instalações para lavagem das mãos com água e sabão', eixo: '4' },
      { texto: 'Indicador 6.3.1: Proporção do fluxo de águas residuais doméstica e industrial tratadas de forma segura', eixo: '3' },
      { texto: 'Indicador 6.3.2: Proporção de corpos hídricos com boa qualidade ambiental', eixo: '3' },
      { texto: 'Indicador 6.4.1: Alteração da eficiência no uso da água ao longo do tempo', eixo: '3' },
      { texto: 'Indicador 6.4.2: Nível de stress hídrico: proporção das retiradas de água doce em relação ao total dos recursos de água doce disponíveis', eixo: '3' },
      { texto: 'Indicador 6.5.1: Grau de implementação da gestão integrada de recursos hídricos (0-100)', eixo: '5' },
      { texto: 'Indicador 6.5.2: Proporção das áreas de bacias hidrográficas transfronteiriças abrangidas por um acordo operacional para cooperação hídrica', eixo: '5' },
      { texto: 'Indicador 6.6.1: Alteração na extensão dos ecossistemas relacionados a água ao longo do tempo', eixo: '3' },
      { texto: 'Indicador 6.a.1: Montante de ajuda oficial ao desenvolvimento na área da água e saneamento, inserida num plano governamental de despesa', eixo: '5' },
      { texto: 'Indicador 6.b.1: Participação das comunidades locais na gestão de água e saneamento', eixo: null },
    ]
  },
  'ODS 7': {
    titulo: 'ODS 7 - Energia acessível e limpa',
    indicadores: [
      { texto: 'Indicador 7.1.1: Percentagem da população com acesso à eletricidade', eixo: '4' },
      { texto: 'Indicador 7.1.2: Percentagem da população com acesso primário a combustíveis e tecnologias limpos', eixo: '4' },
      { texto: 'Indicador 7.2.1: Participação das energias renováveis na Oferta Interna de Energia (OIE)', eixo: '3' },
      { texto: 'Indicador 7.a.1: Fluxos financeiros internacionais para países em desenvolvimento para apoio à pesquisa e desenvolvimento de energias limpas e à produção de energia renovável, incluindo sistemas híbridos (SEM DADOS)', eixo: '6' },
      { texto: 'Indicador 7.b.1: Capacidade instalada de geração de energia renovável nos países em desenvolvimento (em watts per capita)', eixo: '3' },
    ]
  },
  'ODS 8': {
    titulo: 'ODS 8 - Trabalho decente e crescimento econômico',
    indicadores: [
      { texto: 'Indicador 8.9.1: Turismo em percentagem do PIB e taxa de variação (SEM DADOS)', eixo: '1' },
      { texto: 'Indicador 8.9.2: Pessoas empregadas no setor do turismo (SEM DADOS)', eixo: '1' },
    ]
  },
  'ODS 9': {
    titulo: 'ODS 9 - Indústria, inovação e infraestrutura',
    indicadores: [
      { texto: 'Indicador 9.1.1: Proporção de população residente em áreas rurais que vive num raio de 2 km de acesso a uma estrada transitável em todas as estações do ano (SEM DADOS)', eixo: '4' },
      { texto: 'Indicador 9.4.1: Emissão de CO2 pelo PIB', eixo: '2' },
    ]
  },
  'ODS 10': {
    titulo: 'ODS 10 - Redução das desigualdades',
    indicadores: [
      { texto: 'Indicador 10.1.1: Taxa de crescimento das despesas domiciliares ou rendimento per capita entre os 40% com os menores rendimentos da população e a população total', eixo: '4' },
      { texto: 'Indicador 10.2.1: Proporção de pessoas vivendo abaixo de 50% da mediana da renda, por sexo, idade e pessoas com deficiência', eixo: '4' },
      { texto: 'Indicador 10.3.1: Proporção da população que reportou ter-se sentido pessoalmente discriminada ou assediada nos últimos 12 meses por motivos de discriminação proibidos no âmbito da legislação internacional dos direitos humanos (SEM DADOS)', eixo: '4' },
      { texto: 'Indicador 10.4.1: Proporção das remunerações no PIB, incluindo salários e as transferências de proteção social', eixo: '4' },
    ]
  },
  'ODS 11': {
    titulo: 'ODS 11 - Cidades e comunidades sustentáveis',
    indicadores: [
      { texto: 'Indicador 11.3.1: Razão da taxa de consumo do solo pela taxa de crescimento da população (SEM DADOS)', eixo: '3' },
      { texto: 'Indicador 11.4.1: Total da despesa (pública e privada) per capita gasta na preservação, proteção e conservação de todo o patrimônio cultural e natural, por tipo de patrimônio (cultural, natural, misto e por designação do Centro do Patrimônio Mundial), nível de governo (nacional, regional e local), tipo de despesa (despesas correntes/de investimento) e tipo de financiamento privado (doações em espécie, setor privado sem fins lucrativos e patrocínios)', eixo: '5' },
      { texto: 'Indicador 11.5.1: Número de mortes, pessoas desaparecidas e pessoas diretamente afetadas atribuído a desastres por 100 mil habitantes', eixo: '7' },
      { texto: 'Indicador 11.5.2: Perdas econômicas diretas em relação ao PIB, incluindo danos causados por desastres em infraestruturas críticas e na interrupção de serviços básicos', eixo: '7' },
      { texto: 'Indicador 11.6.1: Proporção de resíduos sólidos urbanos coletados e gerenciados em instalações controladas pelo total de resíduos urbanos gerados, por cidades', eixo: '5' },
      { texto: 'Indicador 11.6.2: Nível médio anual de partículas inaláveis (ex: com diâmetro inferior a 2,5 µm e 10 µm) nas cidades (população ponderada) (SEM DADOS)', eixo: '3' },
      { texto: 'Indicador 11.a.1: Número de países que possuem políticas urbanas nacionais ou planos de desenvolvimento regional que (a) respondem à dinâmica populacional; (b) garantem um desenvolvimento territorial equilibrado; e (c) possuem responsabilidade fiscal', eixo: '6' },
      { texto: 'Indicador 11.b.1: Número de países que adotam e implementam estratégias nacionais de redução de risco de desastres em linha com o Marco de Sendai para a Redução de Risco de Desastres 2015-2030', eixo: '7' },
      { texto: 'Indicador 11.b.2: Proporção de governos locais que adotam e implementam estratégias locais de redução de risco de desastres em linha com as estratégias nacionais de redução de risco de desastres', eixo: '7' },
    ]
  },
  'ODS 12': {
    titulo: 'ODS 12 - Consumo e produção responsáveis',
    indicadores: [
      { texto: 'Indicador 12.1.1: Número de países que incorporam o consumo e a produção sustentáveis em planos de ação nacionais ou como uma prioridade ou uma meta nas políticas nacionais', eixo: '1' },
      { texto: 'Indicador 12.4.1: Número de Partes em acordos multilaterais internacionais sobre resíduos perigosos e outros produtos químicos, no domínio do ambiente, que cumpram os seus compromissos e obrigações na transmissão de informações, conforme exigido por cada acordo relevante', eixo: '5' },
      { texto: 'Indicador 12.4.2: Quantidade de resíduos perigosos gerados per capita e proporção de resíduos perigosos tratados, por tipo de tratamento (SEM DADOS)', eixo: '6' },
      { texto: 'Indicador 12.5.1: Taxa de reciclagem nacional por toneladas de material reciclado', eixo: '3' },
      { texto: 'Indicador 12.6.1: Número de empresas que publicam relatórios de sustentabilidade', eixo: '5' },
      { texto: 'Indicador 12.7.1: Grau de implementação de políticas e planos de ação para compras públicas sustentáveis (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 12.8.1: Grau em que a (i) a educação para a cidadania global e (ii) a educação para o desenvolvimento sustentável são integradas nas (a) políticas nacionais de educação; (b) currículos escolares; (c) formação de professores; e (d) avaliação de estudantes (SEM DADOS)', eixo: '6' },
      { texto: 'Indicador 12.a.1: Capacidade instalada de geração de energia renovável nos países em desenvolvimento (em watts per capita)', eixo: '3' },
      { texto: 'Indicador 12.b.1: Aplicação de instrumentos contábeis padronizados para monitorar os aspectos econômicos e ambientais da sustentabilidade do turismo (SEM DADOS)', eixo: '6' },
      { texto: 'Indicador 12.c.1: Montante de subsídios aos combustíveis fósseis por unidade do PIB (produção e consumo) (SEM DADOS)', eixo: '3' },
    ]
  },
  'ODS 13': {
    titulo: 'ODS 13 - Ação contra a mudança global do clima',
    indicadores: [
      { texto: 'Indicador 13.1.1: Número de mortes, pessoas desaparecidas e pessoas diretamente afetadas atribuído a desastres por 100 mil habitantes', eixo: '7' },
      { texto: 'Indicador 13.1.2: Número de países que adotam e implementam estratégias nacionais de redução de risco de desastres em linha com o Quadro de Sendai para a Redução de Risco de Desastres 2015-2030', eixo: '7' },
      { texto: 'Indicador 13.1.3: Proporção de governos locais que adotam e implementam estratégias locais de redução de risco de desastres em linha com as estratégias nacionais de redução de risco de desastres', eixo: '7' },
      { texto: 'Indicador 13.2.1: Número de países com Contribuições Nacionalmente Determinadas, estratégias de longo prazo, planos nacionais de adaptação, estratégias como reportadas nas comunicações nacionais e de adaptação', eixo: '2' },
      { texto: 'Indicador 13.2.2: Emissões totais de gases de efeito estufa por ano', eixo: '2' },
      { texto: 'Indicador 13.3.1: Grau em que a (i) a educação para a cidadania global e (ii) a educação para o desenvolvimento sustentável são integradas nas (a) políticas nacionais de educação; (b) currículos escolares; (c) formação de professores; e (d) avaliação de estudantes (SEM DADOS)', eixo: '6' },
    ]
  },
  'ODS 14': {
    titulo: 'ODS 14 - Vida na água',
    indicadores: [
      { texto: 'Indicador 14.7.1: Pesca sustentável como uma proporção do Produto Interno Bruto (PIB) de pequenos Estados insulares em desenvolvimento, (Small Islands Developing States), de países menos desenvolvidos e todos os países (SEM DADOS)', eixo: '4' },
    ]
  },
  'ODS 15': {
    titulo: 'ODS 15 - Vida terrestre',
    indicadores: [
      { texto: 'Indicador 15.1.1: Área florestal como proporção da área total do território', eixo: '3' },
      { texto: 'Indicador 15.1.2: Proporção de sítios importantes para a biodiversidade terrestre e de água doce cobertos por áreas protegidas, por tipo de ecossistema', eixo: '1' },
      { texto: 'Indicador C15.1.c: Cobertura das áreas terrestres protegidas em relação à área terrestre total', eixo: '3' },
      { texto: 'Indicador 15.2.1: Progressos na gestão florestal sustentável', eixo: '1' },
      { texto: 'Indicador 15.3.1: Proporção do território com terras degradadas', eixo: '7' },
      { texto: 'Indicador 15.4.1: Cobertura de áreas protegidas de sitios importantes para a biodiversidade das montanhas', eixo: '1' },
      { texto: 'Indicador 15.4.2: (a) Índice de cobertura vegetal nas regiões de montanha; e (b) Proporção de terras degradadas nas regiões de montanha', eixo: '5' },
      { texto: 'Indicador 15.5.1: Índice das listas vermelhas', eixo: '5' },
      { texto: 'Indicador 15.6.1: Número de países que adotaram quadros legislativos, administrativos e políticos para assegurar a partilha justa e equitativa de benefícios', eixo: '5' },
      { texto: 'Indicador 15.7.1: Proporção da vida silvestre comercializada que foi objeto de caça furtiva ou de tráfico ilícito (SEM DADOS)', eixo: '5' },
      { texto: 'Indicador 15.8.1: Proporção de países que adotam legislação nacional relevante e recursos adequados para a prevenção ou o controle de espécies exóticas invasoras', eixo: '5' },
      { texto: 'Indicador 15.9.1: (a) Número de países que estabeleceram metas nacionais em conformidade com a Meta 2 de Aichi do Plano Estratégico para a Biodiversidade 2011–2020 ou metas similares em suas estratégias e planos de ação nacionais para a biodiversidade e o progresso relatado no alcance dessas metas; e (b) integração da biodiversidade nas contas nacionais e sistemas de relatoria, definidos como implementação do Sistema de Contas Econômicas Ambientais', eixo: '5' },
      { texto: 'Indicador 15.a.1: (a) Assistência oficial ao desenvolvimento em conservação e uso sustentável da biodiversidade; e (b) Receita gerada e financiamento mobilizado a partir de instrumentos econômicos relevantes para a biodiversidade', eixo: '1' },
      { texto: 'Indicador 15.b.1: (a) Assistência Oficial ao Desenvolvimento em conservação e uso sustentável da biodiversidade; e (b) Receita gerada e financiamento mobilizado a partir de instrumentos econômicos relevantes para a biodiversidade', eixo: '1' },
      { texto: 'Indicador 15.c.1: Proporção da vida silvestre comercializada que foi objeto de caça furtiva ou de tráfico ilícito (SEM DADOS)', eixo: '5' },
    ]
  },
  'ODS 16': {
    titulo: 'ODS 16 - Paz, justiça e instituições eficazes',
    indicadores: [
      { texto: 'Indicador 16.6.1: Despesas públicas primárias como proporção do orçamento original aprovado, por setor (ou por códigos de orçamento ou similares)', eixo: '5' },
    ]
  },
  'ODS 17': {
    titulo: 'ODS 17 - Parcerias e meios de implementação',
    indicadores: [
      { texto: 'Indicador 17.14.1: Número de países com mecanismos em vigor para reforçar a coerência política do desenvolvimento sustentável (SEM DADOS)', eixo: '5' },
      { texto: 'Indicador 17.16.1: Número de países que reportam progressos na eficácia dos quadros de monitoramento de múltiplos atores que apoiam o cumprimento dos objetivos de desenvolvimento sustentável (SEM DADOS)', eixo: '5' },
      { texto: 'Indicador 17.18.1: Indicador de capacidade estatística para monitoramento dos Objetivos do Desenvolvimento Sustentável (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 17.19.3: Índice de desempenho socioeconômico (EM CONSTRUÇÃO)', eixo: '5' },
    ]
  },
  'ODS 18': {
    titulo: 'ODS 18 - Igualdade étnico-racial',
    indicadores: [
      { texto: 'Indicador 18.5.1: Pessoas indígenas ou quilombolas residentes em territórios regularizados (EM CONSTRUÇÃO)', eixo: '4' },
      { texto: 'Indicador 18.5.3: Escolas indígenas em que ensino é ministrado em língua indígena ou em língua indígena e em português no total de escolas indígenas (%) (EM CONSTRUÇÃO)', eixo: '4' },
      { texto: 'Indicador 18.5.4: Área (ha) de desmatamento e vegetação secundária por classe de cobertura para os recortes de terras indígenas ou territórios quilombolas (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 18.5.5: Área de mineração (ha) em Terras Indígenas ou territórios quilombolas (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 18.5.6: População em área de risco de desastre geológico por raça/cor (EM CONSTRUÇÃO)', eixo: '7' },
      { texto: 'Indicador 18.6.1: Moradores indígenas ou quilombolas em domicílios com abastecimento de água adequado (EM CONSTRUÇÃO)', eixo: '4' },
      { texto: 'Indicador 18.6.2: Domicílios com pelo menos uma pessoa indígena ou quilombola com esgotamento sanitário inadequado (EM CONSTRUÇÃO)', eixo: '4' },
      { texto: 'Indicador 18.6.3: Proporção de população urbana vivendo em assentamentos precários, assentamentos informais ou domicílios inadequados (EM CONSTRUÇÃO)', eixo: '4' },
      { texto: 'Indicador 18.7.3: Percentual da população indígena coberta por Equipes Multiprofissionais de Saúde Indígena (EMSI) (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 18.8.1: Taxa de atendimento escolar na educação básica entre jovens de 15 a 17 anos por raça/cor (incluindo indígenas e quilombolas) por sexo e UF (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 18.8.2: Taxa de distorção idade-série por raça/cor (incluindo indígenas e quilombolas) na educação básica (desagregada em EFI, II e EM), por sexo e UF (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 18.8.3: Taxa de abandono por raça/cor, (incluindo indígenas e quilombolas) na educação básica (desagregada em EFI, II e EM), por sexo e UF (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 18.8.5: Nota do SAEB dos estudantes por raça/cor, (incluindo indígenas e quilombolas), por sexo e UF (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 18.8.6: Taxa de atendimento escolar no ensino superior por raça/cor (incluindo indígenas e quilombolas, (desagregada por curso e tipo de IES), por sexo e UF (EM CONSTRUÇÃO)', eixo: '5' },
      { texto: 'Indicador 18.8.8: Quantitativo e percentual de pretos, pardos e indígenas por sexo com título e Mestre e Doutor (EM CONSTRUÇÃO)', eixo: '4' },
      { texto: 'Indicador 18.8.9: Proporção de escolas com acesso a: (a) eletricidade; (b) internet para fins pedagógicos; (c) computadores para fins pedagógicos; (d) infraestrutura e materiais adaptados para alunos com deficiência; (e) água potável; (f) instalações sanitárias separadas por sexo; e (g) instalações básicas para lavagem das mãos (de acordo com as definições dos indicadores WASH) (EM CONSTRUÇÃO)', eixo: '4' },
      { texto: 'Indicador 18.8.10: Percentual de pesquisadores pretos, pardos e indígenas por sexo e UF com bolsa de produtividade em pesquisa (EM CONSTRUÇÃO)', eixo: '4' },
      { texto: 'Indicador 18.9.1: Porcentagem de cadastros com consentimento prévio e informado junto a povos indígenas e afrodescendentes do total de cadastros de acesso ao conhecimento tradicional associado (EM CONSTRUÇÃO)', eixo: '4' },
    ]
  },
};

function EixoTooltip({ num, children }) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  const updatePos = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const tooltipWidth = 280;
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;
      if (left < 8) left = 8;
      if (left + tooltipWidth > window.innerWidth - 8) left = window.innerWidth - tooltipWidth - 8;
      setPos({ top: rect.top - 8, left });
    }
  };

  useEffect(() => {
    if (hover) updatePos();
  }, [hover]);

  return (
    <>
      <span
        ref={ref}
        style={{ cursor: 'help' }}
        onMouseEnter={() => { updatePos(); setHover(true); }}
        onMouseLeave={() => setHover(false)}
      >
        {children}
        <span style={{ color: '#4ade80', fontWeight: 600, whiteSpace: 'nowrap' }}>
          {' '} (Eixo {num})
        </span>
      </span>
      {hover && createPortal(
        <div
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            transform: 'translateY(-100%)',
            background: '#052e16',
            color: '#4ade80',
            border: '1px solid #2d5a3d',
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 12,
            fontWeight: 500,
            zIndex: 2147483647,
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            maxWidth: 280,
            lineHeight: 1.4
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Eixo {num}</div>
          <div>{nomesEixos[num]}</div>
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid #2d5a3d'
            }}
          />
        </div>,
        document.body
      )}
    </>
  );
}

export default function ODSModal({ ods, posicao, onClose }) {
  const [visivel, setVisivel] = useState(false);
  const [adjustedPos, setAdjustedPos] = useState(posicao || { top: 0, left: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    if (!posicao) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 16;
    const cardWidth = 340;
    const estimatedHeight = 420;

    let left = posicao.left;
    const minLeft = cardWidth / 2 + margin;
    const maxLeft = vw - cardWidth / 2 - margin;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    let top = posicao.top;
    if (top + estimatedHeight > vh - margin) {
      top = Math.max(margin, vh - estimatedHeight - margin);
    }

    setAdjustedPos({ top, left });
    const timer = setTimeout(() => setVisivel(true), 10);
    return () => clearTimeout(timer);
  }, [posicao]);

  if (!ods || !posicao) return null;

  const info = odsConteudo[ods];
  if (!info) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          top: adjustedPos.top,
          left: adjustedPos.left,
          transform: `translateX(-50%) translateY(${visivel ? 0 : -28}px) scale(${visivel ? 1 : 0.75})`,
          opacity: visivel ? 1 : 0,
          transition: 'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 9999,
          maxWidth: 340,
          width: 'max-content'
        }}
      >
        {/* Seta para cima */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '8px solid var(--card-bg, #0f2416)',
            margin: '0 auto'
          }}
        />
        <div
          ref={cardRef}
          className="hide-scrollbar"
          style={{
            background: 'var(--card-bg, #0f2416)',
            border: '1px solid var(--border-color, #1a4530)',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 10px 40px #0a1f12',
            position: 'relative',
            maxHeight: '60vh',
            overflowY: 'auto',
            scrollbarWidth: 'none'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 8,
              right: 10,
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary, #94a3b8)',
              fontSize: 20,
              cursor: 'pointer',
              lineHeight: 1,
              padding: 0
            }}
          >
            ×
          </button>

          <h3
            style={{
              color: 'var(--accent, #4ade80)',
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 12,
              paddingRight: 24
            }}
          >
            {info.titulo}
          </h3>

          <div style={{ color: 'var(--text-secondary, #cbd5e1)', fontSize: 12, lineHeight: 1.5, textAlign: 'justify' }}>
            <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
              Indicadores contemplados:
            </p>
            <ul style={{ paddingLeft: 16, margin: 0 }}>
              {info.indicadores.map((item, idx) => (
                <li key={idx} style={{ marginBottom: 6, textAlign: 'justify' }}>
                  {item.eixo ? (
                    <EixoTooltip num={parseInt(item.eixo)}>{item.texto}.</EixoTooltip>
                  ) : (
                    <>{item.texto}.</>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
