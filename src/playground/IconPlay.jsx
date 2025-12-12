import styled from 'styled-components';
import { SearchIcon, ArrowIcon, DoubleArrowIcon } from '../components/Icons';

const Container = styled.div`
  padding: 40px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const Section = styled.div`
  margin-bottom: 60px;
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`

  font-size: 24px;
  font-weight: 700;
  color: #3a4044;
  margin-bottom: 20px;
`;

const Description = styled.p`

  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const IconGrid = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  align-items: center;
  padding: 30px;
  background: #f8f8f8;
  border-radius: 8px;
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const Label = styled.span`

  font-size: 12px;
  color: #666;
  text-align: center;
`;

const CodeBlock = styled.pre`
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  font-size: 13px;
  overflow-x: auto;
  margin-top: 15px;
`;

const IconPlay = () => {
  const handleClick = (iconName) => {
    console.log(`${iconName} 아이콘 클릭!`);
  };

  return (
    <Container>
      <Section>
        <Title>1. SearchIcon - 검색 아이콘</Title>
        <Description>
          돋보기 아이콘입니다. Large (24x24)와 Small (14x13.34) 두 가지 크기를
          지원합니다.
        </Description>
        <IconGrid>
          <IconItem>
            <SearchIcon
              size="large"
              onClick={() => handleClick('Large Search')}
            />
            <Label>Large (24x24)</Label>
          </IconItem>

          <IconItem>
            <SearchIcon
              size="small"
              onClick={() => handleClick('Small Search')}
            />
            <Label>Small (14x13.34)</Label>
          </IconItem>
        </IconGrid>

        <CodeBlock>
          {`import { SearchIcon } from './components/Icons';

            // Large
            <SearchIcon size="large" onClick={handleSearch} />

            // Small
            <SearchIcon size="small" onClick={handleSearch} />`}
        </CodeBlock>
      </Section>

      <Section>
        <Title>2. ArrowIcon - 단일 화살표</Title>
        <Description>
          방향 화살표 아이콘입니다. 4방향(left, right, up, down)을 지원합니다.
        </Description>
        <IconGrid>
          <IconItem>
            <ArrowIcon
              direction="left"
              onClick={() => handleClick('Left Arrow')}
            />
            <Label>왼쪽 (&lt;)</Label>
          </IconItem>

          <IconItem>
            <ArrowIcon
              direction="right"
              onClick={() => handleClick('Right Arrow')}
            />
            <Label>오른쪽 (&gt;)</Label>
          </IconItem>

          <IconItem>
            <ArrowIcon direction="up" onClick={() => handleClick('Up Arrow')} />
            <Label>위 (^)</Label>
          </IconItem>

          <IconItem>
            <ArrowIcon
              direction="down"
              onClick={() => handleClick('Down Arrow')}
            />
            <Label>아래 (v)</Label>
          </IconItem>
        </IconGrid>

        <CodeBlock>
          {`import { ArrowIcon } from './components/Icons';

        <ArrowIcon direction="left" onClick={handlePrev} />
        <ArrowIcon direction="right" onClick={handleNext} />
        <ArrowIcon direction="up" onClick={handleUp} />
        <ArrowIcon direction="down" onClick={handleDown} />`}
        </CodeBlock>
      </Section>

      <Section>
        <Title>3. DoubleArrowIcon - 더블 화살표</Title>
        <Description>
          처음/끝으로 이동할 때 사용하는 더블 화살표입니다.
        </Description>
        <IconGrid>
          <IconItem>
            <DoubleArrowIcon
              direction="left"
              onClick={() => handleClick('First')}
            />
            <Label>처음으로 (&lt;&lt;)</Label>
          </IconItem>

          <IconItem>
            <DoubleArrowIcon
              direction="right"
              onClick={() => handleClick('Last')}
            />
            <Label>끝으로 (&gt;&gt;)</Label>
          </IconItem>
        </IconGrid>

        <CodeBlock>
          {`import { DoubleArrowIcon } from './components/Icons';

        <DoubleArrowIcon direction="left" onClick={handleFirst} />
        <DoubleArrowIcon direction="right" onClick={handleLast} />`}
        </CodeBlock>
      </Section>

      <Section>
        <Title>4. 커스터마이징</Title>
        <Description>크기, 색상을 자유롭게 변경할 수 있습니다.</Description>
        <IconGrid>
          <IconItem>
            <ArrowIcon
              direction="right"
              size="32px"
              fontSize="24px"
              color="#D92828"
            />
            <Label>빨간색 큰 화살표</Label>
          </IconItem>

          <IconItem>
            <ArrowIcon
              direction="left"
              size="20px"
              fontSize="18px"
              color="#03407E"
            />
            <Label>파란색 화살표</Label>
          </IconItem>

          <IconItem>
            <DoubleArrowIcon
              direction="right"
              size="24px"
              fontSize="18px"
              color="#28a745"
            />
            <Label>초록색 더블 화살표</Label>
          </IconItem>
        </IconGrid>

        <CodeBlock>
          {`// 크기와 색상 커스터마이징
            <ArrowIcon 
            direction="right"
            size="32px"       // 전체 크기
            fontSize="24px"   // 화살표 크기
            color="#D92828"   // 색상
            onClick={handleClick}
        />`}
        </CodeBlock>
      </Section>

      <Section>
        <Title>5. Pagination에서 사용 예시</Title>
        <Description>
          페이지네이션 컴포넌트에서 실제로 사용되는 모습입니다.
        </Description>
        <IconGrid>
          <IconItem>
            <DoubleArrowIcon direction="left" color="#333333" fontSize="12px" />
            <Label>처음</Label>
          </IconItem>

          <IconItem>
            <ArrowIcon direction="left" color="#000000" fontSize="14px" />
            <Label>이전</Label>
          </IconItem>

          <IconItem>
            <div
              style={{
                padding: '8px 12px',
                background: '#03407E',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              1
            </div>
            <Label>현재 페이지</Label>
          </IconItem>

          <IconItem>
            <ArrowIcon direction="right" color="#000000" fontSize="14px" />
            <Label>다음</Label>
          </IconItem>

          <IconItem>
            <DoubleArrowIcon
              direction="right"
              color="#000000"
              fontSize="12px"
            />
            <Label>끝</Label>
          </IconItem>
        </IconGrid>
      </Section>

      <Section>
        <Title>사용 가이드</Title>
        <Description>
          <strong>SearchIcon Props:</strong>
          <br />• <code>size</code>: large (24x24) 또는 small (14x13.34)
          <br />• <code>onClick</code>: 클릭 핸들러
          <br />
          <br />
          <strong>ArrowIcon Props:</strong>
          <br />• <code>direction</code>: left, right, up, down
          <br />• <code>size</code>: 전체 크기 (기본: 16px)
          <br />• <code>fontSize</code>: 화살표 크기 (기본: 16px)
          <br />• <code>color</code>: 색상 (기본: #03407E)
          <br />• <code>onClick</code>: 클릭 핸들러
          <br />
          <br />
          <strong>DoubleArrowIcon Props:</strong>
          <br />• <code>direction</code>: left (처음으로), right (끝으로)
          <br />• <code>size</code>: 전체 크기 (기본: 16px)
          <br />• <code>fontSize</code>: 화살표 크기 (기본: 14px)
          <br />• <code>color</code>: 색상 (기본: #03407E)
          <br />• <code>onClick</code>: 클릭 핸들러
        </Description>
      </Section>
    </Container>
  );
};

export default IconPlay;
