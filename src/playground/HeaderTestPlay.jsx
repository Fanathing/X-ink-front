import styled from 'styled-components';
import Header from '../layouts/Headers';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;

const ControlPanel = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-size: 24px;
  font-weight: 700;
  color: #3A4044;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const TestButton = styled.button`
  padding: 12px 24px;
  background: ${props => props.$primary ? '#03407E' : '#fff'};
  color: ${props => props.$primary ? '#fff' : '#03407E'};
  border: 2px solid #03407E;
  border-radius: 8px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$primary ? '#02356a' : '#f0f7ff'};
  }
`;

const InfoBox = styled.div`
  background: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: #333;
  margin-top: 20px;

  h3 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #03407E;
  }

  p {
    margin: 5px 0;
  }

  pre {
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 12px;
  }
`;

const ContentArea = styled.div`
  background: #fff;
  padding: 40px;
  min-height: 400px;
  text-align: center;

  h1 {
    font-family: 'Noto Sans KR';
    font-size: 32px;
    font-weight: 700;
    color: #3A4044;
    margin-bottom: 20px;
  }

  p {
    font-family: 'Noto Sans KR';
    font-size: 16px;
    color: #666;
    line-height: 1.6;
  }
`;

const HeaderTestPlay = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  // 테스트용 Mock 사용자 데이터
  const mockUsers = {
    individual: {
      id: 'user123',
      userType: 'individual',
      loginType: 'local',
      email: 'user@example.com',
      name: '홍길동',
      profileImage: null,
      applicationCount: 3,
      notificationCount: 2,
    },
    individualKakao: {
      id: 'user456',
      userType: 'individual',
      loginType: 'kakao',
      email: 'kakaouser@kakao.com',
      name: '김철수',
      profileImage: 'https://via.placeholder.com/54/FFE812/000000?text=K',
      applicationCount: 5,
      notificationCount: 1,
    },
    company: {
      id: 'company789',
      userType: 'company',
      loginType: 'local',
      email: 'company@example.com',
      companyName: 'ABC 기업',
      profileImage: null,
      jobCount: 8,
      notificationCount: 7,
    },
  };

  const handleLogin = (userType) => {
    login(mockUsers[userType]);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container>
      {/* 실제 헤더 컴포넌트 */}
      <Header />

      {/* 테스트 컨트롤 패널 */}
      <ControlPanel>
        <Section>
          <Title>🧪 헤더 테스트 컨트롤 패널</Title>
          
          <h3 style={{ 
            fontFamily: 'Noto Sans KR', 
            fontSize: '16px', 
            fontWeight: '700',
            marginBottom: '15px',
            color: '#3A4044'
          }}>
            로그인 상태 변경:
          </h3>
          
          <ButtonGroup>
            <TestButton 
              $primary={false}
              onClick={() => handleLogin('individual')}
              disabled={isAuthenticated}
            >
              개인 회원 로그인 (로컬)
            </TestButton>
            
            <TestButton 
              $primary={false}
              onClick={() => handleLogin('individualKakao')}
              disabled={isAuthenticated}
            >
              개인 회원 로그인 (카카오)
            </TestButton>
            
            <TestButton 
              $primary={false}
              onClick={() => handleLogin('company')}
              disabled={isAuthenticated}
            >
              기업 회원 로그인
            </TestButton>
            
            <TestButton 
              $primary={true}
              onClick={handleLogout}
              disabled={!isAuthenticated}
            >
              로그아웃
            </TestButton>
          </ButtonGroup>

          <InfoBox>
            <h3>현재 상태</h3>
            <p><strong>로그인 여부:</strong> {isAuthenticated ? '로그인됨' : '비로그인'}</p>
            {user && (
              <>
                <p><strong>사용자 타입:</strong> {user.userType === 'company' ? '기업' : '개인'}</p>
                <p><strong>로그인 방식:</strong> {user.loginType === 'kakao' ? '카카오' : '로컬'}</p>
                <p><strong>이름:</strong> {user.name || user.companyName}</p>
                <p><strong>알림 개수:</strong> {user.notificationCount}</p>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </>
            )}
          </InfoBox>
        </Section>

        <Section>
          <Title>📋 테스트 시나리오</Title>
          
          <InfoBox>
            <h3>1. 비로그인 상태</h3>
            <p>✅ 로그인, 회원가입 버튼 표시</p>
            <p>✅ 전체 공고 목록 카테고리만 표시</p>
          </InfoBox>

          <InfoBox>
            <h3>2. 개인 회원 로그인 (로컬)</h3>
            <p>✅ 홍길동님 환영합니다 표시</p>
            <p>✅ 프로필 정보와 아바타 표시 (기본 이미지)</p>
            <p>✅ 지원한 기업: 3 표시</p>
            <p>✅ 알림 배지 (2개) 표시</p>
            <p>✅ 드롭다운: 프로필 관리, 내가 지원한 공고 관리, 로그아웃</p>
            <p>✅ 전체 공고 목록 카테고리만 표시</p>
          </InfoBox>

          <InfoBox>
            <h3>3. 개인 회원 로그인 (카카오)</h3>
            <p>✅ 김철수님 환영합니다 표시</p>
            <p>✅ 카카오 프로필 이미지 표시</p>
            <p>✅ 지원한 기업: 5 표시</p>
            <p>✅ 알림 배지 (1개) 표시</p>
            <p>✅ 드롭다운: 프로필 관리, 내가 지원한 공고 관리, 로그아웃</p>
            <p>✅ 전체 공고 목록 카테고리만 표시</p>
          </InfoBox>

          <InfoBox>
            <h3>4. 기업 회원 로그인</h3>
            <p>✅ ABC 기업님 환영합니다 표시</p>
            <p>✅ 프로필 정보와 아바타 표시</p>
            <p>✅ 채용 공고: 8개 표시</p>
            <p>✅ 알림 배지 (7개) 표시</p>
            <p>✅ 드롭다운: 프로필 관리, 공고 관리, 지원자 관리, 로그아웃</p>
            <p>✅ 전체 공고 목록, 구직자 탐색 카테고리 모두 표시</p>
          </InfoBox>
        </Section>

        <Section>
          <Title>🔧 백엔드 연동 가이드</Title>
          
          <InfoBox>
            <h3>API 엔드포인트</h3>
            <p>
              <strong>GET /api/auth/me</strong> - 현재 사용자 정보 조회
              <br />
              <strong>POST /api/auth/logout</strong> - 로그아웃
            </p>
            
            <h3 style={{ marginTop: '15px' }}>환경 변수 설정</h3>
            <p>.env 파일에 추가:</p>
            <pre>REACT_APP_API_URL=https://api.x-ink.store</pre>
            
            <h3 style={{ marginTop: '15px' }}>예상 응답 형식</h3>
            <p>자세한 내용은 <code>src/services/API_SPEC.md</code> 참고</p>
          </InfoBox>
        </Section>
      </ControlPanel>

      {/* 컨텐츠 영역 */}
      <ContentArea>
        <h1>헤더 분기 처리 테스트 페이지</h1>
        <p>위의 버튼을 눌러 다양한 로그인 상태를 테스트해보세요.</p>
        <p>헤더의 변화를 확인할 수 있습니다.</p>
      </ContentArea>
    </Container>
  );
};

export default HeaderTestPlay;

