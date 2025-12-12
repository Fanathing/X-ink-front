import styled from 'styled-components';
import defaultImage from '../../assets/images/image.png';
import defaultProfileImage from '../../assets/images/profile.png';
import Label from '../Labels/Label';
import { formatDday } from '../../utils/formatDday';

// ============================================
// Card1 - 기본 카드 (276x231)
// ============================================
const StyledCard = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  width: 300px;
  height: 241px;
  background: #ffffff;
  border: 1px solid #838383;
  border-radius: 8px;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    ${props => props.onClick ? 'transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1);' : ''}
  }
`;

const Thumbnail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 236px;
  height: 96px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const ThumbnailImage = styled.img`
  margin: 0 auto;
  width: 96px;
  height: 96px;
  object-fit: cover;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const DdayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0 0 0 10px;
  gap: 10px;
  margin: 0 auto;
  width: 140px;
  height: 45px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const DdayText = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: right;
  color: ${props => props.$isToday ? '#D92828' : '#838383'};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 236px;
  height: 105px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;
  width: 236px;
  height: 74px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const CardTitle = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 19px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.38px;
  color: #272727;
`;

const CardDescription = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: -0.32px;
  color: #272727;
`;

// ============================================
// ProfileCard1 - 프로필 카드 (300x195)
// ============================================
const StyledProfileCard1 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  width: 300px;
  height: 195px;
  background: #ffffff;
  border: 1px solid #838383;
  border-radius: 8px;
`;

const ProfileThumbnail1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 10px;
  width: 260px;
  height: 80px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const ProfileImage1 = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  object-fit: cover;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const PersonalInfo1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  width: 170px;
  height: 80px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const ProfileRole1 = styled.span`
  font-weight: 700;
  font-size: 18.8px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align:   ght;
  color: #3a4044;
`;

const ProfileEmail1 = styled.span`
  width: 170px;
  height: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.55px;
  color: #272727;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const ProfileContent1 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
  padding: 0px;
  gap: 10px;
  width: 260px;
  height: 55px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;


const ProfileTitle1 = styled.p`
  margin: 0;
  width: 260px;
  height: 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.38px;
  color: #272727;
  flex: none;
  order: 2;
  flex-grow: 0;
`;

// ============================================
// ProfileCard3 - 세로 프로필 카드 (220x276)
// ============================================
const StyledProfileCard3 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
  width: 220px;
  height: 276px;
  background: #ffffff;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
`;

const ProfileImage3 = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ProfileName3 = styled.span`
  width: 180px;
  height: 20px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #555555;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const ProfileLabels3 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0px;
  gap: 0px 8px;
  width: 180px;
  height: 22px;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;

const ProfileInfo3 = styled.span`
  width: 180px;
  height: 20px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #555555;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;
// ============================================
// ProfileCard4 - 지원완료 카드 (220x246)
// ============================================
const StyledProfileCard4 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
  width: 220px;
  height: 246px;
  background: #ffffff;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
`;

const ProfileHeader4 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 0px;
  gap: 10px;
  width: 180px;
  height: 84px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const ProfileImage4 = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ProfileNameWrapper4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 62px;
  height: 51px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const ProfileName4 = styled.span`
  width: 50px;
  height: 20px;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #555555;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const AppliedBadge = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 62px;
  height: 21px;
  background: #ffffff;
  border: 1px solid #03407e;
  border-radius: 4px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 21px;
  letter-spacing: -0.014em;
  color: #03407e;
`;

const ProfileContent4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 180px;
  height: 112px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const ProfileLabels4 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0px;
  gap: 0px 8px;
  width: 180px;
  height: 22px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;



const ProfileInfo4 = styled.span`
  width: 180px;
  height: 20px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #555555;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;



// ============================================
// 카드 렌더링 함수
// ============================================
const renderCardByVariant = (variant, props) => {
  const {
    image,
    dday,
    label,
    title,
    companyName,
    profileImage,
    name,
    email,
    phoneNumber,
    role,
    labels,
    profileTitle,
    bio, // eslint-disable-line no-unused-vars
    intro,
    isApplied,
    onClick,
  } = props;
  switch (variant) {
    // Card1 - 기본 카드
    case 'default':
      return (
        <StyledCard onClick={onClick}>
          <Thumbnail>
            <ThumbnailImage src={image || defaultImage} alt="thumbnail" />
            <DdayWrapper>
              <DdayText $isToday={formatDday(dday) === '오늘 마감'}>{formatDday(dday)}</DdayText>
              {isApplied && <AppliedBadge>지원완료!</AppliedBadge>}
            </DdayWrapper>
          </Thumbnail>
          <Content>
            <Label variant="primary">{label}</Label>
            <Frame>
              <CardTitle>{companyName}</CardTitle>
              <CardDescription>{title}</CardDescription>
            </Frame>
          </Content>
        </StyledCard>
      );

    // ProfileCard1 - 프로필 카드 (300x195)
    case 'profile1':
      return (
        <StyledProfileCard1>
          <ProfileThumbnail1>
            <ProfileImage1
              src={profileImage || defaultProfileImage}
              alt="profile"
            />
            <PersonalInfo1>
              <ProfileRole1>{role}</ProfileRole1>
              <ProfileEmail1>{email}</ProfileEmail1>
            </PersonalInfo1>
          </ProfileThumbnail1>
          <ProfileContent1>
            {labels &&
              labels.map((labelItem, index) => (
                <Label key={index} variant="muted">
                  {labelItem}
                </Label>
              ))}
          </ProfileContent1>
          <ProfileTitle1>{profileTitle}</ProfileTitle1>
        </StyledProfileCard1>
      );

    // ProfileCard3 - 세로 프로필 카드 (220x276)
    case 'profile3': {
      return (
        <StyledProfileCard3>
          <ProfileImage3
            src={profileImage || defaultProfileImage}
            alt="profile"
          />
          <ProfileName3>{name}</ProfileName3>
          <ProfileLabels3>
            {labels &&
              labels.map((labelItem, index) => (
                <Label key={index} variant="tag">
                  {labelItem}
                </Label>
              ))}
          </ProfileLabels3>
          <ProfileInfo3 style={{ order: 3 }}>{email}</ProfileInfo3>
          {phoneNumber && (
            <ProfileInfo3 style={{ order: 4 }}>{phoneNumber}</ProfileInfo3>
          )}
          {intro && (
            <ProfileInfo3 style={{ order: 5 }}>{intro}</ProfileInfo3>
          )}
        </StyledProfileCard3>
      );
    }

    // ProfileCard4 - 지원완료 카드 (220x246)
    case 'profile4': {
      // intro 또는 bio 중 하나를 사용 (intro 우선)
      const introText = intro || bio || '';
      return (
        <StyledProfileCard4>
          <ProfileHeader4>
            <ProfileImage4
              src={profileImage || defaultProfileImage}
              alt="profile"
            />
            <ProfileNameWrapper4>
              <ProfileName4>{name}</ProfileName4>
              {isApplied && <AppliedBadge>지원완료!</AppliedBadge>}
            </ProfileNameWrapper4>
          </ProfileHeader4>
          <ProfileContent4>
            <ProfileLabels4>
              {labels &&
                labels.map((labelItem, index) => (
                  <Label key={index} variant="tag">
                    {labelItem}
                  </Label>
                ))}
            </ProfileLabels4>
            <ProfileInfo4>{email}</ProfileInfo4>
            {phoneNumber && <ProfileInfo4>{phoneNumber}</ProfileInfo4>}
            {introText && <ProfileInfo4>{introText}</ProfileInfo4>}
          </ProfileContent4>
        </StyledProfileCard4>
      );
    }

    // 기존 profile variant는 profile1으로 매핑
    case 'profile':
      return (
        <StyledProfileCard1>
          <ProfileThumbnail1>
            <ProfileImage1
              src={profileImage || defaultProfileImage}
              alt="profile"
            />
            <PersonalInfo1>
              <ProfileRole1>{role}</ProfileRole1>
              <ProfileEmail1>{name}</ProfileEmail1>
            </PersonalInfo1>
          </ProfileThumbnail1>
          <ProfileContent1>
            {labels &&
              labels.map((labelItem, index) => (
                <Label key={index} variant="muted">
                  {labelItem}
                </Label>
              ))}
          </ProfileContent1>
          <ProfileTitle1>{profileTitle}</ProfileTitle1>
        </StyledProfileCard1>
      );

    // Card5 - 지원한 공고 목록 카드
    case 'mycard':
      return (
        <StyledCard onClick={onClick}>
          <Thumbnail>
            <ThumbnailImage src={image || defaultImage} alt="thumbnail" />
            <DdayWrapper>
              <DdayText $isToday={formatDday(dday) === '오늘 마감'}>{formatDday(dday)}</DdayText>
              {<AppliedBadge>지원완료!</AppliedBadge>}
            </DdayWrapper>
          </Thumbnail>
          <Content>
            <Label variant="primary">{label}</Label>
            <Frame>
              <CardTitle>{companyName}</CardTitle>
              <CardDescription>{title}</CardDescription>
            </Frame>
          </Content>
        </StyledCard>
      );

    default:
      return (
        <StyledCard onClick={onClick}>
          <Thumbnail>
            <ThumbnailImage src={image || defaultImage} alt="thumbnail" />
            <DdayWrapper>
              <DdayText $isToday={formatDday(dday) === '오늘 마감'}>{formatDday(dday)}</DdayText>
            </DdayWrapper>
          </Thumbnail>
          <Content>
            <Label variant="primary">{label}</Label>
            <Frame>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{companyName}</CardDescription>
            </Frame>
          </Content>
        </StyledCard>
      );
  }
};

const Card = ({ variant = 'default', onClick, ...props }) => {
  return renderCardByVariant(variant, { ...props, onClick });
};

export default Card;
