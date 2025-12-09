import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import Text from '../components/Texts/Text';
import Label from '../components/Labels/Label';
import Spreater from '../components/Spreater/Spreater';
import Button from '../components/Buttons/Button';
import Logo from '../assets/images/Logo.png';

const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 40px 330px;
  gap: 20px;
  width: 100%;
  max-width: 1260px;
  height: 636px;

  & > .detail-header {
    align-self: flex-start;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;
    height: 36px;
  }
  & > .detail-company-name {
    align-self: flex-start;
    
  }
  & > .detail-company-info {
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  & > .detail-job-info {
    align-self: flex-start;
    display: flex;
    gap: 29px;

    & > .detail-company-info-img {
      width: 350px;
      height: 300px;
      
      img {
        width: 100%;
        height: 100%;
      }
    }
    & > .card-content {
      width: 881px;
      height: 413px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
      justify-content: flex-start;
      border: 1.5px solid #03407e;
      box-shadow: 3px 3px 7px 0px #03407e;

      & > .card-position {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      & > .card-deadline {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      & > .card-description {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
    }
  }
`;

const Detail = () => {
  return (
    <Layout>
      <StyledDetail>
        <div className="detail-header">
          <Breadcrumb items={['공고 목록', 'react 개발자 모집']}></Breadcrumb>
        </div>
        <div className="detail-company-name">
          <Text variant="header" className="text-left">
            한국기계전기전자시험연구원
          </Text>
        </div>
        <div className="detail-company-info">
          <Label variant="primary">블록체인</Label>
          <Text>(3명 지원)</Text>
          <Text variant="title" color="red">
            D-17
          </Text>
          <Text variant="title">모집중</Text>
        </div>
        <div className="detail-job-info">
          <div className="detail-company-info-img">
            <img src={Logo} alt="logo" />
          </div>
          <div className="card-content">
            <Text variant="title">프론트 엔드 구합니다.</Text>
            <Spreater variant="thin"></Spreater>
            <div className="card-position">
              <Text variant="subtitle">포지션</Text>
              <Button
                border={'1px solid #2C6AA9'}
                radius={'4px'}
                color={'#2c6aa9'}
                backgroundColor={'#ffffff'}
              >
                프론트엔드
              </Button>
            </div>
            <div className="card-deadline">
              <Text variant="subtitle">마감일</Text>
              <Text variant="content">2025년 1월 18일</Text>
            </div>
            <div className="card-description">
              <Text variant="subtitle">업무설명</Text>
              <Text variant="content"> · 담당하게 될 업무에 대한 설명</Text>
              <Text variant="content"> · 담당하게 될 업무에 대한 설명</Text>
            </div>
          </div>
        </div>
      </StyledDetail>
    </Layout>
  );
};

export default Detail;
