import styled from 'styled-components';

// 첫번째 인풋 (기본 인풋)
const StyledBasicInput = styled.input`
  width: 400px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  padding: 12px 14px;
  gap: 10px;
  background-color: #ffffff;
  font-size: 15px;
  font-weight: 400;
  color: #000000;

  &::placeholder {
    color: #c4c4c4;
  }

  &:focus {
    outline: none;
    border-color: #03407e;
  }
`;

// 두번째 인풋 (라벨 입력창)
const LabelInputWrapper = styled.div`
  width: 590px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  width: 590px;
  height: 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #000000;

  & .required {
    color: #2c6aa9;
  }
`;

const StyledLabelInput = styled.input`
  width: 590px;
  height: 54px;
  border-radius: 8px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  padding: 12px 14px;
  gap: 10px;
  background-color: #ffffff;
  font-size: 18px;
  font-weight: 400;
  color: #000000;

  &::placeholder {
    color: #c4c4c4;
  }

  &:focus {
    outline: none;
    border-color: #03407e;
  }
`;

// 세번째 인풋 (검색 인풋 with 아이콘)
const SearchInputWrapper = styled.div`
  width: ${(props) => props.maxWidth || '1420px'};
  max-width: ${(props) => props.maxWidth || '1420px'};
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  gap: 10px;
  border-bottom: 2px solid #3a4044;
`;

const StyledSearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.5px;
  color: #000000;

  &::placeholder {
    color: #c4c4c4;
  }

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.svg`
  width: 25px;
  height: 25px;
  cursor: pointer;
  stroke: #3a4044;
  stroke-width: 3px;
  fill: none;
  flex-shrink: 0;

  &:hover {
    stroke: #03407e;
  }
`;

// variant에 따라 렌더링
const renderInputByVariant = (variant, props) => {
  const { placeholder, label, required, maxWidth, onSearch, ...restProps } =
    props;

  switch (variant) {
    case 'basic':
      return <StyledBasicInput placeholder={placeholder} {...restProps} />;

    case 'label':
      return (
        <LabelInputWrapper>
          <Label>
            {label} {required && <span className="required">*</span>}
          </Label>
          <StyledLabelInput placeholder={placeholder} {...restProps} />
        </LabelInputWrapper>
      );

    case 'search':
      return (
        <SearchInputWrapper maxWidth={maxWidth}>
          <StyledSearchInput placeholder={placeholder} {...restProps} />
          <SearchIcon viewBox="0 0 25 25" aria-hidden="true" onClick={onSearch}>
            <circle cx="11" cy="11" r="7" />
            <line x1="27" y1="27" x2="15" y2="15" />
          </SearchIcon>
        </SearchInputWrapper>
      );

    default:
      return <StyledBasicInput placeholder={placeholder} {...restProps} />;
  }
};

const Input = ({ variant = 'basic', ...props }) => {
  return renderInputByVariant(variant, props);
};

export default Input;
