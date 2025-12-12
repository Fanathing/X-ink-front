import styled from 'styled-components';

const Header = styled.h1`
  font-weight: 400;
  font-size: 20.6px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #222222;
  margin: 0;
`;

const HeaderText = ({ children, ...rest }) => {
  return <Header {...rest}>{children}</Header>;
};

export default HeaderText;
