"use server"

import axios from 'axios';
import { cookies } from 'next/headers'

import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL

export async function getMonthlyFinanceSummary() {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }
        const { data } = await axios.get(`${BASE_URL}/api/v1/reports/income-expense-summary`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;

    } catch (error) {
        console.error('Összesítő riport lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni az adatokat az összesítő riporthoz. Kérjük, próbáld meg később újra.'
        };
    }
}
export async function getPartners() {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }
        const { data } = await axios.get(`${BASE_URL}/api/v1/reports/partners`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;

    } catch (error) {
        console.error('Összesítő riport lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni az adatokat az összesítő riporthoz. Kérjük, próbáld meg később újra.'
        };
    }
}

export async function getInvoiceStatusSummary(partner_name) {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const url = new URL(`${BASE_URL}/api/v1/reports/invoice-status-summary`);
        if (partner_name) url.searchParams.append("partner_name", partner_name);

        const { data } = await axios.get(url.toString(), {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });
        return data;

    } catch (error) {
        console.error('Összesítő riport lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni az adatokat az összesítő riporthoz. Kérjük, próbáld meg később újra.'
        };
    }
}
