import styled from 'styled-components';
import Layout from '../layouts/Layout';
import LoginTitle from '../components/LoginForm/LoginTitle';
import LoginForm from '../components/LoginForm/LoginForm';
import LinkButton from '../components/LoginForm/LoginLinkButton';

const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > .login {
  }

  & > .login > .login-main {
  }

  & > .login > .login-main > .login-link-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  & > .login > .login-main > .login-link-button > p {
    font-size: 14px;
    font-weight: 350;
  }
`;

const Login = () => {
  return (
    <Layout>
      <StyledLoginPage>
        <div className="login">
          <div className="login-main">
            <LoginTitle />
            <LoginForm />
            <LinkButton />
          </div>
        </div>
      </StyledLoginPage>
    </Layout>
  );
};

export default Login;
