import React from 'react';

type Variant = 'primary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
}

const pad: Record<Size, string> = {
  sm: '8px 12px',
  md: '10px 16px',
  lg: '12px 18px',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  disabled,
  children,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const styles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: pad[size],
    width: fullWidth ? '100%' : undefined,
    borderRadius: '999px',
    border: variant === 'ghost' ? '1px solid var(--panel-2)' : '1px solid transparent',
    background:
      variant === 'primary'
        ? 'linear-gradient(180deg, var(--brand), var(--brand-600))'
        : variant === 'danger'
        ? 'linear-gradient(180deg, #ef4444, #dc2626)'
        : 'transparent',
    color: variant === 'ghost' ? 'var(--text)' : 'white',
    opacity: isDisabled ? 0.6 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    boxShadow: variant === 'ghost' ? 'none' : '0 6px 20px rgba(34,197,94,.25)',
    transition: 'transform .08s ease, box-shadow .2s ease, background .2s ease',
    ...style,
  };

  return (
    <button
      aria-busy={loading || undefined}
      disabled={isDisabled}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(1px) scale(.99)';
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
      }}
      style={styles}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,.35)',
            borderTopColor: 'white',
            animation: 'spin 700ms linear infinite',
          }}
        />
      )}
      {children}
      <style>
        {`@keyframes spin{to{transform:rotate(360deg)}}`}
      </style>
    </button>
  );
}
