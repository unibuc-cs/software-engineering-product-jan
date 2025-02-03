import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

test("Onboarding button navigates correctly", () => {
  const { getByText } = render(
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );

  const onboardingButton = getByText("Onboarding");
  expect(onboardingButton).toBeTruthy();

  fireEvent.press(onboardingButton);
});
