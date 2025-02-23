import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { setUser, logoutUser } from "../../redux/slices/userSlice";
import { AuthUser } from "../../../types/firebase/auth/userTypes";

// FirebaseのUserオブジェクトから必要なデータを抽出
const extractUserData = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

const useInitializationApp = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // ユーザー情報をReduxに設定（必要なデータだけ）
        dispatch(setUser(extractUserData(user)));
      } else {
        // ユーザー情報が取得できなかった場合、エラーログを出力
        console.error("Error: User not found");
        // ログアウトした場合、Reduxからユーザー情報を削除
        dispatch(logoutUser());
      }
    });

    // クリーンアップ関数で購読解除
    return () => unsubscribe();
  }, [auth, dispatch]); // setUserとlogoutUserはdispatchから派生しているため依存配列に含めなくてOK
};

export default useInitializationApp;
