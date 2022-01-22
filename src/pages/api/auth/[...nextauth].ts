import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GitHubProvider from 'next-auth/providers/github'
// ___________________________________________________________________________
//
if (typeof process.env.GITHUB_OAUTH_CLIENT_ID !== 'string') {
  throw new Error('Undefined GITHUB_OAUTH_CLIENT_ID')
}
if (typeof process.env.GITHUB_OAUTH_CLIENT_SECRET !== 'string') {
  throw new Error('Undefined GITHUB_OAUTH_CLIENT_SECRET')
}
// ___________________________________________________________________________
//
export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   async jwt(token, user, account) {
  //     if (account?.accessToken) {
  //       token.accessToken = account.access_token
  //     }
  //     return token
  //   },
  //   async session(session, userOrToken) {
  //     return Promise.resolve({
  //       ...session,
  //       accessToken: (userOrToken as JWT).accessToken as string,
  //     })
  //   },
  // },
})
