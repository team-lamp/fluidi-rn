import React from "react";
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { View, Thumbnail } from "native-base";
import { StyleSheet } from "react-native";
import Text from "../components/themed/Text";
import { colors } from "../constants/styleGuide";

const user = {
  photo:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  username: "Chancey-Poo",
};

const DrawerContent = ({ navigation, ...rest }: any) => {
  const handleNavigationPress = (destination: string) => {
    navigation.navigate(destination);
  };

  return (
    <DrawerContentScrollView {...rest}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Thumbnail large source={{ uri: user.photo }} />
          <Text variant="header">{user.username}</Text>
        </View>
        <DrawerItemList {...rest} />
        <DrawerItem
          label="HelpScreen"
          labelStyle={styles.label}
          onPress={() => handleNavigationPress("Help")}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: colors.contrastText,
  },
});

export default DrawerContent;
