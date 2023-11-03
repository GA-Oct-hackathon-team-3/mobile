const untranspiledModulePatterns = [
  "(jest-)?react-native",
  "@react-native-community",
  "expo(nent)?",
  "@expo(nent)?/.*",
  "react-navigation",
  "@react-navigation/.*",
  "@unimodules/.*",
  "unimodules",
  "sentry-expo",
  "native-base",
  "react-native-svg",
  "@react-native",
  "react-native",
  "toastify-react-native",
  "stream-chat-expo",
  "react-native-image-picker",
  "moti/.*",
];

module.exports = {
  preset: "jest-expo",
  roots: ["."],
  transformIgnorePatterns: [
    `node_modules/(?!${untranspiledModulePatterns.join("|")})`,
  ],
  moduleNameMapper: {
    "^react-dnd$": "react-dnd/dist/cjs",
    "^react-dnd-html5-backend$": "react-dnd-html5-backend/dist/cjs",
    "^dnd-core$": "dnd-core/dist/cjs",
    "^@/apiClient(.*)$": "<rootDir>/store/apiClient.ts",
    "^@/components/providers/AuthProvider(.*)$":
      "<rootDir>/components/providers/AuthProvider.tsx",
    "^@/constants/theme(.*)$": "<rootDir>/constants/theme.tsx",
    "^@/constants/routes(.*)$": "<rootDir>/constants/routes.ts",
    "^@/components/stacks/HomeStack(.*)$":
      "<rootDir>/components/stacks/HomeStack.tsx",
    "^@/helpers/helpers(.*)$": "<rootDir>/helpers/helpers.ts",
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
  ],
};
