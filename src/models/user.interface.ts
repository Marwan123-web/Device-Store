export interface UserState {
  id: number;
  role: userRole;
  email: string;
  name: string;
  password: string;
  oldPassword: string;
  updatedAt: string;
  createdAt: string;
  token: string;
}

export enum userRole {
  ADMIN = "admin",
  USER = "user",
}
