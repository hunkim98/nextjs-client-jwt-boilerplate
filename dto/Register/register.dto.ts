export interface RegisterBodyDto {
  name: string;
  nickname: string;

  email: string;

  isTermsAgreed: boolean;

  isSnsAgreed: boolean;

  password: string;

  telephone: string;

  socialLoginType?: SocialLoginType;

  socialLoginId?: string;
}

enum SocialLoginType {
  GOOGLE = "GOOGLE",
}
