import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { render } from "@testing-library/react-native";

const AllTheProviders = ({ children }) => {
  return <ThemeProvider value={DefaultTheme}>{children}</ThemeProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
