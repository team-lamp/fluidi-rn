import React from "react";
import RoomList from "../components/RoomList";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import useStore from "../store";

const HomeScreen = ({ navigation }: any) => {
  const token = useStore(state => state.token);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{token}</Text>
      <RoomList navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
