export type WalkArea = {
  city: string;
  district: string;
};

export type User = {
  email: string;
  password: string;
  petName: string;
  breed: string;
  age: number;
  mainWalkArea: WalkArea;
};
