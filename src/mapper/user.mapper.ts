import { IUser } from "../schemas/user.schemas";

export interface UserResponse {
  name: string;
  email: string;
  role: "user" | "admin";
  token?: string;
}

export const mapUserResponse = (user: IUser, token?: string): UserResponse => {
  const response: UserResponse = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    
    if (token) {
      response.token = token;
    };

    return response;
};
