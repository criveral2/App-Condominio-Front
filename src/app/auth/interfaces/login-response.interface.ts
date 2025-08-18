import { User } from "./user.interface";
 
export interface LoginResponse {
    responseCode: string;
    data:         User;
    errorMessage: null;
}