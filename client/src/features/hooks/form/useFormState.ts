import { useState, useCallback, ChangeEvent } from "react";
import { keyMirror } from "../../../functions/objectUtils/groupUtils";
import { ArrayFieldChangeAction, FormStateChangeAction } from "../../../types/from/formStateTypes";
import { SelectChangeEvent } from "@mui/material";

const useFormState = <T extends Record<string, any>>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);
  const [files, setFiles] = useState<Record<string, FileList | null>>({});

  const names = keyMirror(initialState);

  const onChangeFormState = useCallback((action: FormStateChangeAction) => {
    setFormState((prev) => ({
      ...prev,
      [action.name]: action.value
    }));
  }, []);

  const resetFormState = useCallback(() => {
    setFormState({ ...initialState });
  }, [initialState]);

  const onChangeArrayField = useCallback((action: ArrayFieldChangeAction) => {
    const { operation, name } = action;
    setFormState((prev) => {
      const prevData = prev[name];

      if (!Array.isArray(prevData)) {
        console.error(`Field ${String(name)} is not an array`);
        return prev;
      }

      const newData = [...prevData];

      switch (operation) {
        case "replace":
          if (action.index >= 0 && action.index < newData.length) {
            newData[action.index] = action.value;
          }
          break;
        case "delete":
          if (action.index >= 0 && action.index < newData.length) {
            newData.splice(action.index, 1);
          }
          break;
        case "push":
          newData.push(action.value);
          break;
      }

      return {
        ...prev,
        [name]: newData,
      };
    });
  }, []);

  const createInputProps = (name: keyof T) => {
    return {
      value: formState[name] ?? "",
      name: String(name),
      
      onChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>,
        ..._: any[]
      ) => {
        const { name, value } = e.target;
        
        const type = "type" in e.target ? e.target.type : "";

        if (type === "checkbox") {
          onChangeFormState({ name, value: (e.target as HTMLInputElement).checked });
        } else if (type === "file") {
          const fileInput = e.target as HTMLInputElement;
          setFiles((prev) => ({ ...prev, [name]: fileInput.files }));
        } else if (type === "number") {
          onChangeFormState({ name, value: parseFloat(value) });
        } else {
          onChangeFormState({ name, value });
        }
      }
    };
  };  

  return {
    formState,
    names,
    files,
    setFormState,
    onChangeFormState,
    onChangeArrayField,
    resetFormState,
    createInputProps,
  };
};

export default useFormState;
