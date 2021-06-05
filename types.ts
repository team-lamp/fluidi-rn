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
  userId: number;
  username: string;
  createdAt: string;
  text: string;
  senderPhotoUrl: string;
  chatRoomId: string;
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

export type RoomResponse = {
  id: number;
  name: string;
  photoUrl: string | null;
  public: boolean;
  uuid: string;
  chatRoomId: string;
  talkRoomId: string;
  users: User[];
};

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string | null;
  photoUrl: string | null;
};

export type UsersInRoom = Number[] | [];
