import React, { useState, useRef, useEffect } from "react";
import MessageList from "../components/MessageList";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Icon, View } from "native-base";
import { colors } from "../constants/styleGuide";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeStackParamList, Message, MessageToSend } from "../types";
import useStore from "../store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DATA: Message[] = [
  {
    id: 1243,
    userId: 12,
    username: "Katie",
    created_at: new Date().toDateString(),
    content: "Y'know, bein awesome n shit.",
    user_photo:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/161102903_10158001431472322_1672271331533195877_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DM8jSvIN4aIAX_b5mn1&_nc_ht=scontent-ort2-2.xx&oh=ec0e0a593c40c19531bf177e32f59b27&oe=60D76938",
  },
  {
    id: 874,
    userId: 1,
    username: "You",
    created_at: new Date().toDateString(),
    content: "Chillin chillin. You?",
    user_photo:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/119815423_3332879713474763_8048010738081328737_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zj4PekDIPHEAX_zCmxf&_nc_ht=scontent-ort2-2.xx&oh=295e3be89c1131937c94122678249a3f&oe=60D5797F",
  },
  {
    id: 9723,
    userId: 12,
    username: "Katie",
    created_at: new Date().toDateString(),
    content: "Wassup",
    user_photo:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/161102903_10158001431472322_1672271331533195877_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DM8jSvIN4aIAX_b5mn1&_nc_ht=scontent-ort2-2.xx&oh=ec0e0a593c40c19531bf177e32f59b27&oe=60D76938",
  },
  {
    id: 9275,
    userId: 12,
    username: "Katie",
    created_at: new Date().toDateString(),
    content: "Hey, baby!",
    user_photo:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/161102903_10158001431472322_1672271331533195877_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=DM8jSvIN4aIAX_b5mn1&_nc_ht=scontent-ort2-2.xx&oh=ec0e0a593c40c19531bf177e32f59b27&oe=60D76938",
  },
];

const messageTemplate = {
  id: Date.now() + Math.random(), // in case two messages are sent at the same time
  username: "You",
  userId: 1,
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
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [usersTyping, setUsersTyping] = useState<number[]>([]);
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
    console.log(`newMessage - ${newMessage}`);
    if (Boolean(newMessage.length) && isTyping === false) {
      setIsTyping(true);
    } else if (!Boolean(newMessage.length) && isTyping === true) {
      setIsTyping(false);
    }
  }, [newMessage]);

  useEffect(() => {
    if (isTyping) {
      socket?.emit("typing", {
        userId: user.id,
        roomId: route.params?.chatRoomId,
      });
    } else {
      socket?.emit("stop-typing", {
        userId: user.id,
        roomId: route.params?.chatRoomId,
      });
    }
  }, [isTyping]);

  useEffect(() => {
    console.log("initial use effect");
    socket?.emit("users-in-room", {
      userId: user.id,
      roomId: route.params?.chatRoomId,
    });
    socket?.off("users-in-room").on("users-in-room", (data: any) => {
      if (data !== usersInRoom) {
        console.log("online users data");
        console.log(data);
        setUsersInRoom(data);
      }
    });
    socket?.off("typing").on("typing", (data: number[]) => {
      console.log(data);
      setUsersTyping(data);
    });
    return () => {
      console.log("use effect cleanup");
      socket?.off("user-joined-room");
      socket?.emit("leave-room");
    };
  }, []);

  return (
    <View style={[styles.container]}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1550757750-4ce187a65014?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3634&q=80",
        }}
        style={{
          height: Dimensions.get("window").height,
          resizeMode: "stretch",
          flex: 1,
        }}
      />
      <BlurView intensity={92} tint="dark" style={[StyleSheet.absoluteFill]}>
        <MessageList
          messages={messages}
          usersInRoom={usersInRoom}
          usersTyping={usersTyping}
          isTyping={isTyping}
        />
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
        <View
          style={[
            styles.iconContainer,
            { marginBottom: isFocused ? 5 : insets.bottom },
          ]}
        >
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
      </BlurView>
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
