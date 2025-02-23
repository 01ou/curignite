import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { logoutUser, setUser } from '../../slices/userSlice';

const dispatch = useDispatch();
const auth = getAuth();

onAuthStateChanged(auth, (user: User | null) => {
  if (user) {
    // ユーザー情報をReduxに設定
    dispatch(setUser(user));
  } else {
    // ログアウトした場合、Reduxからユーザー情報を削除
    dispatch(logoutUser());
  }
});
