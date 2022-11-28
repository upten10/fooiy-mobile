import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  feeds: {value: []},
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    append: (state, action) => {
      const index = state.feeds.value.findIndex(
        e => e.id === action.payload.id,
      );
      if (index === -1) {
        state.feeds.value = [...state.feeds.value, action.payload];
      }
    },
    setChanged: (state, action) => {
      const index = state.feeds.value.findIndex(
        e => e.id === action.payload.id,
      );
      state.feeds.value[index] = action.payload;
      console.log('change');
    },
    getFeed: (state, action) => {
      const index = state.feeds.value.findIndex(
        e => e.id === action.payload.id,
      );
      return index;
    },
    increment: state => {
      console.log(state);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const feedsActions = feedSlice.actions;

export default feedSlice.reducer;
