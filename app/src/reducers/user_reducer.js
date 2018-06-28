import {ROOT_API} from '../consts/consts';
import axios from 'axios';
import {USER_ID} from '../consts/consts';

import {FETCH_USER} from '../actions/index';

export default function(state=null, action){
  switch(action.type){
    case FETCH_USER:
      return action.payload.data;      
  }
  return state;
}
