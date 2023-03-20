import { FoodItems } from "../components/blocks/FoodItems";
import { render, screen } from "@testing-library/react-native";

jest.mock("react-native-gesture-handler", () => {
  const View = require("react-native/Libraries/Components/View/View");
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

describe("Food Items", () => {
  it("displays food items", async () => {
    const mockFunction = jest.fn();
    const mockFoodItemsArray = ["Chicken", "Steak", "Fried"];
    render(
      <FoodItems foodItemsArray={mockFoodItemsArray} onPress={mockFunction} />
    );

    await screen.findByText("Chicken");
    await screen.findByText("Steak");
    await screen.findByText("Fried");
  });
});
