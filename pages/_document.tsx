import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

export default function Document(props: DocumentProps) {
    const { bodyClass } = props.__NEXT_DATA__.props.pageProps;

    return (
        <Html lang="ru">
            <Head />
            <body className={bodyClass}>
                <Main />
                <div id="portal-root"></div>
                <NextScript />
            </body>
        </Html>
    );
}
