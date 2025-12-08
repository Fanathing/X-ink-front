import styled from 'styled-components';

const BreadcrumbWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
  height: 56px;
  background: #ffffff;
`;

const BreadcrumbLink = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
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

const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <BreadcrumbWrapper>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index}>
            {isLast ? (
              <BreadcrumbCurrent>{item}</BreadcrumbCurrent>
            ) : (
              <BreadcrumbLink>{item}</BreadcrumbLink>
            )}
            {/* // > 기호 */}
            {!isLast && <Separator> &gt; </Separator>} 
            {/* {!isLast && <Separator> &lt; </Separator>} // < 기호 */}
            {/* {!isLast && <Separator> &amp; </Separator>} // & 기호 */}
          </span>
        );
      })}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;

