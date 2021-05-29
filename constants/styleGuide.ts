import { ViewStyle } from "react-native";

const colors = {
  brand: "#3169F4",
  brandDark: "#121C34",
  background: "#000000",
  secondaryBackground: "#1F1E1E",
  contrastText: "#ffffff",
  secondaryText: "#6C6C6C",
  dim: "#444444",
  lowOpacity: {
    grey: "rgba(151, 151, 151, 0.2)",
    dark: "rgba(100, 100, 100, 0.2)",
    brand: "rgba(49, 105, 244, 0.2)",
    white: "rgba(255, 255, 255, 0.5)",
  },
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
