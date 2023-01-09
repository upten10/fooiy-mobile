import {configureStore} from '@reduxjs/toolkit';
import feedsReducer from './reducer/feeds';
import userInfoReducer from './reducer/userInfo';
import loginReducer from './reducer/login';

export default configureStore({
  reducer: {
    feeds: feedsReducer,
    userInfo: userInfoReducer,
    login: loginReducer,
  },
});
