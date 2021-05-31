import React, { useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";
import { View } from "react-native";
import { colors } from "../constants/styleGuide";
import useStore from "../store";
import { User, Room } from "../types";
import RoomListItem from "./RoomListItem";

const RoomList = ({ navigation }: any) => {
  const user: null | User = useStore((state) => state.user);
  const rooms: Room[] = useStore((state) => state.rooms);
  const socket = useStore((state) => state.socket);

  useEffect(() => {
    console.log(user);
    socket?.emit("getRooms", user?.id);
  }, []);

  return (
    <FlatList
      data={rooms}
      renderItem={({ item }) => (
        <RoomListItem room={item} navigation={navigation} />
      )}
      keyExtractor={(item) => String(item.id)}
      style={styles.list}
      //   ListFooterComponent={
      //     <TouchableOpacity
      //       style={styles.addRoomButton}
      //       onPress={() => {
      //         socket?.emit("createRoom", {
      //           name: "Test Room",
      //           photo: "",
      //         });
      //         console.log("room created!");
      //       }}
      //     >
      //       <Text style={{ color: "black", fontSize: 54 }}>Create room</Text>
      //     </TouchableOpacity>
      //   }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.background,
    flex: 1,
  },
  addRoomButton: {
    backgroundColor: "white",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: colors.dim,
  },
});

export default RoomList;
