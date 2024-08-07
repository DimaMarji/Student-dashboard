import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginUser} from "../api/fakeApi";

interface IUserState {
    user: any | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: IUserState = {
    user: null,
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(loginUser.pending, (state:IUserState) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state:IUserState, action: PayloadAction<any>) => {
          state.user = action.payload;
          state.status = 'succeeded';
          state.error = null;
        })
        .addCase(loginUser.rejected, (state:IUserState, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        });
  }
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;