import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Text from "./themed/Text";
import { View, Icon } from "native-base";
import { colors } from "../constants/styleGuide";
import { RoomResponse } from "../types";
import Avatar from "./themed/Avatar";

interface RoomListItemProps extends TouchableOpacityProps {
  navigation: any;
  room: RoomResponse;
}

const RoomListItem = ({ navigation, room }: RoomListItemProps) => {
  // const isOnline = moment(new Date()).diff(room.lastOnline) < 120000;
  const isGroup = false;

  const paramsToPass = {
    id: room.id,
    name: room.name,
    photoUrl: room.photoUrl,
    isGroup,
    chatRoomId: room.chatRoomId,
    talkRoomId: room.talkRoomId,
    users: room.users,
    roomUuid: room.roomUuid,
  };

  useEffect(() => {
    console.log("room", room);
  }, []);

  const handlePress = () => {
    navigation.navigate("RoomScreen", paramsToPass);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
      {room.photoUrl ? (
        <Avatar uri={room.photoUrl} variant="large" viewStyle={styles.avatar} />
      ) : (
        <Avatar
          variant="large"
          textVariant="header"
          letter={room?.name[0]}
          viewStyle={styles.avatar}
        />
      )}
      <View style={{ flexDirection: "column", paddingLeft: 10, flex: 1 }}>
        <Text variant="header">{room.name}</Text>
        <Text variant="caption">Yeah, that's what you said...</Text>
      </View>
      <Text variant="body">Sun</Text>
      <Icon
        type="Ionicons"
        name="chevron-forward"
        style={{ color: colors.lowOpacity.white, fontSize: 22, marginLeft: 5 }}
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
    borderWidth: 1,
    borderColor: colors.brandDark,
  },
});

export default RoomListItem;
