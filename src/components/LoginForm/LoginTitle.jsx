import styled from 'styled-components';

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

  & p:first-child {
    text-decoration: underline 3px;
    text-decoration-color: #2c6aa9;
    text-underline-offset: 8px;
  }

  & p:nth-child(2) {
    color: #999999cc;
  }
`;

const LoginTitle = () => {
  return (
    <StyledLoginTitle className="login-title">
      <p>개인회원</p>
      <p>기업회원</p>
    </StyledLoginTitle>
  );
};

export default LoginTitle;
