import { ViewStyle } from "react-native";

const colors = {
  brand: "#24A9E3",
  brandDark: "#176A8E",
  background: "#292F3F",
  secondaryBackground: "#1B1E27",
  backgroundDark: "#1F232F",
  contrastText: "#ffffff",
  secondaryText: "#808080",
  dim: "#454B5A",
  lowOpacity: {
    grey: "rgba(151, 151, 151, 0.2)",
    dark: "rgba(100, 100, 100, 0.2)",
    brand: "rgba(3, 169, 241, 0.5)",
    white: "rgba(255, 255, 255, 0.5)",
  },
  actions: {
    stop: "#F18303",
    play: "#2CF973",
    record: "#C51A2D",
  },
};

const headerStyle: ViewStyle = {
  height: 100,
  backgroundColor: "#1F232F",
  borderWidth: 0,
  shadowOpacity: 0.5,
  shadowColor: "#000",
  shadowRadius: 3,
  elevation: 2,
};

export { colors, headerStyle };
