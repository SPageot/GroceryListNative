export interface PropType {
  inputType?: "reminders" | "default";
  shouldExpand?: boolean;
  pastGroceryList?: boolean;
  isSavedButton?: boolean;
  inputError?: boolean;
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
  inputType: "reminders" | "default";
  onChangeText: (text: string) => void;
  defaultValue: string;
  placeholder?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  inputError: boolean;
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

export interface UserType {
  email: string;
  groceryList: string[] | null;
  name: string;
  reminders: ReminderType;
}

export interface UserContextType {
  user?: UserType | null;
  setToken?: React.Dispatch<React.SetStateAction<string>> | undefined;
}
