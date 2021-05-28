import { ViewStyle } from "react-native";

const colors = {
  brand: "#07C3AE",
  background: "#000000",
  secondaryBackground: "#151515",
  contrastText: "#ffffff",
  secondaryText: "#BDBDBD",
  actions: {
    stop: "#CA5562",
    play: "#07C3AE",
    record: "#C51A2D",
  },
};

const headerStyle: ViewStyle = {
  height: 100,
  backgroundColor: colors.background,
};

export { colors, headerStyle };
