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
import TalkScreen from "../screens/TalkScreen";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContactDetails from "../screens/ContactDetails";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Button transparent onPress={() => navigation.goBack()}>
      <Icon
        type="Ionicons"
        name="chevron-back-outline"
        style={{ color: colors.brand, fontSize: 30 }}
      />
    </Button>
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
          options={{
            headerTitle: "Fluidi",
            headerLeft: MenuButton,
          }}
        />
        <HomeStack.Screen
          name="RoomScreen"
          component={RoomScreen}
          options={({ route, navigation }) => ({
            headerTitle: () => <RoomScreenHeader />,
            headerLeft: BackButton,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("TalkScreen")}
              >
                <Icon
                  type="Entypo"
                  name="drop"
                  style={{ color: colors.brand, marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <HomeStack.Screen
          name="TalkScreen"
          component={TalkScreen}
          options={{
            headerLeft: BackButton,
          }}
        />
        <HomeStack.Screen
          name="ContactDetails"
          component={ContactDetails}
          options={{
            headerLeft: BackButton,
          }}
        />
      </HomeStack.Navigator>
    </AppLoading>
  );
};

export default HomeStackNavigator;
