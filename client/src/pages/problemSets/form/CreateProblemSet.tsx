import React from 'react';
import Popup from '../../../components/utils/Popup';
import useCrudProblemSets from '../../../features/hooks/firestoreApi/problemSets/useCrudProblemSets';
import useFormState from '../../../features/hooks/form/useFormState';
import { ProblemSetWrite } from '../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure';
import { TextField } from '@mui/material';

interface CreateProblemSetProps {
  open: boolean;
  onClose: () => void;
}

const CreateProblemSet: React.FC<CreateProblemSetProps> = ({ open, onClose }) => {
  const { createProblemSet } = useCrudProblemSets();
  const { createInputProps, names } = useFormState<ProblemSetWrite>({
    name: "",
    subject: ""
  })

  return (
    <Popup open={open} onClose={onClose} >
      <TextField {...createInputProps(names.name) } />
      <TextField {...createInputProps(names.subject)} />
    </Popup>
  );
};

export default CreateProblemSet;