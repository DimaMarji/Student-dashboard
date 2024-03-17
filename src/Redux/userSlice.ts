import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;