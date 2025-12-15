import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from "styled-components";
import LoginButton from '../../components/Buttons/LoginButton';
import CreateUserButton from '../../components/Buttons/CreateUserButton';
import { ProfileWithInfo, ProfileMenu } from "../../components/Profile";
import Logo from '../../assets/images/Logo.png';
import { getMyApplications } from '../../services/api';

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

// 로그인 시 웸컴 메시지 표시 
// const WelcomeText = styled.div`
//   font-size: 16px;
//   font-weight: 500;
//   color: #3a4044;
//   margin-right: 15px;

  // strong {
  //   font-weight: 700;
  //   color: #03407e;
  // }
// `;

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
  const [applicationCount, setApplicationCount] = useState(0);

  // 필요한 필드만 추출 (다양한 API 응답 구조 지원)
  const userName = user?.name || user?.NAME || '사용자';
  const notificationCount = user?.notificationCount || 0;
  // 프로필 이미지: 업로드된 이미지 우선, 카카오 프로필 이미지, 없으면 null
  const profileImage = user?.THUMBNAIL_URL || user?.thumbnailUrl || 
    (isKakaoUser ? (user?.profileImage || user?.PROFILE_IMAGE) : null);

  // 지원한 공고 수 가져오기
  useEffect(() => {
    if (!isAuthenticated) {
      setApplicationCount(0);
      return;
    }

    const fetchApplicationCount = async () => {
      try {
        const applicationsData = await getMyApplications();
        
        // API 응답 구조에 따라 배열 추출
        let applicationsArray = null;
        if (applicationsData && typeof applicationsData === 'object') {
          if (applicationsData.data && Array.isArray(applicationsData.data)) {
            applicationsArray = applicationsData.data;
          } else if (Array.isArray(applicationsData)) {
            applicationsArray = applicationsData;
          } else if (applicationsData.applications && Array.isArray(applicationsData.applications)) {
            applicationsArray = applicationsData.applications;
          }
        }
        
        const count = applicationsArray ? applicationsArray.length : 0;
        setApplicationCount(count);
      } catch (err) {
        // 에러 발생 시 기본값 0 사용
        setApplicationCount(0);
      }
    };

    fetchApplicationCount();
    
    // 지원 완료 이벤트 리스너
    const handleApplicationSubmitted = () => {
      fetchApplicationCount();
    };
    
    // 페이지 포커스 시마다 새로고침 (지원 후 돌아올 때)
    const handleFocus = () => {
      fetchApplicationCount();
    };
    
    window.addEventListener('applicationSubmitted', handleApplicationSubmitted);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('applicationSubmitted', handleApplicationSubmitted);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isAuthenticated]);

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
            {/* <WelcomeText>
              <strong>{userName}</strong>
              님 환영합니다
            </WelcomeText> */}

            {/* 프로필 정보 표시 */}
            <ProfileWithInfo
              name={userName}
              subInfo={`지원한 기업: ${applicationCount}`}
            />

            {/* 드롭다운 메뉴 (프로필 이미지 포함) */}
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