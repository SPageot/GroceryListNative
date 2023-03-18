import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import styled from "styled-components";
import FoodList from "./screens/FoodList/FoodList";

const AppContainer = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
`;

export default function App() {
  return (
    <AppContainer>
      <FoodList />
    </AppContainer>
  );
}
