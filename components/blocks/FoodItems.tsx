import { useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import styled from "styled-components";
import { UserStateContext } from "../../hooks/useAuth";
import { USER } from "../../mutations/query";
import { FoodItemType } from "../../types/types";
import { AppButton } from "./AppButton";

const FoodsContainer = styled(ScrollView)`
  height: 90%;
  width: 100%;
  background-color: #0f4d92;
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
  background-color: #007fff;
`;

const FoodItem = styled(Text)`
  color: #fff;
  font-size: 17px;
  width: 80%;
`;

const FoodItems = ({ foodItemsArray, onPress }: FoodItemType) => {
  const { user } = useContext(UserStateContext);
  const { data } = useQuery(USER, {
    variables: { email: user?.loginUser?.email },
  });
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
        ? foodItemsArray?.map((item, i) => {
            return (
              <Swipeable
                renderRightActions={() => swipeRightAction(item)}
                key={i}
              >
                <FoodItemContainer>
                  <FoodItem role="contentinfo">{item}</FoodItem>
                </FoodItemContainer>
              </Swipeable>
            );
          })
        : null}
    </FoodsContainer>
  );
};

export { FoodItems };
