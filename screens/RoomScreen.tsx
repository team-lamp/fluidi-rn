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
import { colors, shadow } from "../constants/styleGuide";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeStackParamList, Message, MessageToSend } from "../types";
import useStore from "../store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const messageTemplate = {
  id: Date.now() + Math.random(), // in case two messages are sent at the same time
  username: "You",
  senderUserId: 1,
  createdAt: new Date().toDateString(),
  text: "",
  senderPhotoUrl:
    "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/119815423_3332879713474763_8048010738081328737_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zj4PekDIPHEAX_zCmxf&_nc_ht=scontent-ort2-2.xx&oh=295e3be89c1131937c94122678249a3f&oe=60D5797F",
};

const RoomScreen = () => {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [usersTyping, setUsersTyping] = useState<number[]>([]);
  const socket = useStore((state) => state.socket);
  const user = useStore((state) => state.user);
  const showSendButton = Boolean(newMessage && newMessage.length);
  const route: RouteProp<HomeStackParamList, any> = useRoute();
  const [chatRoomId, setChatRoomId] = useState("");
  const messages = useStore((state) => state.messages).filter(
    (msg) => msg.chatRoomId === chatRoomId
  );

  const handleSendMessage = () => {
    const messageToSend: MessageToSend = {
      ...messageTemplate,
      text: newMessage,
      chatRoomId,
    };
    // setMessages([messageToSend, ...messages]);
    setNewMessage("");
    inputRef.current?.clear();

    const msg: MessageToSend = {
      chatRoomId,
      text: messageToSend.text,
    };
    socket?.emit("send chat message", msg);
  };

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
    setChatRoomId(route.params?.chatRoomId);
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
      socket?.emit("leave-room");
    };
  }, []);

  return (
    <View style={styles.container}>
      <MessageList
        messages={messages}
        usersInRoom={usersInRoom}
        usersTyping={usersTyping}
        isTyping={isTyping}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 30,
          marginBottom: isFocused ? 5 : insets.bottom + 20,
        }}
      >
        <TextInput
          ref={inputRef}
          multiline
          value={newMessage}
          placeholder="Type a message"
          placeholderTextColor={colors.contrastText}
          style={[
            styles.textInput,
            shadow,
            { fontWeight: Boolean(newMessage) ? "300" : "100" },
          ]}
          onChangeText={(text) => setNewMessage(text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
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
      <KeyboardSpacer />
      <LinearGradient
        colors={["transparent", colors.lowOpacity.green]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: Dimensions.get("window").height / 2,
          zIndex: -50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  textInput: {
    backgroundColor: colors.lowOpacity.grey,
    borderRadius: 15,
    color: colors.contrastText,
    paddingHorizontal: 12,
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
