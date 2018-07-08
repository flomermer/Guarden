import {FETCH_TREE_USERS} from '../actions/index';

export default function(state=null, action){
  switch(action.type){
    case FETCH_TREE_USERS:
      //console.log("recieve action",action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}
