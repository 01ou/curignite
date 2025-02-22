import React, { useEffect, useState } from 'react'
import SignInWithEmailView from './SignInWithEmailView';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail } from '../../../../firebase/auth/signIn';

const SignInWithEmail: React.FC = () => {
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setEmailState(localStorage.getData("email") || "");
  }, []);

  const handleEmailSignIn = async () => {
    localStorage.setData("email", email);
    setSubmitDisabled(true);
    setError('');
    try {
      await signInWithEmail(email, password);
      navigate("/create");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setSubmitDisabled(false);
  }
  
  return (
    <SignInWithEmailView
      email={email}
      password={password}
      error={error}
      submitDisabled={submitDisabled}
      onEmailChange={(e) => setEmailState(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onEmailSignIn={handleEmailSignIn}
    />
  )
}

export default SignInWithEmail;