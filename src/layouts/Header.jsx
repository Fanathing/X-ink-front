import styled from 'styled-components';
import LoginButton from '../components/Buttons/LoginButton';
import CreateUserButton from '../components/Buttons/CreateUserButton';
import Logo from '../assets/images/Logo.png';

const StyledHeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

const Header = () => {
  return (
    <StyledHeaderWrap>
      <div className="herder-top">
        <div className="header-top-left">
          <img src={Logo} alt="logo" />
          <div>채용 플랫폼</div>
        </div>
      </div>
      <LoginButton />
      <CreateUserButton />
    </StyledHeaderWrap>
  );
};

export default Header;
