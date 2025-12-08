import styled from 'styled-components';

const StyledLoginButton = styled.button`
  & {
    width: 400px;
    height: 51px;
    border-radius: 8px;
    background-color: ${props => props.disabled ? '#ccc' : '#03407e'};
    color: #ffffff;
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 16px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: #02356a;
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.6;
    }
  }
`;

const LoginButton = ({ disabled = false }) => {
  return (
    <StyledLoginButton type="submit" disabled={disabled}>
      {disabled ? '로그인 중...' : '로그인'}
    </StyledLoginButton>
  );
};

export default LoginButton;
