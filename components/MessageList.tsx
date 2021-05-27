import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { colors } from "../constants/styleGuide";
import { Message as MessageType } from "../types";
import Message from "./Message";

const DATA: MessageType[] = [
  {
    id: 38,
    username: "Katie",
    created_at: new Date().toDateString(),
    content: "Hey check this out, blah blah blah.",
    user_photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: 89,
    username: "You",
    created_at: new Date().toDateString(),
    content: "Oh wow, so cool!",
    user_photo:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  },
  {
    id: 105,
    username: "Katie",
    created_at: new Date().toDateString(),
    content: "Thanks, lol.",
    user_photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: 138,
    username: "Katie",
    created_at: new Date().toDateString(),
    content: "I thought it was awesome.",
    user_photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  },
];

const MessageList = () => {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Message message={item} showAvatar={true} />}
      keyExtractor={(item) => String(item.id)}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default MessageList;
