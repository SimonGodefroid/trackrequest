import {
  FETCH_REQUESTS,
  FETCH_CURRENT_REQUEST,
  CLEAR_CURRENT_REQUEST,
  UPVOTE_REQUEST,
  DOWNVOTE_REQUEST,
  CLEAR_MESSAGE,
  POST_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  POST_REPLY,
} from '../modules/types';

// AIzaSyCGpdGpRgMnVn8vIycCAcWQo6D8OHp6_rg

const initialState = {
  requests: [],
  currentRequest: {},
  comments: [],
};

export const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      return {
        ...state,
        requests: action.payload.message,
      };
    case FETCH_CURRENT_REQUEST:
      return {
        ...state,
        currentRequest: action.payload.message,
      };
    case CLEAR_CURRENT_REQUEST:
      return {
        ...state,
        currentRequest: undefined,
      };
    case UPVOTE_REQUEST:
      return {
        ...state,
        message: action.payload.message,
      };
    case DOWNVOTE_REQUEST:
      return {
        ...state,
        message: action.payload.message,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
      };
    case POST_COMMENT:
      return {
        ...state,
      };
    case DELETE_COMMENT:
      return {
        ...state,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case UPVOTE_COMMENT:
      return {
        ...state,
        message: action.payload.message,
      };
    case DOWNVOTE_COMMENT:
      return {
        ...state,
        message: action.payload.message,
      };
    case POST_REPLY:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return initialState;
  }
};
