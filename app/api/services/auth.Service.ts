import axios from "../axios";
import {parse} from 'cookie';
import {cookies} from "next/dist/client/components/headers";
import {splitCookiesString} from "next/dist/server/web/utils";
import {getMyCookie} from "@/lib/get-my-cookie";

class AuthService {
    async getLoggedInUserServer() {
        const query = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            headers: {
                Cookie: `${getMyCookie()}`,
            },
        });
        return query;
    };

// login
    async login(email: string, password: string) {
        const props = {
            email: email,
            password: password
        }
        return await axios.post("/users/login", props, {withCredentials: true});
    };


}

export const authService = new AuthService();