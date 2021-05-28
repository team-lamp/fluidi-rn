import { ViewStyle } from "react-native";

const colors = {
  brand: "#07C3AE",
  background: "#000000",
  secondaryBackground: "#1F1E1E",
  contrastText: "#ffffff",
  secondaryText: "#6C6C6C",
  dim: "#444444",
  actions: {
    stop: "#CA5562",
    play: "#79B431",
    record: "#C51A2D",
  },
};

const headerStyle: ViewStyle = {
  height: 100,
  backgroundColor: colors.background,
};

export { colors, headerStyle };
