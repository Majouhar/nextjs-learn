import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import CognitoProvider from "next-auth/providers/cognito";
import { getAllData } from "../route";
import { verifyPassword } from "@/lib/auth";

const authOptions = {
  providers: [
    CognitoProvider({
      clientId:"",
      clientSecret:"",
      issuer:""
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        const data = getAllData().find(
          (val) => val.email === credentials.email
        );
        if (!data) {
          throw new Error("No User Found");
        }
        const isValid = await verifyPassword(
          credentials.password,
          data.password
        );
        if (!isValid) {
          throw Error("Wrong credentials");
        }
        return { email: data.email };
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
