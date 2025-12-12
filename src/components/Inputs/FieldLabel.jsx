import styled from 'styled-components';

const StyledLabel = styled.label`
  font-weight: 350;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  letter-spacing: -0.8px;
  color: #3F3F46;
`;

const FieldLabel = ({ children, htmlFor, ...rest }) => {
  return (
    <StyledLabel htmlFor={htmlFor} {...rest}>
      {children}
    </StyledLabel>
  );
};

export default FieldLabel;
