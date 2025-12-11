import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../components/Cards/Card';
import { useAuth } from '../../contexts/AuthContext';

const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${props => props.$cardCount <= 3 ? 'flex-start' : 'space-between'};
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

const CardGrid = ({ cards, variant = 'default' }) => {
  const navigate = useNavigate();
  const { isCompany, isIndividual } = useAuth();

  if (!cards || cards.length === 0) {
    return <div>표시할 카드가 없습니다.</div>;
  }

  const handleCardClick = (card) => {
    if (!card.id) return;
    
    // 디버깅: 실제 값 확인
    console.log('🔍 CardGrid - 라우팅 확인:', {
      isCompany,
      isIndividual,
      cardId: card.id
    });
    
    // 로그인 상태에 따라 다른 페이지로 이동
    // 기업 로그인: Detail 페이지
    if (isCompany) {
      console.log('✅ 기업 로그인 → Detail 페이지로 이동');
      navigate(`/detail/${card.id}`);
    } 
    // 개인 로그인(지원자): JobApply 페이지
    else if (isIndividual) {
      console.log('✅ 개인 로그인 → JobApply 페이지로 이동');
      navigate(`/jobapply/${card.id}`);
    } 
    // 로그인하지 않은 경우 기본적으로 Detail 페이지로 이동
    else {
      console.log('⚠️ 로그인 안 됨 → Detail 페이지로 이동 (기본)');
      navigate(`/detail/${card.id}`);
    }
  };

  return (
    <GridWrapper $cardCount={cards.length}>
      {cards.map((card, index) => (
        <Card 
          key={card.id || index} 
          variant={variant} 
          {...card}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </GridWrapper>
  );
};

export default CardGrid;