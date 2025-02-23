import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface UserSlice {
  authUser: User | null;
}

const initialState: UserSlice = {
  authUser: null
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.authUser = action.payload;
    },
    // ユーザー情報をログアウト
    logoutUser: (state) => {
      state.authUser = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;