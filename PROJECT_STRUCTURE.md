# 프로젝트 구조 가이드

## 📁 디렉토리 구조

```
src/
├── service/                # 백엔드 요청 코드 파일 모음
│   ├── API_SPEC.md/        # 요청에 대한 API 명세서 (어떻게 요청하고, 어떤 데이터가 넘어오는가?)
│   ├── api.js/             # 백엔드 요청 엔드포인트 함수 모음
│   ├── baseurl.config.js/  # 요청 기본 도메인 설정
│   └── fetch.config.js/    # AJAX 모듈 fetch를 편하게 보내기 위한 설정
├── components/             # 재사용 가능한 공통 컴포넌트
│   ├── Buttons/            # 버튼 컴포넌트
│   ├── Cards/              # 카드 컴포넌트
│   ├── Inputs/             # 입력 컴포넌트
│   ├── Texts/              # 텍스트 컴포넌트
│   └── Dropdown/           # 드롭다운 컴포넌트
│
├── sections/               # 페이지 섹션 컴포넌트 (페이지 특화)
│   ├── SearchSection/      # 검색 영역
│   └── CardGrid/           # 카드 그리드
│
├── pages/                  # 페이지 컴포넌트 (섹션 조립)
│   ├── Main.jsx
│   ├── Login.jsx
│   └── CompanyLogin.jsx
│
├── layouts/                # 레이아웃 컴포넌트
│   ├── Layout.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Container.jsx
│
├── playground/             # 컴포넌트 테스트/개발용
│   ├── ButtonPlay.jsx
│   ├── CardPlay.jsx
│   └── InputPlay.jsx
│
└── assets/                 # 정적 자산
    └── images/
```

---

## 🎯 각 디렉토리의 역할

### 1. **components/** - 공통 컴포넌트
**역할**: 프로젝트 전체에서 재사용 가능한 UI 컴포넌트

**특징**:
- ✅ 재사용성이 높음
- ✅ 비즈니스 로직이 없음
- ✅ Props로 동작을 제어
- ✅ styled-components로 스타일 관리

**예시**:
```jsx
// ❌ 잘못된 사용
<Button onClick={() => console.log('로그인')}>로그인</Button>

// ✅ 올바른 사용
<Button 
  label="로그인" 
  variant="blue" 
  size="md"
  onClick={handleLogin}
/>
```

---

### 2. **sections/** - 섹션 컴포넌트
**역할**: 페이지의 특정 영역을 담당하는 컴포넌트

**특징**:
- ✅ 여러 공통 컴포넌트를 조합
- ✅ 페이지 특화 레이아웃
- ✅ 섹션별 스타일 관리
- ✅ 약간의 로직 포함 가능

**예시**:
```jsx
// SearchSection.jsx
const SearchSection = ({ onSearch, onFilterChange, filterOptions }) => {
  return (
    <SectionWrapper>
      <FilterRow>
        <Dropdown options={filterOptions} onChange={onFilterChange} />
        <Text variant="title">관련 공고들을 모았어요!</Text>
      </FilterRow>
      <SearchRow>
        <Input variant="search" />
        <Button label="검색" onClick={onSearch} />
      </SearchRow>
    </SectionWrapper>
  );
};
```

---

### 3. **pages/** - 페이지 컴포넌트
**역할**: 섹션들을 조립하여 완성된 페이지를 구성

**특징**:
- ✅ 섹션 컴포넌트를 조합
- ✅ 페이지 레벨 상태 관리
- ✅ API 호출 및 데이터 관리
- ✅ 라우팅 대상

**예시**:
```jsx
// Main.jsx
const Main = () => {
  const [cardData, setCardData] = useState([]);

  const handleSearch = () => {
    // 검색 로직
  };

  return (
    <Layout>
      <Container maxWidth="1260px">
        <PageWrapper>
          <PageTitle>
            <Text variant="subtitle">전체 공고 목록</Text>
          </PageTitle>
          
          <SearchSection onSearch={handleSearch} />
          <CardGrid cards={cardData} />
        </PageWrapper>
      </Container>
    </Layout>
  );
};
```

---

### 4. **layouts/** - 레이아웃 컴포넌트
**역할**: 페이지의 전체적인 레이아웃 구조

**특징**:
- ✅ Header, Footer, Sidebar 등
- ✅ 전체 페이지에서 공통으로 사용
- ✅ 페이지 래퍼 역할

---

### 5. **playground/** - 개발/테스트용
**역할**: 컴포넌트 개발 및 테스트

**특징**:
- ✅ 컴포넌트 동작 확인
- ✅ 다양한 variant 테스트
- ✅ 개발 중에만 사용

---

## ✨ 좋은 코드 vs 나쁜 코드

### ❌ **나쁜 코드 (이전)**

```jsx
// Main.jsx - 인라인 스타일, 반복 코드, 지저분함
const Main = () => {
  return (
    <Layout>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Dropdown />
          <Input />
          <Button />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <Card variant="default" image={img} dday="D-7" />
          <Card variant="default" image={img} dday="D-7" />
          <Card variant="default" image={img} dday="D-7" />
          {/* 반복... */}
        </div>
      </Container>
    </Layout>
  );
};
```

**문제점**:
- 인라인 스타일이 너무 많음
- 반복되는 코드
- 레이아웃 로직이 페이지에 섞여있음
- 유지보수 어려움

---

### ✅ **좋은 코드 (현재)**

```jsx
// Main.jsx - 깔끔하고 읽기 쉬움
const Main = () => {
  const handleSearch = () => { /* ... */ };
  const handleFilterChange = (value) => { /* ... */ };
  
  const cardData = [/* API 데이터 */];

  return (
    <Layout>
      <Container maxWidth="1260px">
        <PageWrapper>
          <PageTitle>
            <Text variant="subtitle">전체 공고 목록</Text>
          </PageTitle>
          
          <SearchSection 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
          
          <CardGrid cards={cardData} variant="default" />
        </PageWrapper>
      </Container>
    </Layout>
  );
};
```

**장점**:
- ✅ 페이지 구조가 한눈에 보임
- ✅ 각 섹션의 역할이 명확함
- ✅ 스타일은 섹션 컴포넌트에서 관리
- ✅ 유지보수가 쉬움
- ✅ 재사용 가능

---

## 📋 코딩 규칙

### 1. 스타일링 규칙
```jsx
// ❌ 인라인 스타일 사용 금지
<div style={{ display: 'flex', gap: '20px' }}>

// ✅ styled-components 사용
const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;
```

### 2. 컴포넌트 분리 규칙
```jsx
// ❌ 한 파일에 모든 로직
const Page = () => {
  return (
    <div>
      <div>{/* 검색 영역 */}</div>
      <div>{/* 필터 영역 */}</div>
      <div>{/* 카드 영역 */}</div>
    </div>
  );
};

// ✅ 섹션별로 분리
const Page = () => {
  return (
    <div>
      <SearchSection />
      <FilterSection />
      <CardSection />
    </div>
  );
};
```

### 3. Props 전달 규칙
```jsx
// ❌ 과도한 props
<Component 
  title="제목"
  desc="설명"
  img="이미지"
  author="작성자"
  date="날짜"
  // ... 10개 이상
/>

// ✅ 객체로 묶어서 전달
<Component data={{ title, desc, img, author, date }} />
```

---

## 🚀 실무에서 이렇게 사용합니다

### 새로운 페이지 추가할 때

1. **공통 컴포넌트 사용**: `components/`에서 필요한 컴포넌트 import
2. **섹션 만들기**: 페이지 특화 섹션이 필요하면 `sections/`에 생성
3. **페이지 조립**: `pages/`에서 섹션들을 조합

```jsx
// pages/JobDetail.jsx
import Layout from '../layouts/Layout';
import Container from '../layouts/Container';
import JobHeader from '../sections/JobHeader/JobHeader';
import JobDescription from '../sections/JobDescription/JobDescription';
import ApplySection from '../sections/ApplySection/ApplySection';

const JobDetail = () => {
  return (
    <Layout>
      <Container>
        <JobHeader />
        <JobDescription />
        <ApplySection />
      </Container>
    </Layout>
  );
};
```

---

## 💡 FAQ

**Q: sections와 components의 차이가 뭔가요?**
- `components`: 프로젝트 전체에서 재사용 (Button, Input, Card)
- `sections`: 특정 페이지에서만 사용 (SearchSection, CardGrid)

**Q: 언제 새로운 섹션을 만들어야 하나요?**
- 페이지에서 논리적으로 구분되는 영역일 때
- 여러 컴포넌트를 조합해야 할 때
- 레이아웃 로직이 복잡할 때

**Q: playground는 배포할 때도 포함하나요?**
- 개발용이므로 배포 시 제외하거나 개발 환경에서만 접근 가능하게 설정

---

## ✅ 현재 프로젝트 상태

현재 프로젝트는 **실무 수준의 구조**로 개선되었습니다!

- ✅ 컴포넌트 분리가 명확함
- ✅ 재사용성이 높음
- ✅ 유지보수가 쉬움
- ✅ 코드 가독성이 좋음
- ✅ 초급자도 이해하기 쉬운 구조

**이제 자신있게 포트폴리오에 사용하셔도 됩니다!** 🎉

