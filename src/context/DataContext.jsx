import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import orcamentoReal from '../data/orcamento_real.json';
import orcamentoPorOrgaoEixo from '../data/orcamento_por_orgao_eixo.json';

const eixos = [
  'Desenvolvimento Sustentável e Bioeconomia',
  'Mitigação das Mudanças Climáticas',
  'Adaptação Climática',
  'Justiça Climática e Inclusão Social',
  'Governança Ambiental e Transparência',
  'Educação Ambiental e Inovação',
  'Gestão de Riscos e Proteção Civil'
];

const eixosPorOrgao = {
  'AGEAC': ['Eixo II – Mitigação das Mudanças Climáticas'],
  'ANAC': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  'CAGEACRE': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  'CBMAC': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo VII – Resposta Climática Emergencial e Proteção Civil'],
  'CDSA': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  'CGE': ['Eixo V – Governança Ambiental e Transparência'],
  'COHAB': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'COORD. EST. PROTEÇÃO E DEFESA CIVIL': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo VII – Resposta Climática Emergencial e Proteção Civil'],
  'DERACRE': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  'DPE': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'EMATER': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  'FAPAC': ['Eixo VI – Educação Ambiental e Inovação Climática'],
  'FEM': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'FUNTAC': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo VI – Educação Ambiental e Inovação Climática'],
  'IAPEN': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'IDAF': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'IEPTEC': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'IMAC': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas', 'Eixo VI – Educação Ambiental e Inovação Climática'],
  'IMC': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo V – Governança Ambiental e Transparência'],
  'ISE': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'ITERACRE': ['Eixo IV – Justiça Climática e Inclusão Social'],
  'JUCEAC': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  'MPAC': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'PCAC': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'PGE': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'PMAC': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'PROCON': ['Eixo IV – Justiça Climática e Inclusão Social'],
  'SANEACRE': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'SEAD': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  'SEADH': ['Eixo IV – Justiça Climática e Inclusão Social'],
  'SEAGRI': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia', 'Eixo III – Adaptação às Mudanças Climáticas'],
  'SEASDH': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social'],
  'SEE': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social', 'Eixo VI – Educação Ambiental e Inovação Climática'],
  'SEEL': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'SEFAZ': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  'SEGOV': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'SEHURB': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social'],
  'SEICT': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia', 'Eixo VI – Educação Ambiental e Inovação Climática'],
  'SEJUSP': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  'SEMA': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia', 'Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas', 'Eixo V – Governança Ambiental e Transparência', 'Eixo VI – Educação Ambiental e Inovação Climática'],
  'SEMULHER': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social'],
  'SEOP': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  'SEPI': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social'],
  'SEPLAN': ['Eixo II – Mitigação das Mudanças Climáticas'],
  'SESACRE': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'SETE': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia', 'Eixo III – Adaptação às Mudanças Climáticas'],
  'TJAC': ['Eixo III – Adaptação às Mudanças Climáticas'],
  'TCE': ['Eixo III – Adaptação às Mudanças Climáticas']
};

const secretarias = [
  'SEAD', 'SEFAZ', 'CDSA', 'IMC', 'SEMA', 'SEAGRI', 'EMATER',
  'SEICT', 'JUCEAC', 'SETE', 'ANAC', 'SEOP', 'SEPLAN', 'DERACRE',
  'AGEAC', 'SANEACRE', 'SEHURB', 'SEASDH', 'SEE', 'SEPI',
  'ITERACRE', 'CGE'
];

const projetosBase = [
  { id: 1, nome: "Gestão de Resíduos Sólidos", municipio: "Rio Branco", anoInicio: 2023, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[4], emissaoEvitada: 1200, secretaria: "SEAD", orcamento: 1200000 },
  { id: 2, nome: "Eficiência Energética Pública", municipio: "Cruzeiro do Sul", anoInicio: 2024, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[1], emissaoEvitada: 3500, secretaria: "SEFAZ", orcamento: 2500000 },
  { id: 3, nome: "Monitoramento Ambiental", municipio: "Xapuri", anoInicio: 2023, areaHa: 15000, creditosGerados: 300000, creditosVendidos: 180000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 280000, secretaria: "CDSA", orcamento: 800000 },
  { id: 4, nome: "Pesquisa Climática", municipio: "Mâncio Lima", anoInicio: 2025, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Implementação", eixo: eixos[5], emissaoEvitada: 5000, secretaria: "IMC", orcamento: 3500000 },
  { id: 5, nome: "Conservação de Bacias Hidrográficas", municipio: "Sena Madureira", anoInicio: 2023, areaHa: 45000, creditosGerados: 900000, creditosVendidos: 600000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 850000, secretaria: "SEMA", orcamento: 5200000 },
  { id: 6, nome: "Agricultura de Baixo Carbono", municipio: "Feijó", anoInicio: 2024, areaHa: 32000, creditosGerados: 640000, creditosVendidos: 420000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 580000, secretaria: "SEAGRI", orcamento: 1900000 },
  { id: 7, nome: "Capacitação de Agentes Ambientais", municipio: "Brasiléia", anoInicio: 2023, areaHa: 8000, creditosGerados: 160000, creditosVendidos: 95000, status: "Ativo", eixo: eixos[5], emissaoEvitada: 145000, secretaria: "EMATER", orcamento: 1100000 },
  { id: 8, nome: "Energia Solar em Prédios Públicos", municipio: "Tarauacá", anoInicio: 2025, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Implementação", eixo: eixos[1], emissaoEvitada: 4200, secretaria: "SEICT", orcamento: 1700000 },
  { id: 9, nome: "Regularização Fundiária Sustentável", municipio: "Epitaciolândia", anoInicio: 2024, areaHa: 12000, creditosGerados: 240000, creditosVendidos: 150000, status: "Ativo", eixo: eixos[3], emissaoEvitada: 220000, secretaria: "JUCEAC", orcamento: 600000 },
  { id: 10, nome: "Turismo Ecológico", municipio: "Porto Walter", anoInicio: 2023, areaHa: 18000, creditosGerados: 360000, creditosVendidos: 220000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 330000, secretaria: "SETE", orcamento: 900000 },
  { id: 11, nome: "Incentivo à Economia Circular", municipio: "Assis Brasil", anoInicio: 2024, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[0], emissaoEvitada: 2800, secretaria: "ANAC", orcamento: 750000 },
  { id: 12, nome: "Saneamento Básico Rural", municipio: "Manoel Urbano", anoInicio: 2025, areaHa: 25000, creditosGerados: 500000, creditosVendidos: 320000, status: "Implementação", eixo: eixos[3], emissaoEvitada: 460000, secretaria: "SEOP", orcamento: 2800000 },
  { id: 13, nome: "Controle de Queimadas", municipio: "Bujari", anoInicio: 2023, areaHa: 38000, creditosGerados: 760000, creditosVendidos: 480000, status: "Ativo", eixo: eixos[6], emissaoEvitada: 700000, secretaria: "SEPLAN", orcamento: 2100000 },
  { id: 14, nome: "Transporte Sustentável", municipio: "Capixaba", anoInicio: 2024, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[1], emissaoEvitada: 6500, secretaria: "DERACRE", orcamento: 3200000 },
  { id: 15, nome: "Proteção de Áreas Úmidas", municipio: "Plácido de Castro", anoInicio: 2023, areaHa: 10000, creditosGerados: 200000, creditosVendidos: 120000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 185000, secretaria: "AGEAC", orcamento: 500000 },
  { id: 16, nome: "Recuperação de Nascentes", municipio: "Rio Branco", anoInicio: 2025, areaHa: 22000, creditosGerados: 440000, creditosVendidos: 280000, status: "Implementação", eixo: eixos[2], emissaoEvitada: 400000, secretaria: "SANEACRE", orcamento: 1800000 },
  { id: 17, nome: "Gestão Territorial Indígena", municipio: "Cruzeiro do Sul", anoInicio: 2024, areaHa: 30000, creditosGerados: 600000, creditosVendidos: 380000, status: "Ativo", eixo: eixos[3], emissaoEvitada: 550000, secretaria: "SEHURB", orcamento: 1400000 },
  { id: 18, nome: "Educação Ambiental nas Escolas", municipio: "Xapuri", anoInicio: 2023, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[5], emissaoEvitada: 1800, secretaria: "SEASDH", orcamento: 1600000 },
  { id: 19, nome: "Reflorestamento de Áreas Degradadas", municipio: "Mâncio Lima", anoInicio: 2026, areaHa: 55000, creditosGerados: 1100000, creditosVendidos: 720000, status: "Implementação", eixo: eixos[0], emissaoEvitada: 1020000, secretaria: "SEE", orcamento: 4200000 },
  { id: 20, nome: "Manejo Florestal Comunitário", municipio: "Sena Madureira", anoInicio: 2024, areaHa: 28000, creditosGerados: 560000, creditosVendidos: 350000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 510000, secretaria: "SEPI", orcamento: 950000 },
  { id: 21, nome: "Monitoramento Ambiental", municipio: "Feijó", anoInicio: 2023, areaHa: 20000, creditosGerados: 400000, creditosVendidos: 250000, status: "Ativo", eixo: eixos[4], emissaoEvitada: 365000, secretaria: "ITERACRE", orcamento: 1300000 },
  { id: 22, nome: "Eficiência Energética Pública", municipio: "Brasiléia", anoInicio: 2025, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[4], emissaoEvitada: 2100, secretaria: "CGE", orcamento: 700000 }
];

// Ajusta orçamentos com base nos dados reais do QDD cruzados com FUNÇÕES
const realPorSecretaria = orcamentoReal.orcamento_por_secretaria;

const dummyTotalPorSecretaria = projetosBase.reduce((acc, p) => {
  acc[p.secretaria] = (acc[p.secretaria] || 0) + p.orcamento;
  return acc;
}, {});

const projetosFixos = projetosBase.map(p => {
  const real = realPorSecretaria[p.secretaria];
  if (real === undefined) return p;
  const dummyTotal = dummyTotalPorSecretaria[p.secretaria];
  if (dummyTotal > 0) {
    return { ...p, orcamento: Math.round((p.orcamento / dummyTotal) * real) };
  }
  return { ...p, orcamento: real };
});

const dadosExemplo = {
  projetos: projetosFixos,
  evolucaoAnual: [
    { ano: 2025, gastoExclusivo: 0, gastoNaoExclusivo: 0, creditosGerados: 0, creditosVendidos: 0, emissaoEvitada: 0 },
    { ano: 2026, gastoExclusivo: orcamentoReal.gasto_exclusivo || 0, gastoNaoExclusivo: orcamentoReal.gasto_nao_exclusivo || 0, creditosGerados: 12800000, creditosVendidos: 8900000, emissaoEvitada: 12000000 }
  ],
  orgaos: Object.entries(orcamentoReal.distribuicao_por_orgao || {}).map(([nome, valores]) => {
    const detalhesEixo = orcamentoPorOrgaoEixo[nome]?.eixos || {};
    return {
      id: nome,
      nome,
      exclusivo: valores['Exclusivo'] || 0,
      naoExclusivo: valores['Não Exclusivo'] || 0,
      total: valores['Total'] || 0,
      status: 'Ativo',
      eixos: eixosPorOrgao[nome] || ['Governança Ambiental e Transparência'],
      valoresPorEixo: detalhesEixo,
      anoInicio: 2026,
    };
  })
};

const DataContext = createContext();

export function DataProvider({ children }) {
  const [dados, setDados] = useState(dadosExemplo);
  const [filtros, setFiltros] = useState({ secretaria: [], status: '', eixo: [], anoInicio: [] });

  const atualizarDados = useCallback((fn) => setDados(fn), []);
  const atualizarFiltros = useCallback((f) => setFiltros(prev => ({ ...prev, ...f })), []);

  const projetosFiltrados = useMemo(() =>
    dados.projetos.filter(p =>
      (!filtros.secretaria?.length || filtros.secretaria.includes(p.secretaria)) &&
      (!filtros.status || p.status === filtros.status) &&
      (!filtros.eixo?.length || p.eixo === filtros.eixo) &&
      (!filtros.anoInicio?.length || filtros.anoInicio.includes(String(p.anoInicio)))
    ), [dados.projetos, filtros]);

  const orgaosFiltrados = useMemo(() =>
    dados.orgaos.filter(o =>
      (!filtros.secretaria?.length || filtros.secretaria.includes(o.nome)) &&
      (!filtros.eixo?.length || o.eixos.some(e => filtros.eixo.includes(e)))
    ), [dados.orgaos, filtros]);

  const totais = useMemo(() => {
    const totalProjetos = projetosFiltrados.length;
    const totalCreditosGerados = projetosFiltrados.reduce((a, p) => a + p.creditosGerados, 0);
    const totalCreditosVendidos = projetosFiltrados.reduce((a, p) => a + p.creditosVendidos, 0);
    const totalArea = projetosFiltrados.reduce((a, p) => a + p.areaHa, 0);
    const totalEmissaoEvitada = projetosFiltrados.reduce((a, p) => a + p.emissaoEvitada, 0);
    const totalOrcamento = projetosFiltrados.reduce((a, p) => a + (p.orcamento || 0), 0);
    const totalOrcamentoAplicado = projetosFiltrados.filter(p => p.status === 'Ativo').reduce((a, p) => a + (p.orcamento || 0), 0);
    return { totalProjetos, totalCreditosGerados, totalCreditosVendidos, totalArea, totalEmissaoEvitada, totalOrcamento, totalOrcamentoAplicado };
  }, [projetosFiltrados]);

  const totalOrcamentoClimatico = orcamentoReal.total_orcamento_climatico || 0;
  const gastoExclusivo = orcamentoReal.gasto_exclusivo || 0;
  const gastoNaoExclusivo = orcamentoReal.gasto_nao_exclusivo || 0;
  const orcamentoRealPorSecretaria = orcamentoReal.orcamento_por_secretaria || {};
  const detalhesPorSecretaria = orcamentoReal.detalhes_por_secretaria || [];

  const value = useMemo(() => ({
    dados,
    projetosFiltrados,
    orgaosFiltrados,
    filtros,
    atualizarDados,
    atualizarFiltros,
    ...totais,
    totalOrcamentoClimatico,
    gastoExclusivo,
    gastoNaoExclusivo,
    orcamentoRealPorSecretaria,
    detalhesPorSecretaria
  }), [dados, projetosFiltrados, orgaosFiltrados, filtros, atualizarDados, atualizarFiltros, totais]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData fora do DataProvider');
  return ctx;
}
