import {
  FETCH_REQUESTS,
  FETCH_CURRENT_REQUEST,
  CLEAR_CURRENT_REQUEST,
  UPVOTE_REQUEST,
  DOWNVOTE_REQUEST,
  CLEAR_MESSAGE,
  FETCH_SOURCE_ARTIST_IMAGE,
  FETCH_TARGET_ARTIST_IMAGE,
  POST_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
} from "../modules/types";

// AIzaSyCGpdGpRgMnVn8vIycCAcWQo6D8OHp6_rg

const initialState = {
  requests: [],
  currentRequest: {},
  imageSourceArtist: [],
  imageTargetArtist: [],
  comments:[],
};

export const reducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      return {
        ...state,
        requests: action.payload.message
      };
    case FETCH_CURRENT_REQUEST:
      return {
        ...state,
        currentRequest: action.payload.message
      };
    case FETCH_SOURCE_ARTIST_IMAGE:
      return {
        ...state,
        imageSourceArtist: action.payload.result.items
      };
    case FETCH_TARGET_ARTIST_IMAGE:
      return {
        ...state,
        imageTargetArtist: action.payload.result.items
      };
    case CLEAR_CURRENT_REQUEST:
      return {
        ...state,
        currentRequest: undefined
      };
    case UPVOTE_REQUEST:
      return {
        ...state,
        message: action.payload.message
      };
    case DOWNVOTE_REQUEST:
      return {
        ...state,
        message: action.payload.message
      };
    case CLEAR_MESSAGE:
      return {
        ...state
      };
    case POST_COMMENT:
      return {
        ...state
      };
    case DELETE_COMMENT:
      return {
        ...state
      };
    case GET_COMMENTS:
    console.log('mercer')
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return initialState;
  }
}
