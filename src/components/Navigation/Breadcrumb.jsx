import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 56px;
  background: #ffffff;
`;

const BreadcrumbLink = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: ${(props) => props.weight || '400px'};
  font-size: ${(props) => props.size || '16px'};
  line-height: 24px;
  color: #838383;
  cursor: pointer;

  &:hover {
    color: #272727;
  }
`;

const BreadcrumbCurrent = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 24px;
  color: #272727;
`;

const Separator = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 30px;
  color: #838383;
  user-select: none;
`;

const Breadcrumb = ({ items, weight, size }) => {
  const navigate = useNavigate();
  console.log(items);

  if (!items || items.length === 0) {
    return null;
  }

  const handleLinkClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <BreadcrumbWrapper>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const label = typeof item === 'string' ? item : item.label;
        const link = typeof item === 'object' ? item.link : null;

        return (
          <span key={index}>
            {isLast ? (
              <BreadcrumbCurrent>{label}</BreadcrumbCurrent>
            ) : link ? (
              <BreadcrumbLink 
                onClick={() => handleLinkClick(link)} 
                weight={weight} 
                size={size}
              >
                {label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink as="span" weight={weight} size={size}>
                {label}
              </BreadcrumbLink>
            )}
            {!isLast && <Separator> &gt; </Separator>}
          </span>
        );
      })}
    </BreadcrumbWrapper>
  );
};


export default Breadcrumb;

