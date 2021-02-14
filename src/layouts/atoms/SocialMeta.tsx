import React from 'react'
import Head from 'next/head'
import { TWITTER_USER_NAME, SITE_NAME, SITE_DOMAIN } from '~/lib/constants'

const component: React.FC<{
  title: string
  description?: string
  url?: string
  image?: string
  keywords?: string
}> = ({
  title,
  description = 'こたつでまったりTRPG',
  url = '/',
  image = '/assets/top.jpg',
  keywords = 'こたつーる,こたつーる🍊,キャラクターシート,TRPG,荒野,開拓',
}) => (
  <Head>
    <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
    <meta name="twitter:creator" content={`@${TWITTER_USER_NAME}`} />
    <meta
      name="twitter:card"
      content={image ? 'summary_large_image' : 'summary'}
    />
    {title && <meta name="og:title" content={title} />}
    {url && <meta name="og:url" content={`${SITE_DOMAIN}${url}`} />}
    {description && <meta name="description" content={description} />}
    {description && <meta name="og:description" content={description} />}
    {image && <meta name="og:image" content={image} />}
    {keywords && <meta name="keywords" content={keywords} />}
    <meta property="og:site_name" content={SITE_NAME} />
  </Head>
)
export default component
