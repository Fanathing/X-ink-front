export const initState = {
  phone_number: '',
  birth_date: '',
  position: '',
  intro: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PHONE_NUMBER':
      return { ...state, phone_number: action.payload };
    case 'SET_BIRTH_DATE':
      return { ...state, birth_date: action.payload };
    case 'SET_POSITION':
      return { ...state, position: action.payload };
    case 'SET_INTRO':
      return { ...state, intro: action.payload };
    default:
      return state;
  }
};
