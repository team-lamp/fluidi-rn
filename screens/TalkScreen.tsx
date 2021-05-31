import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  TextInput,
  Button,
} from "react-native";
import { View } from "native-base";
import Text from "../components/themed/Text";
import { colors } from "../constants/styleGuide";
import * as SMS from "expo-sms";

const TalkScreen = ({ navigation }: any) => {
  const [message, setMessage] = useState("");

  const handleSendText = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(["8163871188"], message);
      console.log(result);
    } else {
      Alert.alert("Sorry", "Your text was not sent.", [{ text: "Okay" }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text variant="title">Talk Screen</Text>
        <TextInput
          multiline
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            borderWidth: 1,
            borderColor: colors.contrastText,
            color: colors.contrastText,
          }}
        />
        <Button title="Send" onPress={handleSendText} />
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
