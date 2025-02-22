import React from 'react';
import { FormStateChangeAction } from '../../../../types/from/formStateTypes';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { keyMirror } from '../../../../functions/objectUtils/groupUtils';

export interface InitialSetupFormState {
  username: string;
  birthday: Date | null;
  iconFile: File | null;
}

interface InitialSetupViewProps {
  formState: InitialSetupFormState;
  isLoading: boolean;
  submitDisabled: boolean;
  error: string;
  onChangeFormState: (action: FormStateChangeAction) => void;
  onSubmit: () => void;
}

const LoadingComponent: React.FC = () => (
  <Box className='my-64'>
    <CircularProgress />
  </Box>
);

const InitialSetupView: React.FC<InitialSetupViewProps> = ({
  isLoading,
  formState,
  submitDisabled,
  error,
  onChangeFormState,
  onSubmit,
}) => {
  const names = keyMirror(formState);
  return (
    <Box sx={{ display: 'flex', flexDirection: "column"}}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Typography variant="h2">
            初期設定
          </Typography>
          
          <form className='flex flex-col w-80 space-y-6 mt-12' onSubmit={e => { e.preventDefault(); onSubmit(); }}>
            <p>ユーザー名</p>
            <input
              value={formState.username}
              onChange={(e) => onChangeFormState({ name: e.target.name, value: e.target.value })}
            />
            <input type="date" name={names.birthday} value={formState.birthday?.toISOString()} onChange={(e) => onChangeFormState({ name: e.target.name, value: e.target.value })} />

            <Button
              type='submit'
            >
              完了
            </Button>
          </form>
          {error && <Alert severity='error'>{error}</Alert>}
        </>
      )}
    </Box>
  );
};

export default InitialSetupView;
