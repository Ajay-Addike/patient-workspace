import React from 'react';

export function Card(
  { children, style }: React.PropsWithChildren<{ style?: React.CSSProperties }>
) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, var(--panel), #0b1220)',
        border: '1px solid rgba(255,255,255,.06)',
        borderRadius: 'var(--radius)',
        padding: 16,
        boxShadow: '0 10px 30px rgba(0,0,0,.35)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
