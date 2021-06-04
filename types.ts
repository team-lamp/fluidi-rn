/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Login: undefined;
  Register: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Help: undefined;
};

export type HomeStackParamList = {
  AppLoading: undefined;
  HomeScreen: undefined;
  RoomScreen: {
    name: string;
    chatRoomId: string;
    talkRoomId: string;
    avatar: string;
    isGroup: boolean;
  };
  TalkScreen: undefined;
  ContactDetails: undefined;
};

export type Message = {
  id: number;
  senderUserId: number;
  username: string;
  createdAt: string;
  text: string;
  senderPhotoUrl: string;
};

export type MessageToSend = {
  chatRoomId: string;
  text: string;
};

export type Room = {
  id: number;
  name: string;
  photoUrl: string;
  chatRoomId: string;
  talkRoomId: string;
};

export type User = {
  id?: number;
  username?: string;
  displayName?: string;
  photo?: string;
};

export type UsersInRoom = Number[] | [];
