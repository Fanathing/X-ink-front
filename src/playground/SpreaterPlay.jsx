import Spreater from '../components/Spreater/Spreater';

const SpreaterPlay = () => {
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div>short-spreater(50x3)</div>
        <Spreater variant="short-line" />
      </div>

      <div>
        <div>long-spreater (1420x3)</div>
        <Spreater variant="long-line" />
      </div>

      <div>
        <div>thin (1420x1)</div>
        <Spreater variant="thin" />
      </div>

      <div>
        <div>Line (1x10)</div>
        <div style={{ height: 16 }} />
        <Spreater variant="Line" />
      </div>
    </div>
  );
};

export default SpreaterPlay;
