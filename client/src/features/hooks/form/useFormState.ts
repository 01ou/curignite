import { useState, useCallback, ChangeEvent } from "react";
import { keyMirror } from "../../../functions/objectUtils/groupUtils";
import { ArrayFieldChangeAction, FormStateChangeAction } from "../../../types/from/formStateTypes";
import { SelectChangeEvent } from "@mui/material";
import { isPlainObject } from "@reduxjs/toolkit";

type InputEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  | SelectChangeEvent<string>;

const useFormState = <
  T extends Record<string, any>,
  ArrayType extends Record<keyof T, unknown> = Record<keyof T, unknown>
>(
  initialState: T
) => {
  const [formState, setFormState] = useState<T>(initialState);
  const [files, setFiles] = useState<Record<string, FileList | null>>({});

  // keyMirror は、各キーの値をそのキー名にしたオブジェクトを生成する想定
  const names = keyMirror(initialState);

  const onChangeFormState = useCallback((action: FormStateChangeAction) => {
    setFormState((prev) => ({
      ...prev,
      [action.name]: action.value,
    }));
  }, []);

  const resetFormState = useCallback(() => {
    setFormState({ ...initialState });
  }, [initialState]);

  const onChangeArrayField = useCallback(
    <K extends keyof T>(
      name: K,
      action: ArrayFieldChangeAction<ArrayType[K]>,
      replaceObjectKey?: keyof ArrayType[K]
    ) => {
      setFormState((prev) => {
        const prevData = prev[name];

        if (!Array.isArray(prevData)) {
          console.error(`Field ${String(name)} is not an array`);
          return prev;
        }

        const newData = [...prevData];

        switch (action.operation) {
          case "replace":
            if (action.index >= 0 && action.index < newData.length) {
              // もし replaceObjectKey が指定され、対象がオブジェクトならオブジェクトとして更新
              if (replaceObjectKey && isPlainObject(newData[action.index])) {
                newData[action.index] = {
                  ...newData[action.index],
                  [replaceObjectKey]: action.value,
                };
              } else {
                newData[action.index] = action.value;
              }
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
          default:
            break;
        }

        return {
          ...prev,
          [name]: newData,
        };
      });
    },
    []
  );

  // 共通のイベントハンドラ
  const handleInputChange = useCallback(
    (
      e: InputEvent,
      updateCallback: (fieldName: string, newValue: any) => void,
      fileKey?: string
    ) => {
      const { name, value } = e.target;
      const type = "type" in e.target ? e.target.type : "";

      if (type === "checkbox") {
        updateCallback(name, (e.target as HTMLInputElement).checked);
      } else if (type === "file") {
        const fileInput = e.target as HTMLInputElement;
        setFiles((prev) => ({ ...prev, [fileKey || name]: fileInput.files }));
      } else if (type === "number") {
        updateCallback(name, parseFloat(value));
      } else {
        updateCallback(name, value);
      }
    },
    []
  );

  const createInputProps = (name: keyof T) => {
    return {
      value: formState[name] ?? "",
      name: String(name),
      onChange: (e: InputEvent, ..._args: any[]) =>
        handleInputChange(e, (fieldName, newValue) =>
          onChangeFormState({ name: fieldName, value: newValue })
        ),
    };
  };

  const createInputPropsInArray = <K extends keyof T>(
    name: K,
    index: number,
    replaceObjectKey?: keyof ArrayType[K]
  ) => {
    const arrayField = formState[name];

    // 配列かどうか、およびインデックスが有効かをチェック
    if (!Array.isArray(arrayField) || index < 0 || index >= arrayField.length) {
      return {};
    }

    const value = replaceObjectKey ? arrayField[index][replaceObjectKey] : arrayField[index];

    return {
      value: value ?? "",
      name: String(name),
      onChange: (e: InputEvent, ..._args: any[]) =>
        handleInputChange(
          e,
          (fieldName, newValue) =>
            onChangeArrayField(
              fieldName as K,
              { operation: "replace", value: newValue, index },
              replaceObjectKey
            ),
          `${String(name)}-${index}`
        ),
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
    createInputPropsInArray,
  };
};

export default useFormState;
