import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import LoginButton from '../../components/Buttons/LoginButton';
import CreateUserButton from '../../components/Buttons/CreateUserButton';
import { ProfileWithInfo, ProfileMenu } from "../../components/Profile";
import Logo from '../../assets/images/Logo.png';

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

const WelcomeText = styled.div`
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 500;
  color: #3a4044;
  margin-right: 15px;

  strong {
    font-weight: 700;
    color: #03407e;
  }
`;

/**
 * Volunteers - 개인 회원용 HeaderTop 컴포넌트
 * 
 * @param {Object} user - 사용자 정보 (원본 API 응답)
 * @param {boolean} isAuthenticated - 로그인 여부
 * @param {boolean} isKakaoUser - 카카오 로그인 여부
 * @param {function} onMenuSelect - 메뉴 선택 핸들러
 */
const Volunteers = ({ user, isAuthenticated, isKakaoUser, onMenuSelect }) => {
  const navigate = useNavigate();

  // 필요한 필드만 추출 (다양한 API 응답 구조 지원)
  const userName = user?.name || user?.NAME || '사용자';
  const applicationCount = user?.applicationCount || 0;
  const notificationCount = user?.notificationCount || 0;
  const profileImage = isKakaoUser ? (user?.profileImage || user?.PROFILE_IMAGE) : null;

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <HeaderTop>
      <HeaderTopLeft onClick={handleLogoClick}>
        <img src={Logo} alt="logo" />
      </HeaderTopLeft>
      <HeaderTopRight>
        {isAuthenticated ? (
          // 로그인 상태
          <>
            {/* 환영 메시지와 프로필 정보 */}
            <WelcomeText>
              <strong>{userName}</strong>
              님 환영합니다
            </WelcomeText>

            {/* 프로필과 프로필 정보 표시 */}
            <ProfileWithInfo
              name={userName}
              subInfo={`지원한 기업: ${applicationCount}`}
              imageUrl={profileImage}
              notificationCount={notificationCount}
            />

            {/* 드롭다운 메뉴 */}
            <ProfileMenu
              variant="user"
              imageUrl={profileImage}
              notificationCount={notificationCount}
              onMenuSelect={onMenuSelect}
            />
          </>
        ) : (
          // 비로그인 상태
          <>
            <LoginButton />
            <CreateUserButton />
          </>
        )}
      </HeaderTopRight>
    </HeaderTop>
  );
}

export default Volunteers;