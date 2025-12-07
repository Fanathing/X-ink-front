import Check from '../components/Check/Check';

const CheckPlay = () => {
  return (
    <div style={{ padding: 24, display: 'flex', gap: 24, alignItems: 'center' }}>
      <div>
        <div>Verified</div>
        <Check variant="verified" size={200} />
      </div>

      <div>
        <div>Vector</div>
        <Check variant="vector" size={200} />
      </div>

      <div>
        <div>Complete</div>
        <Check variant="complete" size={200} />
      </div>
    </div>
  );
};

export default CheckPlay;
