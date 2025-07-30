"use server"

import axios from 'axios';
import { invoiceSchema } from '../schemas';
import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL

export async function getUploadInvoicesAction() {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/invoices/all`);
        return data;
    } catch (error) {
        console.error('Számlák lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni a feltöltött számlákat. Próbáld újra később.'
        };
    }
}

export async function uploadInvoicesAction(prevData, formData) {
    const files = formData.getAll('invoices');
    const result = invoiceSchema.safeParse({ invoices: files });

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors };
    }

    try {
        const { data } = await axios.post(
            `${BASE_URL}/api/v1/upload/invoices`,
            formData
        );
        return {
            success: data.success,
            message: data.message,
        };

    } catch (error) {
        console.error('Feltöltési hiba:', error);
        return {
            success: false,
            errors: { general: ['Hiba történt a feltöltés során'] }
        };
    }
}

export async function uploadInvoiceAction(prevData, formData) {

    const files = formData.getAll('invoice');
    const result = invoiceSchema.safeParse({ invoices: files });

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors };
    }

    try {
        const { data } = await axios.post(
            `${BASE_URL}/api/v1/upload/invoice/volvo`,
            formData
        );
        return {
            success: data.success,
            message: data.message,
        };

    } catch (error) {
        console.error('Feltöltési hiba:', error);
        return {
            success: false,
            errors: { general: ['Hiba történt a feltöltés során'] }
        };
    }
}

export async function sendCompleteInvoicesAction() {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/invoices/send`);
        return {
            success: data.success,
            message: data.message,
        };
    } catch (error) {
        console.error("Küldési hiba:", error);
        return {
            success: false,
            message: "Nem sikerült elindítani a számlák kiküldését."
        };
    }
}

export async function deleteInvoicesAction() {
    try {
        const { data } = await axios.delete(`${BASE_URL}/api/v1/invoices/delete`);
        return {
            success: data.success,
            message: data.message,
        };
    } catch (error) {
        console.error("Küldési hiba:", error);
        return {
            success: false,
            message: "Nem sikerült törölni a számlákat."
        };
    }
}