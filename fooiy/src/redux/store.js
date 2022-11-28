import {configureStore} from '@reduxjs/toolkit';
import feedsReducer from './reducer/feeds';

export default configureStore({
  reducer: {
    feeds: feedsReducer,
  },
});
