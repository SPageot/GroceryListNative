import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoodList from "../../screens/FoodList";
import Reminders from "../../screens/Reminders";
import { NavBar } from "./NavBar";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <>
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
    </>
  );
};

export default AppStack;
