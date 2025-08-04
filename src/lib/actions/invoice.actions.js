"use server"

import axios from 'axios';
import { cookies } from 'next/headers'
import { invoiceDataSchema, invoiceSchema, vendorEmailSchema } from '../schemas';
import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL

const MAX_BATCH_SIZE = 900 * 1024;

function chunkFilesBySize(files, maxBatchSize = MAX_BATCH_SIZE) {
    const chunks = [];
    let currentChunk = [];
    let currentSize = 0;

    for (const file of files) {
        if (file.size > maxBatchSize) {
            // Ha egy fájl nagyobb, mint a limit, önálló chunkban küldjük
            if (currentChunk.length > 0) {
                chunks.push(currentChunk);
                currentChunk = [];
                currentSize = 0;
            }
            chunks.push([file]);
            continue;
        }

        if (currentSize + file.size > maxBatchSize) {
            chunks.push(currentChunk);
            currentChunk = [];
            currentSize = 0;
        }

        currentChunk.push(file);
        currentSize += file.size;
    }
    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }
    return chunks;
}


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

        const fileChunks = chunkFilesBySize(files, MAX_BATCH_SIZE);

        // // Itt logoljuk a chunkokat
        // fileChunks.forEach((chunk, i) => {
        //     const totalSize = chunk.reduce((acc, file) => acc + file.size, 0);
        //     console.log(`Chunk ${i + 1}: ${chunk.length} fájl, összesen ${(totalSize / 1024).toFixed(2)} KB`);
        // });

        // // A feltöltést most ne csináld, csak logold a chunkokat!
        // return {
        //     success: true,
        //     message: "Chunk méretek kiírva a logba (feltöltés nem történt meg)."
        // };

        for (let i = 0; i < fileChunks.length; i++) {
            const chunk = fileChunks[i];
            const chunkFormData = new FormData();
            chunk.forEach(file => chunkFormData.append('invoices', file));

            // Ha kell, ide tehetsz batch-azonosítót (opcionális)
            // chunkFormData.append('batchIndex', i);

            const { data } = await axios.post(
                `${BASE_URL}/api/v1/aerozone/upload/invoices`,
                chunkFormData, {
                headers: {
                    'Cookie': `access_token=${token}`
                },
                withCredentials: true,
            }
            );
            // Ha bármelyik batch errorral tér vissza, álljon meg
            if (!data.success) {
                return {
                    success: false,
                    errors: { general: [`Hiba történt a(z) ${i + 1}. batch feltöltésénél: ${data.message || 'Ismeretlen hiba'}`] }
                };
            }
        }

        // // const { data } = await axios.post(
        // //     `${BASE_URL}/api/v1/aerozone/upload/invoices`,
        // //     formData, {
        // //     headers: {
        // //         'Cookie': `access_token=${token}`
        // //     },
        // //     withCredentials: true,
        // // });

        return {
            success: true,
            message: "Minden számla sikeresen feltöltve.",
        };
        // // return {
        // //     success: data.success,
        // //     message: data.message,
        // // };

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