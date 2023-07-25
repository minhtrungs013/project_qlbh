const initialState = {
    practiceId: null, // Gi� tr? ban d?u c?a practiceId l� null ho?c gi� tr? b?n mu?n s? d?ng
  };
  
  const practiceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRACTICE_ID':
        return {
          ...state,
          practiceId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default practiceReducer;