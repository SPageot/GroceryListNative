import { Pressable, View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { FoodItems } from "../components/blocks/FoodItems";
import styled, { css } from "styled-components";
import { Input } from "../components/form/Input";
import { AppButton } from "../components/blocks/AppButton";
import { useMutation } from "@apollo/client";
import {
  ADD_GROCERYLIST,
  DELETE_GROCERYLIST,
} from "../mutations/loginMutation";
import { USER } from "../mutations/query";
import { UserStateContext } from "../hooks/useAuth";
import _ from "lodash";
import { PropType } from "../types/types";

const FoodListContainer = styled(View)`
  flex-grow: 1;
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

const SaveFoodListContainer = styled(View)`
  height: 10%;
  width: 100%;
  flex-direction: row;
  background-color: lightblue;
  justify-content: center;
`;

const SaveFoodListText = styled(Text)`
  color: #fff;
  font-size: 30px;
  text-align: center;
`;

const FoodListOption = styled(Pressable)`
  flex-grow: 1;
  width: 50%;
  justify-content: center;
  ${(props: PropType) =>
    props.isSavedButton
      ? css`
          background-color: #00688b;
        `
      : css`
          background-color: #c83200;
        `}
`;

const FoodList = () => {
  const [foodItemName, setFoodItemName] = useState<string>("");
  const [foodItemsArray, setFoodItemsArray] = useState<string[]>([]);
  const { user } = useContext(UserStateContext);
  const [addGroceryList] = useMutation(ADD_GROCERYLIST, {
    refetchQueries: [
      {
        query: USER,
        variables: { email: user?.email },
      },
    ],
  });
  const [deleteGroceryList] = useMutation(DELETE_GROCERYLIST, {
    refetchQueries: [
      {
        query: USER,
        variables: { email: user?.email },
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
    addGroceryList({
      variables: {
        email: user?.email,
        groceryLists: { groceryList: foodItemsArray },
      },
    });
    setFoodItemsArray([]);
  };

  const handleResetListPress = () => {
    setFoodItemsArray([]);
  };
  const handleDeletePress = (deletedItem: string) => {
    setFoodItemsArray(foodItemsArray.filter((item) => item !== deletedItem));
  };

  const handleDeleteListPress = (deletedItem: string) => {
    deleteGroceryList({
      variables: {
        email: user?.email,
        groceryLists: { id: deletedItem },
      },
    });
  };
  return (
    <FoodListContainer>
      {!_.isEmpty(foodItemsArray) ? (
        <SaveFoodListContainer>
          <FoodListOption isSavedButton onPress={handleSaveListPress}>
            <SaveFoodListText>Save List</SaveFoodListText>
          </FoodListOption>
          <FoodListOption onPress={handleResetListPress}>
            <SaveFoodListText>Reset List</SaveFoodListText>
          </FoodListOption>
        </SaveFoodListContainer>
      ) : null}
      <FoodItems
        foodItemsArray={foodItemsArray}
        onPress={handleDeletePress}
        onListPress={handleDeleteListPress}
      />
      <SubmitFoodContainer>
        <Input
          inputType="default"
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
