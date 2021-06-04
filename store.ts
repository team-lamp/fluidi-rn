import createStore, { PartialState } from "zustand";

import { Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configurePersist } from "zustand-persist";
import { Message, Room, User, UsersInRoom } from "./types";

interface AppState {
  user: User;
  setUser: (user: User) => void;
  socket: null | Socket;
  setSocket: (socket: Socket) => void;
  token: null | string;
  setToken: (token: string) => void;
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  messages: Message[];
  setMessages: (message: Message[]) => void;
}

const { persist, purge } = configurePersist({
  storage: AsyncStorage,
  rootKey: "root", // optional, default value is `root`
});

const useStore = createStore<AppState>(
  persist(
    {
      key: "auth", // required, child key of storage
      allowlist: ["token", "rooms", "user"], // optional, will save everything if allowlist is undefined
      denylist: [], // optional, if allowlist set, denylist will be ignored
    },
    (set) => ({
      user: {
        displayName: "no user",
        id: 0,
        photo: "none",
        username: "no_user",
      },
      token: null,
      socket: null,
      setUser: (userData: User) =>
        set((state) => ({ user: { ...state.user, id: userData.id } })),
      setSocket: (socket: Socket) => set(() => ({ socket })),
      setToken: (token: string) => {
        console.log("reseting token ", token);
        set(() => ({ token }));
      },
      rooms: [],
      setRooms: (rooms: Room[]) => set(() => ({ rooms })),
      messages: [],
      setMessages: (messages: Message[]) => set(() => ({ messages })),
    })
  )
);

export default useStore;
