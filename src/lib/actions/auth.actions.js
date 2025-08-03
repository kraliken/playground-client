'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import axios from 'axios';
import * as z from "zod/v4";
import { signInFormSchema } from '../schemas';

const BASE_URL = process.env.BASE_URL

export async function signInAction(prevState, formData) {

    const raw = Object.fromEntries(formData);
    const result = signInFormSchema.safeParse(raw);

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, message: '', errors: fieldErrors, data: raw };
    }

    try {
        const response = await axios.post(`${BASE_URL}/api/v1/auth/signin`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const { access_token, token_type, user } = response.data;

        const cookieStore = await cookies();

        cookieStore.set('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        cookieStore.set('user', JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',  // 'strict' helyett 'lax'
        });

    } catch (error) {
        let message = 'Ismeretlen hiba történt';
        const errorResponse = axios.isAxiosError(error) ? error.response : null;

        if (errorResponse) {
            switch (errorResponse.status) {
                case 401:
                    message = 'Hibás felhasználónév vagy jelszó.';
                    break;
                case 503:
                    message = 'A szerver éppen elindul. Kérjük, próbálja meg néhány másodperc múlva újra.';
                    break;
                default:
                    message =
                        errorResponse.data?.detail || 'Váratlan szerverhiba történt.';
            }
        } else if (axios.isAxiosError(error)) {
            message =
                'Nem sikerült csatlakozni a szerverhez. Kérjük, ellenőrizze az internetkapcsolatát, vagy próbálja meg később újra.';
        }

        return {
            success: false,
            message,
            errors: {},
            data: raw
        };
    }

    redirect('/');

}

export async function signout() {

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const user = cookieStore.get("user");

    if (token) {
        cookieStore.set("access_token", "", { maxAge: -1, path: "/" });
        if (user) {
            cookieStore.set("user", "", { maxAge: -1, path: "/" });
        }
    }

    redirect("/signin");
}