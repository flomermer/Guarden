import axios from 'axios';
import {ROOT_API} from '../consts/consts';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_TREE_USERS = 'FETCH_TREE_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_POST = 'ADD_POST';
export const LOGOUT_USER  = 'LOGOUT_USER';

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

export function fetchTreeUsers(user_id){
  const url = `${ROOT_API}/user/getUsersByLevels`;
  const request = axios({
    method: 'post',
    url: url,
    data: {user_id}
  });

  return{
    type: FETCH_TREE_USERS,
    payload: request
  };
}

export function updateUser(user){
  return{
    type:UPDATE_USER,
    payload: user
  }
}

export function logout(){
  return{
    type:LOGOUT_USER,
    payload: null
  }
}

export function fetchPosts(user_id){
  const url = `${ROOT_API}/community/getPosts`;
  const request = axios({
    method: 'post',
    url: url,
    data: {user_id}
  });

  return{
    type: FETCH_POSTS,
    payload: request
  };
}

export function addPost(content,user_id){
  const url = `${ROOT_API}/community/addPost`;
  const request = axios({
    method: 'PUT',
    url: url,
    data: {user_id, content}
  });

  return{
    type:ADD_POST,
    payload: request
  }
}
