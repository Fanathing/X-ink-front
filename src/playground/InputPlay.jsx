import styled from 'styled-components';
import Input from '../components/Inputs/Input';
import TextArea from '../components/Inputs/TextArea';

const PlaygroundContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const InputPlay = () => {
  const handleSearch = () => {
    console.log('검색 아이콘 클릭');
  };

  return (
    <PlaygroundContainer>
      <Section>
        <SectionTitle>1. 기본 인풋 (400x48)</SectionTitle>
        <Input variant="basic" placeholder="기본 입력창입니다" />
      </Section>

      <Section>
        <SectionTitle>4. TextArea (590x200)</SectionTitle>
        {/* TextArea is a standalone component to show multi-line input with label */}
        <TextArea label="메모" placeholder="메모장" />
      </Section>

      <Section>
        <SectionTitle>2. 라벨 인풋 (590x75)</SectionTitle>
        <Input
          variant="label"
          label="이메일"
          required
          placeholder="이메일을 입력하세요"
        />
      </Section>

      <Section>
        <SectionTitle>3. 검색 인풋 (유동적 크기, 기본 1420x54)</SectionTitle>
        <Input
          variant="search"
          placeholder="검색어를 입력하세요"
          onSearch={handleSearch}
        />
        <Input
          variant="search"
          placeholder="작은 검색창 (800px)"
          maxWidth="800px"
          onSearch={handleSearch}
        />
        <Input
          variant="search"
          placeholder="큰 검색창 (100%)"
          maxWidth="100%"
          onSearch={handleSearch}
        />
      </Section>
    </PlaygroundContainer>
  );
};

export default InputPlay;
