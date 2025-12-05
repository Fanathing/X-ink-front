import styled from 'styled-components';

const StyledEmailInput = styled.input`
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

const EmailInput = ({ state, dispatch }) => {
  return (
    <StyledEmailInput
      type="email"
      placeholder="이메일을 입력하세요"
      value={state.email}
      onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
    />
  );
};

export default EmailInput;
