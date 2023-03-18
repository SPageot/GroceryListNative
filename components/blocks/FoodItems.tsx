import _ from "lodash";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import styled from "styled-components";
import { FoodItemType } from "../../types/types";
import { AppButton } from "./AppButton";

const FoodsContainer = styled(ScrollView)`
  height: 90%;
  width: 100%;
  background-color: #0077b6;
`;
const DeleteContainer = styled(View)`
  justify-content: center;
  background-color: red;
`;

const FoodItemContainer = styled(View)`
  height: 80px;
  width: 100%;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
`;

const FoodItem = styled(Text)`
  color: #fff;
  font-size: 17px;
  width: 80%;
`;

const FoodItems = ({ foodItemsArray, onPress }: FoodItemType) => {
  const swipeRightAction = (item: string) => {
    return (
      <DeleteContainer>
        <AppButton color="#fff" title="Delete" onPress={() => onPress(item)} />
      </DeleteContainer>
    );
  };

  return (
    <FoodsContainer>
      {!_.isEmpty(foodItemsArray)
        ? foodItemsArray.map((item, i) => {
            return (
              <Swipeable
                renderRightActions={() => swipeRightAction(item)}
                key={i}
              >
                <FoodItemContainer>
                  <FoodItem>{item}</FoodItem>
                </FoodItemContainer>
              </Swipeable>
            );
          })
        : null}
    </FoodsContainer>
  );
};

export default FoodItems;
