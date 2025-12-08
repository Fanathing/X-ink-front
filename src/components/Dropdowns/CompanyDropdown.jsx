import { useState } from 'react';
import styled from 'styled-components';

const DropdownList = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 300px;
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
  width: 300px;
  height: 52px;
  background: #FFFFFF;
  border-bottom: ${props => props.$isLast ? 'none' : '1px solid rgba(131, 131, 131, 0.6)'};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 276px;
  height: 20px;
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
  color: ${props => props.$isLogout ? '#D92828' : '#3A4044'};
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  box-sizing: border-box;
  padding: 0px 12px;
  width: 300px;
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

const CompanyDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'profile', label: '프로필 관리', isLogout: false },
    { id: 'jobManagement', label: '공고 관리', isLogout: false },
    { id: 'applicantManagement', label: '지원자 관리', isLogout: false },
    { id: 'logout', label: '로그 아웃', isLogout: true }
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(item.id);
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggle} type="button">
        메뉴
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {menuItems.map((item, index) => (
            <DropdownItem
              key={item.id}
              onClick={() => handleSelect(item)}
              $isLast={index === menuItems.length - 1}
            >
              <TextWrap>
                <ItemText $isLogout={item.isLogout}>
                  {item.label}
                </ItemText>
              </TextWrap>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default CompanyDropdown;

