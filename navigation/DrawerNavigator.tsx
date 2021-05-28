import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon, Thumbnail, Button } from "native-base";
import { Pressable, View } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import AppLoading from "../AppLoading";
import RoomScreen from "../screens/RoomScreen";
import HomeScreen from "../screens/HomeScreen";
import HelpScreen from "../screens/HelpScreen";
import DrawerContent from "./DrawerContent";
import Text from "../components/themed/Text";
import RoomScreenHeader from "../components/RoomScreenHeader";
import { colors, headerStyle } from "../constants/styleGuide";
import { DrawerParamList, HomeStackParamList } from "../types";

const MenuButton = () => {
  const navigation = useNavigation();
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <Pressable hitSlop={10} onPress={toggleDrawer}>
      <Icon type="Feather" name="menu" style={{ color: colors.brand }} />
    </Pressable>
  );
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <AppLoading>
      <HomeStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle,
          headerTitleStyle: {
            color: colors.contrastText,
            fontSize: 20,
          },
          headerTintColor: colors.brand,
          headerTitleAlign: "center",
        }}
      >
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Rooms",
            headerLeft: () => <MenuButton />,
          })}
        />
        <HomeStack.Screen
          name="RoomScreen"
          component={RoomScreen}
          options={({ route, navigation }) => ({
            headerTitle: () => (
              <RoomScreenHeader
                navigation={navigation}
                avatar={route.params.avatar}
                title={route.params.room_name}
              />
            ),
            headerLeft: () => (
              <Button transparent onPress={() => navigation.pop()}>
                <Icon
                  type="Ionicons"
                  name="chevron-back-outline"
                  style={{ color: colors.brand }}
                  fontSize={30}
                />
              </Button>
            ),
          })}
        />
      </HomeStack.Navigator>
    </AppLoading>
  );
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: colors.secondaryBackground, padding: 10 }}
      drawerPosition="left"
      drawerType="front"
      drawerContent={(props) => <DrawerContent {...props} />}
      overlayColor="transparent"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="HelpScreen" component={HelpScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
