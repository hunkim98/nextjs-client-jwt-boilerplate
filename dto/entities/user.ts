export type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  email: string;
  nickname: string;
  name: string;
  password: string;
  isTermsAgreed: boolean;
  isSnsAgreed: boolean;
  currentHashedRefreshToken: string | null;
  socialLoginType: SocialLoginType | null;
  socialLoginId: string | null;
  telephone: string;
  verified: boolean;
  role: Role;
  verificationId: number;
};

export enum SocialLoginType {
  GOOGLE = "GOOGLE",
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
