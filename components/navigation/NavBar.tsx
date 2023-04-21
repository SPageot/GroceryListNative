import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBook,
  faCircleArrowUp,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/core";
import { NavigationStackProp } from "react-navigation-stack";
import { UserStateContext } from "../../hooks/useAuth";

const NavBarContainer = styled(View)`
  height: 10%;
  width: 100%;
  background-color: #191970;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const IconContainer = styled(Pressable)`
  align-items: center;
  gap: 10px;
`;

const IconName = styled(Text)`
  color: #fff;
`;

const NavBar = () => {
  const navigation: NavigationStackProp = useNavigation();
  const { logoutUser } = useContext(UserStateContext);
  return (
    <NavBarContainer>
      <IconContainer onPress={() => navigation.navigate("Foodlist")}>
        <FontAwesomeIcon size={30} color="#fff" icon={faList} />
        <IconName>Food List</IconName>
      </IconContainer>
      <IconContainer onPress={() => navigation.navigate("Reminders")}>
        <FontAwesomeIcon size={30} color="#fff" icon={faBook} />
        <IconName>Reminder</IconName>
      </IconContainer>
      <IconContainer onPress={() => logoutUser()}>
        <FontAwesomeIcon size={30} color="#fff" icon={faCircleArrowUp} />
        <IconName>Logout</IconName>
      </IconContainer>
    </NavBarContainer>
  );
};

export { NavBar };
