import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

const RemindersContainer = styled(View)`
  height: 100%;
  width: 100%;
`;

const Reminders = () => {
  return (
    <RemindersContainer>
      <Text>Reminders</Text>
    </RemindersContainer>
  );
};

export default Reminders;
