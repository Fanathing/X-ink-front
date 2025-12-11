import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: ${(props) => props.maxWidth || '1260px'};
  width: 100%;
  margin: 0 auto;
  padding: ${(props) => props.padding || '40px 0'};
  padding-bottom: ${(props) => props.paddingBottom || '0px'};
  display: flex;
  flex-direction: column;
`;

const Container = ({ children, maxWidth, padding, paddingBottom}) => {
  return <StyledContainer maxWidth={maxWidth} padding={padding} paddingBottom={paddingBottom}>{children}</StyledContainer>;
};

export default Container;
