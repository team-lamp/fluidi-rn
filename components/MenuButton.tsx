import React from "react";
import { Icon, Thumbnail, Button } from "native-base";
import { Pressable, View } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { colors, headerStyle } from "../constants/styleGuide";

const MenuButton = () => {
  const navigation = useNavigation();
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <Pressable hitSlop={10} onPress={toggleDrawer}>
      <Icon
        type="Ionicons"
        name="menu-outline"
        style={{ color: colors.contrastText }}
      />
    </Pressable>
  );
};

export default MenuButton;
