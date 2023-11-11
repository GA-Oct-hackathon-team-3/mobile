import React from "react";

import { renderRouter, screen } from "expo-router/testing-library";
import { View } from "react-native";
import "@testing-library/jest-native/extend-expect";

describe("App Root", () => {
  it("renders without errors", async () => {
    const MockComponent = jest.fn(() => <View />);
    renderRouter({ index: MockComponent }, { initialUrl: "/" });

    expect(screen).toHavePathname("/sign-in");
  });

  //   test("render the application", async () => {
  //     renderRouter();
  //     const signInText = await screen.findByText("Sign In");
  //     expect(signInText).toBeTruthy();
  //   });

  //   it("my-test", async () => {
  //     const MockComponent = jest.fn(() => <View />);

  //     renderRouter(
  //       {
  //         index: MockComponent,
  //         "folder/a": MockComponent,
  //         "(group)/b": MockComponent,
  //       },
  //       {
  //         initialRoute: "/folder/a",
  //       }
  //     );

  //     expect(screen).toHaveSegments(["[id]"]);
  //   });
});
