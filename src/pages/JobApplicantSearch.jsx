import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import SearchSection from '../sections/SearchSection/SearchSection';
import CardGrid from '../sections/CardGrid/CardGrid';
import defaultProfileImage from '../assets/images/profile.png';
import { getJobs } from '../services/api';
import Pagination from '../components/Pagination/Pagination';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px;
  font-family: 'Noto Sans KR';
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px;
  font-family: 'Noto Sans KR';
  font-size: 18px;
  color: #D92828;
  background: #ffe8e8;
  border-radius: 12px;
`;

const JobApplicantSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 15; // 5줄 x 3개

  // 공고 데이터 로드
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobsData = await getJobs();
        // 백엔드 응답을 profile3 카드 형식으로 변환
        const formattedCards = jobsData.map((job) => ({
          id: job.id,
          profileImage: defaultProfileImage, // 프로필 이미지
          name: job.companyName || '구직자', // 이름 (회사명 사용)
          labels: job.position ? [job.position] : [], // 포지션을 라벨로 변환
          email: `applicant${job.id}@example.com`, // 이메일 (더미 데이터)
          role: job.position || '', // 역할 (포지션)
          bio: job.title || '', // 소개 (공고 제목)
          companyId: job.companyId,
          status: job.status,
        }));
        
        setJobs(formattedCards);
      } catch (err) {
        console.error('❌ 구직자 목록 로드 실패:', err);
        setError('구직자 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 필터와 검색어에 따라 jobs 필터링
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // 드롭다운 필터 적용 (labels 배열에서 검색)
    if (filter !== '전체') {
      // 드롭다운 옵션을 실제 position 값으로 매핑
      const positionMap = {
        '프론트': '프론트엔드',
        '백엔드': '백엔드',
        '블록체인': '블록체인'
      };
      const positionValue = positionMap[filter] || filter;
      result = result.filter(job => 
        job.labels && job.labels.some(label => label === positionValue)
      );
    }

    // 검색어 필터 적용 (name, email, role, bio에서 검색)
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(job => 
        (job.name && job.name.toLowerCase().includes(searchLower)) ||
        (job.email && job.email.toLowerCase().includes(searchLower)) ||
        (job.role && job.role.toLowerCase().includes(searchLower)) ||
        (job.bio && job.bio.toLowerCase().includes(searchLower)) ||
        (job.labels && job.labels.some(label => label.toLowerCase().includes(searchLower)))
      );
    }

    return result;
  }, [jobs, filter, searchTerm]);

  // 필터나 검색어가 변경되면 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  // 페이지네이션을 위한 계산
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  // 필터 변경 핸들러
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // 검색 핸들러
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤을 상단으로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 로딩 중
  if (loading) {
    return (
      <Layout>
        <PageWrapper>
          <Breadcrumb variant="breadcrumb" items={['구직자 탐색']} size="60px"/>
          <LoadingMessage>구직자 목록을 불러오는 중입니다...</LoadingMessage>
        </PageWrapper>
      </Layout>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <Layout>
        <PageWrapper>
          <Breadcrumb variant="breadcrumb" items={['구직자 탐색']} />
          {/* 검색 영역 */}
          <SearchSection>등록된 구직자가 없습니다.</SearchSection>
          <ErrorMessage>{error || '등록된 공고가 없습니다.'}</ErrorMessage>
        </PageWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageWrapper>
        {/* 현재 위치 네비게이션 */}
        <Breadcrumb
          variant="breadcrumb"
          items={['구직자 탐색']}
          size="60px"
        />

        {/* 검색 영역 */}
        <SearchSection 
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        >
          {filteredJobs.length > 0
            ? `총 ${filteredJobs.length}명의 구직자들을 모았어요 !`
            : '등록된 구직자가 없습니다.'}
        </SearchSection>

        {/* 카드 목록 */}
        {filteredJobs.length > 0 ? (
          <>
          <CardGrid variant='profile3' cards={paginatedJobs}/>

            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        ) : (
          <ErrorMessage>
            {searchTerm || filter !== '전체' 
              ? '검색 조건에 맞는 구직자가 없습니다.' 
              : '등록된 구직자가 없습니다.'}
          </ErrorMessage>
        )}
      </PageWrapper>
    </Layout>
  );
};

export default JobApplicantSearch;