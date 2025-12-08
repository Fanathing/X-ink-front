import styled from 'styled-components';

// Reusable styled button that receives 'variant' and 'size' props.
// Usage: <Button label="홈" variant="blue" size="sm" onClick={} />
// Figma specs implemented: small(150x46), large(200x57), text 17px bold(700), border-radius 1px.
const StyledButton = styled.button`
  border: ${(props) => props.border || 'none'};
  box-sizing: border-box;
  border-radius: ${(props) => props.radius || '1px'};
  color: ${(props) => props.color || '#ffffff'};
  font-weight: 700;
  font-size: 17px; /* Figma: 17px */
  line-height: 17px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* allow explicit backgroundColor prop, otherwise fall back to variant colors */
  background-color: ${(p) => p.backgroundColor || (p.variant === 'sky' ? '#2C6AA9' : '#03407E')};
  width: ${(p) => (p.size === 'lg' ? '200px' : '150px')};
  height: ${(p) => (p.size === 'lg' ? '57px' : '46px')};
  padding: 0; /* use explicit width/height; no extra padding */
`;

// Button component accepts children / label, variant (blue/sky), size (sm/md/lg), and onClick
const Button = ({
  children,
  label,
  variant = 'blue',
  size = 'sm',
  onClick,
  border,
  radius,
  color,
  backgroundColor,
}) => {
  return (
    <StyledButton variant={variant} size={size} onClick={onClick} border={border} radius={radius} color={color} backgroundColor={backgroundColor}>
      {children || label}
    </StyledButton>
  );
};

export default Button;
