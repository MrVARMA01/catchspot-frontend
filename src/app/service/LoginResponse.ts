import { User } from "./User";

export class LoginResponse{
    user!:User;
    jwtToken!:string;
}