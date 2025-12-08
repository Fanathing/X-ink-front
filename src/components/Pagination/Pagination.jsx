import { useState } from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  width: fit-content;
  height: 32px;
`;

const Control = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 32px;
  height: 32px;
  background: #FFFFFF;
  border: 1px solid #F1F1F1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #03407E;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Page = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 32px;
  height: 32px;
  background: ${props => props.$isActive ? '#03407E' : '#FFFFFF'};
  border: ${props => props.$isActive ? 'none' : '1px solid #F1F1F1'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: ${props => props.$isActive ? '#FFFFFF' : '#333333'};

  &:hover:not(:disabled) {
    background: ${props => props.$isActive ? '#03407E' : '#f8f8f8'};
    border-color: ${props => props.$isActive ? 'none' : '#03407E'};
  }

  &:disabled {
    cursor: default;
  }
`;

const Ellipsis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 32px;
  height: 32px;
  background: #FFFFFF;
  border-radius: 8px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: #333333;
`;

const Icon = styled.svg`
  width: 16px;
  height: 16px;
`;

const FirstIcon = () => (
  <Icon viewBox="0 0 16 16" fill="none">
    <path d="M11 4L7 8L11 12" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 4L3 8L7 12" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Icon>
);

const PrevIcon = () => (
  <Icon viewBox="0 0 16 16" fill="none">
    <path d="M10 4L6 8L10 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Icon>
);

const NextIcon = () => (
  <Icon viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Icon>
);

const LastIcon = () => (
  <Icon viewBox="0 0 16 16" fill="none">
    <path d="M5 4L9 8L5 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 4L13 8L9 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Icon>
);

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 10, 
  onPageChange,
  maxVisiblePages = 5 
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === activePage) return;
    setActivePage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, activePage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // 첫 페이지
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // 중간 페이지들
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 마지막 페이지
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      {/* First Page */}
      <Control
        onClick={() => handlePageChange(1)}
        disabled={activePage === 1}
        aria-label="첫 페이지"
      >
        <FirstIcon />
      </Control>

      {/* Previous Page */}
      <Control
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
        aria-label="이전 페이지"
      >
        <PrevIcon />
      </Control>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>;
        }
        return (
          <Page
            key={page}
            $isActive={page === activePage}
            onClick={() => handlePageChange(page)}
            aria-label={`페이지 ${page}`}
            aria-current={page === activePage ? 'page' : undefined}
          >
            {page}
          </Page>
        );
      })}

      {/* Next Page */}
      <Control
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
        aria-label="다음 페이지"
      >
        <NextIcon />
      </Control>

      {/* Last Page */}
      <Control
        onClick={() => handlePageChange(totalPages)}
        disabled={activePage === totalPages}
        aria-label="마지막 페이지"
      >
        <LastIcon />
      </Control>
    </PaginationContainer>
  );
};

export default Pagination;

