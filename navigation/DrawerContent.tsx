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
    "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/119815423_3332879713474763_8048010738081328737_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zj4PekDIPHEAX_zCmxf&_nc_ht=scontent-ort2-2.xx&oh=295e3be89c1131937c94122678249a3f&oe=60D5797F",
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
        {/* <DrawerItemList {...rest} /> */}
        <DrawerItem
          label="Home"
          labelStyle={styles.label}
          onPress={() => handleNavigationPress("HomeScreen")}
        />
        <DrawerItem
          label="Help"
          labelStyle={styles.label}
          onPress={() => handleNavigationPress("HelpScreen")}
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
