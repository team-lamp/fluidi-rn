import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { colors } from "../constants/styleGuide";
import { Room } from "../types";
import RoomListItem from "./RoomListItem";

const DATA: Room[] = [
  {
    id: 25,
    room_name: "Katie",
    room_photo:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/161102903_10158001431472322_1672271331533195877_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DM8jSvIN4aIAX_b5mn1&_nc_ht=scontent-ort2-2.xx&oh=ec0e0a593c40c19531bf177e32f59b27&oe=60D76938",
    lastOnline: new Date(),
  },
  {
    id: 93,
    room_name: "Dudes",
    room_photo: null,
    lastOnline: new Date(2021, 4, 27, 12, 18),
  },
  {
    id: 30,
    room_name: "Jospeh",
    room_photo:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
    lastOnline: new Date(2021, 4, 27, 8, 24),
  },
  {
    id: 297,
    room_name: "Andrew",
    room_photo:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
    lastOnline: new Date(2021, 4, 27, 6, 12),
  },
  {
    id: 235,
    room_name: "Cool PPL",
    room_photo: null,
    lastOnline: new Date(2021, 4, 26, 18, 29),
  },
];

const RoomList = ({ navigation }: any) => {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <RoomListItem room={item} navigation={navigation} />
      )}
      keyExtractor={(item) => String(item.id)}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default RoomList;
