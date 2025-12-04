import styled from 'styled-components';
import Dropdown from '../components/Dropdown/Dropdown';
import Button from '../components/Buttons/Button';

const StyledMainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
`;

const Main = () => {
  const handleButton3Click = () => {
    console.log('버튼 3 클릭');
  };

  const handleDropdownChange = (value) => {
    console.log('Dropdown 변경:', value);
  };

  return (
    <StyledMainWrap>
      <h1>기업이 가장 찾고 싶어하는!</h1>
      <Dropdown
        label="버튼 1"
        options={['전체', '블록체인', '프론트', '백엔드']}
        onChange={handleDropdownChange}
      />
      <span>공고를 만들었어요</span>

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        {/* ButtonPlay의 3번 버튼 설정 */}
        <Button
          label="바로 가기"
          variant="blue"
          size="sm"
          onClick={handleButton3Click}
        />
      </div>
    </StyledMainWrap>
  );
};

export default Main;
