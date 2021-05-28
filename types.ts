/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Login: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  HelpScreen: undefined;
};

export type HomeStackParamList = {
  AppLoading: undefined;
  HomeScreen: undefined;
  RoomScreen: undefined;
};

export type Message = {
  id: number;
  username: string;
  created_at: string;
  content: string;
  user_photo: string;
};

export type Room = {
  id: number;
  room_name: string;
  room_photo: string | null;
  lastOnline: object;
};
