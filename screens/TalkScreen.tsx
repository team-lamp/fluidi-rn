import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { View } from "native-base";
import Text from "../components/themed/Text";
import { colors } from "../constants/styleGuide";

const TalkScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text variant="title">Talk Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default TalkScreen;
