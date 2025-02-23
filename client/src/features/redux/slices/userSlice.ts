import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from '../../../types/firebase/auth/userTypes';

interface UserSlice {
  authUser: AuthUser | null;
}

const initialState: UserSlice = {
  authUser: null
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
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