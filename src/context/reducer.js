export const initialState = {
  basket: [],
  user: null,
  idx: 0,
};

function reducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, { ...action.item }],
        idx: state.idx + 1,
      };
    case "REMOVE_FROM_BASKET":
      console.log(action.item);
      return {
        ...state,
        basket: state.basket.filter((item) => item.idx !== action.item.idx),
        idx: state.idx - 1,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
}

export default reducer;
