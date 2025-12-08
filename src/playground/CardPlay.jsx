import Card from '../components/Cards/Card';
import thumbnailImage from '../assets/images/image.png';
import profileImage from '../assets/images/profile.png';

const CardPlay = () => {
  // 기본 카드 샘플 데이터
  const defaultCards = [
    {
      id: 1,
      image: thumbnailImage,
      dday: 'D-7',
      label: '채용 공고 및 인재 요건 등록',
      title: '프로젝트 제목입니다',
      description: '사람이 곧 기업의 경쟁력입니다.',
    },
    {
      id: 2,
      image: thumbnailImage,
      dday: 'D-14',
      label: '디자인 시스템',
      title: '카드 컴포넌트 개발',
      description: 'React 기반 카드 컴포넌트입니다.',
    },
  ];

  // ProfileCard1 샘플 데이터
  const profile1Cards = [
    {
      id: 1,
      profileImage: profileImage,
      role: '주병현',
      email: 'wnqudgus1234@gmail.com',
      labels: ['블록체인', '백엔드'],
      profileTitle: '프론트엔드 개발자',
    },
  ];
  // ProfileCard3 (세로) 샘플 데이터
  const profile3Cards = [
    {
      id: 1,
      profileImage: profileImage,
      name: '주병현',
      labels: ['블록체인'],
      email: 'wnqudgus1234@gmail.com',
      role: '010-1234-5678',
      bio: '안녕하세요 블록체인 씹고수...',
    },
  ];

  // ProfileCard4 (지원완료) 샘플 데이터
  const profile4Cards = [
    {
      id: 1,
      profileImage: profileImage,
      name: '주병현',
      labels: ['블록체인'],
      email: 'wnqudgus1234@gmail.com',
      role: '010-1234-5678',
      bio: '안녕하세요 블록체인 씹고수...',
      isApplied: true,
    },
  ];

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px', color: '#272727' }}>
        Card1 - 기본 카드 (276x231)
      </h2>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}
      >
        {defaultCards.map((card) => (
          <Card
            key={card.id}
            variant="default"
            image={card.image}
            dday={card.dday}
            label={card.label}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      <h2 style={{ marginBottom: '20px', color: '#272727' }}>
        ProfileCard1 - 프로필 카드 (300x195)
      </h2>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}
      >
        {profile1Cards.map((card) => (
          <Card
            key={card.id}
            variant="profile1"
            profileImage={card.profileImage}
            role={card.role}
            email={card.email}
            labels={card.labels}
            profileTitle={card.profileTitle}
          />
        ))}
      </div>

      <h2 style={{ marginBottom: '20px', color: '#272727' }}>
        ProfileCard3 - 세로 프로필 카드 (220x276)
      </h2>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}
      >
        {profile3Cards.map((card) => (
          <Card
            key={card.id}
            variant="profile3"
            profileImage={card.profileImage}
            name={card.name}
            labels={card.labels}
            email={card.email}
            role={card.role}
            bio={card.bio}
          />
        ))}
      </div>

      <h2 style={{ marginBottom: '20px', color: '#272727' }}>
        ProfileCard4 - 지원완료 카드 (220x246)
      </h2>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}
      >
        {profile4Cards.map((card) => (
          <Card
            key={card.id}
            variant="profile4"
            profileImage={card.profileImage}
            name={card.name}
            labels={card.labels}
            email={card.email}
            role={card.role}
            bio={card.bio}
            isApplied={card.isApplied}
          />
        ))}
      </div>
    </div>
  );
};

export default CardPlay;
