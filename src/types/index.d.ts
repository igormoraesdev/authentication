import { DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare global {
  export interface CustomUser {
    id: string;
    name: string;
    email: string;
    memberSince?: string;
  }

  export interface JwtPayload {
    readonly id: string;
    readonly email: string;
    readonly name: string;
  }

  export interface JwtDecodeResult {
    readonly payload: JwtPayload;
  }

  namespace Auth {
    export interface Params {
      readonly email: string;
      readonly password: string;
    }
    export interface Response {
      readonly token: string;
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & CustomUser & AdapterUser & { token: string };
    accessToken: string;
  }

  interface User extends DefaultUser {
    id: string;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    accessToken: string;
  }
}

export {};
