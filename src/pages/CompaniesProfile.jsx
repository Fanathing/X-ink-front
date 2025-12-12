import styled from 'styled-components';
import Layout from '../layouts/Layout';
import CompaniesForm from '../components/profileSetting/CompaniesForm';
import Upload from '../components/profileSetting/CompaniesUpload';
import Title from '../components/profileSetting/Title';
import { useAuth } from '../contexts/AuthContext';

const StyledCompaniesProfile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 29px;
  margin-bottom: 40px;
`;

const StyledTop = styled.div`
  margin-top: 40px;
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
  }
`;

const CompaniesProfile = () => {
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
        </div>
      </StyledTop>

      <StyledCompaniesProfile>
        <Upload user={user} />
        <CompaniesForm user={user} />
      </StyledCompaniesProfile>
    </Layout>
  );
};

export default CompaniesProfile;
