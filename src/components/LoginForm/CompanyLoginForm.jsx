import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';
import { companiesLogin } from '../../services/api';
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
      // API 호출
      const response = await companiesLogin(state.email, state.password);
      
      console.log('✅ 기업 로그인 API 응답:', response);

      // 로그인 응답에 user 데이터가 있으면 즉시 저장
      if (response.user) {
        console.log('🔐 로그인 처리 (user 데이터):', response.user);
        login(response.user);
      }

      // 성공 메시지
      alert(response.message || '로그인 성공!');

      // 사용자 정보 새로고침 (쿠키에서 최신 정보 가져오기)
      try {
        await refresh();
        console.log('✅ 사용자 정보 새로고침 완료');
      } catch (refreshError) {
        console.warn('⚠️ 사용자 정보 새로고침 실패 (계속 진행):', refreshError);
      }

      // 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error('❌ 로그인 에러:', error);
      
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
