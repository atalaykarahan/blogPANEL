"use server";

import {signIn} from "@/lib/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/config/routes";
import {AuthError} from "next-auth";

/** Bu metodun amaci eger signIn kodunu client side tarafindan cagirirsak
 * user middleware'a takiliyor yani giris yapmis olsa bile giris yapmamis gibi gozukuyor.
 * ancak bu metod sayesinde once giris yapip session olusup daha sonra middleware kontrol edildiginden
 * sorunsuzca chat sayfasina yonlendirilebiliyor.
 */
export const loginAction = async (
    email: string,
    password: string
) => {

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Geçersiz hesap bilgileri!"};
                default:
                    return {error: "Bir şeyler ters gitti!"};
            }
        }
        throw error;
    }
};
