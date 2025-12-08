import styled from 'styled-components';
import {
  UserDropdown,
  CompanyDropdown,
  SortDropdown,
  CategoryDropdown
} from '../components/Dropdowns';

const Container = styled.div`
  padding: 40px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-size: 24px;
  font-weight: 700;
  color: #3A4044;
  margin-bottom: 20px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const DropdownPlay = () => {
  const handleUserSelect = (id) => {
    console.log('User dropdown selected:', id);
    if (id === 'logout') {
      alert('로그아웃 되었습니다.');
    }
  };

  const handleCompanySelect = (id) => {
    console.log('Company dropdown selected:', id);
    if (id === 'logout') {
      alert('로그아웃 되었습니다.');
    }
  };

  const handleSortSelect = (id) => {
    console.log('Sort selected:', id);
  };

  const handleCategorySelect = (id) => {
    console.log('Category selected:', id);
  };

  return (
    <Container>
      <Section>
        <Title>사용자 메뉴 드롭다운 (300px)</Title>
        <DropdownWrapper>
          <UserDropdown onSelect={handleUserSelect} />
        </DropdownWrapper>
      </Section>

      <Section>
        <Title>기업 메뉴 드롭다운 (300px)</Title>
        <DropdownWrapper>
          <CompanyDropdown onSelect={handleCompanySelect} />
        </DropdownWrapper>
      </Section>

      <Section>
        <Title>정렬 드롭다운 (170px)</Title>
        <DropdownWrapper>
          <SortDropdown onSelect={handleSortSelect} />
        </DropdownWrapper>
      </Section>

      <Section>
        <Title>카테고리 드롭다운 (170px)</Title>
        <DropdownWrapper>
          <CategoryDropdown onSelect={handleCategorySelect} />
        </DropdownWrapper>
      </Section>

      <Section>
        <Title>모든 드롭다운 한눈에 보기</Title>
        <DropdownWrapper>
          <UserDropdown onSelect={handleUserSelect} />
          <CompanyDropdown onSelect={handleCompanySelect} />
          <SortDropdown onSelect={handleSortSelect} />
          <CategoryDropdown onSelect={handleCategorySelect} />
        </DropdownWrapper>
      </Section>
    </Container>
  );
};

export default DropdownPlay;

