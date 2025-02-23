import { useEffect, useMemo, useCallback } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import useMultipleAsyncHandler from '../form/useMultipleAsyncHandler';
import useDialogues from '../dialogue/useDialogue';
import { authNodeContents } from '../../../constants/dialogue/auth/authNodeContents';
import { useTranslation } from 'react-i18next';
import { DialogueElement } from '../../../types/dialogue/DialogueTypes';
import { googleProvider } from '../../firebase/firebase';

type AsyncStates = {
  googleAuth: UserCredential;
  emailSignUp: UserCredential;
  emailSignIn: UserCredential;
  checkUserNameExist: { username: string; isExist: boolean; };
  checkUidExist: boolean;
};

const checkUserNameExist = async (username: string) => {
  // TODO: データベース連携などの実装
  return { username, isExist: true };
};

const checkUidExist = async (_: string) => {
  // TODO: データベース連携などの実装
  return true;
};

export const useAuthFlow = () => {
  const { t } = useTranslation();

  // authNodeContents のメモ化
  const authNodeContentsMemo = useMemo(() => authNodeContents, [JSON.stringify(authNodeContents)]);

  // 非同期処理ハンドラ
  const { callAsyncFunction, asyncStates } = useMultipleAsyncHandler<AsyncStates>([
    "googleAuth",
    "emailSignUp",
    "emailSignIn",
    "checkUserNameExist",
    "checkUidExist"
  ]);

  // ダイアログ管理フック
  const {
    currentDialogue,
    inputValues,
    updateActiveContents,
    setDialogueId,
    updateReplaces,
    handleInputChange: handleDialogueInputChange,
    handleElementClick: handleDialogueElementClick
  } = useDialogues({
    nodeContents: authNodeContentsMemo,
    defaultId: "top",
    notFoundId: "top",
    getReplace: (input) => ({ username: input["userNameInput"] }),
  });

  // 各認証アクションをまとめた処理
  const handleAuthAction = useCallback((elementId: string) => {
    const auth = getAuth();
    if (["googleSignIn", "googleSignUp", "retryGoogleAuthEnter"].includes(elementId)) {
      callAsyncFunction("googleAuth", signInWithPopup, [auth, googleProvider]);
      return;
    }
    if (elementId === "emailSignUpEnter") {
      const email = inputValues["emailSignUpEmailInput"];
      const password = inputValues["emailSignUpPasswordInput"];
      if (email && password) {
        callAsyncFunction("emailSignUp", createUserWithEmailAndPassword, [auth, email, password]);
      }
      return;
    }
    if (elementId === "emailSignInEnter") {
      const email = inputValues["emailSignInEmailInput"];
      const password = inputValues["emailSignInPasswordInput"];
      if (email && password) {
        callAsyncFunction("emailSignIn", signInWithEmailAndPassword, [auth, email, password]);
      }
      return;
    }
    if (elementId === "userNameEnter") {
      const username = inputValues["userNameInput"];
      if (username) {
        callAsyncFunction("checkUserNameExist", checkUserNameExist, [username]);
      }
      return;
    }
  }, [callAsyncFunction, inputValues]);

  // 非同期処理結果に基づくダイアログ状態更新
  useEffect(() => {
    // Google認証エラー時の処理
    const googleAuthStatus = asyncStates["googleAuth"];
    if (googleAuthStatus) {
      if (googleAuthStatus.status === "error") {
        const error = googleAuthStatus.error as FirebaseError;
        const message = t(error.code);
        updateActiveContents("failedGoogleSignUp", message);
        setDialogueId("retryAuthGoogle");
      } else if (googleAuthStatus.status === "success") {
        const uid = googleAuthStatus.data?.user.uid;
        if ((!asyncStates["checkUidExist"] || asyncStates["checkUidExist"].status === "idle") && uid) {
          callAsyncFunction("checkUidExist", checkUidExist, [uid]);
        }
      }
    }

    // UIDチェックの結果
    const checkUidExistStatus = asyncStates["checkUidExist"];
    if (checkUidExistStatus && checkUidExistStatus.status === "success") {
      setDialogueId(checkUidExistStatus.data ? "finish" : "inputUserName");
    }

    // Emailサインアップ処理
    const emailSignUpStatus = asyncStates["emailSignUp"];
    if (emailSignUpStatus) {
      if (emailSignUpStatus.status === "error") {
        const error = emailSignUpStatus.error as FirebaseError;
        const message = t(error.code);
        updateActiveContents("failedEmailSignUp", message);
        setDialogueId("inputSignUpEmail");
      } else if (emailSignUpStatus.status === "success") {
        setDialogueId("inputUserName");
      }
    }

    // Emailサインイン処理
    const emailSignInStatus = asyncStates["emailSignIn"];
    if (emailSignInStatus) {
      if (emailSignInStatus.status === "error") {
        const error = emailSignInStatus.error as FirebaseError;
        const message = t(error.code);
        updateActiveContents("failedEmailSignIn", message);
        setDialogueId("inputSignInEmail");
      } else if (emailSignInStatus.status === "success") {
        setDialogueId("finish");
      }
    }

    // ユーザー名チェックの結果
    const usernameCheckStatus = asyncStates["checkUserNameExist"];
    const usernameCheckData = usernameCheckStatus?.data;
    if (usernameCheckStatus && usernameCheckStatus.status === "success") {
      if (usernameCheckData && usernameCheckData.isExist) {
        updateReplaces("existUserName", usernameCheckData.username);
        updateActiveContents("failedInputUserName", t("userNameExist"));
        setDialogueId("inputUserName");
      } else {
        setDialogueId("inputBirthDate");
      }
    }
  }, [asyncStates, t, updateActiveContents, setDialogueId, callAsyncFunction]);

  // ダイアログの入力変更をハンドリングする関数（分離）
  const handleInputChange = useCallback((elementId: string, value: string) => {
    handleDialogueInputChange(elementId, value);
  }, [handleDialogueInputChange]);

  // ダイアログの要素クリック時の処理（分離）
  // 内部でダイアログ用ハンドラと認証アクションを連携
  const handleElementClick = useCallback((element: DialogueElement) => {
    handleDialogueElementClick(element);
    handleAuthAction(element.id);
  }, [handleDialogueElementClick, handleAuthAction]);

  return { currentDialogue, handleInputChange, handleElementClick };
};

export default useAuthFlow;
