import styled from 'styled-components';

const Content = styled.p`
  font-weight: 500;
  font-size: 16.7px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3A4044;
  margin: 0;
`;

const ContentText = ({ children, ...rest }) => {
  return <Content {...rest}>{children}</Content>;
};

export default ContentText;
