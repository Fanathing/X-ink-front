import { useState } from 'react';
import styled from 'styled-components';
import Dropdown from '../../components/Dropdowns/Dropdown';
import Button from '../../components/Buttons/Button';
import Text from '../../components/Texts/Text';
import Input from '../../components/Inputs/Input';


const SectionWrapper = styled.div`
  display: flex;
  flex-direction: space-between;
  justify-content: space-between;
  gap: 20px;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchSection = ({ children, onFilterChange, onSearch }) => {
  const [filter, setFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('검색 실행:', searchTerm);
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // 실시간 검색 적용
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SectionWrapper>
      {/* 필터 영역 */}
      <FilterRow>
        <Dropdown
          label="전체"
          options={['전체', '블록체인', '프론트', '백엔드']}
          onChange={handleFilterChange}
          defaultValue={filter}
        />
        <Text variant="title">{children}</Text>
      </FilterRow>

      {/* 검색 영역 */}
      <SearchRow>
        <Input
          variant="search"
          maxWidth="100%"
          placeholder="검색어를 입력해주세요."
          value={searchTerm}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
          onSearch={handleSearch}
        />
        <Button label="검색" variant="blue" size="sm" onClick={handleSearch} />
      </SearchRow>
    </SectionWrapper>
  );
};

export default SearchSection;