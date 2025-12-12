import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Stepper from '../components/Steps/Stepper';
import Title3 from '../components/Step3/Title3';
import CompleteBox from '../components/Step3/CompleteBox';

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

const JoinStep3 = () => {
  return (
    <Layout padding={'60px 0'}>
      <StyledJoin>
        <Title3 />
        <Stepper steps={stepsData} activeIndex={3} />
        <CompleteBox />
      </StyledJoin>
    </Layout>
  );
};

export default JoinStep3;
