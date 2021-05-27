import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import AvatarButton from "./themed/AvatarButton";
import Text from "./themed/Text";
import { Body, ListItem, View, Thumbnail } from "native-base";
import { colors } from "../constants/styleGuide";
import { Room } from "../types";

interface RoomListItemProps extends TouchableOpacityProps {
  navigation: any;
  room: Room;
}

const RoomListItem = ({ navigation, room }: RoomListItemProps) => {
  const handlePress = () => {
    navigation.navigate("RoomScreen", { room_name: room.room_name });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
      {room.room_photo ? (
        <Thumbnail small source={{ uri: room.room_photo }} />
      ) : (
        <View style={styles.blankThumbnail}>
          <Text variant="body" style={styles.blankThumbnailText}>
            {room.room_name[0]}
          </Text>
        </View>
      )}
      <Text variant="header">{room.room_name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.background,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  blankThumbnail: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: colors.secondaryText,
    alignItems: "center",
    justifyContent: "center",
  },
  blankThumbnailText: {
    color: colors.background,
  },
});

export default RoomListItem;
