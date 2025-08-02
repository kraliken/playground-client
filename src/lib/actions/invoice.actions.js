"use server"

import axios from 'axios';
import { invoiceSchema, vendorEmailSchema } from '../schemas';
import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL

export async function getUploadInvoicesAction() {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/aerozone/invoices/all`);
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
            `${BASE_URL}/api/v1/aerozone/upload/invoices`,
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

export async function sendCompleteInvoicesAction(prevData, formData) {

    const rawFormData = Object.fromEntries(formData)

    const result = vendorEmailSchema.safeParse(rawFormData);

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors, data: rawFormData };
    }

    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/aerozone/invoices/send`, formData);
        return {
            success: data.success,
            message: data.message,
            errors: {},
            data: {}
        };
    } catch (error) {
        console.error("Küldési hiba:", error);
        return {
            success: false,
            message: "Nem sikerült elindítani a számlák kiküldését.",
            errors: {},
            data: rawFormData
        };
    }
}

export async function deleteInvoicesAction() {
    try {
        const { data } = await axios.delete(`${BASE_URL}/api/v1/aerozone/invoices/delete`);
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