import styled from 'styled-components';

const StyledLoginButton = styled.button`
  & {
    width: 400px;
    height: 51px;
    border-radius: 8px;
    background-color: #03407e;
    color: #ffffff;
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 16px;
  }
`;

const LoginButton = () => {
  return <StyledLoginButton>로그인</StyledLoginButton>;
};

export default LoginButton;
