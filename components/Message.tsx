import React, { useState, useEffect } from "react";
import Text from "./themed/Text";
import {
  StyleSheet,
  Image,
  StyleSheetProperties,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import { View, Thumbnail } from "native-base";
import { Message as MessageType, UsersInRoom } from "../types";
import { colors } from "../constants/styleGuide";
import TypingIndicator from "./TypingIndicator";

interface MessageProps {
  message: MessageType;
  isOwnMessage: boolean;
  showDetails: boolean;
  usersInRoom: UsersInRoom;
  usersTyping: number[];
}

interface AvatarProps {
  typingPhoto: boolean;
}

const Message = ({
  message,
  showDetails,
  isOwnMessage,
  usersInRoom,
  usersTyping,
}: MessageProps) => {
  //@ts-ignore
  const [isUserInRoom, setIsUserInRoom] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const borderColor = isOwnMessage ? colors.brand : colors.secondaryBackground;
  const onlineOfflineColor = isUserInRoom
    ? colors.actions.play
    : colors.secondaryText;
  const onlineOfflinePosition = isOwnMessage ? { right: 0 } : { left: 0 };
  const avatarPosition = isOwnMessage ? { right: 6 } : { left: 6 };

  useEffect(() => {
    const usersCopy = [...usersInRoom];
    const userId = message.userId;
    setIsUserInRoom(Boolean(usersInRoom.length) && usersCopy.includes(userId));
  }, [usersInRoom]);

  useEffect(() => {
    const typingUsersCopy = [...usersTyping];
    const userId = message.userId;
    if (
      !isOwnMessage &&
      Boolean(typingUsersCopy) &&
      typingUsersCopy.includes(userId)
    ) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [usersTyping]);

  const Avatar = ({ typingPhoto }: AvatarProps) => {
    const verticalPosition = typingPhoto ? { bottom: 45 } : { top: 0 };
    if (!message.user_photo) {
      return (
        <View
          style={[
            styles.avatarContainer,
            avatarPosition,
            verticalPosition,
            {
              borderColor,
              backgroundColor: colors.dim,
            },
          ]}
        >
          <Text variant="caption">{message.username[0]}</Text>
        </View>
      );
    }
    return (
      <Image
        source={{ uri: message.user_photo }}
        style={[
          styles.avatarContainer,
          avatarPosition,
          verticalPosition,
          {
            resizeMode: "cover",
            borderColor,
          },
        ]}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        { alignItems: isOwnMessage ? "flex-end" : "flex-start" },
      ]}
    >
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor: isOwnMessage
              ? colors.brand
              : colors.secondaryBackground,
            paddingLeft: isOwnMessage ? 10 : 20,
            paddingRight: isOwnMessage ? 20 : 10,
            marginLeft: isOwnMessage ? 0 : 10,
            marginRight: isOwnMessage ? 10 : 0,
          },
        ]}
      >
        <Text variant="body">{message.content}</Text>
      </View>
      <Avatar typingPhoto={false} />
      <View
        style={[
          {
            position: "absolute",
            top: 20,
            height: 12,
            width: 12,
            borderRadius: 12 / 2,
            backgroundColor: onlineOfflineColor,
            borderWidth: 1.5,
            borderColor,
            zIndex: 100,
          },
          onlineOfflinePosition,
        ]}
      />
      {isTyping && (
        <>
          <Avatar typingPhoto={true} />
          <View
            style={[
              {
                position: "absolute",
                bottom: 45,
                height: 12,
                width: 12,
                borderRadius: 12 / 2,
                backgroundColor: onlineOfflineColor,
                borderWidth: 1.5,
                borderColor,
                zIndex: 100,
              },
              onlineOfflinePosition,
            ]}
          />
          <TypingIndicator isTyping={isTyping} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 20,
  },
  contentContainer: {
    maxWidth: "75%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 15,
  },
  avatarContainer: {
    height: 34,
    width: 34,
    borderWidth: 2,
    borderRadius: 34 / 2,
    overflow: "hidden",
    position: "absolute",
    zIndex: 50,
  },
});

export default Message;
