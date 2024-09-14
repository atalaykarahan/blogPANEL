import {NextResponse} from "next/server";
import {apiAuthPrefix, authRoutes, publicRoutes} from "@/config/routes";
import {auth} from "@/lib/auth";

export default auth((req): any => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    if (isApiAuthRoute) return null;
    if (isAuthRoute) {
        return null;
    }
    if (!isLoggedIn && !isPublicRoute) {
        // return NextResponse.next();
        return NextResponse.redirect(new URL("/en/auth/login", nextUrl));
    }
    return null;
});
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

