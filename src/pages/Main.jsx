import styled from 'styled-components';
import Text from '../components/Texts/Text';
import Layout from '../layouts/Layout';
import Container from '../layouts/container';
import SearchSection from '../sections/SearchSection/SearchSection';
import CardGrid from '../sections/CardGrid/CardGrid';
import thumbnailImage from '../assets/images/image.png';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Main = () => {
  // 카드 데이터 (나중에 API에서 받아올 예정)
  const cardData = [
    {
      image: thumbnailImage,
      dday: 'D-7',
      label: '프론트엔드',
      title: 'React 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-7',
      label: '프론트엔드',
      title: 'React 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-7',
      label: '프론트엔드',
      title: 'React 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-7',
      label: '프론트엔드',
      title: 'React 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-5',
      label: '백엔드',
      title: 'Node.js 개발자 모집',
      description: '백엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-10',
      label: '블록체인',
      title: 'Solidity 개발자 모집',
      description: '블록체인 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-3',
      label: '프론트엔드',
      title: 'Vue.js 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-12',
      label: '백엔드',
      title: 'Java 개발자 모집',
      description: '백엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-8',
      label: '프론트엔드',
      title: 'Next.js 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-12',
      label: '백엔드',
      title: 'Java 개발자 모집',
      description: '백엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-8',
      label: '프론트엔드',
      title: 'Next.js 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-12',
      label: '백엔드',
      title: 'Java 개발자 모집',
      description: '백엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-8',
      label: '프론트엔드',
      title: 'Next.js 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
  ];

  return (
    <Layout>
      <Container maxWidth="1260px">
        <PageWrapper>
          {/* 페이지 제목 */}
          <Text variant="title">전체 공고 목록</Text>

          {/* 검색 영역 */}
          <SearchSection>관련 공고들을 모았어요!</SearchSection>

          {/* 카드 목록 */}
          <CardGrid cards={cardData} />
        </PageWrapper>
      </Container>
    </Layout>
  );
};

export default Main;
