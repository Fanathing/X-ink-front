import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: ${(p) => (p.active ? '#03407E' : '#000')};
`;

const VisuallyHidden = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Circle = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${(p) => (p.active ? p.color || '#03407E' : '#808080')};
  background: ${(p) => (p.active ? p.color || '#03407E' : '#fff')};

  & > span.inner {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${(p) => (p.active ? '#fff' : 'transparent')};
  }
`;

/**
 * RadioGroup
 * props:
 * - name
 * - options: [{ value, label }]
 * - value
 * - onChange
 * - color: hex for selected state
 */
const RadioGroup = ({ name, options = [], value, onChange, color }) => {
  return (
    <Group>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <Row key={opt.value}>
            <OptionLabel active={active} htmlFor={`${name}-${opt.value}`}>
              <VisuallyHidden
                id={`${name}-${opt.value}`}
                type="radio"
                name={name}
                value={opt.value}
                checked={active}
                onChange={() => onChange && onChange(opt.value)}
              />
              <Circle active={active} color={color} aria-hidden>
                <span className="inner" />
              </Circle>
              <span>{opt.label}</span>
            </OptionLabel>
          </Row>
        );
      })}
    </Group>
  );
};

export default RadioGroup;
