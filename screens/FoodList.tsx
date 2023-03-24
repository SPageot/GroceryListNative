import { Pressable, View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { FoodItems } from "../components/blocks/FoodItems";
import styled from "styled-components";
import { Input } from "../components/form/Input";
import { AppButton } from "../components/blocks/AppButton";
import { useMutation } from "@apollo/client";
import { UPDATE_GROCERYLIST } from "../mutations/loginMutation";
import { USER } from "../mutations/query";
import { UserStateContext } from "../hooks/useAuth";
import _ from "lodash";

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
  background-color: #191970;
`;

const SaveFoodListContainer = styled(Pressable)`
  height: 10%;
  width: 100%;
  background-color: lightblue;
  justify-content: center;
`;

const SaveFoodListText = styled(Text)`
  color: #fff;
  font-size: 30px;
  text-align: center;
`;

const FoodList = () => {
  const [foodItemName, setFoodItemName] = useState<string>("");
  const [foodItemsArray, setFoodItemsArray] = useState<string[]>([]);
  const { user } = useContext(UserStateContext);
  const [updateGroceryList] = useMutation(UPDATE_GROCERYLIST, {
    refetchQueries: [
      {
        query: USER,
        variables: { email: user?.loginUser?.email },
      },
    ],
  });

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

  const handleSaveListPress = () => {
    updateGroceryList({
      variables: {
        email: user?.loginUser.email,
        groceryLists: [foodItemsArray],
      },
    });
    setFoodItemsArray([]);
  };

  const handleDeletePress = (deletedItem: string) => {
    setFoodItemsArray(foodItemsArray.filter((item) => item !== deletedItem));
  };
  return (
    <FoodListContainer>
      {!_.isEmpty(foodItemsArray) ? (
        <SaveFoodListContainer onPress={handleSaveListPress}>
          <SaveFoodListText>Save List</SaveFoodListText>
        </SaveFoodListContainer>
      ) : null}
      <FoodItems foodItemsArray={foodItemsArray} onPress={handleDeletePress} />
      <SubmitFoodContainer>
        <Input
          type="default"
          placeholder="Enter Food Name"
          onChangeText={handleChange}
          defaultValue={foodItemName}
        />
        {foodItemName ? (
          <AppButton color="#fff" title="Add" onPress={handlePress} />
        ) : null}
      </SubmitFoodContainer>
    </FoodListContainer>
  );
};

export default FoodList;
