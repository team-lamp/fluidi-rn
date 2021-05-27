import React from "react";
import RoomList from "../components/RoomList";
import { SafeAreaView, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
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
