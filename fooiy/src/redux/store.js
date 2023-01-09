import {configureStore} from '@reduxjs/toolkit';
import feedsReducer from './reducer/feeds';
import userInfoReducer from './reducer/userInfo';

export default configureStore({
  reducer: {
    feeds: feedsReducer,
    userInfo: userInfoReducer,
  },
});
