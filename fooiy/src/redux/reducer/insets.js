import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const insetsSlice = createSlice({
  name: 'insets',
  initialState,
  reducers: {
    setInsets: (state, action) => {
      state.insets = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const insetsActions = insetsSlice.actions;

export default insetsSlice.reducer;
