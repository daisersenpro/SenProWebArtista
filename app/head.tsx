import React from 'react'

export default function Head() {
  const siteUrl = 'https://senpro.netlify.app'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SenPro',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    sameAs: [],
  }

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: 'SenPro',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <link rel="canonical" href={siteUrl} />
      <meta name="robots" content="index, follow" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
    </>
  )
}
