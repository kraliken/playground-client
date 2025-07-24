/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb', // Növeld 10 MB-ra (vagy amennyire szükséged van)
        },
    },
};

export default nextConfig;