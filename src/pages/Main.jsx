import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import SearchSection from '../sections/SearchSection/SearchSection';
import CardGrid from '../sections/CardGrid/CardGrid';
import thumbnailImage from '../assets/images/image.png';
import { getJobs } from '../services/api';
import Pagination from '../components/Pagination/Pagination';
import { formatDday } from '../utils/formatDday';
import { useAuth } from '../contexts/AuthContext';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px;
  font-size: 18px;
  color: #D92828;
  background: #ffe8e8;
  border-radius: 12px;
`;

const Main = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  
  const ITEMS_PER_PAGE = 12; // 3줄 x 4개

  // 공고 데이터 로드
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobsData = await getJobs();
        
        // 현재 로그인한 사용자의 companyLogoURL 가져오기 (기업 로그인인 경우)
        const currentUserLogoURL = user?.LOGO_URL || user?.logoUrl || user?.companyLogoURL || null;
        const currentUserId = user?.id || user?.ID || user?.companyId || null;
        
        // 백엔드 응답을 프론트엔드 카드 형식으로 변환
        const formattedCards = jobsData.map((job) => {
          // 기업 로고 URL 결정 우선순위:
          // 1. job.companyLogoURL (백엔드에서 직접 제공)
          // 2. 현재 로그인한 사용자가 해당 기업의 소유자인 경우에만 user.LOGO_URL 사용
          // 3. 기본 이미지
          let logoURL = job.companyLogoURL;
          
          // 백엔드에서 companyLogoURL이 제공되지 않았고, 
          // 현재 로그인한 사용자가 해당 공고의 기업 소유자인 경우에만 적용
          if (!logoURL && currentUserLogoURL && job.companyId && currentUserId) {
            // companyId와 현재 사용자 ID를 정확히 비교
            if (String(job.companyId) === String(currentUserId)) {
              logoURL = currentUserLogoURL;
            }
          }
          
          return {
            id: job.id,
            image: logoURL || thumbnailImage,
            dday: formatDday(job.dday),
            label: job.position,
            title: job.title,
            companyId: job.companyId,
            companyName: job.companyName,
            status: job.status,
          };
        });
        
        setJobs(formattedCards);
      } catch (err) {
        console.error('❌ 공고 목록 로드 실패:', err);
        setError('공고 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]); // user 정보가 변경될 때마다 다시 로드 (새로고침 시 user 로드 후 jobs 재처리)

  // 필터와 검색어에 따라 jobs 필터링
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // 드롭다운 필터 적용
    if (filter !== '전체') {
      // 드롭다운 옵션을 실제 position 값으로 매핑
      const positionMap = {
        '프론트': '프론트엔드',
        '백엔드': '백엔드',
        '블록체인': '블록체인'
      };
      const positionValue = positionMap[filter] || filter;
      result = result.filter(job => job.label === positionValue);
    }

    // 검색어 필터 적용
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.companyName.toLowerCase().includes(searchLower) ||
        job.label.toLowerCase().includes(searchLower)
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
          <Breadcrumb variant="breadcrumb" items={['전체 공고 목록']} size="60px"/>
          <LoadingMessage>공고 목록을 불러오는 중입니다...</LoadingMessage>
        </PageWrapper>
      </Layout>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <Layout>
        <PageWrapper>
          <Breadcrumb
            variant="breadcrumb"
            items={['전체 공고 목록']}
          />
          {/* 검색 영역 */}
          <SearchSection>등록된 공고가 없습니다.</SearchSection>
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
          items={['전체 공고 목록']}
          size="60px"
        />

        {/* 검색 영역 */}
        <SearchSection 
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        >
          {filteredJobs.length > 0
            ? `총 ${filteredJobs.length}개의 공고들을 모았어요!`
            : '등록된 공고가 없습니다.'}
        </SearchSection>

        {/* 카드 목록 */}
        {filteredJobs.length > 0 ? (
          <>
            <CardGrid cards={paginatedJobs} marginTop={'0px'} />
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        ) : (
          <ErrorMessage>
            {searchTerm || filter !== '전체' 
              ? '검색 조건에 맞는 공고가 없습니다.' 
              : '등록된 공고가 없습니다.'}
          </ErrorMessage>
        )}
      </PageWrapper>
    </Layout>
  );
};

export default Main;
