import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import SearchSection from '../sections/SearchSection/SearchSection';
import CardGrid from '../sections/CardGrid/CardGrid';
import defaultProfileImage from '../assets/images/profile.png';
import { getVolunteers } from '../services/api';
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

const JobApplicantSearch = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 15; // 5줄 x 3개

  // 개인 유저(구직자) 데이터 로드
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        setError(null);
        const volunteersData = await getVolunteers();
        
        // API 응답이 객체 형태인 경우 data 속성에서 배열 추출
        let volunteersArray = null;
        if (volunteersData && typeof volunteersData === 'object') {
          if (volunteersData.data && Array.isArray(volunteersData.data)) {
            volunteersArray = volunteersData.data;
          } else if (Array.isArray(volunteersData)) {
            volunteersArray = volunteersData;
          } else if (volunteersData.volunteers && Array.isArray(volunteersData.volunteers)) {
            volunteersArray = volunteersData.volunteers;
          }
        }
        
        if (!volunteersArray || volunteersArray.length === 0) {
          setVolunteers([]);
          setLoading(false);
          return;
        }
        
        // 백엔드 응답을 profile3 카드 형식으로 변환
        const formattedCards = volunteersArray.map((volunteer) => {
          // 백엔드 API 응답 구조에 맞춰 필드 매핑
          const name = volunteer.name || '구직자';
          const email = volunteer.email || '';
          const phoneNumber = volunteer.phoneNumber || volunteer.phone_number || '';
          const position = volunteer.position || '';
          const thumbnailUrl = volunteer.thumbnailUrl || volunteer.thumbnail || null;
          const intro = volunteer.intro || ''; // 백엔드에서 intro로 정의됨
          
          return {
            id: volunteer.id,
            // 프로필 이미지: 업로드된 이미지가 있으면 사용, 없으면 기본 이미지
            profileImage: thumbnailUrl || defaultProfileImage,
            name: name,
            labels: position ? [position] : [], // 포지션을 라벨로 변환
            email: email,
            phoneNumber: phoneNumber, // 폰번호 추가
            role: position || '', // 역할 (포지션)
            intro: intro || '', // 자기소개 (bio → intro로 변경)
          };
        });
        
        setVolunteers(formattedCards);
      } catch (err) {
        setError('구직자 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 필터와 검색어에 따라 volunteers 필터링
  const filteredVolunteers = useMemo(() => {
    let result = [...volunteers];

    // 드롭다운 필터 적용 (labels 배열에서 검색)
    if (filter !== '전체') {
      // 드롭다운 옵션을 실제 position 값으로 매핑
      const positionMap = {
        '프론트': '프론트엔드',
        '백엔드': '백엔드',
        '블록체인': '블록체인'
      };
      const positionValue = positionMap[filter] || filter;
      result = result.filter(volunteer => 
        volunteer.labels && volunteer.labels.some(label => label === positionValue)
      );
    }

    // 검색어 필터 적용 (name, email, role, bio에서 검색)
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(volunteer => 
        (volunteer.name && volunteer.name.toLowerCase().includes(searchLower)) ||
        (volunteer.email && volunteer.email.toLowerCase().includes(searchLower)) ||
        (volunteer.role && volunteer.role.toLowerCase().includes(searchLower)) ||
        (volunteer.intro && volunteer.intro.toLowerCase().includes(searchLower)) ||
        (volunteer.labels && volunteer.labels.some(label => label.toLowerCase().includes(searchLower)))
      );
    }

    return result;
  }, [volunteers, filter, searchTerm]);

  // 필터나 검색어가 변경되면 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  // 페이지네이션을 위한 계산
  const totalPages = Math.ceil(filteredVolunteers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedVolunteers = filteredVolunteers.slice(startIndex, endIndex);

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
        <Breadcrumb variant="breadcrumb" items={['구직자 탐색']} size="60px" />

        {/* 검색 영역 */}
        <SearchSection
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        >
          {filteredVolunteers.length > 0
            ? `총 ${filteredVolunteers.length}명의 구직자들을 모았어요 !`
            : '등록된 구직자가 없습니다.'}
        </SearchSection>

        {/* 카드 목록 */}
        {filteredVolunteers.length > 0 ? (
          <>
            <CardGrid
              variant="profile3"
              gap='40px'
              spaceBetween={true}
              cards={paginatedVolunteers}
            />

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