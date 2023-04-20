import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ReminderBox } from "../components/blocks/ReminderBox";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REMINDERS, DELETE_REMINDERS } from "../mutations/loginMutation";
import { Swipeable } from "react-native-gesture-handler";

import { ReminderType } from "../types/types";
import { USER } from "../mutations/query";
import { UserStateContext } from "../hooks/useAuth";
import { AppButton } from "../components/blocks/AppButton";

const DeleteContainer = styled(View)`
  justify-content: center;
  background-color: #c83200;
`;

const RemindersContainer = styled(View)`
  flex-grow: 1;
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

const SavedReminderContainer = styled(ScrollView)`
  width: 100%;
`;

const SavedReminders = styled(View)`
  height: 100%;
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
  const [addReminders] = useMutation(ADD_REMINDERS, {
    refetchQueries: [
      {
        query: USER,
        variables: { email: user?.email },
      },
    ],
  });
  const [deleteReminders] = useMutation(DELETE_REMINDERS, {
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
      addReminders({
        variables: {
          email: user.email,
          reminders: reminderMessage,
        },
      });
      setReminderMessage({ reminder: "", reminderHeader: "" });
      setIsModalOpen(false);
    }
  };

  const handleDeleteReminderPress = (deletedItem: string) => {
    deleteReminders({
      variables: {
        email: user?.email,
        reminders: { id: deletedItem },
      },
    });
  };

  const swipeReminderRightAction = (item: string) => {
    return (
      <DeleteContainer>
        <AppButton
          color="#fff"
          title="Delete"
          onPress={() => handleDeleteReminderPress(item)}
        />
      </DeleteContainer>
    );
  };
  return (
    <RemindersContainer>
      <SavedReminderContainer>
        {data && data.user
          ? data.user.reminders.map((reminder: ReminderType) => {
              return (
                <Swipeable
                  containerStyle={{
                    height: 100,
                    width: "100%",
                    marginBottom: 20,
                  }}
                  renderRightActions={() =>
                    swipeReminderRightAction(reminder.id)
                  }
                  key={reminder.id}
                >
                  <SavedReminders key={reminder.id}>
                    <SavedReminderText>
                      {reminder.reminderHeader}
                    </SavedReminderText>
                  </SavedReminders>
                </Swipeable>
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
