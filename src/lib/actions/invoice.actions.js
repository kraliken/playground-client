"use server"

import axios from 'axios';
import { cookies } from 'next/headers'
import { invoiceDataSchema, invoiceSchema, vendorEmailSchema } from '../schemas';
import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL


export async function uploadInvoiceAndExtractData(endpointSuffix, formData) {

    const files = formData.get('file');
    const result = invoiceDataSchema.safeParse({ invoice: files });

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors };
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }
        const response = await axios.post(
            `${BASE_URL}/api/v1/${endpointSuffix}`,
            formData,
            {
                headers: { 'Cookie': `access_token=${token}` },
                responseType: 'arraybuffer',
            }
        );

        let fileName = "invoice.xlsx";
        const cd = response.headers["content-disposition"];
        if (cd) {
            const match = cd.match(/filename[^;=\n]*=((['"]).*?\2|[^;=\n]*)/);
            if (match && match[1]) {
                fileName = match[1].replace(/['"]/g, '');
            }
        }

        const buffer = Buffer.from(response.data);
        const base64Data = buffer.toString('base64');
        const contentType = response.headers['content-type'] ||
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        return {
            success: true,
            message: "A fájl sikeresen elkészült!",
            data: {
                fileName,
                fileData: base64Data,
                contentType,
            },
        };



    } catch (error) {
        let message = "Hiba történt a feltöltés során";
        if (error.response) {
            if (error.response.status === 401) message = "Nincs jogosultság. Jelentkezz be újra.";
            if (error.response.status === 415) message = "Csak PDF fájl tölthető fel!";
            if (error.response.status === 422) message = "PDF feldolgozása sikertelen.";
            try {
                const errorData = JSON.parse(Buffer.from(error.response.data).toString());
                if (errorData?.detail) message = errorData.detail;
            } catch { /* ignore */ }
        }
        return {
            success: false,
            errors: { general: [message] }
        };
    }

    // } catch (error) {
    //     console.error('Feltöltési hiba:', error);
    //     return {
    //         success: false,
    //         errors: { general: ['Hiba történt a feltöltés során'] }
    //     };
    // }
}

export async function getUploadInvoicesAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const { data } = await axios.get(`${BASE_URL}/api/v1/aerozone/invoices/all`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
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
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const { data } = await axios.post(
            `${BASE_URL}/api/v1/aerozone/upload/invoices`,
            formData, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        }
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
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const { data } = await axios.post(
            `${BASE_URL}/api/v1/upload/invoice/volvo`,
            formData, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        }
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
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const { data } = await axios.post(`${BASE_URL}/api/v1/aerozone/invoices/send`, formData, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
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
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const { data } = await axios.delete(`${BASE_URL}/api/v1/aerozone/invoices/delete`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
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