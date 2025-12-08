import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';
import { loginLocal } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const initState = {
  email: '',
  password: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const StyledLoginForm = styled.form`
  & {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const ErrorMessage = styled.div`
  color: #D92828;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 10px;
  background: #ffe8e8;
  border-radius: 8px;
`;

const CompanyLoginForm = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, refresh } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // API 호출 (백엔드에서 이메일로 사용자 타입 구분)
      const response = await loginLocal(state.email, state.password);
      
      // 기업 회원인지 확인
      if (response.user.userType !== 'company') {
        setError('기업 회원 로그인 페이지입니다. 개인 회원은 일반 로그인을 이용해주세요.');
        setIsLoading(false);
        return;
      }
      
      // AuthContext에 사용자 정보 저장
      login(response.user);
      
      // 사용자 정보 새로고침
      await refresh();
      
      // 메인 페이지로 이동
      navigate('/');
      
      // 성공 메시지
      alert(response.message || '로그인 성공!');
    } catch (error) {
      console.error('로그인 에러:', error);
      
      if (error.message === 'UNAUTHORIZED') {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (error.message.includes('Network')) {
        setError('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setError(error.message || '로그인에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <EmailInput state={state} dispatch={dispatch} />
      <PasswordInput state={state} dispatch={dispatch} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoginButton disabled={isLoading} />
    </StyledLoginForm>
  );
};

export default CompanyLoginForm;
