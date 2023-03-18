export interface FoodItemType {
  foodItemsArray: string[];
  onPress: (deletedItem: string) => void;
}

export interface FoodInputType {
  onChangeText: (text: string) => void;
  defaultValue: string;
  placeholder: string;
}

export interface SubmitType {
  onPress: () => void;
  title: string;
  color: string;
}
