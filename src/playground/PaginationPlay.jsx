import { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../components/Pagination/Pagination';

const Container = styled.div`
  padding: 40px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 60px;
  background: #FFFFFF;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-size: 24px;
  font-weight: 700;
  color: #3A4044;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const CurrentPageInfo = styled.div`
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 700;
  color: #03407E;
  margin-top: 20px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const ContentBox = styled.div`
  background: #f8f8f8;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const PaginationPlay = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [page3, setPage3] = useState(1);
  const [page4, setPage4] = useState(1);

  return (
    <Container>
      <Section>
        <Title>기본 Pagination (10 페이지)</Title>
        <Description>
          총 10개의 페이지가 있는 기본 페이지네이션입니다.
        </Description>
        <ContentBox>
          현재 {page1} 페이지의 콘텐츠를 보고 있습니다.
        </ContentBox>
        <PaginationWrapper>
          <Pagination
            currentPage={page1}
            totalPages={10}
            onPageChange={(page) => {
              setPage1(page);
              console.log('페이지 변경:', page);
            }}
          />
        </PaginationWrapper>
        <CurrentPageInfo>
          현재 페이지: {page1} / 10
        </CurrentPageInfo>
      </Section>

      <Section>
        <Title>많은 페이지 (50 페이지)</Title>
        <Description>
          총 50개의 페이지가 있을 때, 중간에 이 표시됩니다.
        </Description>
        <ContentBox>
          현재 {page2} 페이지의 콘텐츠를 보고 있습니다.
        </ContentBox>
        <PaginationWrapper>
          <Pagination
            currentPage={page2}
            totalPages={50}
            onPageChange={(page) => {
              setPage2(page);
              console.log('페이지 변경:', page);
            }}
          />
        </PaginationWrapper>
        <CurrentPageInfo>
          현재 페이지: {page2} / 50
        </CurrentPageInfo>
      </Section>

      <Section>
        <Title>적은 페이지 (3 페이지)</Title>
        <Description>
          총 3개의 페이지만 있을 때의 페이지네이션입니다.
        </Description>
        <ContentBox>
          현재 {page3} 페이지의 콘텐츠를 보고 있습니다.
        </ContentBox>
        <PaginationWrapper>
          <Pagination
            currentPage={page3}
            totalPages={3}
            onPageChange={(page) => {
              setPage3(page);
              console.log('페이지 변경:', page);
            }}
          />
        </PaginationWrapper>
        <CurrentPageInfo>
          현재 페이지: {page3} / 3
        </CurrentPageInfo>
      </Section>

      <Section>
        <Title>많은 페이지 표시 (100 페이지, 7개 표시)</Title>
        <Description>
          총 100개의 페이지가 있고, 최대 7개의 페이지 번호를 표시합니다.
        </Description>
        <ContentBox>
          현재 {page4} 페이지의 콘텐츠를 보고 있습니다.
        </ContentBox>
        <PaginationWrapper>
          <Pagination
            currentPage={page4}
            totalPages={100}
            maxVisiblePages={7}
            onPageChange={(page) => {
              setPage4(page);
              console.log('페이지 변경:', page);
            }}
          />
        </PaginationWrapper>
        <CurrentPageInfo>
          현재 페이지: {page4} / 100
        </CurrentPageInfo>
      </Section>

      <Section>
        <Title>사용 방법</Title>
        <Description>
          <strong>Props:</strong>
          <br />
          • <code>currentPage</code>: 현재 페이지 번호 (기본값: 1)
          <br />
          • <code>totalPages</code>: 전체 페이지 수 (기본값: 10)
          <br />
          • <code>onPageChange</code>: 페이지 변경 시 호출되는 콜백 함수
          <br />
          • <code>maxVisiblePages</code>: 한 번에 보여줄 최대 페이지 수 (기본값: 5)
        </Description>
      </Section>
    </Container>
  );
};

export default PaginationPlay;

