import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import rootReducer from '../redux/reducers';
import {UserInfo, PetInfo, WalkInfo, PostInfo} from './infoTypes';

export type RootState = ReturnType<typeof rootReducer>;

export type RootStackParamList = {
  Home: undefined;
  Signup: {userInfo: UserInfo; petInfo: PetInfo; walkInfo: WalkInfo};
  Login: undefined;
  InfoArea: undefined; // 펫 정보, 게시판, 알람이 들어갈 구역
  PetInfo: undefined;
  // Alarms: undefined;
  FindWalkmateBoard: undefined;
  // AddPosting: {
  //   userId: number;
  //   userInfo: UserInfo;
  //   petInfo: PetInfo;
  //   walkInfo: WalkInfo;
  // };
  AddPosting: undefined;
  ViewPosting: {postInfo: PostInfo};
  Settings: {
    userId: number;
    userInfo: UserInfo;
    petInfo: PetInfo;
    walkInfo: WalkInfo;
  };
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type InfoAreaProps = NativeStackScreenProps<
  RootStackParamList,
  'InfoArea'
>;
export type PetInfoProps = NativeStackScreenProps<
  RootStackParamList,
  'PetInfo'
>;
// export type AlarmsProps = NativeStackScreenProps<RootStackParamList, 'Alarms'>;
export type FindWalkmateBoardProps = NativeStackScreenProps<
  RootStackParamList,
  'FindWalkmateBoard'
>;
export type AddPostingProps = NativeStackScreenProps<
  RootStackParamList,
  'AddPosting'
>;
export type ViewPostingProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewPosting'
>;
export type SettingsProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
