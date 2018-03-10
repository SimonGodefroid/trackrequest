import { UPVOTE_REQUEST, CLEAR_MESSAGE } from "../actions/types";

const initialState = {
  message: undefined
};

export default function(state, action) {
  switch (action.type) {
    case UPVOTE_REQUEST:
      return {
        ...state,
        content: action.payload.message
      };
    case CLEAR_MESSAGE:
      return {
        ...state
      };
    default:
      return initialState;
  }
}
