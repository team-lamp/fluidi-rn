import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/styleGuide";
import Text from "./themed/Text";
import { useRoute, useNavigation } from "@react-navigation/native";
import Avatar from "./themed/Avatar";
import useStore from "../store";

const RoomScreenHeader = () => {
  const route = useRoute();

  const user = useStore((state) => state.user);
  // @ts-ignore
  const otherUser = route.params?.users?.filter((u) => u.id !== user.id);
  const navigation = useNavigation();
  console.log("route", route);
  // @ts-ignore
  const isGroup = route.params?.isGroup;
  // @ts-ignore
  const name = isGroup ? route.params?.name : "Katie";
  const hasPhoto = isGroup
    ? // @ts-ignore
      Boolean(route.params?.photoUrl)
    : // @ts-ignore
      Boolean(route.params?.users[0]?.photoUrl);
  const uri = isGroup
    ? // @ts-ignore
      route?.params?.photoUrl
    : // @ts-ignore
      route?.params?.users[0]?.photoUrl;

  console.log(route.params);

  useEffect(() => {
    console.log(route.params);
  }, []);

  const handleAvatarPress = () => {
    // @ts-ignore
    if (isGroup) {
      navigation.navigate("TalkScreen", route.params);
    } else {
      navigation.navigate("ContactDetails", { ...route.params, otherUser });
    }
  };

  return (
    <View style={styles.header}>
      {hasPhoto ? (
        <TouchableOpacity onPress={handleAvatarPress}>
          <Avatar uri={uri} variant="small" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleAvatarPress}>
          <Avatar
            variant="small"
            textVariant="body"
            viewStyle={{ backgroundColor: colors.lowOpacity.greenLight }}
            letter={name[0]}
          />
        </TouchableOpacity>
      )}
      <Text variant="title" style={{ marginLeft: 10 }}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -25,
  },
});

export default RoomScreenHeader;
