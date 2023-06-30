export interface UserInfo {
  userId: number;
  loginInfo: LoginInfo;
  petInfo: PetInfo;
  walkInfo: WalkInfo;
  postInfo: PostInfo;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface PetInfo {
  petId: number;
  name: string;
  age: number;
  gender: string;
  breed: string;
}

export interface WalkInfo {
  walkId: number;
  area: string;
  time: string;
}

export interface PostInfo {
  postId: number;
  title: string;
  content: string;
  // petInfo: PetInfo;
  // walkInfo: WalkInfo;
}
