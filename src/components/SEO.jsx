import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'AI Engineer Brasil';
const SITE_URL = 'https://aiengineer.com.br';
const DEFAULT_DESCRIPTION = 'A comunidade brasileira de AI Engineering. Aprenda a construir com LLMs, Agents, RAG e as ferramentas que estão mudando a programação.';
const TWITTER_HANDLE = '@eduwxyz_';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keyword,
  canonicalUrl,
  type = 'website',
  article = null,
  breadcrumbs = null,
  wikipediaUrl = null,
  noIndex = false,
  faq = null,
  video = null,
  image = null
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = canonicalUrl || SITE_URL;
  const ogImage = image || DEFAULT_OG_IMAGE;

  // Base schema for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'eduwxyz',
      url: 'https://twitter.com/eduwxyz_'
    },
    sameAs: [
      'https://youtube.com/@eduwxyz',
      'https://twitter.com/eduwxyz_',
      'https://github.com/eduwxyz'
    ]
  };

  // WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: fullTitle,
    description: description,
    url: url,
    inLanguage: 'pt-BR',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    }
  };

  // Add sameAs to WebPage if Wikipedia URL provided
  if (wikipediaUrl) {
    webPageSchema.about = {
      '@type': 'Thing',
      name: keyword || title,
      sameAs: wikipediaUrl
    };
  }

  // Article schema for content pages
  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: ogImage,
    author: {
      '@type': 'Person',
      name: 'eduwxyz',
      url: 'https://twitter.com/eduwxyz_'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    inLanguage: 'pt-BR',
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(wikipediaUrl && {
      about: {
        '@type': 'Thing',
        name: keyword || title,
        sameAs: wikipediaUrl
      }
    })
  } : null;

  // BreadcrumbList schema
  const breadcrumbSchema = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined
    }))
  } : null;

  // Course schema for trilha index
  const courseSchema = type === 'course' ? {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Trilha AI Engineer',
    description: 'Aprenda AI Engineering com conteúdo prático que evolui junto com a área.',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL
    },
    isAccessibleForFree: true,
    inLanguage: 'pt-BR',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT20H'
    }
  } : null;

  // FAQPage schema for FAQ sections
  const faqSchema = faq && faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  } : null;

  // VideoObject schema for YouTube embeds
  const videoSchema = video ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title || title,
    description: video.description || description,
    thumbnailUrl: video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
    uploadDate: video.uploadDate || new Date().toISOString().split('T')[0],
    contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`
      }
    },
    ...(video.duration && { duration: video.duration })
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keyword && <meta name="keywords" content={keyword} />}
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title || SITE_NAME} - Comunidade brasileira de AI Engineering`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title || SITE_NAME} - Comunidade brasileira de AI Engineering`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {courseSchema && (
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {videoSchema && (
        <script type="application/ld+json">
          {JSON.stringify(videoSchema)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
