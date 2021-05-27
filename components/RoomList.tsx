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
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: 93,
    room_name: "Dudes",
    room_photo: null,
  },
  {
    id: 30,
    room_name: "Jospeh",
    room_photo:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: 297,
    room_name: "Andrew",
    room_photo:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
  },
  {
    id: 235,
    room_name: "Cool PPL",
    room_photo: null,
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
