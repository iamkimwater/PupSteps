import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import rootReducer from '../redux/reducers';
import {IPetInfo} from './infoTypes';
import {BREED, GENDER} from './enums';

export type RootState = ReturnType<typeof rootReducer>;

export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Login: undefined;
  InfoAreaComponent: undefined;
  PetInfoComponent: {petInfo: IPetInfo};
  AddPet1: undefined;
  AddPet2: {
    petName: string;
    petAge: number;
    petGender: GENDER;
    petBreed: BREED;
  };
  Board: undefined;
  AddPost: undefined;
  Post: {postId: number};
  Settings: undefined;
  Chatting: {otherId: number; otherName: string};
  Chattings: undefined;
};

export type PetInfoComponentProps = NativeStackScreenProps<
  RootStackParamList,
  'PetInfoComponent'
>;
export type AddPet2Props = NativeStackScreenProps<
  RootStackParamList,
  'AddPet2'
>;
export type PostProps = NativeStackScreenProps<RootStackParamList, 'Post'>;
export type ChattingProps = NativeStackScreenProps<
  RootStackParamList,
  'Chatting'
>;
export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
