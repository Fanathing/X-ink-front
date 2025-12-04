import styled from 'styled-components';

const StyledBulkhead = styled.div`
  & {
    width: 1px;
    height: 10px;
    background-color: #d5d7e0;
  }
`;

const Bulkhead = () => {
  return <StyledBulkhead />;
};

export default Bulkhead;
