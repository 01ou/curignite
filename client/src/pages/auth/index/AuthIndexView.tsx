// AuthIndexView.tsx
import React from 'react';
import Divider from '@mui/material/Divider';
import { Alert, Box, Button, Typography } from '@mui/material';

interface AuthIndexViewProps {
    error: string;
    onCreateAccount: () => void;
    onGoogleSignUp: () => void;
    onSignIn: () => void;
}

const AuthIndexView: React.FC<AuthIndexViewProps> = ({
    error,
    onCreateAccount,
    onGoogleSignUp,
    onSignIn,
}) => {
  return (
        <Box>
            <div className='sm:px-6 sm:py-8 sm:mx-2 bg-gray-100 rounded-xl py-6 mx-1 mt-2'>
                <Typography variant="h1" className='text-end mr-4'>みんなの知識がここに。</Typography>
            </div>
            
            <Typography variant="h2" className='mt-10'>今すぐ参加しよう</Typography>
            <div className='mt-10 sm:w-96 w-64'>
                <div className='flex justify-center items-center'>
                    <Button onClick={onCreateAccount}>
                        アカウント<br/>を作成
                    </Button>
                    <Divider orientation='vertical'>OR</Divider>
                    <Button onClick={onGoogleSignUp} >
                        Google<br/>で登録
                    </Button>
                </div>

                <div className='flex justify-center items-center space-x-4 py-2 mt-10 rounded-lg bg-secondaryBase'>
                    <Typography variant={"h3"} >アカウントをお持ちの場合</Typography>
                    <Button onClick={onSignIn}>
                        ログイン
                    </Button>
                </div>
            </div>
            {error && <Alert severity='error'>{error}</Alert>}
        </Box>
    )
};

export default AuthIndexView;
