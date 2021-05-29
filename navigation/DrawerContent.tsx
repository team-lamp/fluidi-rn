import React from "react";
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { View, Thumbnail, Icon, Button } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "../components/themed/Text";
import { colors } from "../constants/styleGuide";

const user = {
  photo:
    "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/119815423_3332879713474763_8048010738081328737_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zj4PekDIPHEAX_zCmxf&_nc_ht=scontent-ort2-2.xx&oh=295e3be89c1131937c94122678249a3f&oe=60D5797F",
  username: "Chancey-Poo",
};

const DrawerContent = ({ ...props }: any) => {
  const { navigation } = props;
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View
          style={{ width: "100%", alignItems: "flex-end", paddingRight: 10 }}
        >
          <TouchableOpacity onPress={toggleDrawer}>
            <Icon
              type="Ionicons"
              name="close-outline"
              style={{ color: colors.contrastText }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Thumbnail
            large
            source={{ uri: user.photo }}
            style={{
              borderColor: colors.actions.play,
              borderWidth: 2,
              marginBottom: 10,
            }}
          />
          <Text variant="title">{user.username}</Text>
          <Text variant="body" style={{ fontWeight: "100" }}>
            Welcome back.
          </Text>
        </View>
        <DrawerItemList {...props} />

        {/* <DrawerItem
          label="Account"
          labelStyle={styles.label}
          onPress={() => handleNavigationPress("Account")}
          icon={() => (
            <Icon
              type="Ionicons"
              name="person-outline"
              style={{ color: colors.contrastText }}
            />
          )}
        />
        <DrawerItem
          label="Privacy"
          labelStyle={styles.label}
          onPress={() => handleNavigationPress("PrivacyScreen")}
          icon={() => (
            <Icon
              type="SimpleLineIcons"
              name="lock"
              style={{ color: colors.contrastText }}
            />
          )}
        />
        <DrawerItem
          label="Help"
          labelStyle={styles.label}
          onPress={() => handleNavigationPress("HelpScreen")}
          icon={() => (
            <Icon
              type="Ionicons"
              name="help-circle-outline"
              style={{ color: colors.contrastText }}
            />
          )}
        /> */}
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
    paddingBottom: 25,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    borderBottomColor: colors.lowOpacity.grey,
    borderBottomWidth: 1,
  },
  label: {
    color: colors.contrastText,
    fontSize: 18,
  },
});

export default DrawerContent;
