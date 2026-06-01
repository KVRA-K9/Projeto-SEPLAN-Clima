import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useData } from '../context/DataContext';
import { ClipboardList, ChevronDown, ChevronUp, Download, FileSpreadsheet, FileText, Eraser } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const orgaosLista = [
  'AGEAC', 'ANAC', 'CAGEACRE', 'CBMAC', 'CDSA', 'CGE', 'COHAB',
  'COORD. EST. PROTEÇÃO E DEFESA CIVIL', 'DERACRE', 'DPE', 'EMATER',
  'FAPAC', 'FEM', 'FUNTAC', 'IAPEN', 'IDAF', 'IEPTEC', 'IMAC',
  'IMC', 'ISE', 'ITERACRE', 'JUICEAC', 'MPAC', 'PCAC', 'PGE',
  'PMAC', 'PROCON', 'SANEACRE', 'SEAD', 'SEADH', 'SEAGRI',
  'SEASDH', 'SEE', 'SEEL', 'SEFAZ', 'SEGOV', 'SEHURB', 'SEICT',
  'SEJUSP', 'SEMA', 'SEMULHER', 'SEOP', 'SEPI', 'SEPLAN',
  'SESACRE', 'SETE', 'TCE', 'TJAC'
];

const eixosLista = [
  'Eixo I – Desenvolvimento Sustentável e Bioeconomia',
  'Eixo II – Mitigação das Mudanças Climáticas',
  'Eixo III – Adaptação às Mudanças Climáticas',
  'Eixo IV – Justiça Climática e Inclusão Social',
  'Eixo V – Governança Ambiental e Transparência',
  'Eixo VI – Educação Ambiental e Inovação Climática',
  'Eixo VII – Resposta Climática Emergencial e Proteção Civil'
];

function MultiSelectDropdown({ value = [], onChange, options, placeholder }) {
  const [aberto, setAberto] = useState(false);
  const [search, setSearch] = useState('');
  const [posicao, setPosicao] = useState({ top: 0, left: 0, width: 0, maxHeight: 300, abrirParaCima: false });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const calcularPosicao = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const espacoAbaixo = window.innerHeight - rect.bottom - 16;
    const espacoAcima = rect.top - 16;
    const abrirParaCima = espacoAbaixo < 200 && espacoAcima > espacoAbaixo;
    const maxHeight = Math.min(320, abrirParaCima ? espacoAcima : espacoAbaixo);

    setPosicao({
      top: abrirParaCima ? rect.top - maxHeight - 4 : rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.max(maxHeight, 150),
      abrirParaCima
    });
  }, []);

  useEffect(() => {
    if (aberto) {
      calcularPosicao();
      const handleScroll = () => calcularPosicao();
      const handleResize = () => calcularPosicao();
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [aberto, calcularPosicao]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        triggerRef.current && !triggerRef.current.contains(event.target)
      ) {
        setAberto(false);
        setSearch('');
      }
    }
    if (aberto) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => searchRef.current?.focus(), 50);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [aberto]);

  const filteredOptions = search.trim()
    ? options.filter((opt) =>
        opt.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(
          search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        )
      )
    : options;

  const toggle = (val) => {
    const next = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange(next);
  };

  const limpar = () => onChange([]);

  const labelSelecionado = value.length
    ? value.length === 1
      ? options.find((o) => o.value === value[0])?.label || value[0]
      : `${value.length} selecionados`
    : placeholder;

  return (
    <>
      <div
        ref={triggerRef}
        className="filter-input"
        onClick={() => {
          if (!aberto) calcularPosicao();
          setAberto(!aberto);
        }}
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
          position: 'relative'
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {labelSelecionado}
        </span>
        <ChevronDown
          size={16}
          style={{
            transform: aberto ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
            flexShrink: 0,
            marginLeft: 8
          }}
        />
      </div>

      {aberto &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: posicao.top,
              left: posicao.left,
              width: posicao.width,
              maxHeight: posicao.maxHeight,
              overflowY: 'auto',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              zIndex: 2147483647,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
            }}
          >
            {/* Campo de pesquisa */}
            <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar..."
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-solid)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  outline: 'none'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div
              onClick={() => { limpar(); setSearch(''); }}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                color: value.length === 0 ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: value.length === 0 ? 600 : 400,
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: value.length === 0 ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                fontSize: 14
              }}
            >
              {placeholder}
            </div>
            {filteredOptions.map((opt) => {
              const checked = value.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  onClick={() => toggle(opt.value)}
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    color: checked ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: checked ? 600 : 400,
                    backgroundColor: checked ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                    fontSize: 14,
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                  onMouseEnter={(e) => {
                    if (!checked) e.currentTarget.style.backgroundColor = 'var(--card-bg-hover)';
                  }}
                  onMouseLeave={(e) => {
                    if (!checked) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: '2px solid',
                    borderColor: checked ? 'var(--accent)' : 'var(--border-color)',
                    backgroundColor: checked ? 'var(--accent)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {checked && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt.label}</span>
                </div>
              );
            })}
            {filteredOptions.length === 0 && (
              <div style={{ padding: '12px 14px', fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
                Nenhum resultado encontrado
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}

function ExportarDados({ dados }) {
  const [aberto, setAberto] = useState(false);
  const [posicao, setPosicao] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const calcularPosicao = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosicao({
      top: rect.bottom + 6,
      left: rect.left + rect.width - 200,
      width: 200
    });
  }, []);

  useEffect(() => {
    if (aberto) {
      calcularPosicao();
      const handleScroll = () => calcularPosicao();
      const handleResize = () => calcularPosicao();
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [aberto, calcularPosicao]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        triggerRef.current && !triggerRef.current.contains(event.target)
      ) {
        setAberto(false);
      }
    }
    if (aberto) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [aberto]);

  const exportarXLSX = () => {
    const rows = [];
    dados.forEach((o) => {
      const eixosEntries = Object.entries(o.valoresPorEixo || {});
      const propExc = o.total > 0 ? ((o.exclusivo / o.total) * 100).toFixed(1) + '%' : '0%';
      const propNao = o.total > 0 ? ((o.naoExclusivo / o.total) * 100).toFixed(1) + '%' : '0%';
      if (eixosEntries.length === 0) {
        rows.push({
          'Órgão': o.nome,
          'Eixos Temáticos': o.eixos.join(', '),
          'Ano': o.anoInicio,
          'Eixo (Detalhamento)': '-',
          'Valor por Eixo (R$)': '-',
          'Orçamento Exclusivo (R$)': o.exclusivo,
          'Orçamento Não Exclusivo (R$)': o.naoExclusivo,
          'Total Orçamentário (R$)': o.total,
          'Proporção Exclusivo': propExc,
          'Proporção Não Exclusivo': propNao,
        });
      } else {
        eixosEntries.forEach(([eixo, valor], idx) => {
          rows.push({
            'Órgão': idx === 0 ? o.nome : '',
            'Eixos Temáticos': idx === 0 ? o.eixos.join(', ') : '',
            'Ano': idx === 0 ? o.anoInicio : '',
            'Eixo (Detalhamento)': eixo,
            'Valor por Eixo (R$)': valor,
            'Orçamento Exclusivo (R$)': idx === 0 ? o.exclusivo : '',
            'Orçamento Não Exclusivo (R$)': idx === 0 ? o.naoExclusivo : '',
            'Total Orçamentário (R$)': idx === 0 ? o.total : '',
            'Proporção Exclusivo': idx === 0 ? propExc : '',
            'Proporção Não Exclusivo': idx === 0 ? propNao : '',
          });
        });
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Órgãos Orçamento Climático');
    XLSX.writeFile(workbook, `orgaos_orcamento_climatico_${new Date().toISOString().split('T')[0]}.xlsx`);
    setAberto(false);
  };

  const exportarPDF = () => {
    try {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

      doc.setFontSize(16);
      doc.text('Orçamento Climático – Órgãos', 40, 40);
      doc.setFontSize(10);
      doc.text(`Exportado em: ${new Date().toLocaleDateString('pt-BR')}`, 40, 58);
      doc.text(`Total: ${dados.length} órgão(s)`, 40, 72);

      const tableColumn = ['Órgão', 'Eixos Temáticos', 'Ano', 'Eixo (Detalhamento)', 'Valor por Eixo (R$)', 'Exclusivo (R$)', 'Não Exclusivo (R$)', 'Total (R$)'];
      const tableRows = [];

      dados.forEach((o) => {
        const eixosEntries = Object.entries(o.valoresPorEixo || {});
        if (eixosEntries.length === 0) {
          tableRows.push([
            o.nome,
            o.eixos.join(', '),
            String(o.anoInicio),
            '-',
            '-',
            String(o.exclusivo),
            String(o.naoExclusivo),
            String(o.total),
          ]);
        } else {
          eixosEntries.forEach(([eixo, valor], idx) => {
            tableRows.push([
              idx === 0 ? o.nome : '',
              idx === 0 ? o.eixos.join(', ') : '',
              idx === 0 ? String(o.anoInicio) : '',
              eixo,
              String(valor),
              idx === 0 ? String(o.exclusivo) : '',
              idx === 0 ? String(o.naoExclusivo) : '',
              idx === 0 ? String(o.total) : '',
            ]);
          });
        }
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 85,
        styles: { fontSize: 8, cellPadding: 3, overflow: 'linebreak' },
        headStyles: { fillColor: [21, 128, 61], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 255, 250] },
        margin: { left: 40, right: 40 },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 130 },
          2: { cellWidth: 30 },
          3: { cellWidth: 140 },
          4: { cellWidth: 60 },
          5: { cellWidth: 60 },
          6: { cellWidth: 60 },
          7: { cellWidth: 60 },
        },
        didDrawPage: (data) => {
          doc.setFontSize(8);
          doc.text(`Página ${data.pageNumber}`, data.settings.margin.left, doc.internal.pageSize.height - 20);
        }
      });

      doc.save(`orgaos_orcamento_climatico_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error('Erro ao exportar PDF:', err);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
    setAberto(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => {
          if (!aberto) calcularPosicao();
          setAberto(!aberto);
        }}
        style={{
          padding: '8px 16px',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--accent)',
          color: 'var(--bg-solid)',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600,
          fontFamily: 'inherit',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-light)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; }}
      >
        <Download size={16} />
        Exportar
        <ChevronDown size={14} style={{ transform: aberto ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {aberto &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'fixed',
              top: posicao.top,
              left: posicao.left,
              width: posicao.width,
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              zIndex: 2147483647,
              overflow: 'hidden'
            }}
          >
            <div
              onClick={exportarXLSX}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: 'var(--text-secondary)',
                fontSize: 13,
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
                transition: 'background-color 0.15s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--card-bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <FileSpreadsheet size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span>Exportar XLSX</span>
            </div>
            <div
              onClick={exportarPDF}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: 'var(--text-secondary)',
                fontSize: 13,
                backgroundColor: 'transparent',
                transition: 'background-color 0.15s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--card-bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <FileText size={16} style={{ color: '#ef4444', flexShrink: 0 }} />
              <span>Exportar PDF</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default function ProjectsTable() {
  const { orgaosFiltrados, filtros, atualizarFiltros } = useData();
  const [expandido, setExpandido] = useState(null);

  const toggleExpandir = (id) => {
    setExpandido(expandido === id ? null : id);
  };

  const orgaosOptions = orgaosLista.map((s) => ({ value: s, label: s }));
  const anosOptions = [2026].map((a) => ({ value: String(a), label: String(a) }));
  const eixosOptions = eixosLista.map((e) => ({ value: e, label: e }));

  return (
    <div className="section">
      <AnimatedSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>
            <ClipboardList size={18} />
            Detalhamento das Ações do Orçamento Climático
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => atualizarFiltros({ secretaria: [], anoInicio: [], eixo: [] })}
              title="Limpar filtros"
              style={{
                padding: '8px 16px',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--accent)',
                color: 'var(--bg-solid)',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                fontFamily: 'inherit',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-light)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; }}
            >
              <Eraser size={16} />
              <span>Limpar filtros</span>
            </button>
            <ExportarDados dados={orgaosFiltrados} />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="filters-row">
          <MultiSelectDropdown
            value={filtros.secretaria || []}
            onChange={(v) => atualizarFiltros({ secretaria: v })}
            options={orgaosOptions}
            placeholder="Todos os órgãos"
          />
          <MultiSelectDropdown
            value={filtros.anoInicio || []}
            onChange={(v) => atualizarFiltros({ anoInicio: v })}
            options={anosOptions}
            placeholder="Ano"
          />
          <MultiSelectDropdown
            value={filtros.eixo || []}
            onChange={(v) => atualizarFiltros({ eixo: v })}
            options={eixosOptions}
            placeholder="Todos os eixos temáticos"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="table-container">
          {/* Cabeçalho */}
          <div style={{ display: 'flex', padding: '12px 16px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            <div style={{ flex: 2 }}>Órgão</div>
            <div style={{ flex: 1.5 }}>Eixos Temáticos</div>
            <div style={{ flex: 0.6 }}>Ano</div>
            <div style={{ width: 32 }}></div>
          </div>

          {/* Accordion */}
          {orgaosFiltrados.map((o) => {
            const isExpandido = expandido === o.id;
            return (
              <div key={o.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                {/* Linha principal clicável */}
                <div
                  onClick={() => toggleExpandir(o.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    backgroundColor: isExpandido ? 'rgba(74, 222, 128, 0.05)' : 'transparent',
                    transition: 'background-color 0.2s ease',
                    gap: 8
                  }}
                  onMouseEnter={(e) => { if (!isExpandido) e.currentTarget.style.backgroundColor = 'var(--card-bg-hover)'; }}
                  onMouseLeave={(e) => { if (!isExpandido) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div style={{ flex: 2, fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{o.nome}</div>
                  <div style={{ flex: 1.5, fontSize: 13, color: 'var(--text-secondary)' }}>
                    {(filtros.eixo?.length ? o.eixos.filter(e => filtros.eixo.includes(e)) : o.eixos).map(e => (e.match(/^(Eixo\s+[IVX]+)/)?.[0] || e)).join(', ')}
                  </div>
                  <div style={{ flex: 0.6, fontSize: 13, color: 'var(--text-secondary)' }}>{o.anoInicio}</div>
                  <div style={{ width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isExpandido ? (
                      <ChevronUp size={18} style={{ color: 'var(--accent)', transition: 'transform 0.2s' }} />
                    ) : (
                      <ChevronDown size={18} style={{ color: 'var(--text-muted)', transition: 'transform 0.2s' }} />
                    )}
                  </div>
                </div>

                {/* Conteúdo expandido */}
                <div
                  style={{
                    maxHeight: isExpandido ? 500 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                    opacity: isExpandido ? 1 : 0
                  }}
                >
                  <div style={{ padding: '0 16px 16px 16px' }}>
                    <div style={{ backgroundColor: 'var(--card-bg-hover)', borderRadius: 8, padding: '16px 20px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Detalhamento do Órgão
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {/* Seção de Eixos */}
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Eixos Abrangidos
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {(filtros.eixo?.length
                              ? Object.entries(o.valoresPorEixo || {}).filter(([eixo]) => filtros.eixo.includes(eixo))
                              : Object.entries(o.valoresPorEixo || {})
                            ).map(([eixo, valor]) => (
                              <div key={eixo} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', backgroundColor: 'rgba(74, 222, 128, 0.05)', borderRadius: 6, border: '1px solid var(--border-color)' }}>
                                <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{eixo}</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#4ade80' }}>
                                  R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Divider */}
                        <div style={{ height: 1, backgroundColor: 'var(--border-color)', margin: '4px 0' }}></div>
                        
                        {/* Seção de Totais */}
                        {(() => {
                          const entradasFiltradas = filtros.eixo?.length
                            ? Object.entries(o.valoresPorEixo || {}).filter(([eixo]) => filtros.eixo.includes(eixo))
                            : Object.entries(o.valoresPorEixo || {});
                          const totalFiltrado = entradasFiltradas.reduce((s, [, v]) => s + (v || 0), 0);
                          return (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 24px' }}>
                              <div>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Orçamento Exclusivo: </span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#4ade80' }}>
                                  R$ {o.exclusivo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              </div>
                              <div>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Orçamento Não Exclusivo: </span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa' }}>
                                  R$ {o.naoExclusivo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              </div>
                              <div>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Proporção Exclusivo: </span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#4ade80' }}>
                                  {o.total > 0 ? ((o.exclusivo / o.total) * 100).toFixed(1) : 0}%
                                </span>
                              </div>
                              <div>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Proporção Não Exclusivo: </span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#60a5fa' }}>
                                  {o.total > 0 ? ((o.naoExclusivo / o.total) * 100).toFixed(1) : 0}%
                                </span>
                              </div>
                              {filtros.eixo?.length > 0 && entradasFiltradas.length > 0 ? (
                                entradasFiltradas.map(([eixo, valor]) => (
                                  <div key={eixo} style={{ gridColumn: 'span 2' }}>
                                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total Orçamentário por Eixo temático ({eixo}): </span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                                      R$ {(valor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <div style={{ gridColumn: 'span 2' }}>
                                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total Orçamentário: </span>
                                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                                    R$ {totalFiltrado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedSection>

      {orgaosFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
          Nenhum órgão encontrado com os filtros selecionados.
        </div>
      )}

      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
        Mostrando {orgaosFiltrados.length} órgão(s)
      </div>
    </div>
  );
}
