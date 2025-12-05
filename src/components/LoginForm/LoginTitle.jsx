import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledLoginTitle = styled.div`
  & {
    padding: 58px 0 0 0;
    display: flex;
    flex-direction: row;
    width: 400px;
    height: 42px;
    justify-content: center;
    gap: 20px;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  & a:first-child {
    text-decoration: underline 3px;
    text-decoration-color: #2c6aa9;
    text-underline-offset: 8px;
  }

  & a:visited {
    color: inherit;
  }

  & a:nth-child(2) {
    color: #999999cc;
    text-decoration: none;
  }
`;

const LoginTitle = () => {
  return (
    <StyledLoginTitle className="login-title">
      <NavLink to={'/login'}>개인회원</NavLink>
      <NavLink to={'/login/company'}>기업회원</NavLink>
    </StyledLoginTitle>
  );
};

export default LoginTitle;
