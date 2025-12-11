
import { useState } from 'react';
import RadioGroup from '../components/Inputs/Radio';
import Button from '../components/Buttons/Button';


const RadioPlay = () => {
  const [value1, setValue1] = useState('blockchain');
  const [value2, setValue2] = useState('front');

  const options = [
    { value: 'blockchain', label: '블록체인' },
    { value: 'front', label: '프론트' },
    { value: 'back', label: '백엔드' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h3>Radio Playground</h3>

      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8 }}>Default radios</div>
        <RadioGroup name="r1" options={options} value={value1} onChange={setValue1} color="#03407E" />
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8 }}>Highlighted selection (blue)</div>
        <RadioGroup name="r2" options={options} value={value2} onChange={setValue2} color="#24A0ED" />
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8 }}>Radio + Buttons area</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <RadioGroup name="r3" options={options} value={value1} onChange={setValue1} color="#03407E" />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="blue">블록체인</Button>
            <Button variant="sky-outline">프론트엔드</Button>
            <Button variant="sky-outline">백엔드</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioPlay;
