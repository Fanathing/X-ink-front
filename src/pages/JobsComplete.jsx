import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Complete from '../components/Jobs/Complete';

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
        <Complete />
      </StyledJobsComplete>
    </Layout>
  );
};

export default JobsComplete;
