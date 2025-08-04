/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
};

console.log("DEBUG: nextConfig at build time", nextConfig);


export default nextConfig;