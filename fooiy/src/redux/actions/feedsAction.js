import {feedsActions} from '../reducer/feeds';

function increment() {
  return async (dispatch, getState) => {
    dispatch(feedsActions.increment());
  };
}

function append(data) {
  return async (dispatch, getState) => {
    dispatch(feedsActions.append(data));
  };
}

function setChanged(data) {
  return async (dispatch, getState) => {
    dispatch(feedsActions.setChanged(data));
  };
}

function getFeed(data) {
  return async (dispatch, getState) => {
    dispatch(feedsActions.getFeed(data));
  };
}

export const feedsAction = {increment, append, setChanged, getFeed};
