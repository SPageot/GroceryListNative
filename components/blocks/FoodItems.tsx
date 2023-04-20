import { useQuery } from "@apollo/client";
import _ from "lodash";
import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { ScrollView, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { UserStateContext } from "../../hooks/useAuth";
import { USER } from "../../mutations/query";
import { FoodItemType, PropType } from "../../types/types";
import { AppButton } from "./AppButton";
import { Bullets } from "react-native-easy-content-loader";

const FoodsContainer = styled(ScrollView)`
  height: 80%;
  width: 100%;
  background-color: #0f4d92;
`;
const DeleteContainer = styled(View)`
  justify-content: center;
  background-color: #c83200;
`;

const FoodItemContainer = styled(ScrollView)`
  width: 100%;
  padding: 10px;
  background-color: #007fff;
  ${(props: PropType) =>
    !props.pastGroceryList
      ? css`
          height: 80px;
          flex-direction: row;
        `
      : css`
          padding: 0px;
          height: 200px;
          flex-direction: column;
          margin-bottom: 20px;
        `};
`;

const FoodItem = styled(Text)`
  color: #fff;

  ${(props: PropType) =>
    !props.pastGroceryList
      ? css`
          font-size: 17px;
        `
      : css`
          font-size: 30px;
        `};
`;

const LoadingContainer = styled(View)`
  flex-grow: 1;
  width: 100%;
  padding: 20px;
`;

const FoodItems = ({ foodItemsArray, onPress, onListPress }: FoodItemType) => {
  const { user } = useContext(UserStateContext);
  const { data, loading } = useQuery(USER, {
    variables: { email: user?.email },
  });
  const swipeRightAction = (item: string) => {
    return (
      <DeleteContainer>
        <AppButton color="#fff" title="Delete" onPress={() => onPress(item)} />
      </DeleteContainer>
    );
  };

  const swipeListRightAction = (item: string) => {
    return (
      <DeleteContainer>
        <AppButton
          color="#fff"
          title="Delete"
          onPress={() => onListPress(item)}
        />
      </DeleteContainer>
    );
  };

  if (loading)
    return (
      <FoodsContainer>
        <LoadingContainer>
          <Bullets
            titleStyles={{ height: "90%", width: "100%" }}
            active
            avatar
            loading={loading}
          />
          <Bullets
            titleStyles={{ height: "90%", width: "100%" }}
            active
            avatar
            loading={loading}
          />
          <Bullets
            titleStyles={{ height: "90%", width: "100%" }}
            active
            avatar
            loading={loading}
          />
        </LoadingContainer>
      </FoodsContainer>
    );

  return (
    <FoodsContainer>
      {!_.isEmpty(foodItemsArray)
        ? foodItemsArray?.map((item, i) => {
            return (
              <Swipeable
                renderRightActions={() => swipeRightAction(item)}
                key={i}
              >
                <FoodItemContainer
                  contentContainerStyle={{
                    justifyContent: "center",
                  }}
                >
                  <FoodItem role="contentinfo">{item}</FoodItem>
                </FoodItemContainer>
              </Swipeable>
            );
          })
        : data?.user?.groceryLists.map((list: string[]) => {
            return (
              <Swipeable
                renderRightActions={() => swipeListRightAction(list.id)}
                key={list.id}
              >
                <FoodItemContainer pastGroceryList>
                  {list.groceryList?.map((pastItem: string, i: number) => (
                    <FoodItem pastGroceryList key={i} role="contentinfo">
                      {pastItem}
                    </FoodItem>
                  ))}
                </FoodItemContainer>
              </Swipeable>
            );
          })}
    </FoodsContainer>
  );
};

export { FoodItems };
