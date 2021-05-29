import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import AvatarButton from "./themed/AvatarButton";
import Text from "./themed/Text";
import { Body, ListItem, View, Thumbnail, Icon } from "native-base";
import { colors } from "../constants/styleGuide";
import { Room } from "../types";
import moment from "moment";

interface RoomListItemProps extends TouchableOpacityProps {
  navigation: any;
  room: Room;
}

const RoomListItem = ({ navigation, room }: RoomListItemProps) => {
  const isOnline = moment(new Date()).diff(room.lastOnline) < 120000;
  const lastOnline = moment(room.lastOnline).fromNow();

  const handlePress = () => {
    navigation.navigate("RoomScreen", {
      name: room.name,
      avatar: room.photo,
      lastOnline: room.lastOnline,
      room_name: room.name,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
      {room.photo ? (
        <Thumbnail
          source={{ uri: room.photo }}
          style={[
            styles.avatar,
            {
              borderColor: isOnline
                ? colors.actions.play
                : colors.secondaryText,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.blankThumbnail,
            styles.avatar,
            {
              borderColor: isOnline
                ? colors.actions.play
                : colors.secondaryText,
            },
          ]}
        >
          <Text variant="body" style={styles.blankThumbnailText}>
            {room.name[0]}
          </Text>
        </View>
      )}
      <Text variant="header">{room.name}</Text>
      <View style={{ flexDirection: "column", paddingLeft: 10, flex: 1 }}>
        <Text variant="header">{room.name}</Text>
        <Text variant="caption">{lastOnline}</Text>
      </View>
      <Icon
        type="Ionicons"
        name="chevron-forward"
        style={{ color: colors.secondaryText, fontSize: 22 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.background,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
  },
  blankThumbnail: {
    backgroundColor: colors.secondaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  blankThumbnailText: {
    color: colors.contrastText,
  },
});

export default RoomListItem;
