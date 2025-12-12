import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Volunteers from './Volunteers';
import Companies from './Companies';
import Logo from '../../assets/images/Logo.png';

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
  cursor: pointer;
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
  width: auto;
  min-width: 102px;
  height: 25px;
  position: relative;
  top: -1px;
  left: -0.53px;
  margin-right: 39.37px;
  padding: 0 10px;

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

  &.active {
    color: #03407e;
    border-bottom: 2px solid #03407e;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isCompany, isKakaoUser, logout, loading } =
    useAuth();

  // 메뉴 선택 처리
  const handleMenuSelect = async (menuId) => {
    switch (menuId) {
      case 'profile':
        navigate('/volunteer-profile');
        break;
      case 'applications':
        navigate('/myapplications');
        break;
      case 'jobManagement':
        navigate('/jobs');
        break;
      case 'applicantManagement':
        navigate('/applicantmanagement');
        break;
      case 'logout':
        await logout();
        navigate('/');
        break;
      default:
        break;
    }
  };

  // 로딩 중이면 로딩 상태 표시
  if (loading) {
    return (
      <StyledHeaderWrap>
        <HeaderInner>
          <HeaderTop>
            <HeaderTopLeft>
              <img src={Logo} alt="logo" />
            </HeaderTopLeft>
            <HeaderTopRight>{/* 로딩 중 */}</HeaderTopRight>
          </HeaderTop>
          <HeaderCategory>
            <CategoryLink to="/">전체 공고 목록</CategoryLink>
          </HeaderCategory>
        </HeaderInner>
      </StyledHeaderWrap>
    );
  }

  return (
    <StyledHeaderWrap>
      <HeaderInner>
        {/* 사용자 타입에 따라 Volunteers 또는 Companies 컴포넌트 렌더링 */}
        {isCompany ? (
          <Companies
            user={user}
            isAuthenticated={isAuthenticated}
            isKakaoUser={isKakaoUser}
            onMenuSelect={handleMenuSelect}
          />
        ) : (
          <Volunteers
            user={user}
            isAuthenticated={isAuthenticated}
            isKakaoUser={isKakaoUser}
            onMenuSelect={handleMenuSelect}
          />
        )}

        {/* HeaderCategory는 공통으로 유지 */}
        <HeaderCategory>
          {/* 전체 공고 목록은 항상 표시 */}
          <CategoryLink to="/">전체 공고 목록</CategoryLink>

          {/* 구직자 탐색은 기업 로그인 시에만 표시 */}
          {isCompany && (
            <CategoryLink to="/jobapplicantsearch">구직자 탐색</CategoryLink>
          )}
        </HeaderCategory>
      </HeaderInner>
    </StyledHeaderWrap>
  );
};

export default Header;
