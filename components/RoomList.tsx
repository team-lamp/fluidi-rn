import axios from "axios";
import React, { useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";
import { View } from "react-native";
import { API_URL } from "../constants/secrets";
import { colors } from "../constants/styleGuide";
import useStore from "../store";
import { User } from "../types";
import RoomListItem from "./RoomListItem";

const RoomList = ({ navigation }: any) => {
  const user: null | User = useStore((state) => state.user);
  const rooms: Record<any, any> = useStore((state) => state.rooms);
  const socket = useStore((state) => state.socket);
  const token = useStore((state) => state.token);

  useEffect(() => {
    console.log(user);
    console.log(rooms);
    // socket?.emit("fetch rooms", user?.id);
  }, []);

  const handleAddRoom = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/rooms/create`,
        {
          name: "Katie",
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(res.data);
      console.log("room created!");
      // fetch the rooms now that we've added a new one. the server will send back a "rooms list" emit
      socket?.emit("fetch rooms");
    } catch (err) {
      console.log(err);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/rooms/join`,
        {
          uuid: "048d0665-129d-4398-89a9-7f7d7bbc1a12",
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(res.data);
      console.log("room joined!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FlatList
      data={Object.values(rooms)}
      renderItem={({ item }) => (
        <RoomListItem room={item} navigation={navigation} />
      )}
      keyExtractor={(item) => String(item.id)}
      style={styles.list}
      ListFooterComponent={
        <View>
          <TouchableOpacity
            style={styles.addRoomButton}
            onPress={handleAddRoom}
          >
            <Text style={{ color: "black", fontSize: 54 }}>Create room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addRoomButton}
            onPress={handleJoinRoom}
          >
            <Text style={{ color: "black", fontSize: 54 }}>Join a room</Text>
          </TouchableOpacity>
        </View>
      }
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
