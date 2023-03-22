import {configureStore} from '@reduxjs/toolkit';
import feedsReducer from './reducer/feeds';
import userInfoReducer from './reducer/userInfo';
import loginReducer from './reducer/login';
import insets from './reducer/insets';
import reactotron from '../../ReactotronConfig';

export default configureStore({
  reducer: {
    feeds: feedsReducer,
    userInfo: userInfoReducer,
    login: loginReducer,
    insets: insets,
  },
  enhancers: [reactotron.createEnhancer()],
});
