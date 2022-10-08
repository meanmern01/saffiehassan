import { test } from '@playwright/test';
import { HtmlUrlChecker } from 'broken-link-checker';
import { pages } from '../../playwright.config.common';

test.describe('Non-broken links', () => {
    pages.forEach((url) => {
        test(url, ({ baseURL }) => {
            return new Promise((resolve, reject) => {
                const htmlUrlChecker = new HtmlUrlChecker(
                    {},
                    {
                        error: (error) => {
                            reject(error.message);
                        },
                        link: (result) => {
                            if (result.broken) {
                                const errors = [];

                                if (
                                    result.http.response &&
                                    ![undefined, 200].includes(result.http.response.statusCode)
                                ) {
                                    errors.push(`${result.http.response.statusCode} => ${result.http.response.url}`);
                                }

                                reject(errors.join('\n'));
                            } else {
                                resolve();
                            }
                        },
                    },
                );

                htmlUrlChecker.enqueue(baseURL + url);
            });
        });
    });
});
