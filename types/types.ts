export interface PropType {
  type?: "reminders" | "default";
  shouldExpand?: boolean;
}

export interface ReminderProps {
  handleHeaderChangeText: (text: string) => void;
  handleChangeText: (text: string) => void;
  handleCancelPress: () => void;
  handleSubmitPress: () => void;
  headerValue: string;
  messageValue: string;
}

export interface FoodItemType {
  foodItemsArray: string[];
  onPress: (deletedItem: string) => void;
}

export interface InputType {
  type: "reminders" | "default";
  onChangeText: (text: string) => void;
  defaultValue: string;
  placeholder: string;
}

export interface SubmitType {
  onPress: () => void;
  title: string;
  color: string;
}

export interface ReminderType {
  reminder: string;
  reminderHeader: string;
}

export interface UserInfoType {
  __typename: string;
  email: string;
  groceryList: string[] | null;
  name: string;
  reminders: ReminderType;
}

export interface UserType {
  loginUser?: UserInfoType;
}

export interface UserContextType {
  user?: UserType | null;
  setUser?: React.Dispatch<React.SetStateAction<undefined>> | undefined;
}
