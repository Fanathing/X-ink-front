import styled from 'styled-components';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';

const StyledLoginForm = styled.form`
  & {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const LoginForm = () => {
  return (
    <StyledLoginForm className="login-form">
      <EmailInput />
      <PasswordInput />
      <LoginButton />
    </StyledLoginForm>
  );
};

export default LoginForm;
