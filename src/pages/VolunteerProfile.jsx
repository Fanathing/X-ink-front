import styled from 'styled-components';
import Layout from '../layouts/Layout';
import ProfileForm from '../components/profileSetting/VolunteerForm';
import Upload from '../components/profileSetting/Upload';
import Title from '../components/profileSetting/Title';
import { useAuth } from '../contexts/AuthContext';

const StyledVolunteerProfile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 29px;
`;

const StyledTop = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin-left: 330px;
  gap: 15px;

  & > .top-name > span:nth-child(1) {
    font-size: 26px;
    font-weight: 700;
    margin-right: 10px;
  }

  & > .top-name > span:nth-child(2) {
    font-size: 16.7px;
    font-weight: 500;
    color: #3a4044;
  }
`;

const VolunteerProfile = () => {
  const { user } = useAuth();
  if (!user) {
    return <div>유저 정보를 불러오는 중입니다...</div>;
  }

  return (
    <Layout>
      <StyledTop className="top">
        <Title />
        <div className="top-name">
          <span>{user.NAME}</span>
          <span>님의 프로필 입니다.</span>
        </div>
      </StyledTop>

      <StyledVolunteerProfile>
        <Upload user={user} />
        <ProfileForm user={user} />
      </StyledVolunteerProfile>
    </Layout>
  );
};

export default VolunteerProfile;
