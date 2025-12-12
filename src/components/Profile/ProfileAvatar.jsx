import { useState } from 'react';
import styled from 'styled-components';
import profilePlaceholder from '../../assets/images/profile.png';

const AvatarContainer = styled.div`
  position: relative;
  width: 54px;
  height: 54px;
`;

const AvatarImage = styled.div`
  box-sizing: border-box;
  width: 54px;
  height: 54px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(26, 26, 26, 0.5);
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.08);
  border-radius: 27px;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: transform 0.2s;

  &:hover {
    transform: ${props => props.$clickable ? 'scale(1.05)' : 'none'};
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  width: 56px;
  height: 38px;
  left: 32px;
  top: -8px;
  pointer-events: none;
`;

const NotificationCircle = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 10px;
  top: 10px;
  background: #D92828;
  border-radius: 50%;
`;

const NotificationCount = styled.span`
  position: absolute;
  width: 9px;
  height: 17px;
  left: 10px;
  top: 11px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  min-width: 20px;
`;

/**
 * ProfileAvatar - 프로필 아바타 컴포넌트
 * 
 * @param {string} imageUrl - 프로필 이미지 URL (카카오톡 프로필 등)
 * @param {number} notificationCount - 알림 개수 (0이면 배지 숨김)
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @param {string} size - 크기 ('small': 54px, 'large': 300px)
 */
const ProfileAvatar = ({ 
  imageUrl, 
  notificationCount = 0, 
  onClick,
  size = 'small'
}) => {
  const [imgError, setImgError] = useState(false);
  
  // 이미지 URL이 없거나 에러가 발생하면 기본 이미지 사용
  const finalImageUrl = (!imageUrl || imgError) ? profilePlaceholder : imageUrl;

  return (
    <AvatarContainer>
      <AvatarImage
        $imageUrl={finalImageUrl}
        $clickable={!!onClick}
        onClick={onClick}
        onError={() => setImgError(true)}
        role={onClick ? 'button' : undefined}
        aria-label="프로필"
        size={size}
      />
      
      {notificationCount > 0 && (
        <NotificationBadge>
          <NotificationCircle />
          <NotificationCount>
            {notificationCount > 9 ? '9+' : notificationCount}
          </NotificationCount>
        </NotificationBadge>
      )}
    </AvatarContainer>
  );
};

export default ProfileAvatar;

