import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { tema } = useTheme();

  return (
    <footer style={{
      background: 'transparent',
      marginTop: 32,
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        height: '2px',
        backgroundColor: 'var(--border-hover)'
      }} />
      <div style={{
        width: '100%',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          width: '100%'
        }}>
          <div style={{
            backgroundColor: tema === 'escuro' ? 'var(--card-bg-hover)' : 'transparent',
            padding: tema === 'escuro' ? 8 : 0,
            borderRadius: 8,
            flexShrink: 0
          }}>
            <img
              src="/logo_seplan.png"
              alt="Governo do Estado do Acre"
              style={{ height: 80, objectFit: 'contain', display: 'block' }}
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: 'var(--text-primary)',
              fontSize: 14,
              fontWeight: 700,
              margin: '0 0 4px 0'
            }}>
              Departamento de Estudos e Planejamento Orçamentário - DEPPO/SEPLAN
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 12,
              lineHeight: 1.5,
              margin: '0 0 8px 0'
            }}>
              composição técnica: Denyscley Oliveira Bandeira (coordenador - Gestor de Políticas Públicas), ícaro Lebre Gundim (Economista), Luísa Nascimento Ribeiro (economista), Roseneide Sena (Especialista Executiva Administradora), Vinícius Carneiro de Farias (Economista).
            </p>
            <p style={{
              color: 'var(--text-primary)',
              fontSize: 14,
              fontWeight: 400,
              margin: '0 0 4px 0'
            }}>
              Secretaria de Estado de Planejamento — Governo do Estado do Acre
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 12,
              lineHeight: 1.6,
              margin: 0
            }}>
              Av. Getúlio Vargas, 232 — Centro — Rio Branco — Acre — CEP: 69900-060 Palácio das Secretarias — Fone: (68) 3215-2514
            </p>
          </div>
        </div>

        <p style={{
          color: 'var(--text-muted)',
          fontSize: 11,
          textAlign: 'center',
          margin: '8px 0 0 0'
        }}>
          Dashboard de Orçamento Climático — Estado do Acre
        </p>
      </div>
    </footer>
  );
}
