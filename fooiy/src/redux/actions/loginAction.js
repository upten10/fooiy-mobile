import {loginActions} from '../reducer/login';

function setLogin(data) {
  return async (dispatch, getState) => {
    dispatch(loginActions.setLogin(data));
  };
}

export const loginAction = {setLogin};
