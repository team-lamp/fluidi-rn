import { ViewStyle } from "react-native";

const colors = {
  brand: "#03A9F1",
  brandDark: "#007AAF",
  background: "#292F3F",
  secondaryBackground: "#1B1E27",
  contrastText: "#ffffff",
  secondaryText: "#CFCFCF",
  dim: "#454B5A",
  lowOpacity: {
    grey: "rgba(151, 151, 151, 0.2)",
    dark: "rgba(100, 100, 100, 0.2)",
    brand: "rgba(3, 169, 241, 0.5)",
    white: "rgba(255, 255, 255, 0.5)",
  },
  actions: {
    stop: "#F18303",
    play: "#00AC83",
    record: "#C51A2D",
  },
};

const headerStyle: ViewStyle = {
  height: 100,
  backgroundColor: colors.background,
};

export { colors, headerStyle };
