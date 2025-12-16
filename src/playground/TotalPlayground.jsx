import { useState } from 'react';
import styled from 'styled-components';
import ProfilePlay from './ProfilePlay';
import DropdownPlay from './DropdownPlay';
import ButtonPlay from './ButtonPlay';
import InputPlay from './InputPlay';
import PaginationPlay from './PaginationPlay';
import IconPlay from './IconPlay';
import CardPlay from './CardPlay';
import TextPlay from './TextPlay';
import LabelPlay from './LabelPlay';
import BreadcrumbPlay from './BreadcrumbPlay';
import CheckPlay from './CheckPlay';
import RadioPlay from './RadioPlay';
import SpreaterPlay from './SpreaterPlay';
import StepsPlay from './StepsPlay';
import TextsPlay from './TextsPlay';
import HeaderTestPlay from './HeaderTestPlay';
import CompaniesHeader from './CompaniesHeader';
import VolunteerHeader from './VolunteerHeader';

const Container = styled.div`
  padding: 40px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #3A4044;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const ComponentList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ComponentCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  ${props => props.$active && `
    border: 2px solid #03407e;
    background: #f0f7ff;
  `}
`;

const ComponentTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #3A4044;
  margin: 0;
`;

const ComponentDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 8px;
  margin-bottom: 0;
`;

const ContentArea = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 400px;
`;

const BackButton = styled.button`
  background: #03407e;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background: #025a9e;
  }
`;

const components = [
  { id: 'profile', title: 'Profile 컴포넌트', description: '프로필 아바타, 정보, 메뉴 등', component: ProfilePlay },
  { id: 'dropdown', title: 'Dropdown 컴포넌트', description: '사용자/기업 드롭다운 메뉴', component: DropdownPlay },
  { id: 'button', title: 'Button 컴포넌트', description: '다양한 버튼 스타일', component: ButtonPlay },
  { id: 'input', title: 'Input 컴포넌트', description: '입력 필드 및 텍스트 영역', component: InputPlay },
  { id: 'pagination', title: 'Pagination 컴포넌트', description: '페이지네이션', component: PaginationPlay },
  { id: 'icon', title: 'Icon 컴포넌트', description: '아이콘 모음', component: IconPlay },
  { id: 'card', title: 'Card 컴포넌트', description: '카드 레이아웃', component: CardPlay },
  { id: 'text', title: 'Text 컴포넌트', description: '텍스트 스타일', component: TextPlay },
  { id: 'label', title: 'Label 컴포넌트', description: '라벨 스타일', component: LabelPlay },
  { id: 'breadcrumb', title: 'Breadcrumb 컴포넌트', description: '브레드크럼 네비게이션', component: BreadcrumbPlay },
  { id: 'check', title: 'Check 컴포넌트', description: '체크박스', component: CheckPlay },
  { id: 'radio', title: 'Radio 컴포넌트', description: '라디오 버튼', component: RadioPlay },
  { id: 'spreater', title: 'Spreater 컴포넌트', description: '구분선', component: SpreaterPlay },
  { id: 'steps', title: 'Steps 컴포넌트', description: '단계 표시', component: StepsPlay },
  { id: 'texts', title: 'Texts 컴포넌트', description: '텍스트 컴포넌트 모음', component: TextsPlay },
  { id: 'header', title: 'Header 테스트', description: '헤더 컴포넌트 테스트', component: HeaderTestPlay },
  { id: 'companies-header', title: 'Companies Header', description: '기업 헤더', component: CompaniesHeader },
  { id: 'volunteer-header', title: 'Volunteer Header', description: '개인 헤더', component: VolunteerHeader },
];

const TotalPlayground = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (componentId) => {
    setSelectedComponent(componentId);
  };

  const handleBack = () => {
    setSelectedComponent(null);
  };

  const SelectedComponent = selectedComponent 
    ? components.find(c => c.id === selectedComponent)?.component 
    : null;

  return (
    <Container>
      <Header>
        <MainTitle>Total Playground</MainTitle>
        <Subtitle>모든 컴포넌트를 한 곳에서 확인하세요</Subtitle>
      </Header>

      {!selectedComponent ? (
        <ComponentList>
          {components.map((comp) => (
            <ComponentCard
              key={comp.id}
              onClick={() => handleComponentClick(comp.id)}
            >
              <ComponentTitle>{comp.title}</ComponentTitle>
              <ComponentDescription>{comp.description}</ComponentDescription>
            </ComponentCard>
          ))}
        </ComponentList>
      ) : (
        <ContentArea>
          <BackButton onClick={handleBack}>← 목록으로 돌아가기</BackButton>
          {SelectedComponent && <SelectedComponent />}
        </ContentArea>
      )}
    </Container>
  );
};

export default TotalPlayground;

