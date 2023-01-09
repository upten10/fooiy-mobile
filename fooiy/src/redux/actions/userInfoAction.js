import {userInfoActions} from '../reducer/userInfo';

function init(data) {
  return async (dispatch, getState) => {
    dispatch(userInfoActions.init(data));
  };
}

function editIntro(data) {
  return async (dispatch, getState) => {
    dispatch(userInfoActions.editIntro(data));
  };
}

function isExist(data) {
  return async (dispatch, getState) => {
    dispatch(userInfoActions.isExist(data));
  };
}

function isLogin(data) {
  return async (dispatch, getState) => {
    dispatch(userInfoActions.isLogin(data));
  };
}

export const userInfoAction = {init, editIntro, isExist, isLogin};
