import { useState } from 'react';
import styled from 'styled-components';
import { 
  ProfileAvatar, 
  ProfileWithInfo, 
  ProfileMenu,
  ProfileLarge 
} from '../components/Profile';

const Container = styled.div`
  padding: 40px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 60px;
  background: #FFFFFF;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #3A4044;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const ComponentWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Label = styled.span`
  font-size: 12px;
  color: #666;
  text-align: center;
`;

const EventLog = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #e3f2fd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  min-height: 50px;
`;

const ProfilePlay = () => {
  const [eventLog, setEventLog] = useState('이벤트 로그가 여기에 표시됩니다.');
  
  // 카카오톡 프로필 이미지 예시 URL (실제로는 로그인 후 받아옴)
  const kakaoProfileUrl = 'https://via.placeholder.com/54/FFE812/000000?text=K';
  
  const handleAvatarClick = () => {
    setEventLog('프로필 아바타를 클릭했습니다!');
  };

  const handleMenuSelect = (menuId) => {
    const menuNames = {
      profile: '프로필 관리',
      applications: '내가 지원한 공고 관리',
      jobManagement: '공고 관리',
      applicantManagement: '지원자 관리',
      logout: '로그 아웃'
    };
    
    setEventLog(`메뉴 선택: ${menuNames[menuId] || menuId}`);
    
    if (menuId === 'logout') {
      setTimeout(() => {
        alert('로그아웃 되었습니다.');
      }, 100);
    }
  };

  return (
    <Container>
      <Section>
        <Title>1. ProfileAvatar - 기본 아바타</Title>
        <Description>
          54x54px 크기의 원형 프로필 아바타입니다. 알림 배지를 표시할 수 있습니다.
        </Description>
        <ComponentWrapper>
          <ItemWrapper>
            <ProfileAvatar />
            <Label>기본 이미지</Label>
          </ItemWrapper>
          
          <ItemWrapper>
            <ProfileAvatar imageUrl={kakaoProfileUrl} />
            <Label>카카오톡 이미지</Label>
          </ItemWrapper>
          
          <ItemWrapper>
            <ProfileAvatar notificationCount={3} />
            <Label>알림 3개</Label>
          </ItemWrapper>
          
          <ItemWrapper>
            <ProfileAvatar notificationCount={15} />
            <Label>알림 9+개</Label>
          </ItemWrapper>
          
          <ItemWrapper>
            <ProfileAvatar 
              imageUrl={kakaoProfileUrl}
              notificationCount={5}
              onClick={handleAvatarClick}
            />
            <Label>클릭 가능</Label>
          </ItemWrapper>
        </ComponentWrapper>
      </Section>

      <Section>
        <Title>2. ProfileWithInfo - 정보 포함 프로필</Title>
        <Description>
          이름과 부가 정보(지원한 기업 수 등)가 함께 표시되는 프로필입니다. 프로필 이미지는 ProfileMenu에 통합되어 표시됩니다.
        </Description>
        <ComponentWrapper>
          <ItemWrapper>
            <ProfileWithInfo
              name="홍길동"
              subInfo="지원한 기업: 1"
            />
            <Label>사용자 프로필</Label>
          </ItemWrapper>
          
          <ItemWrapper>
            <ProfileWithInfo
              name="김철수"
              subInfo="지원한 기업: 4"
            />
            <Label>사용자 프로필</Label>
          </ItemWrapper>
          
          <ItemWrapper>
            <ProfileWithInfo
              name="이영희"
              subInfo="지원한 기업: 12"
            />
            <Label>사용자 프로필</Label>
          </ItemWrapper>
        </ComponentWrapper>
      </Section>

      <Section>
        <Title>3. ProfileMenu - 드롭다운 메뉴 포함</Title>
        <Description>
          클릭 시 드롭다운 메뉴가 나타나는 프로필입니다. 사용자용과 기업용 두 가지 타입이 있습니다.
          <br />
          <strong>주의:</strong> 드롭다운이 왼쪽으로 펼쳐지므로 충분한 공간을 확보하세요.
        </Description>
        <ComponentWrapper style={{ minHeight: '250px' }}>
          <ItemWrapper>
            <ProfileMenu
              variant="user"
              notificationCount={2}
              onMenuSelect={handleMenuSelect}
            />
            <Label>사용자 메뉴<br />(클릭해보세요)</Label>
          </ItemWrapper>
          
          <ItemWrapper>
            <ProfileMenu
              variant="company"
              imageUrl={kakaoProfileUrl}
              notificationCount={5}
              onMenuSelect={handleMenuSelect}
            />
            <Label>기업 메뉴<br />(클릭해보세요)</Label>
          </ItemWrapper>
        </ComponentWrapper>
        <EventLog>{eventLog}</EventLog>
      </Section>

      <Section>
        <Title>4. ProfileLarge - 대형 프로필 이미지</Title>
        <Description>
          300x300px 크기의 대형 프로필 이미지입니다. 프로필 상세 페이지 등에서 사용됩니다.
        </Description>
        <ComponentWrapper>
          <ItemWrapper>
            <ProfileLarge />
            <Label>기본 이미지 (300x300)</Label>
          </ItemWrapper>
          
          <ItemWrapper>
            <ProfileLarge imageUrl={kakaoProfileUrl} />
            <Label>카카오톡 이미지 (300x300)</Label>
          </ItemWrapper>
        </ComponentWrapper>
      </Section>

      <Section>
        <Title>5. 실제 사용 예시</Title>
        <Description>
          실제 애플리케이션에서 사용하는 것과 유사한 형태입니다.
        </Description>
        <ComponentWrapper style={{ flexDirection: 'column', gap: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontFamily: 'Noto Sans KR', 
              fontSize: '18px', 
              fontWeight: '700',
              marginBottom: '20px',
              color: '#3A4044'
            }}>
              사용자 헤더 예시
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '20px',
              background: '#fff',
              borderRadius: '8px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <ProfileWithInfo
                name="홍길동"
                subInfo="지원한 기업: 3"
              />
              <ProfileMenu
                variant="user"
                imageUrl={kakaoProfileUrl}
                notificationCount={2}
                onMenuSelect={handleMenuSelect}
              />
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontFamily: 'Noto Sans KR', 
              fontSize: '18px', 
              fontWeight: '700',
              marginBottom: '20px',
              color: '#3A4044'
            }}>
              기업 헤더 예시
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '20px',
              background: '#fff',
              borderRadius: '8px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <ProfileWithInfo
                name="KTC 기업"
                subInfo="채용 공고: 5개"
              />
              <ProfileMenu
                variant="company"
                notificationCount={7}
                onMenuSelect={handleMenuSelect}
              />
            </div>
          </div>
        </ComponentWrapper>
      </Section>

      <Section>
        <Title>사용 방법</Title>
        <Description>
          <strong>ProfileAvatar Props:</strong>
          <br />
          • <code>imageUrl</code>: 프로필 이미지 URL (카카오톡 등, 없으면 기본 이미지)
          <br />
          • <code>notificationCount</code>: 알림 개수 (0이면 배지 숨김)
          <br />
          • <code>onClick</code>: 클릭 핸들러
          <br /><br />
          
          <strong>ProfileWithInfo Props:</strong>
          <br />
          • <code>name</code>: 사용자/기업 이름
          <br />
          • <code>subInfo</code>: 부가 정보 (예: 지원한 기업: 1)
          <br /><br />
          
          <strong>ProfileMenu Props:</strong>
          <br />
          • <code>variant</code>: 유저 또는 기업 (드롭다운 타입)
          <br />
          • <code>imageUrl</code>: 프로필 이미지 URL
          <br />
          • <code>notificationCount</code>: 알림 개수
          <br />
          • <code>onMenuSelect</code>: 메뉴 선택 콜백
          <br /><br />
          
          <strong>ProfileLarge Props:</strong>
          <br />
          • <code>imageUrl</code>: 프로필 이미지 URL (300x300)
          <br />
          • <code>onClick</code>: 클릭 핸들러
        </Description>
      </Section>
    </Container>
  );
};

export default ProfilePlay;

