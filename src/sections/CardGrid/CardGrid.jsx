import styled from 'styled-components';
import Card from '../../components/Cards/Card';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(276px, 1fr));
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

const CardGrid = ({ cards, variant = 'default' }) => {
  if (!cards || cards.length === 0) {
    return <div>표시할 카드가 없습니다.</div>;
  }

  return (
    <GridWrapper>
      {cards.map((card, index) => (
        <Card key={index} variant={variant} {...card} />
      ))}
    </GridWrapper>
  );
};

export default CardGrid;