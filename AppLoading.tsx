import * as React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import LoginScreen from "./screens/LoginScreen";
import { User } from "./types";
import useStore from "./store";

import { API_URL } from "./constants/secrets";

const AppLoading = ({ children }: any) => {
  const setSocket = useStore((state) => state.setSocket);
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const setRooms = useStore((state) => state.setRooms);
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // connect to the socket server
    const socket = io(API_URL, {
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      console.log("connected to the server");
      setSocket(socket);
      setLoggedIn(true);
    });

    socket.on("invalid token", () => {
      //
      console.log("token was invalid");
    });
    // socket.on("connect", () => {
    //   console.log("connected to server");
    //   setSocket(socket);
    //   if (user) {
    //     socket.emit("userId", user.id);
    //   }
    // });
    // socket.on("user", (user: User) => {
    //   console.log("user data recieved", user);
    //   setUser(user);
    // });
    // socket.on("token", (_token: string) => {
    //   console.log("token received", _token);
    //   setToken(_token);
    // });
    // socket.on("rooms", (rooms) => {
    //   setRooms(rooms);
    // });
    // socket.on("userAddedToRoom", (roomName: string) => {
    //   socket.emit("joinRoom", { roomName, token });
    // });
  }, []);

  if (!loggedIn) {
    return <LoginScreen />;
  }

  if (loggedIn) return children;
};

export default AppLoading;
