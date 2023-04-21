import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import AppNavigator from "./components/navigation/AppNavigator";
import { NavBar } from "./components/navigation/NavBar";
import UserStateProvider from "./hooks/useAuth";
import FoodList from "./screens/FoodList";
import Login from "./screens/Login";
import Reminders from "./screens/Reminders";
import { UserType } from "./types/types";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({ addTypename: false }),
});

export default function App() {
  return (
    <UserStateProvider>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </UserStateProvider>
  );
}
