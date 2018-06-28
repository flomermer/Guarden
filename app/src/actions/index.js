import axios from 'axios';
import {ROOT_API} from '../consts/consts';

export const USER_UPDATED = 'USER_UPDATED';
export const LOGIN = 'LOGIN';

export function updateUser(user){
  const url = `${ROOT_API}/user/getByID`;
  const request = axios({
    method: 'post',
    url: url,
    data: {
      user_id: '5b2a680d134ce03c9cdfb2e2'
    }
  });

  return{
    type: USER_UPDATED,
    payload: request
  };
}
