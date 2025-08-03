"use server"

import axios from 'axios';
import { cookies } from 'next/headers'
import { emailSchema } from '../schemas';
import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL

export async function getPhoneBookAction() {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const { data } = await axios.get(`${BASE_URL}/api/v1/esselte/phonebook`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;
    } catch (error) {
        console.error('Telefonkönyv lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni a telefonkönyvet. Kérjük, próbáld meg később újra.'
        };
    }

}

export async function getMappingTableAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const { data } = await axios.get(`${BASE_URL}/api/v1/esselte/teszor-mapping`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;
    } catch (error) {
        console.error('Mapping tábla lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni a mapping táblát. Kérjük, próbáld meg később újra.'
        };
    }
}

export async function sendEmailAction(prevState, formData) {

    const rawFormData = Object.fromEntries(formData)
    const result = emailSchema.safeParse(rawFormData);

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors, data: rawFormData };
    }

    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        await axios.post(`${BASE_URL}/api/v1/esselte/send/vodafone`, formData, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });

        return {
            success: true,
            message: 'A számla sikeres elküldve!',
            errors: {},
            data: {}
        };
    } catch (error) {
        console.error('Email küldésnél hiba:', error);
        return {
            success: false,
            message: 'Hiba az email küldésnél',
            errors: {},
            data: rawFormData
        };
    }
}