import { View, Text, Button, Pressable } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { ReminderBox } from "../../components/blocks/ReminderBox";

const RemindersContainer = styled(View)`
  height: 100%;
  width: 100%;
  background-color: #0f4d92;
  position: relative;
`;

const AddReminder = styled(Pressable)`
  position: absolute;
  height: 75px;
  width: 75px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background-color: #191970;
  bottom: 25px;
  right: 25px;
`;

const AddIcon = styled(Text)`
  color: #fff;
  font-size: 30px;
`;

const Reminders = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [reminderMessage, setReminderMessage] = useState({
    reminderHeader: "",
    reminder: "",
  });

  const handlePress = (): void => {
    setIsModalOpen(true);
  };

  const handleChangeText = (text: string): void => {
    if (text) {
      setReminderMessage({ ...reminderMessage, reminder: text });
    }
  };

  const handleHeaderChangeText = (text: string): void => {
    if (text) {
      setReminderMessage({ ...reminderMessage, reminderHeader: text });
    }
  };

  const handleCancelPress = (): void => {
    setIsModalOpen(false);
  };

  const handleSubmitPress = (): void => {
    console.log(reminderMessage)
  };
  return (
    <RemindersContainer>
      <AddReminder onPress={handlePress}>
        <AddIcon>+</AddIcon>
      </AddReminder>
      {isModalOpen ? (
        <ReminderBox
          handleChangeText={handleChangeText}
          handleHeaderChangeText={handleHeaderChangeText}
          handleCancelPress={handleCancelPress}
          handleSubmitPress={handleSubmitPress}
          headerValue={reminderMessage.reminderHeader}
          messageValue={reminderMessage.reminder}
        />
      ) : null}
    </RemindersContainer>
  );
};

export default Reminders;
