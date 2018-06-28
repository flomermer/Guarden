import {ROOT_API} from '../consts/consts';
import axios from 'axios';
import {USER_UPDATED} from '../actions/index';
import {USER_ID} from '../consts/consts';

export default function(state=null, action){
  switch(action.type){
    case USER_UPDATED:
      return action.payload.data.level;
  }
  return state;
}
