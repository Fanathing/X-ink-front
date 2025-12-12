export const initState = {
  name: '',
  address: '',
  business_number: '',
  email: '',
  phone: '',
  password: '',
  description: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMPANY_NAME':
      return { ...state, name: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    case 'SET_BUSINESS_NUMBER':
      return { ...state, business_number: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    default:
      return state;
  }
};
