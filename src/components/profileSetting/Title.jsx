import styled from 'styled-components';

const StyledTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const Title = () => {
  return <StyledTitle className="title">프로필 관리</StyledTitle>;
};

export default Title;
