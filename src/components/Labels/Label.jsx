import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 7px;
  gap: 10px;
  height: 21px;
  background: #f4f4f4;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.014em;
  color: #3a4044;


  &.primary {
    /* 기업 타이틀 같은 길이가 긴 라벨 */
    width: fit-content;
  }

  &.muted {
    /* 소개/보조 라벨 (기본 회색) */
    background: #f4f4f4;
    border-radius: 4px;
  }

  &.tag {
    /* 기술스택 등의 작은 태그 */
    background: #eff6fb;
    border-radius: 6px;
    padding: 3px 9px;
    font-weight: 500;
    font-size: 12px;
    height: 22px;
    color: #3a3a3a;
  }
`;

const Label = ({ variant = 'muted', children, className }) => {
  // combine the variant and any additional className into a single string
  // filter(Boolean) removes empty values, join ensures no extra spaces
  const classNames = [variant, className].filter(Boolean).join(' ');
  return <Wrapper className={classNames}>{children}</Wrapper>;
};

export default Label;
