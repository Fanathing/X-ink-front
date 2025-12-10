export const initState = {
  email: '',
  name: '',
  phone_number: '',
  position: '',
  intro: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_PHONE_NUMBER':
      return { ...state, phone_number: action.payload };
    case 'SET_POSITION':
      return { ...state, position: action.payload };
    case 'SET_INTRO':
      return { ...state, intro: action.payload };
    default:
      return state;
  }
};
