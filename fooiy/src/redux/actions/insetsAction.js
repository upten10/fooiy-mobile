import {insetsActions} from '../reducer/insets';

function setInsets(data) {
  return async (dispatch, getState) => {
    dispatch(insetsActions.setInsets(data));
  };
}

export const insetsAction = {setInsets};
