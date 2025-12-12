import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: ${(props) => props.maxWidth || '1260px'};
  width: 100%;
  margin: 0 auto;
  padding: ${(props) => props.padding || '40px 0'};
  display: flex;
  flex-direction: column;
`;

const Container = ({ children, maxWidth, padding }) => {
  return (
    <StyledContainer
      maxWidth={maxWidth}
      padding={padding}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
