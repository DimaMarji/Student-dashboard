import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser} from "../api/fakeApi";
import {a} from "vite/dist/node/types.d-FdqQ54oU";

interface UserState {
  username: string;
  id: string;
  email: string;
}

const initialState: UserState = {
  username: '',
  id: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      const { username, id, email } = action.payload;
      state.username = username;
      state.id = id;
      state.email = email;
    },

  },
  extraReducers: builder => {
    builder
        .addCase(loginUser.fulfilled, (state:any, action) => {
          const { username, id, email } = action?.payload;
          state.username = username;
          state.id = id;
          state.email = email;
          state.accessToken="Your_Access_Token"
        }).addCase(loginUser.rejected, (state:any, action:any) => {
        state.status = 'isError';
        state.error = action.error.message;
    })
        .addCase(registerUser.fulfilled, (state:any, action) => {
          const { username, id, email } = action.payload;
          state.username = username;
          state.id = id;
          state.email = email;
          state.accessToken="Your_Access_Token"
        }).addCase(registerUser.rejected, (state:any, action:any) => {
        state.status = 'isError';
        state.error = action.error.message;
        });
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;