import React, { useMemo, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PATIENTS } from './mockData';
import type { Patient, PatientStatus } from './types';

function formatRel(iso: string) {
  const d = new Date(iso);
  const diffDays = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 1) return 'today';
  if (diffDays < 2) return 'yesterday';
  return `${Math.floor(diffDays)}d ago`;
}

export function PatientList() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<PatientStatus | 'all'>('all');
  const [selected, setSelected] = useState<Patient | null>(null);
  const lastFocusRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
    }, [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PATIENTS.filter(p => {
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.doctor.toLowerCase().includes(q) ||
        (p.room ?? '').toLowerCase().includes(q);
      const matchesS = status === 'all' || p.status === status;
      return matchesQ && matchesS;
    });
  }, [query, status]);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {/* Filters */}
      <Card>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <input
            placeholder="Filter by name, doctor, room…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: 240,
              background: 'var(--panel-2)',
              color: 'var(--text)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 10,
              padding: '10px 12px',
              outline: 'none',
            }}
          />
          <select
            aria-label="Status"
            value={status}
            onChange={e => setStatus(e.target.value as PatientStatus | 'all')}
            style={{
              background: 'var(--panel-2)',
              color: 'var(--text)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 10,
              padding: '10px 12px',
            }}
          >
            <option value="all">All</option>
            <option value="admitted">Admitted</option>
            <option value="observation">Observation</option>
            <option value="discharged">Discharged</option>
          </select>
          <Button>Add patient</Button>
        </div>
      </Card>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
        {filtered.map(p => (
          <Card key={p.id} style={{ cursor: 'pointer' }}>
            <div
  onClick={() => {
    lastFocusRef.current = document.activeElement as HTMLElement;
    setSelected(p);
  }}
>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: 16 }}>{p.name}</h3>
                <span
                  style={{
                    fontSize: 12,
                    padding: '4px 8px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,.08)',
                    background:
                      p.status === 'admitted'
                        ? 'rgba(34,197,94,.15)'
                        : p.status === 'observation'
                        ? 'rgba(234,179,8,.15)'
                        : 'rgba(107,114,128,.15)',
                    textTransform: 'capitalize',
                  }}
                >
                  {p.status}
                </span>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6 }}>
                Age {p.age} • {p.doctor} • Room {p.room ?? '—'} • Updated {formatRel(p.updatedAt)}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Details drawer */}
      {selected && (
        <div
  role="dialog"
  aria-modal="true"
  onKeyDown={(e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setSelected(null);
      lastFocusRef.current?.focus?.();
    }
  }}
  style={{
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,.5)',
    display: 'grid',
    placeItems: 'end',
    padding: 16,
  }}
  onClick={() => { setSelected(null); lastFocusRef.current?.focus?.(); }}
>

          {/* Drawer panel */}
          <div
  aria-labelledby="drawer-title"
  tabIndex={-1}
  ref={(el) => {
    if (el) {
      const first = el.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (first ?? el).focus();
    }
  }}
  onKeyDown={(e) => {
    if (e.key !== 'Tab') return;
    const root = e.currentTarget;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled'));
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }}
  onClick={(e) => e.stopPropagation()}
  style={{
    width: 'min(720px, 100%)',
    background: 'linear-gradient(180deg, var(--panel), #0b1220)',
    border: '1px solid rgba(255,255,255,.08)',
    borderRadius: '24px 24px 0 0',
    padding: 20,
    boxShadow: '0 -20px 60px rgba(0,0,0,.4)',
    maxHeight: '80vh',
    overflow: 'auto',
  }}
>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <h2 id="drawer-title" style={{ margin: 0 }}>{selected.name}</h2>
<Button
  variant="ghost"
  onClick={() => {
    setSelected(null);
    lastFocusRef.current?.focus?.();
  }}
>
  Close
</Button>

            </div>

            <div style={{ color: 'var(--muted)', marginTop: 6 }}>
              Primary: {selected.doctor} • Room {selected.room ?? '—'}
            </div>

            <div style={{ marginTop: 16 }}>
              <p style={{ marginTop: 0 }}>
                Status:{' '}
                <strong style={{ textTransform: 'capitalize' }}>{selected.status}</strong> • Last updated{' '}
                {new Date(selected.updatedAt).toLocaleString()}
              </p>
              <p>Placeholder details — wire to real API later (Vitals, Meds, Labs, Notes).</p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <Button>Edit</Button>
              <Button variant="danger">Discharge</Button>
            </div>
          </div>
          {/* /Drawer panel */}
        </div>
      )}
    </div>
  );
}
