import React, { useState } from "react";
import MessageList from "../components/MessageList";
import Text from "../components/themed/Text";
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableOpacityProps,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Icon, View } from "native-base";
import { colors } from "../constants/styleGuide";
import useKeyboardHeight from "react-native-use-keyboard-height";

interface IconButtonProps extends TouchableOpacityProps {
  isSelected: boolean;
  iconName: string;
  iconType:
    | "AntDesign"
    | "Entypo"
    | "EvilIcons"
    | "Feather"
    | "FontAwesome"
    | "FontAwesome5"
    | "Foundation"
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "MaterialIcons"
    | "Octicons"
    | "SimpleLineIcons"
    | "Zocial"
    | undefined;
}

const IconButton = ({
  onPress,
  isSelected,
  iconName,
  iconType,
}: IconButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Icon
      type={iconType}
      name={iconName}
      fontSize={20}
      color={isSelected ? colors.brand : colors.secondaryText}
    />
  </TouchableOpacity>
);

const RoomScreen = ({ route, navigation }: any) => {
  const { room_name } = route.params;
  const [selectedIconList, setSelectedIconList] = useState({
    photo: false,
    camera: false,
    microphone: false,
  });
  const [newMessage, setNewMessage] = useState("");
  const keyboardHeight = useKeyboardHeight();

  const handlePhotoPress = () => {
    const currentValue = selectedIconList.photo;
    // if not selected, open photos...
    setSelectedIconList({
      camera: false,
      microphone: false,
      photo: !currentValue,
    });
  };

  const handleCameraPress = () => {
    const currentValue = selectedIconList.camera;
    // if not selected, open camera
    setSelectedIconList({
      photo: false,
      microphone: false,
      camera: !currentValue,
    });
  };

  const handleMicrophonePress = () => {
    const currentValue = selectedIconList.microphone;
    // if not selected, open record modal
    setSelectedIconList({
      photo: false,
      camera: false,
      microphone: !currentValue,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="title">{room_name}</Text>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <MessageList />
      <View style={[styles.bottomContainer, { paddingBottom: keyboardHeight }]}>
        <TextInput
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          style={styles.textInput}
        />
        <View style={styles.iconContainer}>
          <IconButton
            onPress={handlePhotoPress}
            isSelected={selectedIconList.photo}
            iconName="photo"
            iconType="FontAwesome"
          />
          <IconButton
            onPress={handleCameraPress}
            isSelected={selectedIconList.camera}
            iconName="camera-retro"
            iconType="FontAwesome"
          />
          <IconButton
            onPress={handleMicrophonePress}
            isSelected={selectedIconList.microphone}
            iconName="mic"
            iconType="Feather"
          />
        </View>
      </View>
      {/* </TouchableWithoutFeedback>
      </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottomContainer: {
    width: "100%",
    backgroundColor: colors.brand,
    padding: 10,
  },
  textInput: {
    backgroundColor: colors.secondaryBackground,
    padding: 5,
    fontSize: 20,
    // height: 20,
  },
  iconContainer: {
    flexDirection: "row",
    paddingVertical: 5,
  },
});

export default RoomScreen;
