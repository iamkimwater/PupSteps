import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import rootReducer from '../redux/reducers';

export type RootState = ReturnType<typeof rootReducer>;

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  AddMyPet: undefined;
  AddPosting: undefined;
  ViewPosting: undefined;
  FindWalkmateBoard: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export type AddMyPetProps = NativeStackScreenProps<
  RootStackParamList,
  'AddMyPet'
>;

export type AddPostingProps = NativeStackScreenProps<
  RootStackParamList,
  'AddPosting'
>;

export type ViewPostingProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewPosting'
>;

export type FindWalkmateBoardProps = NativeStackScreenProps<
  RootStackParamList,
  'FindWalkmateBoard'
>;

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
