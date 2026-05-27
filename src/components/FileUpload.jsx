import React, { useCallback } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useData } from '../context/DataContext';
import { Upload, FileSpreadsheet } from 'lucide-react';

export default function FileUpload() {
  const { atualizarDados } = useData();

  const processar = (dados) => dados.map((row, i) => ({
    id: row.id || i + 1,
    nome: row.nome || row.Nome || row.PROJETO || `Projeto ${i + 1}`,
    municipio: row.municipio || row.Municipio || row.MUNICIPIO || '',
    anoInicio: parseInt(row.anoInicio || row.AnoInicio || row.ano || 2020),
    areaHa: parseFloat(row.areaHa || row.AreaHa || row.area || 0),
    creditosGerados: parseFloat(row.creditosGerados || row.CreditosGerados || row.creditos_gerados || 0),
    creditosVendidos: parseFloat(row.creditosVendidos || row.CreditosVendidos || row.creditos_vendidos || 0),
    status: row.status || row.Status || 'Ativo',
    tipo: row.tipo || row.Tipo || 'Projeto',
    emissaoEvitada: parseFloat(row.emissaoEvitada || row.EmissaoEvitada || row.emissao_evitada || 0),
    secretaria: row.secretaria || row.Secretaria || row.SECRETARIA || 'N/I',
    orcamento: parseFloat(row.orcamento || row.Orcamento || row.ORCAMENTO || 0)
  }));

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const name = file.name.toLowerCase();

    if (name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (r) => atualizarDados(prev => ({ ...prev, projetos: processar(r.data) }))
      });
    } else if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const wb = XLSX.read(new Uint8Array(ev.target.result), { type: 'array' });
        const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        atualizarDados(prev => ({ ...prev, projetos: processar(data) }));
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Envie CSV ou Excel (.xlsx, .xls)');
    }
  }, [atualizarDados]);

  return (
    <div className="section">
      <div className="section-title">
        <Upload size={18} />
        Importar Dados
      </div>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleChange} style={{ display: 'none' }} id="file-up" />
      <label htmlFor="file-up" className="upload-area">
        <div style={{ marginBottom: 8, color: 'var(--text-secondary)' }}>
          <FileSpreadsheet size={32} strokeWidth={1.5} />
        </div>
        <div style={{ fontWeight: 600, marginBottom: 4, color: 'white' }}>Clique para enviar ou arraste arquivos</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>CSV ou Excel (.xlsx, .xls)</div>
        <div className="upload-hint">
          Colunas: nome, municipio, anoInicio, areaHa, creditosGerados, creditosVendidos, status, tipo, emissaoEvitada
        </div>
      </label>
    </div>
  );
}
