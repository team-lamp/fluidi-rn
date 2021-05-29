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

  useEffect(() => {
    // connect to the socket server
    const socket = io(serverUrl);
    socket.on("connected", () => {
      console.log("connected to servers");
    });
    socket.on("user", (user: User) => {
      setUser(user);
    });
    socket.on("token", (token: string) => {
      setToken(token);
    });
    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });
    setSocket(socket);
  }, []);

  if (!token) {
    return <LoginScreen />;
  }

  if (token) return children;
};

export default AppLoading;
