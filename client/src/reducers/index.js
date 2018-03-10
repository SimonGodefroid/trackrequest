import { combineReducers } from "redux";
import authReducer from "./authReducer";
import requestsReducer from "./requestsReducer";
import messageReducer from "./messageReducer";
import { reducer as reduxForm } from "redux-form";
// the keys of this object will be the keys inside the state object
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  requests: requestsReducer,
  message: messageReducer
});
