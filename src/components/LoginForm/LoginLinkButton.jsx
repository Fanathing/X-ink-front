import styled from 'styled-components';
import Bulkhead from './Bulkhead';

const StyledLinkButton = styled.div`
  & {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  & > p {
    font-size: 14px;
    font-weight: 350;
    color: #3f3f46;
  }
`;

const LinkButton = () => {
  return (
    <StyledLinkButton className="login-link-button">
      <p>아이디찾기</p>
      <Bulkhead />
      <p>비밀번호찾기</p>
      <Bulkhead />
      <p>회원가입</p>
    </StyledLinkButton>
  );
};

export default LinkButton;
