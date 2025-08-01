"use server"

import axios from 'axios';

const BASE_URL = process.env.BASE_URL

export async function getPhoneBookAction() {

    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/esselte/phonebook`);
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
        const { data } = await axios.get(`${BASE_URL}/api/v1/esselte/teszor-mapping`);
        return data;
    } catch (error) {
        console.error('Mapping tábla lekérdezési hiba:', error);
        return {
            success: false,
            message: 'Nem sikerült lekérdezni a mapping táblát. Kérjük, próbáld meg később újra.'
        };
    }

}