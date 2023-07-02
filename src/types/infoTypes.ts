import {BREED, GENDER, USER_TYPE} from './enums';

export interface IPetInfo {
  id: number;
  petName: string;
  petAge: number;
  petGender: GENDER;
  petBreed: BREED;
  petImageUrl: string;
}

export interface IWalkInfo {
  id: number;
  walkArea: string;
  walkTime: string;
}

export interface IUserInfo {
  id: number;
  userName: string;
  email: string;
  petInfo: IPetInfo;
}

export interface IMeInfo extends IUserInfo {
  userType: USER_TYPE.ME;
  walkInfo: IWalkInfo;
}

export interface IOtherInfo extends IUserInfo {
  userType: USER_TYPE.OTHER;
}

export interface IPostInfo {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  postWriter: IOtherInfo;
}

export interface IError {
  type: string;
  code: number;
  message: string;
}
