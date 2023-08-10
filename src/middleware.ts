import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { signOutUser } from "./utils/auth/middlewareUtils";
// export { default } from "next-auth/middleware";

export default withAuth(
    async function middleware(req) {
        const pathName = req.nextUrl.pathname;
        const token = req.nextauth.token;

        if (pathName === "/auth/reset-password") {
            if (token) return NextResponse.redirect(new URL("/", process.env.APP_URL));
            //------ pre lim prisma validation
        }
        if (pathName === "/auth/signout") {
            if (!token) return NextResponse.redirect(new URL("/", process.env.APP_URL));
            // const res = await signOutUser();
            // return NextResponse.redirect(new URL("/", process.env.APP_URL));
        }
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const pathName = req.nextUrl.pathname;
                if (pathName.match(/^\/($|api\/.*|auth\/(verify-email|signin|signout|register|reset-password))$/)) return true;
                return !!token;
            },
        },
    }
);

// export const config = {
//     matcher: ["/((?!register|testRoute|api|auth|_next/static|_next/image|favicon.ico|$).*)"],
// };
