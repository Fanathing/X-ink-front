import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Breadcrumb from '../components/Navigation/Breadcrumb';


const StyledDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Detail = () => {
    return (
      <Layout>
        <StyledDetail>
          <Breadcrumb items={['공고 목록', 'react 개발자 모집']}></Breadcrumb>
        </StyledDetail>
      </Layout>
    );
}

export default Detail;