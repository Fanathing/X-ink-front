import styled from 'styled-components';
import { ProfileWithInfo, ProfileMenu } from '../../components/Profile';
import Logo from '../../assets/images/Logo.png';
import LinkText from '../../components/Texts/LinkText';

const StyledCompanies = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 2px #c8c8c8;
`

const Companies = () => {
    return (
      <StyledCompanies>
        <img src={Logo} alt="Logo" />
        <ProfileWithInfo />
        <ProfileMenu />
        <LinkText to="/">전체 공고 목록</LinkText>
        <LinkText to="/search">구직자 탐색</LinkText>
      </StyledCompanies>
    );
}

export default Companies;