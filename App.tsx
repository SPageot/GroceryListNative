import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { NavBar } from "./components/navigation/NavBar";
import FoodList from "./screens/FoodList";
import Login from "./screens/Login";
import Reminders from "./screens/Reminders";

const AppContainer = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
`;

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
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
          </Stack.Navigator>
          <NavBar />
        </AppContainer>
      </NavigationContainer>
    </ApolloProvider>
  );
}
