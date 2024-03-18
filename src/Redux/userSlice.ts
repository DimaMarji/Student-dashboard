import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser, loginUser, registerUser} from "../api/fakeApi";

interface UserState {
  username: string;
  id: string;
  email: string;
  password?:string
  status: string; // Add status property for handling loading state
  error: string; // Add error property for handling error state
}

const initialState: UserState = {
  username: '',
  id: '',
  email: '',
  status: '',
  error: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      resetUser: (state:any) => {
        state.user=null;
        state.status=undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state:any, action) => {
        state.user =action.payload
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state:any, action) => {
        state.user =action.payload
        state.status = 'succeeded';
      })
      .addCase(getUser.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state:any, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;