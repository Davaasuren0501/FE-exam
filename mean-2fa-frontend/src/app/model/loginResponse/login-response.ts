import { User } from "../user/user";

export class LoginResponse {
    success?: boolean;
    token?: string;
    user?: User; 
}
