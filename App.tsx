import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { NavBar } from "./components/navigation/NavBar";
import UserStateProvider from "./hooks/useAuth";
import FoodList from "./screens/FoodList";
import Login from "./screens/Login";
import Reminders from "./screens/Reminders";
import { UserType } from "./types/types";

const AppContainer = styled(SafeAreaView)`
  flex-grow: 1;
  width: 100%;
`;

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({ addTypename: false }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<UserType | undefined>();

  return (
    <UserStateProvider value={{ user, setUser }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AppContainer>
            <Stack.Navigator>
              {!user ? (
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ title: "Login" }}
                />
              ) : (
                <>
                  <Stack.Screen
                    name="Foodlist"
                    component={FoodList}
                    options={{ title: "List Groceries" }}
                  />
                  <Stack.Screen
                    name="Reminders"
                    component={Reminders}
                    options={{ title: "Reminders" }}
                  />
                </>
              )}
            </Stack.Navigator>
            {user ? <NavBar /> : null}
          </AppContainer>
        </NavigationContainer>
      </ApolloProvider>
    </UserStateProvider>
  );
}
