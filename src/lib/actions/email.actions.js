"use server"

import axios from 'axios';
import { cookies } from 'next/headers'
import { newEmailSchema } from '../schemas';
import * as z from "zod/v4";
import { revalidatePath } from 'next/cache'

const BASE_URL = process.env.BASE_URL

export async function getEmailsAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }
        const { data } = await axios.get(`${BASE_URL}/api/v1/aerozone/emails/all`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;
    } catch (error) {
        console.error('Emailek lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni az emaileket. Kérjük, próbáld meg később újra.'
        };
    }
}

export async function createEmailAction(prevState, formData) {
    const rawFormData = Object.fromEntries(formData);

    const result = newEmailSchema.safeParse(rawFormData);

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        console.log({ success: false, errors: fieldErrors, data: rawFormData });
        return { success: false, errors: fieldErrors, data: rawFormData };
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }
        const response = await axios.post(`${BASE_URL}/api/v1/aerozone/email/create`, rawFormData, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        })

        revalidatePath('/task/invoice-sender/emails')

        return {
            success: true,
            message: 'Az új e-mail létrehozva!',
            errors: {},
            data: {}
        };

    } catch (error) {
        console.error('E-mail létrehozási hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült létrehozni az e-mailt. Kérjük, próbáld meg később újra.'
        };
    }

}

export async function deleteEmailAction(emailId) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }
        const { data } = await axios.delete(`${BASE_URL}/api/v1/aerozone/email/${emailId}`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;
    } catch (error) {
        console.error('Email törlési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült törölni az emailt. Kérjük, próbáld meg később újra.'
        };
    }
}

export async function updateEmailAction(prevState, emailId, formData) {

    const rawFormData = Object.fromEntries(formData);
    const result = newEmailSchema.safeParse(rawFormData);

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
        const { data } = await axios.patch(`${BASE_URL}/api/v1/aerozone/email/${emailId}`, rawFormData,
            {
                headers: {
                    'Cookie': `access_token=${token}`
                },
                withCredentials: true,
            })

        revalidatePath('/task/invoice-sender/emails')

        return {
            success: true,
            message: 'Az email módosítva!',
            errors: {},
            data: {}
        };
    } catch (error) {
        console.error('Email módosítási hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült módosítani az emailt. Kérjük, próbáld meg később újra.'
        };
    }
}

export async function getAvailabRecipients(partnerId, type = "to") {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }
        const { data } = await axios.get(`${BASE_URL}/api/v1/aerozone/emails/available/${partnerId}?type=${type}`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;
    } catch (error) {
        console.error('Elérhető címzettek lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni az elérhető címzetteket. Kérjük, próbáld meg később újra.',
            data: []
        };
    }
}