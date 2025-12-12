import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowIcon from '../Icons/ArrowIcon';

const BreadcrumbWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 36px;
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

const BreadcrumbCurrent = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 24px;
  color: #272727;
`;

const BreadcrumbItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Breadcrumb = ({ items, weight, size }) => {
  const navigate = useNavigate();

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
          <BreadcrumbItem key={index}>
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
              <BreadcrumbLink as="div" weight={weight} size={size}>
                {label}
              </BreadcrumbLink>
            )}
            {!isLast && (
              <ArrowIcon 
                direction="right"                 
              />
            )}
          </BreadcrumbItem>
        );
      })}
    </BreadcrumbWrapper>
  );
};


export default Breadcrumb;

