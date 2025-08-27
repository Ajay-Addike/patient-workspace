import React from 'react';

export function AppShell({ children }: React.PropsWithChildren) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      <aside
        style={{
          borderRight: '1px solid rgba(255,255,255,.06)',
          padding: 16,
          background: 'rgba(17, 24, 39, .6)',
          backdropFilter: 'blur(8px)',
          position: 'sticky',
          top: 0,
          alignSelf: 'start',
          height: '100vh',
        }}
      >
        <div style={{ fontWeight: 700, letterSpacing: 0.5, marginBottom: 16 }}>🏥 Patient Workspace</div>
        <nav style={{ display: 'grid', gap: 8 }}>
          <a style={navLinkStyle} href="#">Dashboard</a>
          <a style={navLinkStyle} href="#">Patients</a>
          <a style={navLinkStyle} href="#">Settings</a>
        </nav>
      </aside>

      <main>
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,.06)',
            background: 'rgba(2, 6, 23, .55)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
            <input
              placeholder="Search patients…"
              style={{
                flex: 1,
                maxWidth: 520,
                background: 'var(--panel)',
                color: 'var(--text)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 12,
                padding: '10px 12px',
                outline: 'none',
                boxShadow: '0 0 0 0px var(--ring)',
              }}
              onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 3px var(--ring)')}
              onBlur={(e) => (e.currentTarget.style.boxShadow = '0 0 0 0px var(--ring)')}
            />
            <div style={{ opacity: 0.8, fontSize: 12 }}>v0.1</div>
          </div>
        </header>

        <div style={{ padding: 16 }}>{children}</div>
      </main>
    </div>
  );
}

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'var(--text)',
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,.05)',
  background: 'linear-gradient(180deg, rgba(31,41,55,.55), rgba(2,6,23,.2))',
};
