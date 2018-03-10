import axios from "axios";
import {
  FETCH_USER,
  FETCH_SURVEYS,
  FETCH_REQUESTS,
  UPVOTE_REQUEST,
  DOWNVOTE_REQUEST,
  CLEAR_MESSAGE
} from "./types";

// async await based
// if there is only one line to the arrow function codeblock we can remove the {} and the return
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitTrackRequest = (values, history) => async dispatch => {
  const res = await axios.post("/api/requests/", values);
  history.push("/requests");
  // dispatch({ type: FETCH_REQUESTS, payload: res.data });
};

export const fetchRequests = () => async dispatch => {
  const res = await axios.get("/api/requests");
  dispatch({ type: FETCH_REQUESTS, payload: res.data });
};

export const upvoteRequest = (userId, requestId) => async dispatch => {
  const res = await axios.post(`/api/${userId}/requests/${requestId}/upvote`);
  dispatch({ type: UPVOTE_REQUEST, payload: res.data });
};

export const downvoteRequest = (userId, requestId) => async dispatch => {
  const res = await axios.post(`/api/${userId}/requests/${requestId}/downvote`);
  dispatch({ type: DOWNVOTE_REQUEST, payload: res.data });
};

export const clearMessages = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGE, payload: "" });
};
