export interface IUserData {
  avatarUrl: string;
  createdAt: string;
  email: string;
  fullName: string;
  token: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
export interface IRegisterData {
  email: string;
  password: string;
  fullName: string;
}
