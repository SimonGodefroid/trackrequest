// initial value for state={};
// in reducers we have a state and an action as parameters and we switch over the action.type case and by default return the state
import { FETCH_USER } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
