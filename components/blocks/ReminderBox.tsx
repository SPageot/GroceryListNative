import { View, Text, Pressable, Keyboard } from "react-native";
import React from "react";
import styled from "styled-components";
import { Input } from "../form/Input";
import { AppButton } from "./AppButton";
import { ReminderProps } from "../../types/types";

const ReminderBoxContainer = styled(View)`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ReminderInfoBox = styled(Pressable)`
  height: 470px;
  width: 95%;
  background-color: #191970;
  justify-content: space-evenly;
  border-radius: 35px;
`;

const ReminderBoxHeaderContainer = styled(View)`
  width: 100%;
  align-items: center;
`;

const ReminderBoxHeader = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

const ReminderHeaderContainer = styled(View)`
  width: 100%;
  align-items: center;
`;

const ReminderMessageContainer = styled(View)`
  width: 100%;
  align-items: center;
`;

const ReminderOptionsContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

const ReminderBox = ({
  handleHeaderChangeText,
  handleChangeText,
  handleCancelPress,
  handleSubmitPress,
  headerValue,
  messageValue,
}: ReminderProps) => {
  return (
    <ReminderBoxContainer>
      <ReminderInfoBox onPress={Keyboard.dismiss}>
        <ReminderBoxHeaderContainer>
          <ReminderBoxHeader>Reminder</ReminderBoxHeader>
        </ReminderBoxHeaderContainer>
        <ReminderHeaderContainer>
          <Input
            type="default"
            onChangeText={handleHeaderChangeText}
            defaultValue={headerValue}
            placeholder="Enter header text..."
          />
        </ReminderHeaderContainer>
        <ReminderMessageContainer>
          <Input
            type="reminders"
            onChangeText={handleChangeText}
            defaultValue={messageValue}
            placeholder="Enter reminder message..."
          />
        </ReminderMessageContainer>
        <ReminderOptionsContainer>
          <AppButton title="Cancel" onPress={handleCancelPress} color="#fff" />
          <AppButton title="Submit" onPress={handleSubmitPress} color="#fff" />
        </ReminderOptionsContainer>
      </ReminderInfoBox>
    </ReminderBoxContainer>
  );
};

export { ReminderBox };
