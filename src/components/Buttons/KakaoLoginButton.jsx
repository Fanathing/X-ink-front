import styled from 'styled-components';
import IconKakao from '../../assets/images/icon_kakao 1.png';

const Wrapper = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 72px;
  gap: 10px;
  width: 400px;
  height: 48px;
  background: #ffffff;
  border: 0.8px solid rgba(128, 128, 128, 0.3);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  cursor: pointer;
`;

const IconWrap = styled.span`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Label = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
`;

const KakaoLoginButton = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick} aria-label="카카오 로그인">
      <IconWrap aria-hidden>
        <img src={IconKakao} alt="kakao" style={{ width: 24, height: 24, display: 'block' }} />
      </IconWrap>
      <Label>카카오 로그인</Label>
    </Wrapper>
  );
};

export default KakaoLoginButton;
