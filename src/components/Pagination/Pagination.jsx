import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowIcon, DoubleArrowIcon } from '../Icons';

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  width: fit-content;
  height: 32px;
  margin-left: auto; /* 오른쪽으로 밀기 */
  margin-top: auto;
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

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 10, 
  onPageChange,
  maxVisiblePages = 3 
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  // currentPage prop이 변경되면 activePage 동기화
  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

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
        <DoubleArrowIcon direction="left" color="#333333" fontSize="12px" />
      </Control>

      {/* Previous Page */}
      <Control
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
        aria-label="이전 페이지"
      >
        <ArrowIcon direction="left" color="#000000" fontSize="14px" />
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
        <ArrowIcon direction="right" color="#000000" fontSize="14px" />
      </Control>

      {/* Last Page */}
      <Control
        onClick={() => handlePageChange(totalPages)}
        disabled={activePage === totalPages}
        aria-label="마지막 페이지"
      >
        <DoubleArrowIcon direction="right" color="#000000" fontSize="12px" />
      </Control>
    </PaginationContainer>
  );
};

export default Pagination;

