import styled from 'styled-components';
import FooterText from '../components/Texts/FooterText';

const StyledFooter = styled.div`
  height: 127px;
  display: flex;
  flex-direction: column;
  justify-content: center; // column이니까 새로 정렬
  align-items: center; // column이니까 가로 정렬
  text-align: center; // 텍스트 가로 정렬
  & > .footer-list {
    display: flex;
    gap: 10px;
  }
`;

const Footer = () => {
  return (
    // StyledFooter
    <StyledFooter className="footer">
      <div className="footer-info">
        <FooterText>
          Business License : 768-64-00506ㅣ Head office : 209, Digital-ro 271,
          Guro-gu, Seoul, Republic of Korea (08381)
        </FooterText>
        <FooterText>
          ㅣ CS : +82 02-853-7370 ㅣ E-MAIL : wnqudgus1234@gmail.com
        </FooterText>
      </div>
      <div className="footer-list">
        <FooterText fontSize={'14px'} fontWeight={'900'}>
          이용 약관
        </FooterText>
        <FooterText fontSize={'14px'} fontWeight={'900'}>
          개인정보처리방침
        </FooterText>
      </div>
    </StyledFooter>
  );
};

export default Footer;
