import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, LabelList
} from 'recharts';
import { useData } from '../context/DataContext';
import orcamentoReal from '../data/orcamento_real.json';
import AnimatedSection, { useAnimateOnScroll } from './AnimatedSection';

const tooltipStyle = {
  backgroundColor: '#052e16',
  border: '1px solid #1a4530',
  borderRadius: 8,
  color: '#fff',
  fontSize: 13
};

const ANIM_DUR = 1200;
const COR_EXCLUSIVO = '#4ade80';
const COR_NAO_EXCLUSIVO = '#1e3a5f';

const NOMES_SECRETARIAS = {
  SEAD: 'Secretaria de Estado de Administração',
  SEFAZ: 'Secretaria de Estado da Fazenda',
  CDSA: 'Companhia de Desenvolvimento e Serviços Ambientais',
  IMC: 'Instituto de Mudanças Climáticas',
  SEMA: 'Secretaria de Estado de Meio Ambiente',
  SEAGRI: 'Secretaria de Estado de Agricultura',
  EMATER: 'Empresa de Assistência Técnica e Extensão Rural do Acre',
  SEICT: 'Secretaria de Estado de Indústria, Ciência e Tecnologia',
  JUCEAC: 'Junta Comercial do Estado do Acre',
  SETE: 'Secretaria de Estado de Turismo',
  ANAC: 'Agência de Negócios do Acre',
  SEOP: 'Secretaria de Estado de Obras Públicas',
  SEPLAN: 'Secretaria de Estado de Planejamento',
  DERACRE: 'Departamento de Estradas e Rodagens do Acre',
  AGEAC: 'Agência Reguladora dos Serviços Públicos do Estado do Acre',
  SANEACRE: 'Serviço de Água e Esgoto do Acre',
  SEHURB: 'Secretaria de Estado de Habitação e Urbanismo',
  SEASDH: 'Secretaria de Estado de Assistência Social e Direitos Humanos',
  SEE: 'Secretaria de Estado de Educação',
  SEPI: 'Secretaria de Estado Extraordinária dos Povos Indígenas',
  ITERACRE: 'Instituto de Terras do Acre',
  CGE: 'Controladoria-Geral do Estado',
  CAGEACRE: 'Companhia de Armazéns e Entrepostos do Acre',
  CBMAC: 'Corpo de Bombeiros Militar do Acre',
  FEM: 'Fundação de Cultura e Comunicação Elias Mansour',
  FAPAC: 'Fundação de Amparo à Pesquisa do Estado do Acre',
  FUNTAC: 'Fundação de Tecnologia do Estado do Acre',
  IAPEN: 'Instituto de Administração Penitenciária',
  IDAF: 'Instituto de Defesa Agropecuária e Florestal',
  IEPTEC: 'Instituto Estadual de Educação Profissional e Tecnológica',
  IMAC: 'Instituto de Meio Ambiente do Acre',
  ISE: 'Instituto Sócio-Educativo do Acre',
  PCAC: 'Polícia Civil do Estado do Acre',
  PMAC: 'Polícia Militar do Estado do Acre',
  PGE: 'Procuradoria Geral do Estado',
  SEEL: 'Secretaria Extraordinária de Esporte e Lazer',
  SEGOV: 'Secretaria de Estado de Governo',
  SEJUSP: 'Secretaria de Estado da Justiça e Segurança Pública',
  SEMULHER: 'Secretaria de Estado da Mulher',
  TCE: 'Tribunal de Contas do Estado',
  TJAC: 'Tribunal de Justiça do Estado do Acre',
  SESACRE: 'Secretaria de Estado de Saúde do Acre',
  MPAC: 'Ministério Público do Estado do Acre',
  DPE: 'Defensoria Pública do Estado do Acre',
  'FUNDO DE DESENVOLVIMENTO SUSTENTÁVEL': 'Fundo de Desenvolvimento Sustentável',
  'OUTROS': 'Outros Órgãos'
};

const EIXOS_DATA = [
  { numero: '1', label: 'Eixo I – Desenvolvimento Sustentável e Bioeconomia', eixo: 'Desenvolvimento Sustentável e Bioeconomia', orcamento: 126730014.39 },
  { numero: '2', label: 'Eixo II – Mitigação das Mudanças Climáticas', eixo: 'Mitigação das Mudanças Climáticas', orcamento: 373173673.70 },
  { numero: '4', label: 'Eixo IV – Justiça Climática e Inclusão Social', eixo: 'Justiça Climática e Inclusão Social', orcamento: 28111335.52 },
  { numero: '5', label: 'Eixo V – Governança Ambiental e Transparência', eixo: 'Governança Ambiental e Transparência', orcamento: 674000.00 },
  { numero: '6', label: 'Eixo VI – Educação Ambiental e Inovação', eixo: 'Educação Ambiental e Inovação', orcamento: 2878600.00 },
  { numero: '7', label: 'Eixo VII – Gestão de Riscos e Proteção Civil', eixo: 'Gestão de Riscos e Proteção Civil', orcamento: 18346667.00 }
];

const SecretariasTooltip = React.memo(({ active, payload, fmt }) => {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.nome}</div>
      <div style={{ color: '#4ade80' }}>Exclusivo: {fmt(d.exclusivo || 0)}</div>
      <div style={{ color: '#38bdf8' }}>Não Exclusivo: {fmt(d.naoExclusivo || 0)}</div>
      <div style={{ marginTop: 4, borderTop: '1px solid #1a4530', paddingTop: 4, fontWeight: 600 }}>Total: {fmt(d.total || d.orcamento || 0)}</div>
    </div>
  );
});

const EixoTooltip = React.memo(({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const data = EIXOS_DATA.find(d => d.label === label);
  const valor = data?.orcamento || payload[0]?.value || 0;
  const valorFmt = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return (
    <div style={tooltipStyle}>
      <div style={{ fontWeight: 600 }}>{valorFmt}</div>
    </div>
  );
});

const ExecucaoTooltip = React.memo(({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{payload[0].payload.nome}</div>
      <div>{payload[0].value.toFixed(1)}%</div>
    </div>
  );
});

/* ---------- GRÁFICO 1: Evolução Anual (Linha) ---------- */
const EvolucaoChart = React.memo(function EvolucaoChart({ data, fmt }) {
  const { ref, isVisible, animKey } = useAnimateOnScroll(0.05, true);
  return (
    <div ref={ref} style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart key={animKey} data={data} margin={{ top: 10, right: 60, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis dataKey="ano" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-primary)', fontSize: 12 }} />
          <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-primary)', fontSize: 12 }} tickFormatter={fmt} width={80} />
          <Tooltip formatter={(v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ color: 'var(--text-secondary)' }} />
          <Line
            type="monotone"
            dataKey="gastoExclusivo"
            name="Gasto Exclusivo"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#4ade80' }}
            isAnimationActive={isVisible}
            animationDuration={ANIM_DUR}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="gastoNaoExclusivo"
            name="Gasto Não Exclusivo"
            stroke={COR_NAO_EXCLUSIVO}
            strokeWidth={3}
            dot={{ fill: COR_NAO_EXCLUSIVO, strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#2d4a6f' }}
            isAnimationActive={isVisible}
            animationDuration={ANIM_DUR}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

/* ---------- GRÁFICO 2: Composição (Pizza) ---------- */
const ComposicaoChart = React.memo(function ComposicaoChart({ data }) {
  const { ref, isVisible, animKey } = useAnimateOnScroll(0.05, true);
  return (
    <div ref={ref} style={{ width: '100%', height: 240, display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart key={animKey}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="valor"
            isAnimationActive={isVisible}
            animationDuration={ANIM_DUR}
            animationEasing="ease-out"
            cornerRadius={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.cor} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<ExecucaoTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

const ComposicaoTooltipBar = React.memo(({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={tooltipStyle}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.nome}</div>
      <div>{d.valor.toFixed(1)}%</div>
    </div>
  );
});

/* ---------- GRÁFICO 2B: Composição (Barras horizontais) ---------- */
const ComposicaoBarrasChart = React.memo(function ComposicaoBarrasChart({ data }) {
  const { ref, isVisible, animKey } = useAnimateOnScroll(0.05, true);
  return (
    <div ref={ref} style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          key={animKey}
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
          <XAxis
            type="number"
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-primary)', fontSize: 12 }}
            tickFormatter={(v) => `${v.toFixed(0)}%`}
            domain={[0, 100]}
          />
          <YAxis
            type="category"
            dataKey="nome"
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-primary)', fontSize: 12 }}
            width={210}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<ComposicaoTooltipBar />} cursor={{ fill: 'rgba(34, 197, 94, 0.08)' }} />
          <Bar
            dataKey="valor"
            radius={[0, 6, 6, 0]}
            isAnimationActive={isVisible}
            animationDuration={ANIM_DUR}
            animationEasing="ease-out"
            maxBarSize={40}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.cor} stroke="none" />
            ))}
            <LabelList dataKey="valor" position="right" formatter={(v) => `${v.toFixed(1)}%`} fill="var(--text-secondary)" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

/* ---------- GRÁFICO 3: Secretarias (Barras verticais com scroll) ---------- */
const SecretariasChart = React.memo(function SecretariasChart({ data }) {
  const { ref, isVisible, animKey } = useAnimateOnScroll(0.05, true);
  const barHeight = 32;
  const gap = 8;
  const svgHeight = data.length * barHeight + (data.length - 1) * gap + 80;

  const fmtValor = (v) => {
    if (v >= 1_000_000) {
      return (v / 1_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' MI';
    }
    if (v >= 1_000) {
      return (v / 1_000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mil';
    }
    return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div
      style={{
        width: '100%',
        height: 480,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: 10,
        paddingBottom: 30
      }}
      className="secretarias-scroll-container"
      ref={ref}
    >
      <style>{`
        .secretarias-scroll-container::-webkit-scrollbar { width: 8px; }
        .secretarias-scroll-container::-webkit-scrollbar-track { background: rgba(5, 46, 22, 0.3); border-radius: 4px; }
        .secretarias-scroll-container::-webkit-scrollbar-thumb { background: #22c55e; border-radius: 4px; }
        .secretarias-scroll-container::-webkit-scrollbar-thumb:hover { background: #4ade80; }
      `}</style>
      <ResponsiveContainer width="100%" height={svgHeight}>
        <BarChart key={animKey}
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 50, left: -30, bottom: 40 }}
          barCategoryGap={gap}
          barGap={2}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
          <XAxis type="number" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-primary)', fontSize: 11 }} tickFormatter={fmtValor} />
          <YAxis
            type="category"
            dataKey="sigla"
            stroke="var(--text-muted)"
            tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
            width={185}
            tickLine={false}
          />
          <Tooltip
            content={<SecretariasTooltip fmt={fmtValor} />}
            cursor={{ fill: 'rgba(34, 197, 94, 0.08)' }}
          />
          <Bar
            dataKey="exclusivo"
            stackId="a"
            fill={COR_EXCLUSIVO}
            radius={[0, 0, 0, 0]}
            isAnimationActive={isVisible}
            animationDuration={ANIM_DUR}
            animationEasing="ease-out"
            maxBarSize={barHeight}
            minPointSize={3}
          />
          <Bar
            dataKey="naoExclusivo"
            stackId="a"
            fill={COR_NAO_EXCLUSIVO}
            radius={[0, 6, 6, 0]}
            isAnimationActive={isVisible}
            animationDuration={ANIM_DUR}
            animationEasing="ease-out"
            maxBarSize={barHeight}
            minPointSize={3}
          >
            <LabelList dataKey="total" position="right" formatter={fmtValor} fill="var(--text-secondary)" fontSize={10} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

/* ---------- GRÁFICO 4: Eixos (Barras horizontais) ---------- */
const CustomXAxisTick = React.memo(function CustomXAxisTick({ x, y, payload }) {
  const text = payload.value;
  const words = text.split(' ');
  const lines = [];
  let current = '';
  words.forEach((w) => {
    if ((current + w).length > 14) {
      lines.push(current.trim());
      current = w + ' ';
    } else {
      current += w + ' ';
    }
  });
  lines.push(current.trim());
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, i) => (
        <text key={i} x={0} y={i * 11} dy={10} textAnchor="middle" fill="var(--text-secondary)" fontSize={9}>
          {line}
        </text>
      ))}
    </g>
  );
});

const EixosChart = React.memo(function EixosChart({ data, fmt }) {
  const { ref, isVisible, animKey } = useAnimateOnScroll(0.05, true);
  return (
    <div ref={ref} style={{ width: '100%', height: 460 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart key={animKey} data={data} barCategoryGap={22} margin={{ top: 40, right: 20, left: 10, bottom: 80 }}>
          <XAxis
            dataKey="label"
            stroke="var(--text-secondary)"
            tick={<CustomXAxisTick />}
            interval={0}
            height={70}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<EixoTooltip />} cursor={{ fill: 'rgba(34, 197, 94, 0.08)' }} />
          <Bar
            dataKey="orcamento"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
            isAnimationActive={isVisible}
            animationDuration={ANIM_DUR}
            animationEasing="ease-out"
            minPointSize={4}
          >
            <LabelList dataKey="orcamento" position="top" formatter={fmt} fill="var(--text-secondary)" fontSize={11} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

/* ---------- SEÇÃO PRINCIPAL ---------- */
function ChartsSection() {
  const { projetosFiltrados, gastoExclusivo, gastoNaoExclusivo } = useData();

  const fmt = useMemo(() => (v) => {
    if (v >= 1_000_000_000) return (v / 1_000_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' bi';
    if (v >= 1_000_000) return (v / 1_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' MI';
    if (v >= 1_000) return (v / 1_000).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' mil';
    return v.toLocaleString('pt-BR');
  }, []);

  const limparNomeOrgao = (nome) => {
    const idxAbre = nome.indexOf('(');
    const idxFecha = nome.lastIndexOf(')');
    if (idxAbre !== -1 && idxFecha !== -1 && idxFecha > idxAbre) {
      const dentro = nome.slice(idxAbre + 1, idxFecha).trim();
      if (dentro.toLowerCase().startsWith('fundo')) {
        return nome; // mantém nome completo
      }
      return nome.slice(0, idxAbre).trim();
    }
    return nome;
  };

  const dadosSecretarias = useMemo(() => {
    const todos = Object.entries(orcamentoReal.distribuicao_por_orgao || orcamentoReal.orcamento_por_orgao || {})
      .map(([nome, valores]) => {
        let sigla = limparNomeOrgao(nome);
        if (sigla.length > 20) {
          sigla = sigla.substring(0, 18) + '...';
        }
        const exclusivo = typeof valores === 'object' ? (valores.Exclusivo || 0) : 0;
        const naoExclusivo = typeof valores === 'object' ? (valores['Não Exclusivo'] || 0) : 0;
        const total = typeof valores === 'object' ? (valores.Total || exclusivo + naoExclusivo) : (valores || 0);
        return {
          sigla,
          nome,
          exclusivo,
          naoExclusivo,
          total
        };
      })
      .filter(d => d.total > 0)
      .sort((a, b) => b.total - a.total);

    return todos;
  }, []);

  const evolucaoOrcamento = useMemo(() => {
    return [
      { ano: 2025, gastoExclusivo: 0, gastoNaoExclusivo: 0 },
      { ano: 2026, gastoExclusivo: gastoExclusivo || 0, gastoNaoExclusivo: gastoNaoExclusivo || 0 }
    ];
  }, [gastoExclusivo, gastoNaoExclusivo]);

  const dadosEixo = useMemo(() =>
    [...EIXOS_DATA].sort((a, b) => b.orcamento - a.orcamento),
  []);

  const execucaoData = useMemo(() => {
    const total = (gastoExclusivo || 0) + (gastoNaoExclusivo || 0);
    if (total === 0) return [
      { nome: 'Gasto Exclusivo', valor: 0, valorAbsoluto: 0, cor: COR_EXCLUSIVO },
      { nome: 'Gasto Não Exclusivo', valor: 0, valorAbsoluto: 0, cor: COR_NAO_EXCLUSIVO }
    ];
    const pctEx = ((gastoExclusivo / total) * 100);
    const pctNex = ((gastoNaoExclusivo / total) * 100);
    return [
      { nome: 'Gasto Exclusivo', valor: pctEx, valorAbsoluto: gastoExclusivo || 0, cor: COR_EXCLUSIVO },
      { nome: 'Gasto Não Exclusivo', valor: pctNex, valorAbsoluto: gastoNaoExclusivo || 0, cor: COR_NAO_EXCLUSIVO }
    ];
  }, [gastoExclusivo, gastoNaoExclusivo]);

  return (
    <div className="charts-grid">
      {/* Gráfico 1: Eixos */}
      <AnimatedSection className="chart-box chart-full" delay={0} duration={1400} once>
        <div className="section-title">Orçamento por Eixo</div>
        <EixosChart data={dadosEixo} fmt={fmt} />
      </AnimatedSection>

      {/* Gráfico 2: Secretarias */}
      <AnimatedSection className="chart-box" delay={300} duration={1400} once>
        <div className="section-title">Orçamento por Secretaria</div>
        <SecretariasChart data={dadosSecretarias} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 14, height: 14, backgroundColor: COR_EXCLUSIVO, borderRadius: 3 }}></span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500 }}>Exclusivo</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 14, height: 14, backgroundColor: COR_NAO_EXCLUSIVO, borderRadius: 3 }}></span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500 }}>Não Exclusivo</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Gráfico 3: Composição (Pizza) */}
      <AnimatedSection className="chart-box" delay={450} duration={1400} once style={{ alignSelf: 'center' }}>
        <div className="section-title">Composição do Orçamento Climático</div>
        <ComposicaoChart data={execucaoData} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 16, marginTop: 4, flexWrap: 'wrap' }}>
          {execucaoData.map(item => (
            <div key={item.nome} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, maxWidth: 160 }}>
              <span style={{ display: 'inline-block', width: 11, height: 11, backgroundColor: item.cor, borderRadius: 3, flexShrink: 0, marginTop: 3 }}></span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500, lineHeight: 1.35, wordBreak: 'break-word' }}>{item.nome}: {item.valorAbsoluto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ({item.valor.toFixed(1)}%)</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

export default React.memo(ChartsSection);
