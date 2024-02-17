import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export const handler = NextAuth({
  // кастомная страница 
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req) {
        try {
          // фейк апи который полуает данные и генерирует access token 
          const res = await fetch(`https://fake-api-oqpk.onrender.com/auth/register`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            return null;
          }
          // готовый токен
          const parsedResponse = await res.json();
          const jwt = parsedResponse.access_token;
          // получаем с credentials
          return {
            ...credentials,
            jwt,
          };
        } catch (error) {
          return null;
        }
      }
    })
  ],
  // 
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.jwt = token.jwt
      return session
    }
  }
})

export { handler as GET, handler as POST }