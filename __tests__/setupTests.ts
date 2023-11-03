import "@testing-library/jest-dom/extend-expect";

import "react-native-gesture-handler/jestSetup";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
