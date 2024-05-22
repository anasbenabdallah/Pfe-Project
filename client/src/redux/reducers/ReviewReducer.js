const init = {
  reviews: [],
  error: null,
};

export const reviewsSelector = (state) => state.Review.reviews;
export const errorSelector = (state) => state.Review.error;

const ReviewReducer = (state = init, action) => {
  switch (action.type) {
    case "get_Reviews_success":
      return {
        ...state,
        reviews: action.payload,
      };
    case "add_Review_success":
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case "add_Review_error":
      return {
        ...state,
        error: action.payload,
      };

    case "get_Reviews_error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ReviewReducer;
