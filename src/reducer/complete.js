export const initState = {
  id: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ID':
      return { ...state, id: action.payload };
    default:
      return state;
  }
};
