'use server'

import { PlacesClient } from '@googlemaps/places';

const placesClient = new PlacesClient({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    fallback: true
})

export async function searchPlaces(input, sessionToken) {

    console.log("🔍 searchPlaces() called");
    console.log("➡️ Input:", input);
    console.log("➡️ Session Token:", sessionToken);

    if (!input?.trim()) {
        console.log("⚠️ Empty input, returning []");
        return [];
    }

    try {
        console.log("📤 Sending request to Google Places API...");
        const t0 = Date.now();

        const [resp] = await placesClient.autocompletePlaces({
            input,
            sessionToken,
            languageCode: 'hu',
            regionCode: 'HU',
        });

        const ms = Date.now() - t0;
        console.log(`✅ Google API response in ${ms} ms`)

        const suggestions = resp.suggestions ?? [];
        console.log(`💡 Extracted ${suggestions.length} suggestions`);


        return suggestions
            .map((s) => s.placePrediction ?? s.queryPrediction)
            .filter(Boolean)
            .map((p) => ({
                id: p.placeId ?? p.place,
                mainText: p.structuredFormat?.mainText?.text ?? p.text?.text ?? '',
                secondaryText: p.structuredFormat?.secondaryText?.text ?? '',
                raw: p, // ha nem kell, kivehető
            }));
    } catch (error) {
        console.error("❌ Error calling Google Places API:", error);
        return [];
    }

}