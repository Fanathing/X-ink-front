import styled from 'styled-components';
import Input from '../Inputs/Input';
import { useReducer, useEffect } from 'react';
import TextArea from '../Inputs/TextArea';
import { initState, reducer } from '../../reducer/companies';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledCompaniesForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

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

const CompaniesForm = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'SET_ADDRESS', payload: user.ADDRESS });
    dispatch({ type: 'SET_PHONE', payload: user.PHONE });
    dispatch({ type: 'SET_DESCRIPTION', payload: user.DESCRIPTION });
  }, [user]);
  console.log(state);

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACK_URL}/profile/companies`,
        state,
        {
          withCredentials: true,
        },
      );
      alert('프로필이 등록 되었습니다!');
      navigate(`/companies-profile`);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <StyledCompaniesForm>
      <div className="input-first">
        <Input
          variant={'label'}
          placeholder={'주소를 입력해주세요'}
          label={'주소 *'}
          maxWidth={'881px'}
          height={'54px'}
          type={'text'}
          value={state.address}
          onChange={(e) =>
            dispatch({ type: 'SET_ADDRESS', payload: e.target.value })
          }
        />
      </div>

      <div className="input-second">
        <Input
          variant={'label'}
          placeholder={'기업의 연락처를 입력해주세요'}
          label={'기업 연락처 *'}
          maxWidth={'881px'}
          height={'54px'}
          type={'text'}
          value={state.phone}
          onChange={(e) =>
            dispatch({ type: 'SET_PHONE', payload: e.target.value })
          }
        />
      </div>

      <div className="inputs-third">
        <TextArea
          label="소개글 *"
          placeholder="기업의 대한 설명을 입력해주시길 바랍니다."
          width={'881px'}
          maxWidth={'881px'}
          height={'200px'}
          value={state.description}
          onChange={(e) =>
            dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })
          }
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        프로필 등록
      </button>
    </StyledCompaniesForm>
  );
};

export default CompaniesForm;
