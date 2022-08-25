import { Role } from "../entities/user";

export interface VerifiedUserResDto {
  accessToken: string;
  isEmailVerified: boolean;
  role: Role;
  email: string;
  name: string;
  telephone: string;
}
