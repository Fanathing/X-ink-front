import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledLoginButton = styled.button`
  background: #272727;
  border: 1px solid #272727;
  color: white;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 700;
  align-content: center;
  border-radius: 16px;
  line-height: 28px;
  letter-spacing: -0.5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1a1a1a;
    border-color: #1a1a1a;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/volunteer-login');
  };

  return <StyledLoginButton onClick={handleClick}>로그인</StyledLoginButton>;
};

export default LoginButton;
