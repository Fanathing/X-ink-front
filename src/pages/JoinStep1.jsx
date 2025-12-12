import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Stepper from '../components/Steps/Stepper';
import Title1 from '../components/Step1/Title1';
import SelectBorder from '../components/Step1/SelectBorder';

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

const JoinStep1 = () => {
  return (
    <Layout padding={'60px 0'}>
      <StyledJoin>
        <Title1 />
        <Stepper steps={stepsData} activeIndex={0} />
        <SelectBorder />
      </StyledJoin>
    </Layout>
  );
};

export default JoinStep1;
