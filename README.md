# Nextjs client jwt boilerplate

This is a boilerplate for creating a nextjs frontend client. It uses jwt token to authenticate users. The refresh token is assumed to be stored in the clients' browser. 

> If you are not sure about how to set the jwt token in the browser, checkout my nestjs backend respository that is related to this frontend repository [nestjs-serverless-jwt-boilerplate](https://github.com/hunkim98/nestjs-serverless-jwt-boilerplate)

This repository uses next js for its frontend framework. Currently, this repository only has functionalities of logging in, verifying email, changing information of one's account. 

### Reminders

> This is the frontend framework for my `fullstack` boilerplate.
> If you are interested in getting to know the client framework and admin framework, check out the below repositories also!

#### For Server: [nestjs-serverless-jwt-boilerplate](https://github.com/hunkim98/nestjs-serverless-jwt-boilerplate)

#### For Admin: [nextjs-admin-jwt-boilerplate](https://github.com/hunkim98/nextjs-admin-jwt-boilerplate)


## Installation

`yarn` or `npm install`

## Explanation

This repository assumes that the user model is structured as below

```ts
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
```

If you will to create your server on your own, beware that this frontend server assumes that your user model has the described properties. If you wish to have other properties feel free to modify the properties. But do not forget that you need to also modify your backend model as well.

### Start project
```
$ yarn dev
```

Then access `localhost:3000` in your browser


### Reminders

- This client repository has functionalities for verifying email by tokens and verifying 'find my password' by tokens. For those verification `server-side-rendering` is utilized. Thus this client assumes that you send an email when the user 1) signs up, and 2) attempts to change password without logging in. This means that your backend server must send emails on those occasions, or else the pages prepared for those functionalities will not work.

- If there is a secure content that you want to only expose to users who have logged in, use the AuthWrapper.tsx and wrap your react component with it. Then whenever a user not logged in attempts to access it, they will be shown a login modal. To see an example take a look at the `pages/account/index.tsx` file.

HAPPY CODING!

