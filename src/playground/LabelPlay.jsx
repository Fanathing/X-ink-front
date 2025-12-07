import Label from '../components/Labels/Label';
import FieldLabel from '../components/Inputs/FieldLabel';

const LabelPlay = () => {
  return (
    <div style={{ padding: 24 }}>
      <h3>Label Playground</h3>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <Label variant="primary">👔 채용 공고 및 인재 요건 등록</Label>
        <Label variant="muted">👀평균연봉 5천이상</Label>
        <Label variant="tag">블록체인</Label>
        <Label variant="tag">React</Label>
      </div>

      <div style={{ marginTop: 12 }}>
        <div>Primary</div>
        <Label variant="primary">기업타이틀 라벨</Label>
      </div>

      <div>
        <div>필드 라벨</div>
        <FieldLabel>필드 라벨 텍스트</FieldLabel>
      </div>
    </div>
  );
};

export default LabelPlay;
