import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateAccount from './signup/createAccount/CreateAccount';
import CreateAccountEndPointPage from './signup/createAccount/CreateAccountEndPointPage';
import InitialSetup from './signup/userInitialSetup/InitialSetup';
import SignInIndex from './signin/index/SignInIndex';
import SignInWithEmail from './signin/withEmail/SignInWithEmail';
import AuthIndex from './index/AuthIndex';
import ViaActionUrlPage from './others/ViaActionUrlPage';

export const relativeAuthPaths = {
  signIn: "sign-in",
  emailSignIn: "sign-in/with-email",
  signUp: "sign-up",
  createAccount: "sign-up/create-account",
  accountEndpoint: "sign-up/create-account/endpoint",
  initialSetup: "sign-up/initial-setup",
  viaActionUrl: "via-action-url"
};

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthIndex />} />
      <Route path={relativeAuthPaths.signIn} element={<SignInIndex />} />
      <Route path={relativeAuthPaths.emailSignIn} element={<SignInWithEmail />} />
      <Route path={relativeAuthPaths.createAccount} element={<CreateAccount />} />
      <Route path={relativeAuthPaths.accountEndpoint} element={<CreateAccountEndPointPage />} />
      <Route path={relativeAuthPaths.initialSetup} element={<InitialSetup />} />
      <Route path={relativeAuthPaths.viaActionUrl} element={<ViaActionUrlPage />} />
    </Routes>
  );
};

export default AuthRoutes;