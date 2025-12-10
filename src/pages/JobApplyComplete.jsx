import styled from 'styled-components';
import Layout from '../layouts/Layout';
import ApplyComplete from '../components/JobsApplyForm/ApplyComplete';

const StyledJobsComplete = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const JobsComplete = () => {
  return (
    <Layout>
      <StyledJobsComplete>
        <ApplyComplete />
      </StyledJobsComplete>
    </Layout>
  );
};

export default JobsComplete;
