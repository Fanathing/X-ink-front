import Check from '../Check/Check';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { initState, reducer } from '../../reducer/complete';
import { useReducer, useEffect } from 'react';
import axios from 'axios';

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

  const [state, dispatch] = useReducer(reducer, initState);

  const handleSelect = (type) => {
    navigate(`${type}`);
  };

  // detail page로 넘겨주기 위한 요청..파람스로 받아오는게 없어서 이렇게 처리함
  useEffect(() => {
    const JobInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/jobs/info`,
          { withCredentials: true },
        );

        const data = res.data;

        dispatch({ type: 'SET_ID', payload: data.id });
      } catch (err) {
        console.error(err);
      }
    };
    JobInfo();
  }, []);

  return (
    <StyledCompleteBox className="complete-box">
      <Check variant={'complete'} size={'200'} />
      <h2>등록 완료!</h2>
      <div className="buttons">
        <button
          className="detail-btn"
          onClick={() => handleSelect(`/detail/${state.id}`)}
        >
          상세페이지
        </button>
        <button className="retouch-btn" onClick={() => handleSelect('/jobs')}>
          다시 작성
        </button>
      </div>
    </StyledCompleteBox>
  );
};

export default CompleteBox;
