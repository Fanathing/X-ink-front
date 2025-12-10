import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  width: 590px;
`;

const Label = styled.label`
  width: 590px;
  height: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  color: #56575f;
`;

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  width: ${(props) => props.width || '590px'};
  height: ${(props) => props.height || '59px'};
  max-width: ${(props) => props.maxWidth || '590px'};
  padding: 12px 14px;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #808080;
  border-radius: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  color: #000000;

  &::placeholder {
    color: #c4c4c4;
  }

  &:focus {
    outline: none;
    border-color: #03407e;
  }
`;

/**
 * TextArea
 * props:
 * - label: string (optional)
 * - placeholder: string (optional)
 * - value, onChange 등 textarea props passthrough
 */
const TextArea = ({ label, placeholder, ...rest }) => {
  console.log(rest);

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledTextArea placeholder={placeholder} {...rest} />
    </Wrapper>
  );
};

export default TextArea;
