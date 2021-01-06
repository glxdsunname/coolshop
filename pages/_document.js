import React from 'react';
import Document, { Html, Head, Main , NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class Mydocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

Mydocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
    originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

    const initalProps = await Document.getInitialProps(ctx);
    return {
        ...initalProps,
        styles: [
            ...React.Children.toArray(initalProps.styles),
            sheets.getStyleElement(),
        ],
    };
}