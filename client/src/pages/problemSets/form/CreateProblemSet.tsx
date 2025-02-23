import React from 'react';
import Popup from '../../../components/utils/Popup';
import useCrudProblemSets from '../../../features/hooks/firestoreApi/problemSets/useCrudProblemSets';
import useFormState from '../../../features/hooks/form/useFormState';
import { ProblemSetWrite } from '../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure';
import { Button, TextField, Grid, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Subject } from '../../../types/app/subjects';
import { useTranslation } from 'react-i18next';

interface CreateProblemSetProps {
  open: boolean;
  onClose: () => void;
}

const CreateProblemSet: React.FC<CreateProblemSetProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const { asyncStates, createProblemSet } = useCrudProblemSets();
  const { formState, names, createInputProps } = useFormState<ProblemSetWrite>({
    name: "",
    subject: "notSelected",
    detailedSubject: null
  });
  
  return (
    <Popup open={open} onClose={onClose} fixedCloseButton sx={{ height: "100%", bgcolor: "#AADDFF" }} >
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              {...createInputProps(names.name)}
              fullWidth
              label="問題セット名"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <InputLabel>教科名</InputLabel>
            <FormControl fullWidth>
              <Select
                {...createInputProps(names.subject)}
              >
                {Object.values(Subject).map(subject => (
                  <MenuItem key={subject} value={subject} >{t(subject)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={asyncStates["create"]?.status === "loading"}
              onClick={() => createProblemSet(formState)}
            >
              作成
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Popup>
  );
};

export default CreateProblemSet;
