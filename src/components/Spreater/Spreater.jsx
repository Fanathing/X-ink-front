import styled from 'styled-components';

const Base = styled.div`
  box-sizing: border-box;
`;

const ShortSpreater = styled(Base)`
  width: 50px;
  max-width: 50px;
  height: 3px;
  border-top: 3px solid #03407E;
`;

const LongSpreater = styled(Base)`
  width: 100%;
  max-width: 1420px;
  height: 3px;
  border-top: 3px solid #2C6AA9;
`;

const Thin = styled(Base)`
  width: 100%;
  max-width: 1420px;
  height: 1px;
  border-top: 1px solid #DDDDDD;
`;

const Line = styled(Base)`
  width: 1px;
  height: 10px;
  background: #D5D7E0;
`;

/**
 * Spreater
 * variant: 'short-blue' | 'wide-sky' | 'thin' | 'vertical'
 * className and style passthrough supported
 */
const Spreater = ({ variant = 'thin', className, style }) => {
  switch (variant) {
    case 'short-line':
      return <ShortSpreater className={className} style={style} />;
    case 'long-line':
      return <LongSpreater className={className} style={style} />;
    case 'Line':
      return <Line className={className} style={style} />;
    case 'thin':
    default:
      return <Thin className={className} style={style} />;
  }
};

export default Spreater;
