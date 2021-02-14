import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GTM_TRACKING_ID } from '~/lib/google-tag-manager'

export default class MyDocument extends Document {
  render() {
    // GTMイベント用データレイヤー変数
    const gtmLayer = `dataLayer=[];`
    // GTM
    const gtmScript = !GTM_TRACKING_ID
      ? ''
      : `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_TRACKING_ID}');`
    const gtmFrame = !GTM_TRACKING_ID
      ? ''
      : `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_TRACKING_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`

    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          {/* PWA primary color */}
          <meta name="theme-color" content={'orange'} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <script dangerouslySetInnerHTML={{ __html: gtmLayer }} />
          <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
        </Head>
        <body>
          <noscript dangerouslySetInnerHTML={{ __html: gtmFrame }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
  }
}
