import { forwardRef, type CSSProperties } from 'react';

interface TextOwnProps {
  size?: CSSProperties['fontSize'];
  weight?: CSSProperties['fontWeight'];
  align?: CSSProperties['textAlign'];
  lineHeight?: CSSProperties['lineHeight'];
  color?: CSSProperties['color'];
  truncate?: boolean;
  lineClamp?: number;
}

type TextProps = TextOwnProps &
  Omit<React.ComponentPropsWithoutRef<'p'>, keyof TextOwnProps>;

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    { size, weight, align, lineHeight, color, truncate, lineClamp, style, children, ...rest },
    ref,
  ) => {
    const truncateStyles: CSSProperties = truncate
      ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
      : {};

    const lineClampStyles: CSSProperties = lineClamp
      ? {
          display: '-webkit-box',
          WebkitLineClamp: lineClamp,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }
      : {};

    return (
      <p
        ref={ref}
        {...rest}
        style={{
          fontSize: size,
          fontWeight: weight,
          textAlign: align,
          lineHeight,
          color,
          ...truncateStyles,
          ...lineClampStyles,
          ...style,
        }}
      >
        {children}
      </p>
    );
  },
);

Text.displayName = 'Text';

export type { TextProps };
