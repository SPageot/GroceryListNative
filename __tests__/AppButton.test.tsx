import React from "react";
import TestRenderer from "react-test-renderer";
import { AppButton } from "../components/blocks/AppButton";

describe("Button", () => {
  const mockFunction = jest.fn();
  const mockButton = TestRenderer.create(
    <AppButton color="blue" onPress={mockFunction} title="button" />
  );
  it("should render correctly", () => {
    expect(mockButton.toJSON()).toMatchSnapshot();
  });
});
