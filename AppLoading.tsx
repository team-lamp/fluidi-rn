import * as React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import LoginScreen from "./screens/LoginScreen";
import { User } from "./types";
import useStore from "./store";

const serverUrl = "https://jolly-dog-94.loca.lt";

const AppLoading = ({ children }: any) => {
  const setSocket = useStore((state) => state.setSocket);
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const setRooms = useStore((state) => state.setRooms);
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);

  useEffect(() => {
    // connect to the socket server
    const socket = io(serverUrl);
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

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!token) {
    return <LoginScreen />;
  }

  if (token) return children;
};

export default AppLoading;
