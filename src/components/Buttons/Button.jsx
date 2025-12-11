import styled from 'styled-components';

// Button variant 설정
const variantStyles = {
  blue: {
    backgroundColor: '#03407E',
    border: '1px solid #03407E',
    color: '#ffffff',
  },
  sky: {
    backgroundColor: '#2C6AA9',
    border: '1px solid #2C6AA9',
    color: '#ffffff',
  },
  'sky-outline': {
    backgroundColor: '#ffffff',
    border: '1px solid #2C6AA9',
    color: '#2C6AA9',
  },
};

// Size 설정
const sizeStyles = {
  sm: { width: '150px', height: '48px' },
  lg: { width: '200px', height: '57px' },
};

// Reusable styled button that receives 'variant' and 'size' props.
// Usage: <Button label="홈" variant="blue" size="sm" onClick={} />
const StyledButton = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 16px 0px;
  flex: none;
  order: 1;
  flex-grow: 0;
  
  /* Variant 기반 스타일 */
  background-color: ${(p) => p.$backgroundColor || variantStyles[p.variant]?.backgroundColor || variantStyles.blue.backgroundColor};
  border: ${(p) => p.$border || variantStyles[p.variant]?.border || variantStyles.blue.border};
  color: ${(p) => p.$color || variantStyles[p.variant]?.color || variantStyles.blue.color};
  border-radius: ${(p) => p.$radius || '4px'};
  
  /* 텍스트 스타일 */
  font-weight: 700;
  font-size: 17px;
  line-height: 17px;
  text-align: center;
  align-items: center;
  
  /* Size 기반 크기 */
  width: ${(p) => p.$width || sizeStyles[p.size]?.width || '200px'};
  height: ${(p) => p.$height || sizeStyles[p.size]?.height || '57px'};
  
  /* 상세페이지에서 정상 작동을 위한 필수 속성 */
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};
`;

// Button -children / label, variant (blue/sky/sky-outline), size (sm/lg), and onClick
const Button = ({
  children,
  label,
  variant = 'blue',
  size,
  onClick,
  width,
  height,
  border,
  radius,
  color,
  backgroundColor,
  disabled,
}) => {
  return (
    <StyledButton 
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      $width={width}
      $height={height}
      $border={border}
      $radius={radius}
      $color={color}
      $backgroundColor={backgroundColor}
    >
      {children || label}
    </StyledButton>
  );
};

export default Button;
