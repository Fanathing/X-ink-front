import styled from 'styled-components';

const StyledPasswordInput = styled.input`
  & {
    width: 382px;
    height: 48px;
    padding-left: 14px;
    border-radius: 8px;
    border: 1px solid #80808066;
  }

  & input::placeholder {
    color: #c4c4c4;
  }
`;

const PasswordInput = () => {
  return (
    <StyledPasswordInput type="password" placeholder="비밀번호를 입력하세요" />
  );
};

export default PasswordInput;
