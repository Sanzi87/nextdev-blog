
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider  from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            profile(profile){
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    role: profile.role? profile.role: "REGISTERED",
                    image: profile.picture,
                }
            },
            
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            profile(profile){
                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email,
                    role: profile.role ?? "REGISTERED",
                    image: profile.avatar_url,
                }
            },
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: {
        //             label: "Username:",
        //             type: "text",
        //             placeholder: "your-username"
        //         },
        //         password: {
        //             label: "Password:",
        //             type: "password",
        //             placeholder: "your-password"
        //         }
        //     },
        //     async authorize(credentials) {
        //         const user = {id: "42", name: "Alex", password: "nextauth", role: "NEXTADMIN"}

        //         if (credentials?.username === user.name && credentials?.password === user.password) {
        //             return user
        //         }else{
        //             return null
        //         }
        //     }
        // })
    ],
    callbacks: {
        async jwt({ token, user }) {
          return {...token, ...user};
        },
        async session({ session, token }) {
            session.user.role = token.role;
            return session
        },
      },
    session: {
        strategy: 'jwt'
    },
};

export default authOptions;

//basic version


// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// import { NextAuthOptions } from "next-auth";

// const prisma = new PrismaClient;

// const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//         })
//     ],
//     session: {
//         strategy: 'jwt'
//     },
// };

// export default authOptions;
