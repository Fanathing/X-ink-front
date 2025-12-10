import Check from '../Check/Check';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const StyledCompleteBox = styled.div`
  & {
    margin-top: 227px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  & > h2 {
    font-size: 30px;
    font-weight: 700;
  }

  & > div {
    font-size: 16.7px;
    font-weight: 500;
  }

  & > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    margin-top: 66px;
  }
  & > .buttons > .detail-btn {
    width: 461px;
    height: 51px;
    background-color: #03407e;
    font-size: 20px;
    font-weight: 500;
    border: 0px solid;
    cursor: pointer;
    border-radius: 6px;
    color: #ffffff;
  }

  & > .buttons > .retouch-btn {
    width: 119px;
    height: 51px;
    background-color: #e5e7f0;
    color: #56575f;
    font-size: 18px;
    font-weight: 900;
    border: 0px solid;
    cursor: pointer;
    border-radius: 8px;
  }
`;

const CompleteBox = () => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    navigate(`${type}`);
  };

  const { id } = useParams();

  return (
    <StyledCompleteBox className="complete-box">
      <Check variant={'complete'} size={'200'} />
      <h2>지원 완료!</h2>
      <div className="buttons">
        <button
          className="detail-btn"
          onClick={() => handleSelect(`/detail/${id}`)}
        >
          상세페이지
        </button>
        <button
          className="retouch-btn"
          onClick={() => handleSelect(`/jobapplyform/${id}`)}
        >
          다시 지원
        </button>
      </div>
    </StyledCompleteBox>
  );
};

export default CompleteBox;
