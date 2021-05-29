import createStore from "zustand";

import { Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configurePersist } from "zustand-persist";
import { Room, User } from "./types";

interface AppState {
  user: null | User;
  setUser: (user: User) => void;
  socket: null | Socket;
  setSocket: (socket: Socket) => void;
  token: null | string;
  setToken: (token: string) => void;
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
}

const { persist, purge } = configurePersist({
  storage: AsyncStorage,
  rootKey: "root", // optional, default value is `root`
});

const useStore = createStore<AppState>(
  persist(
    {
      key: "auth", // required, child key of storage
      allowlist: ["token", "rooms"], // optional, will save everything if allowlist is undefined
      denylist: [], // optional, if allowlist set, denylist will be ignored
    },
    (set) => ({
      user: null,
      token: null,
      socket: null,
      setUser: (user: User) => set(() => ({ user })),
      setSocket: (socket: Socket) => set(() => ({ socket })),
      setToken: (token: string) => set(() => ({ token })),
      rooms: [],
      setRooms: (rooms: Room[]) => set(() => ({ rooms })),
    })
  )
);

export default useStore;
