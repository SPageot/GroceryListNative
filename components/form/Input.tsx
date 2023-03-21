import { TextInput } from "react-native";
import React from "react";
import styled, { css } from "styled-components";
import { InputType, PropType } from "../../types/types";

const FoodInputName = styled(TextInput)`
  border: 1px solid #fff;
  color: #fff;
  overflow: hidden;

  ${(props: PropType) =>
    props.type === "reminders"
      ? css`
          height: 200px;
          width: 350px;
        `
      : props.type === "default"
      ? css`
          height: 40px;
          width: 75%;
        `
      : null}
`;

const Input = ({
  type = "default",
  placeholder,
  onChangeText,
  defaultValue,
}: InputType) => {
  return (
    <FoodInputName
      multiline={type === "reminders"}
      placeholderTextColor="#fff"
      type={type}
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
    />
  );
};

export { Input };
