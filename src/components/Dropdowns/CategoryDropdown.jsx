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
  height: 208px;
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
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const ItemText = styled.span`
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

const CategoryDropdown = ({ onSelect, defaultValue = '전체' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'blockchain', label: '블록체인' },
    { id: 'frontend', label: '프론트엔드' },
    { id: 'backend', label: '백엔드' }
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    setSelectedValue(category.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(category.id);
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggle} type="button">
        {selectedValue}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {categories.map((category, index) => (
            <DropdownItem
              key={category.id}
              onClick={() => handleSelect(category)}
              $isLast={index === categories.length - 1}
            >
              <ItemText>{category.label}</ItemText>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default CategoryDropdown;

