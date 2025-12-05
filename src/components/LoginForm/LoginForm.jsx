import { useReducer } from 'react';
import styled from 'styled-components';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';
import axios from 'axios';

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

const LoginForm = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/auth/login`,
        {
          email: state.email,
          password: state.password,
        },
        {
          withCredentials: true, // ✅ 필수
        },
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <EmailInput state={state} dispatch={dispatch} />
      <PasswordInput state={state} dispatch={dispatch} />
      <LoginButton />
    </StyledLoginForm>
  );
};

export default LoginForm;
