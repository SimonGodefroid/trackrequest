import axios from 'axios';
import {
  FETCH_USER,
  FETCH_SURVEYS,
  FETCH_REQUESTS,
  FETCH_CURRENT_REQUEST,
  FETCH_SOURCE_ARTIST_IMAGE,
  FETCH_TARGET_ARTIST_IMAGE,
  UPVOTE_REQUEST,
  DOWNVOTE_REQUEST,
  CLEAR_MESSAGE,
  CLEAR_CURRENT_REQUEST,
} from './types';

// AIzaSyCGpdGpRgMnVn8vIycCAcWQo6D8OHp6_rg

// async await based
// if there is only one line to the arrow function codeblock we can remove the {} and the return
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitTrackRequest = (values, history) => async dispatch => {
  const res = await axios.post('/api/requests/', values);
  history.push('/requests');
  // dispatch({ type: FETCH_REQUESTS, payload: res.data });
};

export const fetchRequests = () => async dispatch => {
  const res = await axios.get('/api/requests');
  dispatch({ type: FETCH_REQUESTS, payload: res.data });
};

export const fetchCurrentRequest = id => async dispatch => {
  const res = await axios.get(`/api/requests/${id}`);
  dispatch({ type: FETCH_CURRENT_REQUEST, payload: res.data });
};

export const fetchSourceArtistImage = request => async dispatch => {
  const res = await axios
    .get(
      `https://api.qwant.com/api/search/images?count=10&offset=1&q=${
        request.sourceArtist
      }`,
    )
    .then(res =>
      dispatch({ type: FETCH_SOURCE_ARTIST_IMAGE, payload: res.data.data }),
    )
    .catch(error => {
      console.log(error.response);
      return dispatch({
        type: FETCH_SOURCE_ARTIST_IMAGE,
        payload: { result: { items: [] } },
      });
    });
};

export const fetchTargetArtistImage = request => async dispatch => {
  const res = await axios
    .get(
      `https://api.qwant.com/api/search/images?count=10&offset=1&q=${
        request.targetArtist
      }`,
    )
    .then(res =>
      dispatch({ type: FETCH_TARGET_ARTIST_IMAGE, payload: res.data.data }),
    )
    .catch(error => {
      console.log(error.response);
      return dispatch({
        type: FETCH_TARGET_ARTIST_IMAGE,
        payload: { result: { items: [] } },
      });
    });
};

export const clearCurrentRequest = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT_REQUEST, payload: undefined });
};

export const upvoteRequest = (userId, requestId) => async dispatch => {
  const res = await axios.post(`/api/requests/${requestId}/user/${userId}/upvote`);
  dispatch({ type: UPVOTE_REQUEST, payload: res.data });
};

export const downvoteRequest = (userId, requestId) => async dispatch => {
  const res = await axios.post(`/api/requests/${requestId}/user/${userId}/downvote`);
  dispatch({ type: DOWNVOTE_REQUEST, payload: res.data });
};

export const clearMessages = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGE, payload: '' });
};
