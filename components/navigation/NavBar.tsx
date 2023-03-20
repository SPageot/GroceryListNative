import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBook, faList } from "@fortawesome/free-solid-svg-icons";

const NavBarContainer = styled(View)`
  height: 10%;
  width: 100%;
  background-color: #191970;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const IconContainer = styled(View)`
  height: 100%;
  width: 50%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const IconName = styled(Text)`
  color: #fff;
`;

const NavBar = () => {
  return (
    <NavBarContainer>
      <IconContainer>
        <FontAwesomeIcon size={30} color="#fff" icon={faList} />
        <IconName>Grocery List</IconName>
      </IconContainer>
      <IconContainer>
        <FontAwesomeIcon size={30} color="#fff" icon={faBook} />
        <IconName>Reminder</IconName>
      </IconContainer>
    </NavBarContainer>
  );
};

export { NavBar };
