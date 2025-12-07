import styled from 'styled-components';
import VerifyImg from '../../assets/images/verifyed.png';
import VectorImg from '../../assets/images/Vector.png';
import CompleteImg from '../../assets/images/Complete.png';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: 50%;
  background: ${(p) => (p.variant === 'verified' ? '#DCFCE7' : p.variant === 'complete' ? '#E5E7F0' : '#FFFFFF')};
  box-shadow: none;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

/**
 * Check component
 * props:
 * - variant: 'verified' | 'complete' | 'default'
 * - size: number (px) default 200 per design samples
 */
const Check = ({ variant = 'verified', size = 200 }) => {
  // choose image by variant
  let src;
  let alt;
  if (variant === 'complete') {
    src = CompleteImg;
    alt = 'complete';
  } else if (variant === 'vector') {
    src = VectorImg;
    alt = 'vector';
  } else {
    src = VerifyImg;
    alt = 'verified';
  }

  // larger image scale to better match design (use ~80% of wrapper)
  const imgScale = size >= 200 ? '80%' : '72%';

  return (
    <Wrapper variant={variant} size={size} role="img" aria-label={variant}>
      <Inner variant={variant} size={size}>
        <img src={src} alt={alt} style={{ width: imgScale, height: imgScale, objectFit: 'contain', display: 'block' }} />
      </Inner>
    </Wrapper>
  );
};

export default Check;
