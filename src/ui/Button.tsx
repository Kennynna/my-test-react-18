import { forwardRef, type CSSProperties } from 'react';
import { Spinner } from './Spinner.tsx';

type ButtonVariant = 'filled' | 'outlined' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

type ButtonProps = ButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof ButtonOwnProps>;

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: { padding: '4px 12px', fontSize: 14 },
  md: { padding: '8px 16px', fontSize: 16 },
  lg: { padding: '12px 24px', fontSize: 18 },
};

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  filled: {
    backgroundColor: '#1C7BFF',
    color: '#fff',
    border: 'none',
  },
  outlined: {
    backgroundColor: 'transparent',
    color: '#1C7BFF',
    border: '1px solid #1C7BFF',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#1C7BFF',
    border: 'none',
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'filled', size = 'md', fullWidth, loading, disabled, style, children, ...rest },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        {...rest}
        style={{
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          opacity: disabled || loading ? 0.6 : 1,
          borderRadius: 8,
          fontFamily: 'inherit',
          width: fullWidth ? '100%' : undefined,
          ...sizeStyles[size],
          ...variantStyles[variant],
          ...style,
        }}
      >
        {loading ? <Spinner size={20} color="#fff" /> : children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export type { ButtonProps, ButtonVariant, ButtonSize };
