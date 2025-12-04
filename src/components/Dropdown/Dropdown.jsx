import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 150px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #333;

  &:hover {
    border-color: #03407e;
  }

  &::after {
    content: '▼';
    font-size: 10px;
    margin-left: 8px;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 4px 0 0 0;
  padding: 0;
  list-style: none;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }

  &.selected {
    background-color: #03407e;
    color: #ffffff;
  }
`;

const Dropdown = ({ label, options = [], onChange, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0],
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggle} type="button">
        {selectedValue || label || '선택하세요'}
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => handleSelect(option)}
              className={selectedValue === option ? 'selected' : ''}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default Dropdown;
