import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "native-base";
import { Pressable } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import AppLoading from "../AppLoading";
import RoomScreen from "../screens/RoomScreen";
import HomeScreen from "../screens/HomeScreen";
import HelpScreen from "../screens/HelpScreen";
import DrawerContent from "./DrawerContent";

import { colors } from "../constants/styleGuide";

import { DrawerParamList, HomeStackParamList } from "../types";

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <AppLoading>
      <HomeStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        {/* <HomeStack.Screen name="AppLoading" component={AppLoading} /> */}
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerTitle: "Rooms",
          }}
        />
        <HomeStack.Screen name="RoomScreen" component={RoomScreen} />
      </HomeStack.Navigator>
    </AppLoading>
  );
};

const MenuButton = () => {
  const navigation = useNavigation();
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <Pressable hitSlop={10} onPress={toggleDrawer}>
      <Icon type="Feather" name="menu" color={colors.brand} />
    </Pressable>
  );
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: colors.secondaryBackground, padding: 10 }}
      drawerPosition="left"
      drawerType="slide"
      drawerContent={(props) => <DrawerContent {...props} />}
      overlayColor="transparent"
      screenOptions={{
        headerLeft: () => <MenuButton />,
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="HelpScreen" component={HelpScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
