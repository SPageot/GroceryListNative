import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { NavBar } from "./components/navigation/NavBar";
import FoodList from "./screens/FoodList/FoodList";
import Reminders from "./screens/FoodList/Reminders";

const AppContainer = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
`;

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppContainer>
        <Stack.Navigator>
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
  );
}
