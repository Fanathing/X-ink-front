import Button from '../components/Buttons/Button';
import LoginButton from '../components/Buttons/LoginButton';
import CreateUserButton from '../components/Buttons/CreateUserButton';
import KakaoLoginButton from '../components/Buttons/KakaoLoginButton';
import GhostButton from '../components/Buttons/GhostButton';
import AuthPill from '../components/Buttons/AuthPill';

const ButtonPlay = () => {
  // sample configurations for 4 shortcut buttons
  // size: 'sm' => 150x46, 'lg' => 200x57
  const buttons = [
    { id: 1, label: '바로 가기', variant: 'blue', size: 'lg' },
    { id: 2, label: '바로 가기', variant: 'sky', size: 'lg' },
    { id: 3, label: '바로 가기', variant: 'blue', size: 'sm' },
    { id: 4, label: '바로 가기', variant: 'sky', size: 'sm' },
    { id: 5, label: '바로 가기', variant: 'sky', size: 'sm' },
  ];

  const handleClick = (btn) => {
    return (e) => {
      console.log('바로가기 클릭', btn.id, btn.label, e.type);
    };
  };

  return (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', padding: 24 }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3>Shortcut Buttons</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          {buttons.map((button) => (
            <Button
              key={button.id}
              label={button.label}
              variant={button.variant}
              size={button.size}
              onClick={(e) => handleClick(button)(e)}
            />
          ))}
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3>Auth Buttons</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <LoginButton />
          <CreateUserButton />
          <AuthPill>로그인</AuthPill>
          <AuthPill variant="light">로그아웃</AuthPill>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3>Third-party</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <KakaoLoginButton />
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3>Utility</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <GhostButton />
        </div>
      </section>
    </div>
  );
};

export default ButtonPlay;
