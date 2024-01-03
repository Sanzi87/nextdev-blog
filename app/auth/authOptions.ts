
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from 'next-auth/providers/google'
import GitHubProvider  from "next-auth/providers/github";
import { GithubProfile } from 'next-auth/providers/github'
// import CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient;

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            profile(profile: GoogleProfile){
                return {
                    ...profile,
                    role: profile.role ?? "REGISTERED",
                    id: profile.sub,
                    image: profile.picture,
                }
            },
            
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            profile(profile: GithubProfile){
                return {
                    ...profile,
                    role: profile.role ?? "REGISTERED",
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                }
            },
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!
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
        jwt({ token, user }) {
          if(user) token.role = user.role
          return token
        },
        session({ session, token }) {
          session.user.role = token.role
          return session
        }
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

//first try:

// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// import { NextAuthOptions } from "next-auth";
// import { DefaultUser } from 'next-auth';
// declare module 'next-auth' {
//     interface Session {
//         user?: DefaultUser & { role: string };
//     }
//     interface User extends DefaultUser {
//         role: string;
//     }
// }

// const prisma = new PrismaClient;

// const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         async profile(profile){
//             return{
//                 id: profile.id,
//                 name: profile.name,
//                 email: profile.email,
//                 image: profile.image,
//                 role: profile.role ?? 'user'
//             }
//         }
//         })
//     ],
//     callbacks: {
//         session({ session, user }) {
//             if (session?.user) {
//           session.user.role = user.role
//         }
//           return session
//         }
//       },
//     session: {
//         strategy: 'jwt'
//     },
// };

// export default authOptions;