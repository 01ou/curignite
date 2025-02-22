import React from 'react';
import Divider from '@mui/material/Divider';
import { Alert, Box, Button, Typography } from '@mui/material';

interface SignInIndexViewProps {
    email: string;
    error: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onGoogleSignIn: () => void;
    onEmailSignIn: () => void;
}

const SignInIndexView: React.FC<SignInIndexViewProps> = ({
    email,
    error,
    onEmailChange,
    onGoogleSignIn,
    onEmailSignIn,
}) => {
  return (
        <Box>
            <div className='flex items-center mt-8 space-x-8'>
                <Typography variant="h1" >ログインする</Typography>
                <Button onClick={onGoogleSignIn}>
                    Google<br/>でログイン
                </Button>
            </div>
            <div className='mt-10 w-full'>
                <Divider>または</Divider>
            </div>
            <div className='flex flex-col justify-center mt-8 mb-16 w-full max-w-96'>
                <div className='flex flex-col bg-gray-50 px-3 py-4 rounded-xl'>
                    <Typography variant='h4'>メールでログイン</Typography>
                    <input value={email} onChange={(e) => onEmailChange(e)} />
                    <div className='flex flex-col mt-4'>
                        <Button children="次へ" variant="contained" size="large" onClick={onEmailSignIn} disabled={!email} />
                    </div>
                </div>
                <div className='flex flex-col mt-8'>
                    <Button children='パスワードを忘れた場合はこちら' variant='outlined' size='large' />
                </div>
            </div>
            {error && <Alert severity='error'>{error}</Alert>}
        </Box>
    )
};

export default SignInIndexView;
