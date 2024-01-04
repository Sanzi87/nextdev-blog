// export { default } from 'next-auth/middleware';

//Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"

export default withAuth(
    // function middleware(request: NextRequestWithAuth) {
    //     // console.log(request.nextUrl.pathname)
    //     // console.log(request.nextauth.token)
    // },
    {
        callbacks: {
            authorized: ({token}) => token?.role === "NEXTADMIN"
            // authorized: async ({req, token}) => {
            //     if(req.nextUrl.pathname.startsWith("/categories/new")) return token?.role === "NEXTADMIN";
            //     if(req.nextUrl.pathname.startsWith("/categories/:slug+/edit")) return token?.role === "NEXTADMIN";
            //     if(req.nextUrl.pathname.startsWith("/posts/new")) return token?.role === "NEXTADMIN";
            //     if(req.nextUrl.pathname.startsWith("/posts/:slug+/edit")) return token?.role === "NEXTADMIN";

            //     return !!token;
            // }
        },
    }
)

export const config ={
    matcher: [
        '/categories/new',
        '/categories/:slug+/edit',
        '/posts/new',
        '/posts/:slug+/edit'
    ]
}