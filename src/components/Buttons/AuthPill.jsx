import styled from 'styled-components';

const Pill = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  min-width: 67px;
  padding: 0 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 13px;
  line-height: 28px;
`;

export const DarkPill = styled(Pill)`
  background: #272727;
  color: #ffffff;
`;

export const LightPill = styled(Pill)`
  background: #ffffff;
  color: #272727;
  border: 1px solid #272727;
`;

const AuthPill = ({ variant = 'dark', children, onClick }) => {
  if (variant === 'light') return <LightPill onClick={onClick}>{children}</LightPill>;
  return <DarkPill onClick={onClick}>{children}</DarkPill>;
};

export default AuthPill;
