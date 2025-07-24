"use server"

import axios from 'axios';
import { newPartnerSchema } from '../schemas';
import * as z from "zod/v4";
import { revalidatePath } from 'next/cache'

const BASE_URL = process.env.BASE_URL

export async function getPartersAction() {
    try {

        // await new Promise(resolve => setTimeout(resolve, 2000));

        const { data } = await axios.get(`${BASE_URL}/api/v1/partners/all`);
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
        console.log({ success: false, errors: fieldErrors, data: rawFormData });
        return { success: false, errors: fieldErrors, data: rawFormData };
    }

    try {
        const response = await axios.post(`${BASE_URL}/api/v1/partner/create`, rawFormData,
            { headers: { "Content-Type": "application/json" } })

        // revalidatePath('task/invoice-sender/partners') // vagy a megfelelő path

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

export async function deletePartnerAction(partnerId) {
    try {
        const { data } = await axios.delete(`${BASE_URL}/api/v1/partner/${partnerId}`);
        return data;
    } catch (error) {
        console.error('Partner törlési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült törölni a partnert. Kérjük, próbáld meg később újra.'
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
        const { data } = await axios.patch(`${BASE_URL}/api/v1/partner/${partnerId}`, rawFormData,
            { headers: { "Content-Type": "application/json" } })

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