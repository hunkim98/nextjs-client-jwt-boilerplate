export interface RegisterBodyDto {
  email: string;
  nickname: string;

  name: string;

  isTermsAgreed: boolean;

  isSnsAgreed: boolean;

  password: string;

  socialLoginType?: SocialLoginType;

  socialLoginId?: string;
}

enum SocialLoginType {
  GOOGLE = "GOOGLE",
}
