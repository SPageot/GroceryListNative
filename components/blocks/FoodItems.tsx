import _ from "lodash";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import { FoodItemType } from "../../types/types";
import { AppButton } from "./AppButton";

const FoodsContainer = styled(ScrollView)`
  height: 90%;
  width: 100%;
  background-color: #0077b6;
`;

const FoodItemContainer = styled(View)`
  height: 80px;
  width: 100%;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
  border-bottom: 1px;
`;

const FoodItem = styled(Text)`
  color: #fff;
  font-size: 17px;
  width: 80%;
`;

const FoodItems = ({ foodItemsArray, onPress }: FoodItemType) => {
  return (
    <FoodsContainer>
      {!_.isEmpty(foodItemsArray)
        ? foodItemsArray.map((item, i) => {
            return (
              <FoodItemContainer key={i}>
                <FoodItem>{item}</FoodItem>
                <AppButton
                  color="red"
                  title="Delete"
                  onPress={() => onPress(item)}
                />
              </FoodItemContainer>
            );
          })
        : null}
    </FoodsContainer>
  );
};

export default FoodItems;
