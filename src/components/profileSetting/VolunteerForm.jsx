import styled from 'styled-components';
import Input from '../Inputs/Input';
import ButtonSelectGroup from '../Jobs/ButtonSeleteGroup';
import { useReducer, useEffect } from 'react';
import TextArea from '../Inputs/TextArea';
import { initState, reducer } from '../../reducer/ProfileForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledVolunteerForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  & > .input-first {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 30px;
  }

  & > button {
    width: 100%;
    max-width: 931px;
    height: 46px;
    background-color: #2c6aa9;
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    border: 0px solid;
    border-radius: 4px;
  }
`;

const VolunteerForm = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'SET_PHONE_NUMBER', payload: user.PHONE_NUMBER });
    dispatch({ type: 'SET_BIRTH_DATE', payload: user.BIRTH_DATE });
    dispatch({ type: 'SET_POSITION', payload: user.POSITION });
    dispatch({ type: 'SET_INTRO', payload: user.INTRO });
  }, [user]);
  console.log(state);

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACK_URL}/profile/volunteer`,
        state,
        {
          withCredentials: true,
        },
      );
      alert('프로필이 등록 되었습니다!');
      navigate(`/volunteer-profile`);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <StyledVolunteerForm>
      <div className="input-first">
        <Input
          variant={'label'}
          placeholder={'연락처를 입력해주세요'}
          label={'연락처 *'}
          maxWidth={'450.5px'}
          height={'54px'}
          type={'text'}
          value={state.phone_number}
          onChange={(e) =>
            dispatch({ type: 'SET_PHONE_NUMBER', payload: e.target.value })
          }
        />
        <Input
          variant={'label'}
          label={'생년월일 *'}
          maxWidth={'450.5px'}
          height={'54px'}
          type={'date'}
          value={state.birth_date}
          onChange={(e) =>
            dispatch({ type: 'SET_BIRTH_DATE', payload: e.target.value })
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
      <div className="inputs-four">
        <TextArea
          label="자기 소개 *"
          placeholder="자기 소개를 적어주세요"
          width={'931px'}
          maxWidth={'931px'}
          height={'221px'}
          value={state.intro}
          onChange={(e) =>
            dispatch({ type: 'SET_INTRO', payload: e.target.value })
          }
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        프로필 등록
      </button>
    </StyledVolunteerForm>
  );
};

export default VolunteerForm;
