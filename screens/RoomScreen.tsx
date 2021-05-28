import React, { useState, useRef } from "react";
import MessageList from "../components/MessageList";
import Text from "../components/themed/Text";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Icon, View } from "native-base";
import { colors } from "../constants/styleGuide";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Message } from "../types";

const DATA: Message[] = [
  {
    id: 38,
    username: "Katie",
    created_at: new Date().toDateString(),
    content: "Hey check this out, blah blah blah.",
    user_photo:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/161102903_10158001431472322_1672271331533195877_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DM8jSvIN4aIAX_b5mn1&_nc_ht=scontent-ort2-2.xx&oh=ec0e0a593c40c19531bf177e32f59b27&oe=60D76938",
  },
  {
    id: 89,
    username: "You",
    created_at: new Date().toDateString(),
    content: "Oh wow, so cool!",
    user_photo:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/119815423_3332879713474763_8048010738081328737_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zj4PekDIPHEAX_zCmxf&_nc_ht=scontent-ort2-2.xx&oh=295e3be89c1131937c94122678249a3f&oe=60D5797F",
  },
  {
    id: 105,
    username: "Katie",
    created_at: new Date().toDateString(),
    content: "Thanks, lol.",
    user_photo:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/161102903_10158001431472322_1672271331533195877_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DM8jSvIN4aIAX_b5mn1&_nc_ht=scontent-ort2-2.xx&oh=ec0e0a593c40c19531bf177e32f59b27&oe=60D76938",
  },
  {
    id: 138,
    username: "Katie",
    created_at: new Date().toDateString(),
    content: "I thought it was awesome.",
    user_photo:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/161102903_10158001431472322_1672271331533195877_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DM8jSvIN4aIAX_b5mn1&_nc_ht=scontent-ort2-2.xx&oh=ec0e0a593c40c19531bf177e32f59b27&oe=60D76938",
  },
];

const messageTemplate = {
  id: Date.now(),
  username: "You",
  created_at: new Date().toDateString(),
  content: "",
  user_photo:
    "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/119815423_3332879713474763_8048010738081328737_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zj4PekDIPHEAX_zCmxf&_nc_ht=scontent-ort2-2.xx&oh=295e3be89c1131937c94122678249a3f&oe=60D5797F",
};

const RoomScreen = ({ route, navigation }: any) => {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState(DATA);
  const [newMessage, setNewMessage] = useState("");
  const [padding, setPadding] = useState(20);
  const showSendButton = Boolean(newMessage && newMessage.length);

  const handleSendMessage = () => {
    const messageToSend = { ...messageTemplate, content: newMessage };
    setMessages([messageToSend, ...messages]);
    setNewMessage("");
    // @ts-ignore
    inputRef.current.clear();
  };

  const handlePhotoPress = () => {};

  const handleCameraPress = () => {};

  Keyboard.addListener("keyboardWillShow", () => setPadding(10));
  Keyboard.addListener("keyboardWillHide", () => setPadding(20));

  return (
    <View style={styles.container}>
      <MessageList messages={messages} />
      <View style={{ paddingHorizontal: 20 }}>
        <TextInput
          ref={inputRef}
          multiline
          style={styles.textInput}
          onChangeText={(text) => setNewMessage(text)}
        />
      </View>
      <View style={[styles.iconContainer, { paddingBottom: padding }]}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handlePhotoPress}>
            <Icon
              type="FontAwesome"
              name="photo"
              style={{
                color: colors.secondaryText,
                marginRight: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCameraPress}>
            <Icon
              type="FontAwesome"
              name="camera-retro"
              style={{
                color: colors.secondaryText,
              }}
            />
          </TouchableOpacity>
        </View>
        {showSendButton && (
          <TouchableOpacity onPress={handleSendMessage}>
            <Icon
              type="Feather"
              name="send"
              style={{
                color: colors.brand,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <KeyboardSpacer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  textInput: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.secondaryText,
    color: colors.contrastText,
    padding: 10,
    fontSize: 20,
    minHeight: 40,
    maxHeight: 200,
  },
  iconContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
});

export default RoomScreen;
