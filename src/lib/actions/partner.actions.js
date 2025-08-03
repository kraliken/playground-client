"use server"

import axios from 'axios';
import { cookies } from 'next/headers'
import { newPartnerSchema } from '../schemas';
import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL

export async function getPartersAction() {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }
        const { data } = await axios.get(`${BASE_URL}/api/v1/aerozone/partners/all`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;
    } catch (error) {
        console.error('Partnerek lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni a partnereket. Kérjük, próbáld meg később újra.'
        };
    }
}

export async function createPartnerAction(prevState, formData) {
    const rawFormData = Object.fromEntries(formData);

    const result = newPartnerSchema.safeParse(rawFormData);

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
        const response = await axios.post(`${BASE_URL}/api/v1/aerozone/partner/create`, rawFormData, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        })

        return {
            success: true,
            message: 'Az új partner létrehozva!',
            errors: {},
            data: {}
        };
    } catch (error) {
        console.error('Partner létrehozási hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült létrehozni a partnert. Kérjük, próbáld meg később újra.'
        };
    }
}

export async function updatePartnerAction(prevState, partnerId, formData) {

    const rawFormData = Object.fromEntries(formData);
    const result = newPartnerSchema.safeParse(rawFormData);

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
        const { data } = await axios.patch(`${BASE_URL}/api/v1/aerozone/partner/${partnerId}`, rawFormData, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        })

        return {
            success: true,
            message: 'A partner módosítva!',
            errors: {},
            data: {}
        };
    } catch (error) {
        console.error('Partner módosítási hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült módosítani a partnert. Kérjük, próbáld meg később újra.'
        };
    }
}

export async function deletePartnerAction(partnerId) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }
        const { data } = await axios.delete(`${BASE_URL}/api/v1/aerozone/partner/${partnerId}`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;
    } catch (error) {
        console.error('Partner törlési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült törölni a partnert. Kérjük, próbáld meg később újra.'
        };
    }
}