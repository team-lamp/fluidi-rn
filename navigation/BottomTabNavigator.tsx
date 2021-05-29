import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors, headerStyle } from "../constants/styleGuide";
import { BottomTabParamList } from "../types";
import HomeStackNavigator from "./HomeStackNavigator";
import ContactsScreen from "../screens/ContactsScreen";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Rooms"
      tabBarOptions={{
        inactiveTintColor: colors.secondaryText,
        activeTintColor: colors.contrastText,
        style: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tab.Screen name="Rooms" component={HomeStackNavigator} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
