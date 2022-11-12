export interface UserType {
  _id: number;
  isAdmin: boolean;
  email: string;
  password: string;
  _doc: {
    email: string;
    password: string;
  };
}
