import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, Button } from "native-base";
import AppLoading from "../AppLoading";
import RoomScreen from "../screens/RoomScreen";
import HomeScreen from "../screens/HomeScreen";
import RoomScreenHeader from "../components/RoomScreenHeader";
import { colors, headerStyle } from "../constants/styleGuide";
import { HomeStackParamList } from "../types";
import MenuButton from "../components/MenuButton";

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
                  style={{ color: colors.brand, fontSize: 30 }}
                />
              </Button>
            ),
          })}
        />
      </HomeStack.Navigator>
    </AppLoading>
  );
};

export default HomeStackNavigator;
