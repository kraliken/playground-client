// app/api/upload/[endpointSuffix]/route.js (App Router)
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request, { params }) {
    try {
        const { endpointSuffix } = params;

        // Cookie lekérése server oldalon
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('access_token')?.value;

        if (!accessToken) {
            return NextResponse.json(
                { detail: 'Nincs bejelentkezve' },
                { status: 401 }
            );
        }

        // FormData lekérése
        const formData = await request.formData();

        // FastAPI hívás a server oldalon (itt működnek a cookie-k)
        const response = await axios.post(`${process.env.BASE_URL}/api/v1/nijhof/upload/invoice/${endpointSuffix}`, {
            headers: {
                'Cookie': `access_token=${token}`
            },
            withCredentials: true,
        });

        // if (!response.ok) {
        //     const errorText = await response.text();
        //     let errorDetail = 'Server error';

        //     try {
        //         const errorJson = JSON.parse(errorText);
        //         errorDetail = errorJson.detail || errorDetail;
        //     } catch {
        //         errorDetail = errorText || errorDetail;
        //     }

        //     return NextResponse.json(
        //         { detail: errorDetail },
        //         { status: response.status }
        //     );
        // }

        // Blob válasz kezelése
        const blob = await response.blob();
        const contentDisposition = response.headers.get('content-disposition');
        const contentType = response.headers.get('content-type');

        // Response headers beállítása
        const headers = new Headers();
        headers.set('Content-Type', contentType || 'application/octet-stream');
        if (contentDisposition) {
            headers.set('Content-Disposition', contentDisposition);
        }

        return new NextResponse(blob, {
            status: 200,
            headers
        });

    } catch (error) {
        console.error('API Route error:', error);
        return NextResponse.json(
            { detail: 'Internal server error' },
            { status: 500 }
        );
    }
}