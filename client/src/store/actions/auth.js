import {apiCall, setHeaderToken} from '../../services/api';
import {SET_CURRENT_USER} from '../actionTypes';
import {addError, removeError} from './errors';

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthToken(token) {
  setHeaderToken(token)
}

export const logout = (history) => dispatch => {
    localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser({}))
    history.push("/")
}

export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve(); 
        })
        .catch(err => {
          dispatch(addError(err.message))
          reject();
        });
    });
  };
}
