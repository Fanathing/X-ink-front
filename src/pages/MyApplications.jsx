import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import SearchSection from '../sections/SearchSection/SearchSection';
import CardGrid from '../sections/CardGrid/CardGrid';
import thumbnailImage from '../assets/images/image.png';
import { getMyApplications } from '../services/api';
import Pagination from '../components/Pagination/Pagination';
import { formatDday } from '../utils/formatDday';

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
  color: #d92828;
  background: #ffe8e8;
  border-radius: 12px;
`;

const MyApplications = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12; // 3줄 x 4개

  // 내가 지원한 공고 데이터 로드
  useEffect(() => {
    console.log('🔄 MyApplications - useEffect 실행, location.pathname:', location.pathname);
    
    const fetchMyApplications = async () => {
      try {
        console.log('📡 MyApplications - API 호출 시작');
        setLoading(true);
        setError(null);
        const applicationsData = await getMyApplications();
        console.log('📡 MyApplications - API 호출 완료');
        
        // 디버깅: API 응답 구조 확인
        console.log('🔍 MyApplications - API 응답 (전체):', applicationsData);
        console.log('🔍 MyApplications - 응답 타입:', typeof applicationsData);
        console.log('🔍 MyApplications - 배열 여부:', Array.isArray(applicationsData));
        
        // API 응답이 객체 형태인 경우 data 속성에서 배열 추출
        let applicationsArray = null;
        if (applicationsData && typeof applicationsData === 'object') {
          // 경우 1: {success: true, data: [...]} 형태
          if (applicationsData.data && Array.isArray(applicationsData.data)) {
            applicationsArray = applicationsData.data;
            console.log('✅ MyApplications - 응답에서 data 배열 추출:', applicationsArray);
          }
          // 경우 2: 직접 배열인 경우
          else if (Array.isArray(applicationsData)) {
            applicationsArray = applicationsData;
            console.log('✅ MyApplications - 응답이 직접 배열');
          }
          // 경우 3: {applications: [...]} 형태
          else if (applicationsData.applications && Array.isArray(applicationsData.applications)) {
            applicationsArray = applicationsData.applications;
            console.log('✅ MyApplications - 응답에서 applications 배열 추출');
          }
        }
        
        // 빈 배열인 경우 처리
        if (!applicationsArray || applicationsArray.length === 0) {
          console.log('📝 지원한 공고가 없습니다.');
          setJobs([]);
          setLoading(false);
          return;
        }
        
        // 첫 번째 항목 구조 확인
        if (applicationsArray.length > 0) {
          console.log('🔍 MyApplications - 첫 번째 항목 구조:', applicationsArray[0]);
          console.log('🔍 MyApplications - 첫 번째 항목 키:', Object.keys(applicationsArray[0]));
        }
        
        // 백엔드 응답을 프론트엔드 카드 형식으로 변환
        // 다양한 응답 구조 처리:
        // 1. { job: {...} } 형태
        // 2. 직접 job 객체 형태
        // 3. { jobId, ...job 정보 } 형태
        const formattedCards = applicationsArray
          .map((application, index) => {
            console.log(`🔍 MyApplications - 항목 ${index} 처리:`, application);
            
            // 다양한 구조에서 job 정보 추출
            let job = null;
            
            // 경우 1: application.job이 있는 경우
            if (application.job) {
              job = application.job;
              console.log(`  ✅ 경우 1: application.job 사용`);
            }
            // 경우 2: application이 직접 job 정보인 경우 (id, title 등이 바로 있음)
            else if (application.id && (application.title || application.companyName)) {
              job = application;
              console.log(`  ✅ 경우 2: application이 직접 job 정보`);
            }
            // 경우 3: application.jobId가 있고 다른 필드들이 있는 경우
            else if (application.jobId) {
              // jobId를 id로 매핑하고 나머지 필드 사용
              job = {
                id: application.jobId,
                ...application,
              };
              console.log(`  ✅ 경우 3: application.jobId 사용`);
            }
            
            // job 정보가 없으면 스킵
            if (!job || !job.id) {
              console.warn(`  ⚠️ 항목 ${index} - job 데이터 추출 실패:`, application);
              return null;
            }
            
            console.log(`  ✅ 항목 ${index} - 추출된 job:`, job);
            
            return {
              id: job.id,
              // 기업 로고 URL이 있으면 사용, 없으면 기본 이미지
              image: job.companyLogoURL || job.logoURL || thumbnailImage,
              dday: formatDday(job.dday),
              label: job.position,
              title: job.title,
              companyId: job.companyId,
              companyName: job.companyName,
              status: job.status,
              isApplied: true, // 내 지원 목록이므로 항상 true
            };
          })
          .filter((card) => card !== null); // null 제거

        console.log('✅ 변환된 카드 목록:', formattedCards);
        console.log('✅ 변환된 카드 개수:', formattedCards.length);
        setJobs(formattedCards);
      } catch (err) {
        console.error('❌ 지원한 공고 목록 로드 실패:', err);
        console.error('❌ 에러 상세:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        
        // 404나 빈 응답인 경우는 에러가 아닌 빈 목록으로 처리
        if (err.message?.includes('404') || 
            err.message?.includes('Not Found') ||
            err.response?.status === 404) {
          console.log('📝 지원한 공고가 없습니다. (404)');
          setJobs([]);
        } else {
          setError('지원한 공고 목록을 불러오는데 실패했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, [location.pathname]); // 페이지 경로가 변경될 때마다 실행 (다른 페이지에서 지원 후 돌아올 때)

  // 필터와 검색어에 따라 jobs 필터링
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // 드롭다운 필터 적용
    if (filter !== '전체') {
      // 드롭다운 옵션을 실제 position 값으로 매핑
      const positionMap = {
        프론트: '프론트엔드',
        백엔드: '백엔드',
        블록체인: '블록체인',
      };
      const positionValue = positionMap[filter] || filter;
      result = result.filter((job) => job.label === positionValue);
    }

    // 검색어 필터 적용
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.companyName.toLowerCase().includes(searchLower) ||
          job.label.toLowerCase().includes(searchLower),
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
          <Breadcrumb
            variant="breadcrumb"
            items={['내가 지원한 공고 목록']}
            size="60px"
          />
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
            items={['내가 지원한 공고 목록']}
          />
          {/* 검색 영역 */}
          <SearchSection>등록된 공고가 없습니다.</SearchSection>
          <ErrorMessage>{error || '지원한 공고가 없습니다.'}</ErrorMessage>
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
          items={['내가 지원한 공고 목록']}
          size="60px"
        />

        {/* 검색 영역 */}
        <SearchSection
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        >
          {filteredJobs.length > 0
            ? `총 ${filteredJobs.length}곳의 지원한 공고들을 모았어요!`
            : '지원한 공고가 없습니다.'}
        </SearchSection>

        {/* 카드 목록 */}
        {filteredJobs.length > 0 ? (
          <>
            <CardGrid variant='mycard' cards={paginatedJobs} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <ErrorMessage>
            {searchTerm || filter !== '전체'
              ? '검색 조건에 맞는 지원 공고가 없습니다.'
              : '지원한 공고가 없습니다.'}
          </ErrorMessage>
        )}
      </PageWrapper>
    </Layout>
  );
};

export default MyApplications;
