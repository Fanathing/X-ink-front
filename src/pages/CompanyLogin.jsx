import styled from 'styled-components';
import Layout from '../layouts/Layout';
import CompanyLoginTitle from '../components/LoginForm/CompanyLoginTitle';
import CompanyLoginForm from '../components/LoginForm/CompanyLoginForm';
import LinkButton from '../components/LoginForm/LoginLinkButton';

const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 120px auto;
`;

const Login = () => {
  return (
    <Layout>
      <StyledLoginPage>
        <div className="login">
          <div className="login-main">
            <CompanyLoginTitle />
            <CompanyLoginForm />
            <LinkButton />
          </div>
        </div>
      </StyledLoginPage>
    </Layout>
  );
};

export default Login;
