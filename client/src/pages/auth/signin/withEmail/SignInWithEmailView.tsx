import React from 'react'
import { Alert, Box, Button, Typography } from '@mui/material';

interface SignInWithEmailViewProps {
    email: string;
    password: string;
    submitDisabled: boolean;
    error: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailSignIn: (e: React.FormEvent) => void;
}

const SignInWithEmailView: React.FC<SignInWithEmailViewProps> = ({
    email,
    password,
    submitDisabled,
    error,
    onEmailChange,
    onPasswordChange,
    onEmailSignIn,
}) => {
    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        onEmailSignIn(e);
    }

    return (
        <Box>
            <Typography variant="h1" className='mt-20'>ログインする</Typography>
            <form onSubmit={handleSubmit} className='w-80 mt-12 space-y-4'>
                <input value={email} onChange={onEmailChange} />
                <input value={password} onChange={onPasswordChange} />
                <div className='w-full pt-12'>
                    <Button
                        type='submit'
                        size="large"
                        variant="contained"
                        className='w-full'
                        children="ログイン"
                        disabled={submitDisabled}
                    />
                </div>
            </form>
            {error && <Alert severity='error'>{error}</Alert>}
        </Box>
    )
}

export default SignInWithEmailView;