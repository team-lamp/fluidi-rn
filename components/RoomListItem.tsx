import React, { useEffect } from "react";
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
import useStore from "../store";

const members = [
  {
    id: 20,
    name: "Katie",
    avatar:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/161102903_10158001431472322_1672271331533195877_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DM8jSvIN4aIAX_b5mn1&_nc_ht=scontent-ort2-2.xx&oh=ec0e0a593c40c19531bf177e32f59b27&oe=60D76938",
  },
  {
    id: 39,
    name: "Jason",
    avatar:
      "https://cdn-images-1.listennotes.com/podcasts/crazy-white-guy-28-sings-classics-tBndR_QGwSp-8ti_4k2wIb9.1400x1400.jpg",
  },
];

interface RoomListItemProps extends TouchableOpacityProps {
  navigation: any;
  room: Room;
}

const RoomListItem = ({ navigation, room }: RoomListItemProps) => {
  const socket = useStore((state) => state.socket);
  const token = useStore((state) => state.token);
  // const isOnline = moment(new Date()).diff(room.lastOnline) < 120000;
  const isGroup = true;
  const defaultParams = {
    name: room.name,
    avatar: room.photoUrl,
    isGroup,
    chatRoomId: room.chatRoomId,
    talkRoomId: room.talkRoomId,
  };

  useEffect(() => {
    console.log("room", room);
  }, []);

  const paramsToPass = isGroup ? { ...defaultParams, members } : defaultParams;

  const handlePress = () => {
    navigation.navigate("RoomScreen", paramsToPass);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
      {room.photoUrl ? (
        <Thumbnail source={{ uri: room.photoUrl }} style={styles.avatar} />
      ) : (
        <View style={[styles.blankThumbnail, styles.avatar]}>
          <Text variant="header" style={styles.blankThumbnailText}>
            {room?.name[0]}
          </Text>
        </View>
      )}
      <View style={{ flexDirection: "column", paddingLeft: 10, flex: 1 }}>
        <Text variant="header">{room.name}</Text>
        <Text variant="caption">Yeah, that's what you said...</Text>
      </View>
      <Text variant="body">Sun</Text>
      <Icon
        type="Ionicons"
        name="chevron-forward"
        style={{ color: colors.lowOpacity.white, fontSize: 22, marginLeft: 10 }}
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
    borderWidth: 1,
    borderColor: colors.lowOpacity.brand,
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
