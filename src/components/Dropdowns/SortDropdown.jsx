import { useState } from 'react';
import styled from 'styled-components';

const DropdownList = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 170px;
  max-width: 300px;
  height: 156px;
  border: 1px solid rgba(131, 131, 131, 0.6);
  border-radius: 8px;
  background: #FFFFFF;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  z-index: 1000;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 12px;
  width: 170px;
  height: 52px;
  background: #FFFFFF;
  border-bottom: ${props => props.$isLast ? 'none' : '1px solid rgba(131, 131, 131, 0.6)'};
  border-radius: 0px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const ItemText = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3A4044;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  box-sizing: border-box;
  padding: 0px 12px;
  width: 170px;
  height: 52px;
  background: #FFFFFF;
  border: 1px solid rgba(131, 131, 131, 0.6);
  border-radius: 8px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 17px;
  color: #3A4044;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::after {
    content: '▼';
    font-size: 10px;
  }
`;

const SortDropdown = ({ onSelect, defaultValue = '최신순' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const sortOptions = [
    { id: 'latest', label: '최신순' },
    { id: 'deadline', label: '마감일순' },
    { id: 'ascending', label: '오름차순' }
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedValue(option.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.id);
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggle} type="button">
        {selectedValue}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {sortOptions.map((option, index) => (
            <DropdownItem
              key={option.id}
              onClick={() => handleSelect(option)}
              $isLast={index === sortOptions.length - 1}
            >
              <ItemText>{option.label}</ItemText>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default SortDropdown;

