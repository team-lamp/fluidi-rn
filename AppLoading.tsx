import * as React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import LoginScreen from "./screens/LoginScreen";
import { Room, User } from "./types";
import useStore from "./store";

import { API_URL } from "./constants/secrets";

const AppLoading = ({ children }: any) => {
  const setSocket = useStore((state) => state.setSocket);
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const setRooms = useStore((state) => state.setRooms);
  const token = useStore((state) => state.token);
  // const token = "asdf";
  const user = useStore((state) => state.user);

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
    socket.on("rooms list", (rooms: Room[]) => {
      console.log("fetched rooms", rooms);
      setRooms(rooms);
    });
  }, []);

  if (!loggedIn) {
    return <LoginScreen />;
  }

  if (loggedIn) return children;
};

export default AppLoading;
