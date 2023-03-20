import { KeyboardAvoidingView, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FoodItems } from "../../components/blocks/FoodItems";
import styled from "styled-components";
import { FoodInput } from "../../components/blocks/FoodInput";
import { AppButton } from "../../components/blocks/AppButton";
import { LinearGradient } from "expo-linear-gradient";

const FoodListContainer = styled(View)`
  height: 100%;
  width: 100%;
  flex-direction: column-reverse;
  align-items: center;
`;

const SubmitFoodContainer = styled(View)`
  height: 10%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background-color: #0067a5;
`;

const linearGradientStyle = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column-reverse",
    alignItems: "center",
  },
});

const FoodList = () => {
  const [foodItemName, setFoodItemName] = useState<string>("");
  const [foodItemsArray, setFoodItemsArray] = useState<string[]>([]);

  const handleChange = (text: string) => {
    if (text) {
      setFoodItemName(text);
    }
  };

  const handlePress = () => {
    if (foodItemName) {
      setFoodItemsArray([...foodItemsArray, foodItemName]);
      setFoodItemName("");
    }
  };

  const handleDeletePress = (deletedItem: string) => {
    setFoodItemsArray(foodItemsArray.filter((item) => item !== deletedItem));
  };
  return (
    <KeyboardAvoidingView behavior="height">
      <LinearGradient
        colors={["#0067A5", "#0067A5", "#007FFF"]}
        style={linearGradientStyle.container}
      >
        <FoodListContainer>
          <FoodItems
            foodItemsArray={foodItemsArray}
            onPress={handleDeletePress}
          />
          <SubmitFoodContainer>
            <FoodInput
              placeholder="Enter Food Name"
              onChangeText={handleChange}
              defaultValue={foodItemName}
            />
            {foodItemName ? (
              <AppButton color="navy" title="Add" onPress={handlePress} />
            ) : null}
          </SubmitFoodContainer>
        </FoodListContainer>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default FoodList;
