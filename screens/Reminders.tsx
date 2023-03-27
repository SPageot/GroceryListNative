import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ReminderBox } from "../components/blocks/ReminderBox";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_REMINDERS } from "../mutations/loginMutation";

import { ReminderType } from "../types/types";
import { USER } from "../mutations/query";
import { UserStateContext } from "../hooks/useAuth";

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

const SavedReminderContainer = styled(View)`
  height: 90%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const SavedReminders = styled(View)`
  height: 10%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #007fff;
`;

const SavedReminderText = styled(Text)`
  color: #fff;
  font-size: 30px;
`;

const Reminders = (): JSX.Element => {
  const { user } = useContext(UserStateContext);
  const { data } = useQuery(USER, {
    variables: { email: user?.email },
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [reminderMessage, setReminderMessage] = useState({
    reminderHeader: "",
    reminder: "",
  });
  const [updateReminders] = useMutation(UPDATE_REMINDERS, {
    refetchQueries: [
      {
        query: USER,
        variables: { email: user?.email },
      },
    ],
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

  const handleSubmitPress = async (): Promise<void> => {
    if (user) {
      updateReminders({
        variables: {
          email: user.email,
          reminders: [...data?.user?.reminders, reminderMessage],
        },
      });
      setReminderMessage({ reminder: "", reminderHeader: "" });
      setIsModalOpen(false);
    }
  };
  return (
    <RemindersContainer>
      <SavedReminderContainer>
        {data && data.user
          ? data.user.reminders.map((reminder: ReminderType, i: number) => {
              return (
                <SavedReminders key={i}>
                  <SavedReminderText>
                    {reminder.reminderHeader}
                  </SavedReminderText>
                </SavedReminders>
              );
            })
          : null}
      </SavedReminderContainer>
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
