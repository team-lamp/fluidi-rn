import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { io } from "socket.io-client";
import LoginScreen from "./screens/LoginScreen";

import useStore from "./store";

const AppLoading = ({ children }: any) => {
  // not sure what this is loading exactly
  const [isLoaded, setIsLoaded] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setSocket = useStore((state) => state.setSocket);
  useEffect(() => {
    // connect to the socket server
    const socket = io("https://young-emu-38.loca.lt");
    socket.on("token", (token: string) => {
      console.log(token);
    });
    setSocket(socket);
  }, []);

  // load fonts and stuff here first, then set loading to true
  if (!isLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen setIsAuthenticated={setIsAuthenticated} />;
  }

  if (isLoaded && isAuthenticated) return children;
};

export default AppLoading;
