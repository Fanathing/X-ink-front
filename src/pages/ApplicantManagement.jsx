import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import SearchSection from '../sections/SearchSection/SearchSection';
import CardGrid from '../sections/CardGrid/CardGrid';
import defaultProfileImage from '../assets/images/profile.png';
import { getApplicants } from '../services/api';
import Pagination from '../components/Pagination/Pagination';

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

const ApplicantManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 15; // 5줄 x 3개

  // 지원자 데이터 로드
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('📡 ApplicantManagement - API 호출 시작');
        const applicantsData = await getApplicants();
        console.log('📡 ApplicantManagement - API 호출 완료');
        console.log('🔍 ApplicantManagement - API 응답:', applicantsData);
        
        // API 응답이 객체 형태인 경우 data 속성에서 배열 추출
        let applicantsArray = null;
        if (applicantsData && typeof applicantsData === 'object') {
          if (applicantsData.data && Array.isArray(applicantsData.data)) {
            applicantsArray = applicantsData.data;
          } else if (Array.isArray(applicantsData)) {
            applicantsArray = applicantsData;
          } else if (applicantsData.applicants && Array.isArray(applicantsData.applicants)) {
            applicantsArray = applicantsData.applicants;
          }
        }
        
        if (!applicantsArray || applicantsArray.length === 0) {
          console.log('📝 등록된 지원자가 없습니다.');
          setJobs([]);
          setLoading(false);
          return;
        }
        
        // 백엔드 응답을 profile4 카드 형식으로 변환
        const formattedCards = applicantsArray.map((applicant) => {
          // 백엔드 API 응답 구조에 맞춰 필드 매핑
          // 백엔드 필드: userName, userEmail, userPhoneNumber, userPosition, userIntro, thumbnailUrl
          const name = applicant.userName || applicant.name || '지원자';
          const email = applicant.userEmail || applicant.email || '';
          const phoneNumber = applicant.userPhoneNumber || applicant.phoneNumber || applicant.phone_number || '';
          const position = applicant.userPosition || applicant.position || '';
          const thumbnailUrl = applicant.thumbnailUrl || applicant.thumbnail || null;
          const intro = applicant.userIntro || applicant.intro || '';
          
          console.log('🔍 ApplicantManagement - 지원자 데이터:', {
            id: applicant.id,
            jobsId: applicant.jobsId,
            userId: applicant.userId,
            name,
            email,
            phoneNumber,
            position,
            thumbnailUrl,
            intro,
            status: applicant.status,
          });
          
          return {
            id: applicant.id,
            jobsId: applicant.jobsId,
            userId: applicant.userId,
            // 썸네일 이미지: 업로드된 이미지가 있으면 사용, 없으면 기본 이미지
            profileImage: thumbnailUrl || defaultProfileImage,
            // 이름
            name: name,
            // 포지션 라벨
            labels: position ? [position] : [],
            // 이메일
            email: email,
            // 폰번호
            phoneNumber: phoneNumber,
            // 포지션 (role 필드에도 포함)
            role: position || '',
            // 자기소개 (intro)
            bio: intro || '',
            intro: intro || '',
            // 지원완료 상태 (status가 "지원완료"이거나 항상 true)
            isApplied: applicant.status === '지원완료' || true,
          };
        });
        
        console.log('✅ ApplicantManagement - 변환된 카드 목록:', formattedCards);
        setJobs(formattedCards);
      } catch (err) {
        console.error('❌ ApplicantManagement - 지원자 목록 로드 실패:', err);
        console.error('❌ ApplicantManagement - 에러 상세:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        setError('지원자 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 필터와 검색어에 따라 jobs 필터링
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // 드롭다운 필터 적용 (labels 배열에서 검색)
    if (filter !== '전체') {
      // 드롭다운 옵션을 실제 position 값으로 매핑
      const positionMap = {
        프론트: '프론트엔드',
        백엔드: '백엔드',
        블록체인: '블록체인',
      };
      const positionValue = positionMap[filter] || filter;
      result = result.filter(
        (job) =>
          job.labels && job.labels.some((label) => label === positionValue),
      );
    }

    // 검색어 필터 적용 (name, email, role, bio에서 검색)
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          (job.name && job.name.toLowerCase().includes(searchLower)) ||
          (job.email && job.email.toLowerCase().includes(searchLower)) ||
          (job.role && job.role.toLowerCase().includes(searchLower)) ||
          (job.bio && job.bio.toLowerCase().includes(searchLower)) ||
          (job.intro && job.intro.toLowerCase().includes(searchLower)) ||
          (job.labels &&
            job.labels.some((label) =>
              label.toLowerCase().includes(searchLower),
            )),
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
            items={['지원자 관리']}
            size="60px"
          />
          <LoadingMessage>지원자 목록을 불러오는 중입니다...</LoadingMessage>
        </PageWrapper>
      </Layout>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <Layout>
        <PageWrapper>
          <Breadcrumb variant="breadcrumb" items={['지원자 관리']} />
          {/* 검색 영역 */}
          <SearchSection>등록된 지원자가 없습니다.</SearchSection>
          <ErrorMessage>{error || '등록된 지원자가 없습니다.'}</ErrorMessage>
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
          items={['지원자 관리']}
          size="60px"
        />

        {/* 검색 영역 */}
        <SearchSection
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        >
          {filteredJobs.length > 0
            ? `총 ${filteredJobs.length}명의 지원자가 있어요 !`
            : '등록된 지원자가 없습니다.'}
        </SearchSection>

        {/* 카드 목록 */}
        {filteredJobs.length > 0 ? (
          <>
            <CardGrid variant="profile4" cards={paginatedJobs} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <ErrorMessage>
            {searchTerm || filter !== '전체'
              ? '검색 조건에 맞는 지원자가 없습니다.'
              : '등록된 지원자가 없습니다.'}
          </ErrorMessage>
        )}
      </PageWrapper>
    </Layout>
  );
};

export default ApplicantManagement;