import createStore from "zustand";

import { Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configurePersist } from "zustand-persist";

interface AppState {
  socket: null | Socket;
  setSocket: (socket: Socket) => void;
  token: null | string;
  setToken: (token: string) => void;
}

const { persist, purge } = configurePersist({
  storage: AsyncStorage,
  rootKey: "root", // optional, default value is `root`
});

const useStore = createStore(
  persist(
    {
      key: "auth", // required, child key of storage
      allowlist: ["token"], // optional, will save everything if allowlist is undefined
      denylist: [], // optional, if allowlist set, denylist will be ignored
    },
    (set) => ({
      token: null,
      socket: null,
      setSocket: (socket: Socket) => set(() => ({ socket })),
      setToken: (token: string) => set(() => ({ token })),
    })
  )
);

export default useStore;
