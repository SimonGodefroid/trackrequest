import {
  FETCH_REQUESTS,
  UPVOTE_REQUEST,
  DOWNVOTE_REQUEST,
  CLEAR_MESSAGE
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_REQUESTS:
      return {
        ...state,
        ...action.payload.message
      };
    case UPVOTE_REQUEST:
      return {
        ...state
      };
    case CLEAR_MESSAGE:
      return {
        ...state
      };
    default:
      return state;
  }
}
