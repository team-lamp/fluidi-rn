import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "native-base";
import HelpScreen from "../screens/HelpScreen";
import DrawerContent from "./DrawerContent";
import { colors, headerStyle } from "../constants/styleGuide";
import { DrawerParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import MenuButton from "../components/MenuButton";

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: colors.lowOpacity.dark }}
      drawerPosition="left"
      drawerType="slide"
      drawerContent={(props) => <DrawerContent {...props} />}
      overlayColor="rgba(0, 0, 0, 0.85)"
      backBehavior="history"
      drawerContentOptions={{
        activeTintColor: colors.contrastText,
        inactiveTintColor: colors.contrastText,
        activeBackgroundColor: colors.lowOpacity.grey,
      }}
      screenOptions={{
        headerShown: true,
        headerStyle,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Icon
              type="Ionicons"
              name="chatbubbles-outline"
              style={{ color: colors.contrastText }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          headerTitleStyle: {
            color: colors.contrastText,
            fontSize: 20,
          },
          headerTintColor: colors.brand,
          headerLeft: () => <MenuButton />,
          drawerIcon: () => (
            <Icon
              type="Ionicons"
              name="help-circle-outline"
              style={{ color: colors.contrastText }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
