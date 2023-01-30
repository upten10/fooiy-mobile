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
      } else {
        state.feeds.value[index] = action.payload;
      }
    },
    setChanged: (state, action) => {
      const index = state.feeds.value.findIndex(
        e => e.id === action.payload.id,
      );
      state.feeds.value[index] = action.payload;
    },
    getFeed: (state, action) => {
      const index = state.feeds.value.findIndex(
        e => e.id === action.payload.id,
      );
      return state.feeds.value[index];
    },
    increment: state => {
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
