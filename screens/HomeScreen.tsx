import React from "react";
import RoomList from "../components/RoomList";
import { View, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }: any) => {
<<<<<<< HEAD
=======
  const token = useStore((state) => state.token);

>>>>>>> aa839dbbbeb6b0bcd426cae588666c3ecc817660
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
