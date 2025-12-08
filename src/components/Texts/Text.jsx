import styled from 'styled-components';

const StyledHeader = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20.6px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #222222;
  margin: 0;
`;

const StyledTitleText = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #3a4044;
  line-height: 24px;
  margin: 0;
`;

const StyledSubtitleText = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #3a4044;
  line-height: 24px;
  display: flex;
  align-items: center;
  margin: 0;
`;

const StyledContentText = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16.7px;
  font-weight: 500;
  color: #3A4044;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0;
`;

const StyledDefaultText = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: black;
  line-height: 14px;
  text-align: center;
  margin: 0;
`;

const StyledLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  color: #3A4044;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #03407e;
  }
`;

const renderTextByVariant = (variant, props) => {
  const { children, href, ...rest } = props;
  switch (variant) {
    case 'header':
      return <StyledHeader {...rest}>{children}</StyledHeader>;
    case 'title':
      return <StyledTitleText {...rest}>{children}</StyledTitleText>;
    case 'subtitle':
      return <StyledSubtitleText {...rest}>{children}</StyledSubtitleText>;
    case 'content':
      return <StyledContentText {...rest}>{children}</StyledContentText>;
    case 'link':
      return (
        <StyledLink href={href || '#'} {...rest}>
          {children}
        </StyledLink>
      );
    default:
      return <StyledDefaultText {...rest}>{children}</StyledDefaultText>;
  }
};

/**
 * Text component
 * - variant: 'header' | 'title' | 'subtitle' | 'content' | 'link' | 'default'
 * - for variant 'link', pass `href` prop
 */
const Text = ({ variant = 'default', ...props }) => {
  return renderTextByVariant(variant, props);
};

export default Text;
