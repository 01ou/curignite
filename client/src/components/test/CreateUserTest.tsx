import React from 'react';
import useFormState from '../../hooks/form/useFormState';
import { UserWrite } from '../../types/firebase/firestore/structure/users/userStructure';
import useAsyncHandler from '../../hooks/form/useAsyncHandler';
import serviceFactory from '../../firebase/firestore/factory';
import { DocumentData, DocumentReference } from 'firebase/firestore';

interface CreateUserTestProps { }

const CreateUserTest: React.FC<CreateUserTestProps> = () => {
  const { names, formState, createInputProps } = useFormState<UserWrite>({
    createdById: "",
    displayName: "",
    email: "",
    photoURL: null,
    settings: {
      language: "ja"
    }
  })

  const { callAsyncFunction } = useAsyncHandler<DocumentReference<UserWrite, DocumentData>>();

  const createUser = () => {
    const data: UserWrite = {
      createdById: "uid",
      displayName: formState.displayName,
      email: formState.email,
      photoURL: null,
      settings: formState.settings
    }
    const userService = serviceFactory.createUserService()
    callAsyncFunction(userService.create.bind(userService), [data])
  }

  return (
    <div>
      <input type="text" {...createInputProps(names.displayName)} />
      <input type="text" {...createInputProps(names.email)} />

      <button onClick={() => createUser()}>作成</button>
    </div>
  );
};

export default CreateUserTest;