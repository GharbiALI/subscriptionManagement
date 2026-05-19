import { IUser } from '../schemas/user.schemas';

export interface UserResponse {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export const mapUserResponse = (user: IUser ): UserResponse => {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
};