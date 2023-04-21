import { SafeAreaView, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { UserStateContext } from "../../hooks/useAuth";

const AppContainer = styled(SafeAreaView)`
  flex-grow: 1;
  width: 100%;
`;

const LoadingContainer = styled(SafeAreaView)`
  flex-grow: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(UserStateContext);

  if (isLoading)
    return (
      <LoadingContainer>
        <ActivityIndicator />
      </LoadingContainer>
    );

  return (
    <NavigationContainer>
      <AppContainer>{userToken ? <AppStack /> : <AuthStack />}</AppContainer>
    </NavigationContainer>
  );
};

export default AppNavigator;
