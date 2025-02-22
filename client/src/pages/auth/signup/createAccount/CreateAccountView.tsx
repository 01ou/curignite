import React, { FormEvent } from 'react'
import { Alert, Box, Button, Typography } from '@mui/material';
import { FormStateChangeAction } from '../../../../types/from/formStateTypes';

export interface CreateAccountFormState {
    username: string;
    email: string;
    password: string;
}

interface CreateAccountViewProps {
    formState: CreateAccountFormState;
    error: string;
    submitDisabled: boolean;
    onChangeFormState: (action: FormStateChangeAction) => void;
    onEmailSignUp: (e: FormEvent) => void;
}
  
  const CreateAccountView: React.FC<CreateAccountViewProps> = ({
    formState,
    error,
    submitDisabled,
    onChangeFormState,
    onEmailSignUp,
  }) => {
    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        onEmailSignUp(e);
    };

    return (
            <Box>
                <Typography variant="h1" className='mt-20'>アカウントを作成</Typography>
                <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-4 w-80 mt-12'>
                    <input value={formState.email} onChange={(e) => onChangeFormState({ name: e.target.name, value: e.target.value })} />
                    <input value={formState.username} onChange={(e) => onChangeFormState({ name: e.target.name, value: e.target.value })} />
                    <input value={formState.password} onChange={(e) => onChangeFormState({ name: e.target.name, value: e.target.value })} />
                    <div className='w-full pt-12'>
                        <Button
                            disabled={submitDisabled}
                            type='submit'
                            size="large"
                            variant="contained"
                            className='w-full'
                            children="登録する"
                        />
                    </div>
                </form>
                {error && <Alert severity='error'>{error}</Alert>}
        </Box>
    )
}

export default CreateAccountView;