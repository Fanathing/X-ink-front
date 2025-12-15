import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';
import { volunteerLogin } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { initState, reducer } from '../../reducer/loginForm';

const StyledLoginForm = styled.form`
  & {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const ErrorMessage = styled.div`
  color: #d92828;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 10px;
  background: #ffe8e8;
  border-radius: 8px;
`;

const LoginForm = () => {
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
      const response = await volunteerLogin(state.email, state.password);

      // 로그인 응답에 user 데이터가 있으면 즉시 저장
      if (response.user) {
        login(response.user);
      }

      // 성공 메시지
      alert(response.message || '로그인 성공!');

      // 사용자 정보 새로고침 (쿠키에서 최신 정보 가져오기)
      try {
        await refresh();
      } catch (refreshError) {
        // 새로고침 실패 시 무시
      }

      // 메인 페이지로 이동
      navigate('/');
    } catch (error) {

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

export default LoginForm;
