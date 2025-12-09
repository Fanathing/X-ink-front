export const initState = {
  email: '',
  name: '',
  password: '',
  phone_number: '',
  birth_date: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, phone_number: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_BIRTH_DATE':
      return { ...state, birth_date: action.payload };
    default:
      return state;
  }
};
