import * as React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import LoginScreen from "./screens/LoginScreen";
import { User } from "./types";
import useStore from "./store";

const serverUrl = "https://soft-penguin-41.loca.lt";

const AppLoading = ({ children }: any) => {
  const setSocket = useStore((state) => state.setSocket);
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const setRooms = useStore((state) => state.setRooms);
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);

  useEffect(() => {
    // connect to the socket server
    const socket = io(serverUrl);
    socket.on("connect", () => {
      console.log("connected to server");
      setSocket(socket);

      if (user) {
        socket.emit("userId", user.id);
      }
    });

    socket.on("user", (user: User) => {
      setUser(user);
    });

    socket.on("token", (token: string) => {
      console.log("token received", token);
      setToken(token);
    });

    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });
  }, []);

  if (!token) {
    return <LoginScreen />;
  }

  if (token) return children;
};

export default AppLoading;
