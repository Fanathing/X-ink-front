import styled from "styled-components";
import { ProfileWithInfo, ProfileMenu } from "../../components/Profile";
import Logo from '../../assets/images/Logo.png';
import LinkText from "../../components/Texts/LinkText";

const StyledVolunteers = styled.div`
  width: 100%;
  height: 213px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 2px #c8c8c8;
`;
const HeaderInner = styled.div`

  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Volunteers = () => {
    return (
        <StyledVolunteers>
          <HeaderInner>
          <img src={Logo} alt="Logo" />
          <ProfileWithInfo />
          <ProfileMenu />
          <LinkText to="/">전체 공고 목록</LinkText>
        </HeaderInner>
      </StyledVolunteers>
    );
}

export default Volunteers;