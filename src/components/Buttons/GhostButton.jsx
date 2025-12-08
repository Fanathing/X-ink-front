import styled from 'styled-components';

const StyledGhost = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 48px;
  background: #E5E7F0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: #56575F;
`;

const GhostButton = ({ children = '취소', onClick }) => {
  return <StyledGhost onClick={onClick}>{children}</StyledGhost>;
};

export default GhostButton;
