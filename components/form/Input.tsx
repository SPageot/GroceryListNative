import { TextInput } from "react-native";
import React from "react";
import styled, { css } from "styled-components";
import { InputType, PropType } from "../../types/types";

const FoodInputName = styled(TextInput)`
  border: 1px solid #fff;
  color: #fff;
  overflow: hidden;

  ${(props: PropType) =>
    props.inputType === "reminders"
      ? css`
          height: 200px;
          width: 350px;
        `
      : props.inputType === "default"
      ? css`
          height: 40px;
          width: 75%;
        `
      : null}

  ${(props: PropType) =>
    props.inputError
      ? css`
          border: 1px solid #c83200;
        `
      : null}
`;

const Input = ({
  inputType,
  placeholder,
  onChangeText,
  defaultValue,
  required,
  secureTextEntry,
  inputError,
}: InputType) => {
  return (
    <FoodInputName
      required={required}
      multiline={inputType === "reminders"}
      placeholderTextColor="#fff"
      inputType={inputType}
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      secureTextEntry={secureTextEntry}
      inputError={inputError}
    />
  );
};

export { Input };
