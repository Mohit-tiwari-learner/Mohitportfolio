/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ui.aceternity.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
};

module.exports = nextConfig;
