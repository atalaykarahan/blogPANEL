import Credentials from "next-auth/providers/credentials";

// import {User as UserType, user} from "@/app/api/user/data";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {cookies} from "next/dist/client/components/headers";
import parse, {splitCookiesString} from "set-cookie-parser";

import avatar3 from "@/public/images/avatar/avatar-3.jpg";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const {email, password} = credentials as {
                    email: string,
                    password: string,
                };

                try {
                    // API'ye giriş isteği yap
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({email, password}),
                    });

                    // Yanıt durumunu kontrol et
                    if (!response.ok) {
                        return null;
                    }

                    // Çerezleri ayarla
                    const responseCookies: any = response.headers.get('set-cookie');
                    if (responseCookies) {
                        const splittedCookie = splitCookiesString(responseCookies);
                        const cookieObj = parse(splittedCookie);
                        cookies().set({
                            name: cookieObj[0].name,
                            value: cookieObj[0].value,
                            domain: cookieObj[0].domain,
                            expires: cookieObj[0].expires,
                            httpOnly: cookieObj[0].httpOnly,
                            path: cookieObj[0].path,
                        });
                    }
                    // Kullanıcı bilgilerini döndür
                    const user = await response.json();
                    return {id: user.user_id, name: user.user_name, email: user.user_email};

                } catch (error) {
                    return null;
                }
            }

        }),
    ],
    secret: process.env.AUTH_SECRET,

    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV !== "production",
};
