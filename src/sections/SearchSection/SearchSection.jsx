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
  margin: 20px 0;
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

const SearchSection = ({ children }) => {
  const handleSearch = () => {
    console.log('검색 실행');
  };

  const handleFilterChange = (value) => {
    console.log('필터 변경:', value);
  };

  return (
    <SectionWrapper>
      {/* 필터 영역 */}
      <FilterRow>
        <Dropdown
          label="전체"
          options={['전체', '블록체인', '프론트', '백엔드']}
          onChange={handleFilterChange}
        />
        <Text variant="title">{children}</Text>
      </FilterRow>

      {/* 검색 영역 */}
      <SearchRow>
        <Input variant="search" maxWidth="100%" placeholder="검색어를 입력해주세요." />
        <Button label="검색" variant="blue" size="sm" onClick={handleSearch} />
      </SearchRow>
    </SectionWrapper>
  );
};

export default SearchSection;