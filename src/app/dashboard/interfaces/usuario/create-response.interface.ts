import { User } from "../../../auth/interfaces";

export interface ApiResponseUser {
  responseCode: string;
  data: User | null;
  errorMessage: string | null;
}