import {userInfoActions} from '../reducer/userInfo';

function init(data) {
  return async (dispatch, getState) => {
    dispatch(userInfoActions.init(data));
  };
}

function edit(data) {
  return async (dispatch, getState) => {
    dispatch(userInfoActions.edit(data));
  };
}

function isExist(data) {
  return async (dispatch, getState) => {
    dispatch(userInfoActions.isExist(data));
  };
}

export const userInfoAction = {init, edit, isExist};
