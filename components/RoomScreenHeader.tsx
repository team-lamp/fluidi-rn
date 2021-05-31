import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon, Thumbnail } from "native-base";
import { colors } from "../constants/styleGuide";
import Text from "./themed/Text";
import { useRoute, useNavigation } from "@react-navigation/native";

const RoomScreenHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const handleAvatarPress = () => {
    // @ts-ignore
    if (route.params.isGroup) {
      navigation.navigate("TalkScreen", route.params);
    } else {
      navigation.navigate("ContactDetails", route.params);
    }
  };

  return (
    <View style={styles.header}>
      {/* @ts-ignore */}
      {route.params.avatar ? (
        <TouchableOpacity onPress={handleAvatarPress}>
          {/* @ts-ignore */}
          <Thumbnail source={{ uri: route.params.avatar }} small />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleAvatarPress}>
          <View style={styles.blankAvatar}>
            <Text variant="caption" style={{ color: colors.contrastText }}>
              {/* @ts-ignore */}
              {route.params.room_name[0]}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <Text variant="title" style={{ marginLeft: 10 }}>
        {/* @ts-ignore */}
        {route.params.room_name}
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
  blankAvatar: {
    height: 36,
    width: 36,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 36 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RoomScreenHeader;
