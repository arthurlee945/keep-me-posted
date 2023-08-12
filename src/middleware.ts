import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        const pathName = req.nextUrl.pathname;
        const token = req.nextauth.token;
        if (pathName === "/auth/signin" && token) return NextResponse.redirect(new URL("/", process.env.APP_URL));

        if (pathName === "/auth/reset-password") {
            const resetToken = req.nextUrl.searchParams.get("token");
            if (token || !resetToken) return NextResponse.redirect(new URL("/", process.env.APP_URL));
        }
        if (pathName === "/auth/signout") {
            if (!token) return NextResponse.redirect(new URL("/", process.env.APP_URL));
        }
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const pathName = req.nextUrl.pathname;
                console.log(req.nextUrl.searchParams.get("token"));
                if (pathName.match(/^\/($|api\/.*|auth\/(verify-email|signin|signout|register|forgot-password|reset-password))$/))
                    return true;
                return !!token;
            },
        },
    }
);
