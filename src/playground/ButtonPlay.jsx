import Button from '../components/Buttons/Button';

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
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
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
  );
};

export default ButtonPlay;
