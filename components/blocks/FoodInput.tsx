import { TextInput } from "react-native";
import React from "react";
import styled from "styled-components";
import { FoodInputType } from "../../types/types";

const FoodInputName = styled(TextInput)`
  height: 40px;
  width: 75%;
  border: 1px solid #fff;
  color: #fff;
`;

const FoodInput = ({
  placeholder,
  onChangeText,
  defaultValue,
}: FoodInputType) => {
  return (
    <FoodInputName
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
    />
  );
};

export { FoodInput };
