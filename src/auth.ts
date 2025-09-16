import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authService } from './lib/service';

export const { handlers, signIn, signOut, auth } = NextAuth({
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
        domain:
          process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_DOMAIN : 'localhost',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'E-mail', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials) => {
        const data = await authService.login({
          email: credentials?.email as string,
          password: credentials?.password as string,
        });
        if (data?.token) {
          return { id: '1', token: data.token };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.token = token.accessToken;
      }
      return session;
    },
  },
});
