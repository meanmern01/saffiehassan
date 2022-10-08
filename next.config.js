const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    env: {
        REACT_APP: process.env.REACT_APP,
        REACT_APP_LOCAL: process.env.REACT_APP_LOCAL,
        REACT_APP_SERVER: process.env.REACT_APP_SERVER,
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: 'https://frontendname.netlify.app/' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        formats: [/* 'image/avif',  */ 'image/webp'],
        minimumCacheTTL: 31536000,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg)$/i,
            type: 'asset',
            resourceQuery: /url/, // *.svg?url
        });

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            resourceQuery: { not: [/url/] },
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        prettier: false,
                        svgo: true,
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: { removeViewBox: false },
                                    },
                                },
                            ],
                        },
                        titleProp: true,
                    },
                },
            ],
        });

        return config;
    },
    experimental: {
        scrollRestoration: true,
        runtime: 'nodejs',
        // serverComponents: true,
    },
});
