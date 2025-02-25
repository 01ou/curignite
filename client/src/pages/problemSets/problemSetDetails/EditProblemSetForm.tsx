import React from "react";
import useCrudProblemSets from "../../../features/hooks/firestoreApi/problemSets/useCrudProblemSets";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { ProblemSetRead, ProblemSetWrite } from "../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure";
import useFormState from "../../../features/hooks/form/useFormState";
import { useTranslation } from "react-i18next";
import { Subject } from "../../../types/app/subjects";
import { ProblemSetCategoryRead, ProblemSetCategoryWrite } from "../../../types/firebase/firestore/structure/users/problemSets/categories/categoryStructure";
import useCurdProblemSetSubCollection from "../../../features/hooks/firestoreApi/problemSets/useCurdProblemSetSubCollection";

interface EditProblemSetFormProps {
  problemSet: ProblemSetRead;
  categories: ProblemSetCategoryRead[];
}

type ArrayField = {
  categories: {
    categoryName: string;
    lastProblemNumber: number;
  };
};

type FormState = ProblemSetWrite & {
  categories: ProblemSetCategoryWrite[];
};

const EditProblemSetForm: React.FC<EditProblemSetFormProps> = ({ problemSet, categories }) => {
  const { t } = useTranslation();
  const { updateProblemSet } = useCrudProblemSets();
  const { updateMultipleCategories } = useCurdProblemSetSubCollection();

  const { formState, names, createInputProps, createInputPropsInArray, onChangeArrayField } =
    useFormState<FormState, ArrayField>({
      setName: problemSet.setName,
      subject: problemSet.subject,
      detailedSubject: problemSet.detailedSubject,
      categories: categories.map((category) => ({
        categoryName: category.categoryName,
        lastProblemNumber: category.lastProblemNumber,
      })),
    });

  const onUpdate = () => {
    updateProblemSet(formState, problemSet.docId);
    const existingCategoryIds = categories.map((category) => category.docId);
    updateMultipleCategories(formState.categories, problemSet.docId, existingCategoryIds);
  };

  return (
    <Stack direction="column" alignContent="center" spacing={1} mt={4}>
      <TextField label="問題集名" {...createInputProps(names.setName)} />
      <FormControl fullWidth>
        <InputLabel>教科名</InputLabel>
        <Select {...createInputProps(names.subject)}>
          {Object.values(Subject).map((subject) => (
            <MenuItem key={subject} value={subject}>
              {t(subject)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="column" spacing={2}>
        {formState.categories.map((_, index) => (
          <Stack
            key={index}
            direction="column"
            spacing={1}
            sx={{ bgcolor: "#E6B5DC", borderRadius: 2, padding: 1, pt: 2 }}
          >
            <TextField label="分類名" {...createInputPropsInArray(names.categories, index, "categoryName")} />
            <TextField label="問題数" {...createInputPropsInArray(names.categories, index, "lastProblemNumber")} />
            <Button sx={{ alignSelf: "end" }} onClick={() => onChangeArrayField(names.categories, { operation: "delete", index })}>
              削除
            </Button>
          </Stack>
        ))}
      </Stack>
      <Button
        onClick={() =>
          onChangeArrayField(names.categories, {
            operation: "push",
            value: { categoryName: "", lastProblemNumber: 50 },
          })
        }
      >
        新しい分類
      </Button>
      <Button onClick={onUpdate}>更新</Button>
    </Stack>
  );
};

export default EditProblemSetForm;
