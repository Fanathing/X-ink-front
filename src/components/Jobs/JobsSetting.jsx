import styled from 'styled-components';
import Input from '../Inputs/Input';
import Title from './Title';
import ButtonSelectGroup from './ButtonSeleteGroup';
import { initState, reducer } from '../../reducer/jobsCreate';
import { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextArea from '../Inputs/TextArea';

const StyledJobsSetting = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  & > .inputs-first {
    margin-top: 10px;
  }

  & > .inputs-third {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  & > .buttons {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  & > .buttons > button {
    color: #ffffff;
    background-color: #03407e;
    font-size: 20px;
    font-weight: 700;
    border-radius: 8px;
    border: 0px solid;
    cursor: pointer;
  }
  & > .buttons > .update-jobs-btn {
    width: 460px;
    height: 51px;
    background-color: #03407e;
  }
  & > .buttons > .delete-jobs-btn {
    width: 120px;
    height: 51px;
    background-color: #d92828;
  }
`;

const JobsSetting = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initState);
  //  얘가 데이터를 불러와서 채워넣는 요청
  useEffect(() => {
    const JobInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/jobs/info`,
          { withCredentials: true },
        );

        const data = res.data;

        dispatch({ type: 'SET_TITLE', payload: data.title });
        dispatch({ type: 'SET_POSITION', payload: data.position });
        dispatch({ type: 'SET_START_LINE', payload: data.start_line });
        dispatch({ type: 'SET_DEAD_LINE', payload: data.dead_line });
        dispatch({
          type: 'SET_JOB_DESCRIPTION',
          payload: data.job_description,
        });
      } catch (err) {
        console.error(err);
      }
    };
    JobInfo();
  }, []);

  //   공고 수정 함수
  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACK_URL}/jobs`, state, {
        withCredentials: true,
      });
      navigate('/jobs/complete');
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };
  // 공고 삭제 함수
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACK_URL}/jobs`, {
        withCredentials: true,
      });
      navigate('/jobs/complete');
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <StyledJobsSetting>
      <Title />
      <div className="inputs-first">
        <Input
          variant={'label'}
          placeholder={'올리실 공고의 제목을 입력하세요'}
          label={'제목 *'}
          maxWidth={'590px'}
          height={'54px'}
          type={'text'}
          value={state.title}
          onChange={(e) =>
            dispatch({ type: 'SET_TITLE', payload: e.target.value })
          }
        />
      </div>
      <div className="inputs-second">
        <ButtonSelectGroup
          options={[
            { value: '블록체인', label: '블록체인' },
            { value: '프론트엔드', label: '프론트엔드' },
            { value: '백엔드', label: '백엔드' },
          ]}
          value={state.position}
          onChange={(value) =>
            dispatch({ type: 'SET_POSITION', payload: value })
          }
        />
      </div>
      <div className="inputs-third">
        <Input
          variant={'label'}
          label={'시작일 *'}
          maxWidth={'287.5px'}
          height={'54px'}
          type={'date'}
          value={state.start_line}
          onChange={(e) =>
            dispatch({ type: 'SET_START_LINE', payload: e.target.value })
          }
        />
        <Input
          variant={'label'}
          label={'마감일 *'}
          maxWidth={'287.5px'}
          height={'54px'}
          type={'date'}
          value={state.dead_line}
          onChange={(e) =>
            dispatch({ type: 'SET_DEAD_LINE', payload: e.target.value })
          }
        />
      </div>
      <div className="inputs-four">
        <TextArea
          label="업무 설명 *"
          placeholder="메모장"
          width={'100%'}
          maxWidth={'590px'}
          height={'200px'}
          value={state.job_description}
          onChange={(e) =>
            dispatch({ type: 'SET_JOB_DESCRIPTION', payload: e.target.value })
          }
        />
      </div>
      <div className="buttons">
        <button
          className="update-jobs-btn"
          type="button"
          onClick={handleUpdate}
        >
          수정
        </button>
        <button
          className="delete-jobs-btn"
          type="button"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </StyledJobsSetting>
  );
};

export default JobsSetting;
