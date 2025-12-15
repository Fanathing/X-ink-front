import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginButton from '../../components/Buttons/LoginButton';
import CreateUserButton from '../../components/Buttons/CreateUserButton';
import { ProfileWithInfo, ProfileMenu } from '../../components/Profile';
import Logo from '../../assets/images/Logo.png';
import { getApplicants } from '../../services/api';

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

// 로그인 시 웰컴 메시지 표시 

// const WelcomeText = styled.div`
//   font-size: 16px;
//   font-weight: 500;
//   color: #3a4044;
//   margin-right: 15px;

//   strong {
//     font-weight: 700;
//     color: #03407e;
//   }
// `;

/**
 * Companies - 기업 회원용 HeaderTop 컴포넌트
 * 
 * @param {Object} user - 사용자 정보 (원본 API 응답)
 * @param {boolean} isAuthenticated - 로그인 여부
 * @param {boolean} isKakaoUser - 카카오 로그인 여부
 * @param {function} onMenuSelect - 메뉴 선택 핸들러
 */
const Companies = ({ user, isAuthenticated, isKakaoUser, onMenuSelect }) => {
  const navigate = useNavigate();
  const [applicantCount, setApplicantCount] = useState(0);
  const [newApplicantCount, setNewApplicantCount] = useState(0); // 신규 지원자 수

  // 필요한 필드만 추출 (다양한 API 응답 구조 지원)
  const companyName = user?.name || user?.NAME || user?.companyName || '기업';
  // 프로필 이미지: 업로드된 이미지 우선, 카카오 프로필 이미지, 없으면 null
  const profileImage = user?.LOGO_URL || user?.logoUrl || 
    (isKakaoUser ? (user?.profileImage || user?.PROFILE_IMAGE) : null);

  // 확인한 지원자 ID 목록을 로컬 스토리지에서 가져오기
  const getViewedApplicantIds = () => {
    try {
      const viewed = localStorage.getItem('viewedApplicants');
      return viewed ? JSON.parse(viewed) : [];
    } catch (err) {
      return [];
    }
  };

  // 지원자 수 및 신규 지원자 수 가져오기
  useEffect(() => {
    if (!isAuthenticated) {
      setApplicantCount(0);
      setNewApplicantCount(0);
      return;
    }

    const fetchApplicantData = async () => {
      try {
        const applicantsData = await getApplicants();
        
        // API 응답 구조에 따라 배열 추출
        let applicantsArray = null;
        if (applicantsData && typeof applicantsData === 'object') {
          if (applicantsData.data && Array.isArray(applicantsData.data)) {
            applicantsArray = applicantsData.data;
          } else if (Array.isArray(applicantsData)) {
            applicantsArray = applicantsData;
          } else if (applicantsData.applicants && Array.isArray(applicantsData.applicants)) {
            applicantsArray = applicantsData.applicants;
          }
        }
        
        const totalCount = applicantsArray ? applicantsArray.length : 0;
        setApplicantCount(totalCount);
        
        // 확인한 지원자 ID 목록 가져오기
        const viewedApplicantIds = getViewedApplicantIds();
        
        // 신규 지원자 수 계산 (전체 지원자 중 확인하지 않은 지원자)
        const newCount = applicantsArray 
          ? applicantsArray.filter(applicant => {
              const applicantId = applicant.id || applicant.userId;
              return applicantId && !viewedApplicantIds.includes(String(applicantId));
            }).length
          : 0;
        
        setNewApplicantCount(newCount);
      } catch (err) {
        // 에러 발생 시 기본값 0 사용
        setApplicantCount(0);
        setNewApplicantCount(0);
      }
    };

    fetchApplicantData();
    
    // 지원자 관리 페이지에서 확인 이벤트 리스너
    const handleApplicantsViewed = () => {
      fetchApplicantData();
    };
    
    // 페이지 포커스 시마다 새로고침
    const handleFocus = () => {
      fetchApplicantData();
    };
    
    window.addEventListener('applicantsViewed', handleApplicantsViewed);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('applicantsViewed', handleApplicantsViewed);
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
              <strong>{companyName}</strong>
              님 환영합니다
            </WelcomeText> */}

            {/* 프로필 정보 표시 */}
            <ProfileWithInfo
              name={companyName}
              subInfo={`지원자: ${applicantCount}명`}
            />

            {/* 드롭다운 메뉴 (프로필 이미지 포함) */}
            <ProfileMenu
              variant="company"
              imageUrl={profileImage}
              notificationCount={newApplicantCount} // 신규 지원자 수를 알림으로 표시
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
};

export default Companies;
