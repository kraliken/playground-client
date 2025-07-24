"use server"

import axios from 'axios';

const BASE_URL = process.env.BASE_URL

export async function getLinkEmailToPartnerAction() {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/connection/all`);
        return data;
    } catch (error) {
        console.error('Kapcsolatok lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni a kapcsolatokat. Kérjük, próbáld meg később újra.'
        };
    }
}

export async function createLinkEmailToPartnerAction(prevState, formData) {

    const rawFormData = Object.fromEntries(formData);
    const { partner_id, email_id } = rawFormData;

    if (!partner_id || !email_id) {
        return {
            success: false,
            message: 'Kérjük, válassz partnert és email címet!',
            errors: {},
            data: rawFormData,
        };
    }

    try {
        const res = await axios.post(`${BASE_URL}/api/v1/connection/create?partner_id=${partner_id}&email_id=${email_id}`);
        return {
            success: true,
            message: 'A kapcsolat sikeresen létrejött!',
            errors: {},
            data: {}
        };
    } catch (error) {
        console.error('Kapcsolat létrehozási hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült összekapcsolni a partnert és az e-mail címet. Kérjük, próbáld újra később.',
            errors: {},
            data: rawFormData,
        };
    }
}

export async function deleteConnectionAction(emailId, partnerId) {
    try {
        const { data } = await axios.delete(`${BASE_URL}/api/v1/connection/delete`, {
            params: {
                email_id: emailId,
                partner_id: partnerId
            }
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