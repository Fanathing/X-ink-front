import styled from 'styled-components';
import Header from './Headers';
import Footer from './Footer';
import Container from './Container';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, padding }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Container padding={padding}>{children}</Container>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
