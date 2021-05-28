import * as React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import LoginScreen from "./screens/LoginScreen";

import useStore from "./store";

const AppLoading = ({ children }: any) => {
  const setSocket = useStore((state) => state.setSocket);
  const setToken = useStore((state) => state.setToken);

  const token = useStore((state) => state.token);
  useEffect(() => {
    // connect to the socket server
    const socket = io("https://young-emu-38.loca.lt");
    socket.on("token", (token: string) => {
      setToken(token);
    });
    setSocket(socket);
  }, []);

  if (!token) {
    return <LoginScreen />;
  }

  if (token) return children;
};

export default AppLoading;
