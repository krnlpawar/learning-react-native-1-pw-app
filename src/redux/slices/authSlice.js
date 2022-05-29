import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.accessToken = action.payload.access_token;
    },
    setSignOut: state => {
      state.user = null;
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

export const selectIsLoggedIn = state => state.userAuth.isLoggedIn;
export const selectUser = state => state.userAuth.user;
export const selectAcessToken = state => state.userAuth.accessToken;

export default authSlice.reducer;
