import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
