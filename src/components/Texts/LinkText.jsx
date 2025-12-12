import styled from 'styled-components';

const Link = styled.a`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #3A4044;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #03407e;
  }
`;

const LinkText = ({ children, href = '#', ...rest }) => {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
};

export default LinkText;
