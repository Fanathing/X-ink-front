import styled from 'styled-components';
import Input from '../Inputs/Input';
import Title from './Title';
import { useReducer, useEffect } from 'react';
import ButtonSelectGroup from '../Jobs/ButtonSeleteGroup';
import { initState, reducer } from '../../reducer/jobApplyForm';
import TextArea from '../Inputs/TextArea';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const StyledApplyInputs = styled.form`
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

  & > .create-jobs-btn {
    width: 590px;
    height: 51px;
    color: #ffffff;
    background-color: #03407e;
    font-size: 20px;
    font-weight: 700;
    border-radius: 8px;
  }
`;

const ApplyInputs = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>유저 정보를 불러오는 중입니다...</div>;
  }

  useEffect(() => {
    dispatch({ type: 'SET_EMAIL', payload: user.EMAIL });
    dispatch({ type: 'SET_NAME', payload: user.NAME });
    dispatch({ type: 'SET_PHONE_NUMBER', payload: user.PHONE_NUMBER });
    dispatch({ type: 'SET_POSITION', payload: user.POSITION });
    dispatch({ type: 'SET_INTRO', payload: user.INTRO });
  }, []);

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initState);

  const { id } = useParams();

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACK_URL}/jobapplications/${id}`,
        state,
        {
          withCredentials: true,
        },
      );
      navigate(`/jobapplyform/complete/${id}`);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };
  return (
    <StyledApplyInputs>
      <Title />
      <div className="inputs-first">
        <Input
          variant={'label'}
          placeholder={'성함을 입력해주세요'}
          label={'성명 *'}
          maxWidth={'590px'}
          height={'54px'}
          type={'text'}
          value={state.name}
          onChange={(e) =>
            dispatch({ type: 'SET_NAME', payload: e.target.value })
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
          label={'이메일 *'}
          placeholder="이메일을 적어주세요"
          maxWidth={'287.5px'}
          height={'54px'}
          type={'email'}
          value={state.email}
          onChange={(e) =>
            dispatch({ type: 'SET_EMAIL', payload: e.target.value })
          }
        />
        <Input
          variant={'label'}
          label={'연락처 *'}
          placeholder="연락처를 적어주세요"
          maxWidth={'287.5px'}
          height={'54px'}
          type={'text'}
          value={state.phone_number}
          onChange={(e) =>
            dispatch({ type: 'SET_PHONE_NUMBER', payload: e.target.value })
          }
        />
      </div>
      <div className="inputs-four">
        <TextArea
          label="자기 소개 *"
          placeholder="자기 소개를 적어주세요"
          width={'100%'}
          maxWidth={'590px'}
          height={'200px'}
          value={state.intro}
          onChange={(e) =>
            dispatch({ type: 'SET_INTRO', payload: e.target.value })
          }
        />
      </div>
      <button className="create-jobs-btn" type="button" onClick={handleSubmit}>
        공고 지원
      </button>
    </StyledApplyInputs>
  );
};

export default ApplyInputs;
