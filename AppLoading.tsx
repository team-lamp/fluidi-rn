import * as React from "react";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import LoginScreen from "./screens/LoginScreen";
import { Message, Room, User } from "./types";
import useStore from "./store";

import { API_URL } from "./constants/secrets";

const AppLoading = ({ children }: any) => {
  const setSocket = useStore((state) => state.setSocket);
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const setRooms = useStore((state) => state.setRooms);
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const setMessages = useStore((state) => state.setMessages);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // connect to the socket server
    const socket = io(API_URL, {
      auth: {
        token: token,
      },
    });

    socket.on("connect", () => {
      console.log("connected to the server");
      setSocket(socket);
      socket.emit("fetch rooms");
      setLoggedIn(true);
    });

    socket.on("invalid token", () => {
      console.log("token was invalid");
    });

    // when the server sends us a list of rooms the client user is in
    socket.on("rooms list", (rooms: Record<any, any>) => {
      setRooms(rooms);

      // for every room we are a member of, join that room on the server
      Object.values(rooms).forEach((chatRoomId: string) => {
        socket.emit("join room", chatRoomId);
      });
    });

    socket.on("online-users", (data: any) => {
      console.log("user online data");
      console.log(data);
    });

    socket.on("new chat message", (chatMessage) => {
      console.log("new message received", chatMessage);
      socket.emit("fetch messages", chatMessage.chatRoomId);
    });

    socket.on("chat message list", (messages: Message[]) => {
      console.log("messages incoming", messages);
      setMessages(messages);
    });
  }, [token]);

  if (!loggedIn) {
    return <LoginScreen />;
  }

  if (loggedIn) return children;
};

export default AppLoading;
