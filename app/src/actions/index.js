import axios from 'axios';
import {ROOT_API} from '../consts/consts';

export const FETCH_USER = 'FETCH_USER';

export function fetchUser(user_id){
  const url = `${ROOT_API}/user/getByID`;
  const request = axios({
    method: 'post',
    url: url,
    data: {user_id}
  });

  return{
    type: FETCH_USER,
    payload: request
  };
}
