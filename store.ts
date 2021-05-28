import { Socket } from "socket.io-client";
import create from "zustand";

type AppState = {
  socket: null | Socket;
  setSocket: (socket: Socket) => void;
  token: null | string;
  setToken: (token: string) => void;
};

const useStore = create<AppState>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set((state) => ({ socket: socket })),
  token: null,
  setToken: (token: string) => set((state) => ({ token: token })),
}));

export default useStore;
