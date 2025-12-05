import Breadcrumb from '../components/Navigation/Breadcrumb';

const BreadcrumbPlay = () => {
  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3>1. 메인 페이지 (단일 항목)</h3>
        <Breadcrumb items={['전체 공고 목록']} />
      </div>

      <div>
        <h3>2. 상세 페이지 (2단계)</h3>
        <Breadcrumb items={['전체 공고 목록', 'React 개발자 모집']} />
      </div>

      <div>
        <h3>3. 구직자 탐색 페이지</h3>
        <Breadcrumb items={['구직자 탐색']} />
      </div>

      <div>
        <h3>4. 프로필 상세 페이지 (2단계)</h3>
        <Breadcrumb items={['구직자 탐색', '홍길동 프로필']} />
      </div>

      <div>
        <h3>5. 프로필 관리 페이지</h3>
        <Breadcrumb items={['프로필 관리']} />
      </div>

      <div>
        <h3>6. 3단계 네비게이션</h3>
        <Breadcrumb items={['전체 공고 목록', '프론트엔드', 'React 개발자 모집']} />
      </div>
    </div>
  );
};

export default BreadcrumbPlay;

