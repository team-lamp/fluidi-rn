import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Thumbnail } from "native-base";
import { colors } from "../constants/styleGuide";
import Text from "./themed/Text";

interface Props {
  title: string;
  avatar: string;
  navigation: any;
}

const RoomScreenHeader = ({ title, avatar, navigation }: Props) => {
  return (
    <View style={styles.header}>
      <Thumbnail source={{ uri: avatar }} small />
      <Text variant="title" style={{ marginLeft: 10 }}>
        {title}
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
