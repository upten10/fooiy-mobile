import {createSlice} from '@reduxjs/toolkit';

const initialState = {value: {}};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    init: (state, action) => {
      state.value = action.payload;
    },
    edit: (state, action) => {
      state.value = action.payload;
    },
    isExist: (state, action) => {
      if ('introduction' in state.userInfo.value) {
        return true;
      }
      return false;
    },
  },
});

// Action creators are generated for each case reducer function
export const userInfoActions = userInfoSlice.actions;

export default userInfoSlice.reducer;
