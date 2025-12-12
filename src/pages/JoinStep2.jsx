import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Stepper from '../components/Steps/Stepper';
import CompaniesTitle2 from '../components/Step2_companies/CompaniesTitle2';
import VolunteerTitle2 from '../components/Step2_volunteer/VolunteerTitle2';
import CompaniesInputs from '../components/Step2_companies/CompaniesInputs';
import VolunteerInputs from '../components/Step2_volunteer/VolunteerInputs';

const StyledJoin = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const stepsData = [
  { key: 'step1', label: '유형 선택' },
  { key: 'step2', label: '정보 입력' },
  { key: 'step3', label: '완료' },
];

const JoinStep2 = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get('type');

  return (
    <Layout padding={'60px 0'}>
      <StyledJoin>
        {type === 'volunteer' && <VolunteerTitle2 />}
        {type === 'companies' && <CompaniesTitle2 />}
        <Stepper steps={stepsData} activeIndex={1} />
        {type === 'volunteer' && <VolunteerInputs />}
        {type === 'companies' && <CompaniesInputs />}
        {!type && <div>일반 또는 기업을 선택하여 진행해주시길 바랍니다.</div>}
      </StyledJoin>
    </Layout>
  );
};

export default JoinStep2;
