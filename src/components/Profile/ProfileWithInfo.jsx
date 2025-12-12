import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2.5px;
`;

const Name = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 18.8px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #3A4044;
  white-space: nowrap;
`;

const SubInfo = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3A4044;
  white-space: nowrap;
`;

/**
 * ProfileWithInfo - 이름과 정보가 포함된 프로필 컴포넌트 (텍스트만)
 * 
 * @param {string} name - 사용자 이름
 * @param {string} subInfo - 부가 정보 (예: "지원한 기업: 1")
 */
const ProfileWithInfo = ({
  name = '사용자',
  subInfo = ''
}) => {
  return (
    <ProfileContainer>
      <InfoContainer>
        <Name>{name}</Name>
        {subInfo && <SubInfo>{subInfo}</SubInfo>}
      </InfoContainer>
    </ProfileContainer>
  );
};

export default ProfileWithInfo;

