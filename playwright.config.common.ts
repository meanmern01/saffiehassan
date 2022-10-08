import { PlaywrightTestConfig, devices } from '@playwright/test';

export const pages = [
    '',
    '/about',
    '/introduction',
    '/testing',
    '/analysis',
    '/analysis/demographics',
    '/analysis/cosmetic-concerns',
    '/analysis/skin-type',
    '/analysis/weather',
    '/summary',
    '/formula',
];

export const baseConfig: PlaywrightTestConfig = {
    testDir: './tests',
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL: 'http://skinstric.chipsa.ru',
        headless: true,
        trace: 'on-first-retry',
    },
    workers: process.env.CI ? 2 : undefined,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            fullyParallel: true,
        },
    ],
    reporter: [process.env.CI ? ['null'] : ['html']],
};
