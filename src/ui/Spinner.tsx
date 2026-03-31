interface SpinnerProps {
  size?: number;
  color?: string;
  borderWidth?: number;
}

export const Spinner = ({
  size = 20,
  color = '#fff',
  borderWidth = 2,
}: SpinnerProps) => (
  <span
    className="spinner"
    style={{
      width: size,
      height: size,
      borderWidth,
      borderTopColor: color,
    }}
  />
);
