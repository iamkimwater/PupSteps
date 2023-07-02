import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import rootReducer from '../redux/reducers';
import {IUserInfo, IPetInfo, IWalkInfo, IPostInfo} from './infoTypes';

export type RootState = ReturnType<typeof rootReducer>;

export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Login: undefined;
  InfoAreaComponent: undefined; // 펫 정보, 게시판, 알람이 들어갈 구역
  PetInfoComponent: {petInfo: IPetInfo};
  // AlarmsComponent: undefined;
  FindWalkmateBoardComponent: undefined;
  AddPostingComponent: undefined;
  ViewPostingComponent: {postInfo: IPostInfo};
  Settings: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type InfoAreaComponentProps = NativeStackScreenProps<
  RootStackParamList,
  'InfoAreaComponent'
>;
export type PetInfoComponentProps = NativeStackScreenProps<
  RootStackParamList,
  'PetInfoComponent'
>;
// export type AlarmsProps = NativeStackScreenProps<RootStackParamList, 'AlarmsComponent'>;
export type FindWalkmateBoardComponentProps = NativeStackScreenProps<
  RootStackParamList,
  'FindWalkmateBoardComponent'
>;
export type AddPostingComponentProps = NativeStackScreenProps<
  RootStackParamList,
  'AddPostingComponent'
>;
export type ViewPostingComponentProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewPostingComponent'
>;
export type SettingsProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
