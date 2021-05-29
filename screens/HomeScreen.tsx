import React from "react";
import RoomList from "../components/RoomList";
import { View, StyleSheet } from "react-native";
import useStore from "../store";

const HomeScreen = ({ navigation }: any) => {
  const token = useStore((state) => state.token);

  return (
    <View style={styles.container}>
      <RoomList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
