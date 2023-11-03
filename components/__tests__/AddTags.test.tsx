import {
  render as rtlRender,
  cleanup,
  screen,
  act,
} from "@testing-library/react-native";
import AddTags from "../AddTags";
import { NavigationContainer } from "@react-navigation/native";
import fetch from "jest-fetch-mock";
import * as friendsService from "../../utilities/friends-service";
import { mockFriend } from "../../data/mockData";

jest.mock("../../utilities/friends-service");

describe("<AddTags />", () => {
  beforeEach(() => {
    fetch.resetMocks();
    // Mocking retrieveFriend
    friendsService.retrieveFriend.mockResolvedValue(mockFriend);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("renders correctly", async () => {
    let component;

    await act(async () => {
      component = rtlRender(<AddTags />);
    });

    expect(screen).toMatchSnapshot();
  });
});
