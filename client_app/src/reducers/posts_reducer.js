import {FETCH_POSTS, ADD_POST} from '../actions/index';

export default function(state=null, action){
  switch(action.type){
    case FETCH_POSTS:
      //console.log(action.payload.data);
      return action.payload.data;
    case ADD_POST:
      return [action.payload.data, ...state];  //ES6 for concat()
    default:
      return state;
  }
}
