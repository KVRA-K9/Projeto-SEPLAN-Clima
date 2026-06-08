import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import orcamentoReal from '../data/orcamento_real.json';
import orcamentoPorOrgaoEixo from '../data/orcamento_por_orgao_eixo.json';
import aplicacoesPorOrgaoEixo from '../data/aplicacoes_por_orgao_eixo.json';

const eixos = [
  'Desenvolvimento Sustentável e Bioeconomia',
  'Mitigação das Mudanças Climáticas',
  'Adaptação às Mudanças Climáticas',
  'Justiça Climática e Inclusão Social',
  'Governança Ambiental e Transparência',
  'Educação Ambiental e Inovação Climática',
  'Resposta Climática Emergencial e Proteção Civil'
];

const eixosPorOrgao = {
  '445/001 - SEGOV': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '448/001 - CGE': ['Eixo V – Governança Ambiental e Transparência'],
  '451/001 - PCAC': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '452/001 - DEFESA CIVIL': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo VII – Resposta Climática Emergencial e Proteção Civil'],
  '510/001 - PGE': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '608/001 - PMAC': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '609/001 - CBMAC': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo VII – Resposta Climática Emergencial e Proteção Civil'],
  '609/632 - CBMAC (Fundo Esp. do Corpo de Bombeiros Militar do Estado do Acre - FUNESBOM)': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '713/001 - SEPLAN': ['Eixo II – Mitigação das Mudanças Climáticas'],
  '714/001 - SEAD': ['Eixo II – Mitigação das Mudanças Climáticas'],
  '714/211 - ACREPREVIDÊNCIA': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '715/001 - SEFAZ': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  '715/199 - SEFAZ': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  '715/199 - SEFAZ (Departamento do Tesouro Estadual)': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '715/205 - JUCEAC': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  '715/210 - AGEAC': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  '715/501 - COHAB': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '715/512 - CDSA': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  '717/001 - SEE': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social'],
  '717/212 - IEPTEC': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '717/303 - FEM': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '717/628 - FEM (Fundo Estadual de Cultura  - Funcultura)': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '718/001 - SEEL': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '719/001 - SEJUSP': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  '719/209 - IAPEN': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '719/213 - ISE': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '719/216 - PROCON': ['Eixo IV – Justiça Climática e Inclusão Social'],
  '719/626 - SEJUSP (Fundo Penitenciário do Estado do Acre)': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '719/637 - SEJUSP (Fundo Est. de Segurança - FUNDESEG)': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  '720/001 - SEMA': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia', 'Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas', 'Eixo V – Governança Ambiental e Transparência'],
  '720/202 - IMAC': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas', 'Eixo VI – Educação Ambiental e Inovação Climática'],
  '720/215 - IMC': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo V – Governança Ambiental e Transparência'],
  '720/605 - SEMA (Fundo Est. de Comando e Controle Ambiental)': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo VI – Educação Ambiental e Inovação Climática'],
  '720/622 - SEMA (Fundo Est. de Meio Ambiente e Florestas)': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia', 'Eixo II – Mitigação das Mudanças Climáticas'],
  '721/607 - SESACRE (Fundo Estadual de Saúde - FUNDES)': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '722/001 - SEPI': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social'],
  '744/001 - SEHURB': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social'],
  '744/201 - DERACRE': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  '744/203 - SANEACRE': ['Eixo II – Mitigação das Mudanças Climáticas', 'Eixo III – Adaptação às Mudanças Climáticas'],
  '744/206 - ITERACRE': ['Eixo IV – Justiça Climática e Inclusão Social'],
  '744/619 - SEHURB (Fundo Est. Habitação - FEH)': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '744/643 - SEHURB (Fundo Est. Esp. Recup. Bacia Igarapé S. Francisco)': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '753/001 - SEAGRI': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia', 'Eixo III – Adaptação às Mudanças Climáticas'],
  '753/207 - IDAF': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '753/401 - CAGEACRE': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  '753/402 - EMATER': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  '753/610 - SEAGRI (Fundo Agropecuário - FUNAGRO)': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  '754/001 - SEOP': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '759/001 - SETE': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '760/001 - SEASDH': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social'],
  '760/608 - SEASDH (Fundo de Assistência Social - FEAS)': ['Eixo IV – Justiça Climática e Inclusão Social'],
  '760/640 - SEADH (Fundo Estadual de Defesa do Consumidor - FEDC)': ['Eixo IV – Justiça Climática e Inclusão Social'],
  '760/640 - SEASDH (Fundo Est. Def. Consumidor  - DEFC)': ['Eixo III – Adaptação às Mudanças Climáticas'],
  '761/001 - SEICT': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  '761/301 - FUNTAC': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo VI – Educação Ambiental e Inovação Climática'],
  '761/309 - FAPAC': ['Eixo VI – Educação Ambiental e Inovação Climática'],
  '761/506 - ANAC': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia'],
  '761/615 - SEICT (Fundo de Desenvolvimento Sustentável - FDS)': ['Eixo I – Desenvolvimento Sustentável e Bioeconomia', 'Eixo VI – Educação Ambiental e Inovação Climática'],
  '762/001 - SEMULHER': ['Eixo III – Adaptação às Mudanças Climáticas', 'Eixo IV – Justiça Climática e Inclusão Social']
};

const secretarias = [
  '445/001 - SEGOV', '448/001 - CGE', '451/001 - PCAC', '452/001 - DEFESA CIVIL',
  '510/001 - PGE', '608/001 - PMAC', '609/001 - CBMAC',
  '609/632 - CBMAC (Fundo Esp. do Corpo de Bombeiros Militar do Estado do Acre - FUNESBOM)',
  '713/001 - SEPLAN', '714/001 - SEAD', '714/211 - ACREPREVIDÊNCIA',
  '715/001 - SEFAZ', '715/199 - SEFAZ', '715/199 - SEFAZ (Departamento do Tesouro Estadual)', '715/205 - JUCEAC', '715/210 - AGEAC',
  '715/501 - COHAB', '715/512 - CDSA', '717/001 - SEE', '717/212 - IEPTEC',
  '717/303 - FEM', '717/628 - FEM (Fundo Estadual de Cultura  - Funcultura)',
  '718/001 - SEEL', '719/001 - SEJUSP', '719/209 - IAPEN', '719/213 - ISE',
  '719/216 - PROCON', '719/626 - SEJUSP (Fundo Penitenciário do Estado do Acre)',
  '719/637 - SEJUSP (Fundo Est. de Segurança - FUNDESEG)', '720/001 - SEMA',
  '720/202 - IMAC', '720/215 - IMC', '720/605 - SEMA (Fundo Est. de Comando e Controle Ambiental)',
  '720/622 - SEMA (Fundo Est. de Meio Ambiente e Florestas)',
  '721/607 - SESACRE (Fundo Estadual de Saúde - FUNDES)', '722/001 - SEPI',
  '744/001 - SEHURB', '744/201 - DERACRE', '744/203 - SANEACRE',
  '744/206 - ITERACRE', '744/619 - SEHURB (Fundo Est. Habitação - FEH)',
  '744/643 - SEHURB (Fundo Est. Esp. Recup. Bacia Igarapé S. Francisco)',
  '753/001 - SEAGRI', '753/207 - IDAF', '753/401 - CAGEACRE',
  '753/402 - EMATER', '753/610 - SEAGRI (Fundo Agropecuário - FUNAGRO)',
  '754/001 - SEOP', '759/001 - SETE', '760/001 - SEASDH',
  '760/608 - SEASDH (Fundo de Assistência Social - FEAS)',
  '760/640 - SEADH (Fundo Estadual de Defesa do Consumidor - FEDC)',
  '760/640 - SEASDH (Fundo Est. Def. Consumidor  - DEFC)', '761/001 - SEICT',
  '761/301 - FUNTAC', '761/309 - FAPAC', '761/506 - ANAC',
  '761/615 - SEICT (Fundo de Desenvolvimento Sustentável - FDS)',
  '762/001 - SEMULHER'
];

const projetosBase = [
  { id: 1, nome: "Gestão de Resíduos Sólidos", municipio: "Rio Branco", anoInicio: 2023, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[4], emissaoEvitada: 1200, secretaria: "714/001 - SEAD", orcamento: 1200000 },
  { id: 2, nome: "Eficiência Energética Pública", municipio: "Cruzeiro do Sul", anoInicio: 2024, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[1], emissaoEvitada: 3500, secretaria: "715/001 - SEFAZ", orcamento: 2500000 },
  { id: 3, nome: "Monitoramento Ambiental", municipio: "Xapuri", anoInicio: 2023, areaHa: 15000, creditosGerados: 300000, creditosVendidos: 180000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 280000, secretaria: "715/512 - CDSA", orcamento: 800000 },
  { id: 4, nome: "Pesquisa Climática", municipio: "Mâncio Lima", anoInicio: 2025, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Implementação", eixo: eixos[5], emissaoEvitada: 5000, secretaria: "720/215 - IMC", orcamento: 3500000 },
  { id: 5, nome: "Conservação de Bacias Hidrográficas", municipio: "Sena Madureira", anoInicio: 2023, areaHa: 45000, creditosGerados: 900000, creditosVendidos: 600000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 850000, secretaria: "720/001 - SEMA", orcamento: 5200000 },
  { id: 6, nome: "Agricultura de Baixo Carbono", municipio: "Feijó", anoInicio: 2024, areaHa: 32000, creditosGerados: 640000, creditosVendidos: 420000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 580000, secretaria: "753/001 - SEAGRI", orcamento: 1900000 },
  { id: 7, nome: "Capacitação de Agentes Ambientais", municipio: "Brasiléia", anoInicio: 2023, areaHa: 8000, creditosGerados: 160000, creditosVendidos: 95000, status: "Ativo", eixo: eixos[5], emissaoEvitada: 145000, secretaria: "753/402 - EMATER", orcamento: 1100000 },
  { id: 8, nome: "Energia Solar em Prédios Públicos", municipio: "Tarauacá", anoInicio: 2025, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Implementação", eixo: eixos[1], emissaoEvitada: 4200, secretaria: "761/001 - SEICT", orcamento: 1700000 },
  { id: 9, nome: "Regularização Fundiária Sustentável", municipio: "Epitaciolândia", anoInicio: 2024, areaHa: 12000, creditosGerados: 240000, creditosVendidos: 150000, status: "Ativo", eixo: eixos[3], emissaoEvitada: 220000, secretaria: "715/205 - JUCEAC", orcamento: 600000 },
  { id: 10, nome: "Turismo Ecológico", municipio: "Porto Walter", anoInicio: 2023, areaHa: 18000, creditosGerados: 360000, creditosVendidos: 220000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 330000, secretaria: "759/001 - SETE", orcamento: 900000 },
  { id: 11, nome: "Incentivo à Economia Circular", municipio: "Assis Brasil", anoInicio: 2024, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[0], emissaoEvitada: 2800, secretaria: "761/506 - ANAC", orcamento: 750000 },
  { id: 12, nome: "Saneamento Básico Rural", municipio: "Manoel Urbano", anoInicio: 2025, areaHa: 25000, creditosGerados: 500000, creditosVendidos: 320000, status: "Implementação", eixo: eixos[3], emissaoEvitada: 460000, secretaria: "754/001 - SEOP", orcamento: 2800000 },
  { id: 13, nome: "Controle de Queimadas", municipio: "Bujari", anoInicio: 2023, areaHa: 38000, creditosGerados: 760000, creditosVendidos: 480000, status: "Ativo", eixo: eixos[6], emissaoEvitada: 700000, secretaria: "713/001 - SEPLAN", orcamento: 2100000 },
  { id: 14, nome: "Transporte Sustentável", municipio: "Capixaba", anoInicio: 2024, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[1], emissaoEvitada: 6500, secretaria: "744/201 - DERACRE", orcamento: 3200000 },
  { id: 15, nome: "Proteção de Áreas Úmidas", municipio: "Plácido de Castro", anoInicio: 2023, areaHa: 10000, creditosGerados: 200000, creditosVendidos: 120000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 185000, secretaria: "715/210 - AGEAC", orcamento: 500000 },
  { id: 16, nome: "Recuperação de Nascentes", municipio: "Rio Branco", anoInicio: 2025, areaHa: 22000, creditosGerados: 440000, creditosVendidos: 280000, status: "Implementação", eixo: eixos[2], emissaoEvitada: 400000, secretaria: "744/203 - SANEACRE", orcamento: 1800000 },
  { id: 17, nome: "Gestão Territorial Indígena", municipio: "Cruzeiro do Sul", anoInicio: 2024, areaHa: 30000, creditosGerados: 600000, creditosVendidos: 380000, status: "Ativo", eixo: eixos[3], emissaoEvitada: 550000, secretaria: "744/001 - SEHURB", orcamento: 1400000 },
  { id: 18, nome: "Educação Ambiental nas Escolas", municipio: "Xapuri", anoInicio: 2023, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[5], emissaoEvitada: 1800, secretaria: "760/001 - SEASDH", orcamento: 1600000 },
  { id: 19, nome: "Reflorestamento de Áreas Degradadas", municipio: "Mâncio Lima", anoInicio: 2026, areaHa: 55000, creditosGerados: 1100000, creditosVendidos: 720000, status: "Implementação", eixo: eixos[0], emissaoEvitada: 1020000, secretaria: "717/001 - SEE", orcamento: 4200000 },
  { id: 20, nome: "Manejo Florestal Comunitário", municipio: "Sena Madureira", anoInicio: 2024, areaHa: 28000, creditosGerados: 560000, creditosVendidos: 350000, status: "Ativo", eixo: eixos[0], emissaoEvitada: 510000, secretaria: "722/001 - SEPI", orcamento: 950000 },
  { id: 21, nome: "Monitoramento Ambiental", municipio: "Feijó", anoInicio: 2023, areaHa: 20000, creditosGerados: 400000, creditosVendidos: 250000, status: "Ativo", eixo: eixos[4], emissaoEvitada: 365000, secretaria: "744/206 - ITERACRE", orcamento: 1300000 },
  { id: 22, nome: "Eficiência Energética Pública", municipio: "Brasiléia", anoInicio: 2025, areaHa: 0, creditosGerados: 0, creditosVendidos: 0, status: "Ativo", eixo: eixos[4], emissaoEvitada: 2100, secretaria: "448/001 - CGE", orcamento: 700000 }
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
  orgaos: Object.entries(orcamentoReal.distribuicao_por_orgao || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([nome, valores]) => {
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
    dados.orgaos
      .filter(o =>
        (!filtros.secretaria?.length || filtros.secretaria.includes(o.nome)) &&
        (!filtros.eixo?.length || o.eixos.some(e => filtros.eixo.includes(e)))
      )
      .sort((a, b) => a.nome.localeCompare(b.nome)), [dados.orgaos, filtros]);

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
  const numeroOrgaosAtuantes = orcamentoReal.numero_orgaos_atuantes || 0;
  const acoesExclusivas = orcamentoReal.acoes_exclusivas || 0;
  const acoesNaoExclusivas = orcamentoReal.acoes_nao_exclusivas || 0;
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
    numeroOrgaosAtuantes,
    acoesExclusivas,
    acoesNaoExclusivas,
    orcamentoRealPorSecretaria,
    detalhesPorSecretaria,
    aplicacoesPorOrgaoEixo
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
