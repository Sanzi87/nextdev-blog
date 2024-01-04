// import { DefaultSession, DefaultUser } from "next-auth"
// import { JWT, DefaultJWT } from "next-auth/jwt"

// declare module "next-auth" {

//   interface Session {
//     user: {
      
//       id: string | null
//       // name?: string | null
//       // email?: string | null
//       // image?: string | null
//       role: string | null
//     } & DefaultSession
//   }

//   interface User extends DefaultUser {
//     role: string,
//   }
// }

// declare module "next-auth/jwt" {
//     interface JWT extends DefaultJWT {
//         role: string,
//     }
// }