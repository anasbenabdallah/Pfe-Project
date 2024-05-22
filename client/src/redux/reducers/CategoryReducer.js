const init = {
  categories: [],
  error: null,
};

const CategoryReducer = (state = init, action) => {
  switch (action.type) {
    case "getCategories":
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};

export default CategoryReducer;
