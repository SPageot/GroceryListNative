import { Button } from "react-native";
import React from "react";
import styled from "styled-components";
import { SubmitType } from "../../types/types";

const AppActionButton = styled(Button)`
  flex-grow: 1;
  width: 20px;
  color: #fff;
  background-color: navy;
`;

const AppButton = ({ title, onPress, color }: SubmitType) => {
  return <AppActionButton color={color} title={title} onPress={onPress} />;
};

export { AppButton };
