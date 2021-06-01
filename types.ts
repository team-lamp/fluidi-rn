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
  RoomScreen: undefined;
  TalkScreen: undefined;
  ContactDetails: undefined;
};

export type Message = {
  id: number;
  username: string;
  created_at: string;
  content: string;
  user_photo: string;
};

export type MessageToSend = {
  text: string;
  sender: User;
  room: string;
  timestamp: Date;
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
