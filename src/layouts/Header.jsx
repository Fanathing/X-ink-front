import styled from 'styled-components';
import LoginButton from '../components/Buttons/LoginButton';
import CreateUserButton from '../components/Buttons/CreateUserButton';
import Logo from '../assets/images/Logo.png';
import { NavLink } from 'react-router-dom';

const StyledHeaderWrap = styled.header`
  width: 100%;
  height: 213px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 2px #c8c8c8;
`;

const HeaderInner = styled.div`
  width: 1256px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderTop = styled.div`
  height: 126px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTopLeft = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const HeaderTopRight = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const HeaderCategory = styled.div`
  height: 87px;
  display: flex;
  align-items: center;
`;

const CategoryLink = styled(NavLink)`
  width: 102px;
  height: 25px;
  position: relative;
  top: -1px;
  left: -0.53px;
  margin-right: 39.37px;

  /* 텍스트 스타일 */
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.9px;

  /* 링크를 일반 텍스트처럼 보이게 */
  color: #3a4044;
  text-decoration: none;

  /* 가로세로 가운데 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #03407e;
  }

  &:visited {
    color: #000000;
  }
`;

const Header = () => {
  return (
    <StyledHeaderWrap>
      <HeaderInner>
        <HeaderTop>
          <HeaderTopLeft>
            <img src={Logo} alt="logo" />
          </HeaderTopLeft>
          <HeaderTopRight>
            <LoginButton />
            <CreateUserButton />
          </HeaderTopRight>
        </HeaderTop>
        <HeaderCategory>
          <CategoryLink to="/">전체 공고 목록</CategoryLink>
          <CategoryLink to="/search">구직자 탐색</CategoryLink>
        </HeaderCategory>
      </HeaderInner>
    </StyledHeaderWrap>
  );
};

export default Header;
