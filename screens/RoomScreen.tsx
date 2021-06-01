import React, { useState, useRef, useEffect } from "react";
import MessageList from "../components/MessageList";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Icon, View } from "native-base";
import { colors } from "../constants/styleGuide";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeStackParamList, Message, MessageToSend } from "../types";
import useStore from "../store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  id: Date.now() + Math.random(), // in case two messages are sent at the same time
  username: "You",
  created_at: new Date().toDateString(),
  content: "",
  user_photo:
    "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/119815423_3332879713474763_8048010738081328737_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zj4PekDIPHEAX_zCmxf&_nc_ht=scontent-ort2-2.xx&oh=295e3be89c1131937c94122678249a3f&oe=60D5797F",
};

const RoomScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [messages, setMessages] = useState(DATA);
  const [newMessage, setNewMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const socket = useStore((state) => state.socket);
  const user = useStore((state) => state.user);
  const showSendButton = Boolean(newMessage && newMessage.length);
  const route: RouteProp<HomeStackParamList, any> = useRoute();

  const handleSendMessage = () => {
    const messageToSend = { ...messageTemplate, content: newMessage };
    setMessages([messageToSend, ...messages]);
    setNewMessage("");
    inputRef.current?.clear();

    const msg: MessageToSend = {
      room: "Test Room",
      sender: user,
      text: messageToSend.content,
      timestamp: new Date(),
    };
    socket?.emit("chatMessage", msg);
  };

  const handlePhotoPress = () => {};

  const handleCameraPress = () => {};

  useEffect(() => {
    socket?.emit("user-joined-room", {
      userId: user.id,
      roomId: route.params?.chatRoomId,
    });
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: isFocused ? 5 : insets.bottom,
        },
      ]}
    >
      <MessageList messages={messages} />
      <View style={{ paddingHorizontal: 20 }}>
        <TextInput
          ref={inputRef}
          multiline
          placeholder="Type a message"
          placeholderTextColor={colors.lowOpacity.white}
          style={styles.textInput}
          onChangeText={(text) => setNewMessage(text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.leftIconContainer}>
          <TouchableOpacity
            onPress={handlePhotoPress}
            style={styles.iconButton}
          >
            <Icon
              type="SimpleLineIcons"
              name="picture"
              style={styles.leftIcons}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCameraPress}
            style={styles.iconButton}
          >
            <Icon
              type="SimpleLineIcons"
              name="camera"
              style={styles.leftIcons}
            />
          </TouchableOpacity>
        </View>
        {showSendButton && (
          <TouchableOpacity onPress={handleSendMessage}>
            <Icon
              type="SimpleLineIcons"
              name="paper-plane"
              style={{ color: colors.brand }}
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
    backgroundColor: colors.secondaryBackground,
    borderRadius: 15,
    color: colors.contrastText,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  leftIconContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  iconButton: {
    backgroundColor: colors.brandDark,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 10,
  },
  leftIcons: {
    color: colors.contrastText,
    fontSize: 25,
  },
});

export default RoomScreen;
