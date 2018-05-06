import axios from 'axios';
import {
  FETCH_USER,
  FETCH_REQUESTS,
  DELETE_REQUEST,
  FETCH_CURRENT_REQUEST,
  UPVOTE_REQUEST,
  DOWNVOTE_REQUEST,
  GET_COMMENTS,
  POST_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  CLEAR_MESSAGE,
  CLEAR_CURRENT_REQUEST,
  POST_REPLY,
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

export const submitTrackRequest = (
  values,
  userid,
  history,
) => async dispatch => {
  // eslint-disable-next-line no-unused-vars
  const res = await axios.post(`/api/requests/${userid}`, values);
  history.push('/requests');
  // dispatch({ type: FETCH_REQUESTS, payload: res.data });
};

export const fetchRequests = () => async dispatch => {
  const res = await axios.get('/api/requests?sort[upvotes]=-1');
  dispatch({ type: FETCH_REQUESTS, payload: res.data });
};

export const deleteRequest = (id, history) => async dispatch => {
  // eslint-disable-next-line
  const res = await axios.delete(`/api/requests/${id}`);
  dispatch({ type: DELETE_REQUEST, payload:{} });
  history.push('/requests');
};

export const fetchCurrentRequest = id => async dispatch => {
  const res = await axios.get(`/api/requests/${id}`);
  dispatch({ type: FETCH_CURRENT_REQUEST, payload: res.data });
};

export const clearCurrentRequest = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT_REQUEST, payload: undefined });
};

export const upvoteRequest = (userId, requestId) => async dispatch => {
  const res = await axios.post(
    `/api/requests/upvote/${requestId}/user/${userId}`,
  );
  dispatch({ type: UPVOTE_REQUEST, payload: res.data });
};

export const downvoteRequest = (userId, requestId) => async dispatch => {
  const res = await axios.post(
    `/api/requests/downvote/${requestId}/user/${userId}`,
  );
  dispatch({ type: DOWNVOTE_REQUEST, payload: res.data });
};

export const clearMessages = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGE, payload: '' });
};

export const getComments = requestId => async dispatch => {
  const res = await axios.get(`/api/comments/request/${requestId}`);
  dispatch({ type: GET_COMMENTS, payload: res.data.message });
};

export const postComment = (userId, requestId, content) => async dispatch => {
  const res = await axios.post(`/api/comments/${requestId}/user/${userId}`, {
    content: content,
  });
  dispatch({ type: POST_COMMENT, payload: res.data });
};

export const deleteComment = (commentId, requestId) => async dispatch => {
  const res = await axios.delete(
    `/api/comments/${commentId}/request/${requestId}`,
  );
  dispatch({ type: DELETE_COMMENT, payload: res.data });
};

export const upvoteComment = (commentId, userId) => async dispatch => {
  const res = await axios.post(
    `/api/comments/upvote/${commentId}/user/${userId}`,
  );
  dispatch({ type: UPVOTE_COMMENT, payload: res.data });
};

export const downvoteComment = (commentId, userId) => async dispatch => {
  const res = await axios.post(
    `/api/comments/downvote/${commentId}/user/${userId}`,
  );
  dispatch({ type: DOWNVOTE_COMMENT, payload: res.data });
};

export const postReply = (
  userId,
  requestId,
  commentId,
  content,
) => async dispatch => {
  const res = await axios.post(
    `/api/replies/request/${requestId}/comment/${commentId}/user/${userId}`,
    {
      content: content,
    },
  );
  dispatch({ type: POST_REPLY, payload: res.data });
};
