import {FETCH_USER, UPDATE_USER, LOGOUT_USER} from '../actions/index';

export default function(state=null, action){
  switch(action.type){
    case FETCH_USER:
      return action.payload.data;
    case UPDATE_USER:
      return action.payload;
    case LOGOUT_USER:
      console.log("logout");
      return action.payload;
    default:
      return state;
  }
}
