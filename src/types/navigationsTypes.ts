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
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type PostProps = NativeStackScreenProps<RootStackParamList, 'Post'>;
export type SettingsProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;
export type AddPet2Props = NativeStackScreenProps<
  RootStackParamList,
  'AddPet2'
>;
export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
