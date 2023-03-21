import React from "react";
import { FoodInput } from "../components/form/Input";
import TestRenderer from "react-test-renderer";

describe("Food Input", () => {
  const mockFunction = jest.fn();
  const mockFoodInput = TestRenderer.create(
    <FoodInput
      onChangeText={mockFunction}
      defaultValue="value"
      placeholder="value"
    />
  );
  it("should render correctly", () => {
    expect(mockFoodInput.toJSON()).toMatchSnapshot();
  });
});
