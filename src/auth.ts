import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
    Google
]
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    pages: {
      signIn: "/",
    },
  })