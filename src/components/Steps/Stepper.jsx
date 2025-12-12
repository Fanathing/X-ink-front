import styled from 'styled-components';

const CIRCLE_SIZE = 32;
const TRAIL_WIDTH = 179;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${32 + 200}px;
  position: relative;
`;

const Circle = styled.div`
  box-sizing: border-box;
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  &.active {
    color: #ffffff;
    background: #03407e;
    border: 2px solid #03407e;
  }

  &.completed {
    color: #ffffff;
    background: #03407e;
    border: 2px solid #03407e;
  }

  &.default {
    color: #242e39;
    background: #ffffff;
    border: 2px solid #a1aebe;
  }
`;

const Label = styled.div`
  margin-top: 8px;
  font-size: 13.87px;
  text-align: center;
  width: ${CIRCLE_SIZE * 2}px;

  &.active {
    font-weight: 700;
    color: #03407e;
  }

  &.completed,
  &.default {
    font-weight: 500;
    color: #465668;
  }
`;

const Trail = styled.div`
  position: absolute;
  left: calc(140% - ${TRAIL_WIDTH}px);
  top: calc(30% - 1px);
  width: ${TRAIL_WIDTH}px;
  height: 3px;

  &.active {
    background: #03407e;
  }

  &.default {
    background: #a1aebe;
  }
`;

const CheckIcon = () => (
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 8L7 13L18 2"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Stepper = ({ steps = [], activeIndex = 0 }) => {
  return (
    <Container>
      {steps.map((s, i) => {
        const isActive = i === activeIndex;
        const isCompleted = i < activeIndex;
        const stateClass = isCompleted
          ? 'completed'
          : isActive
            ? 'active'
            : 'default';

        return (
          <StepWrapper key={s.key || i}>
            <Circle className={stateClass}>
              {isCompleted ? <CheckIcon /> : i + 1}
            </Circle>
            <Label className={stateClass}>{s.label}</Label>
            {i < steps.length - 1 && (
              <Trail className={isCompleted ? 'active' : 'default'} />
            )}
          </StepWrapper>
        );
      })}
    </Container>
  );
};

export default Stepper;
