import { Provider } from "react-redux";
import "../styles/global.scss";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import ToastProvider from "./utils/ToastProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { Metadata } from "next";
import { store } from "@/redux/store";
import manifest from "@/seo/manifest";
import { getCountries } from "./utils/getCountry";
import { ICountry } from "@/types/country";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    default:
      "AfruE - Transfert d'argent Russie-Afrique | Rapide, Sécurisé, Transparent",
    template: "%s | AfruE - Transfert d'argent Russie-Afrique",
  },
  description:
    "AfruE facilite les transferts d'argent entre la Russie et l'Afrique (CEMAC, UEMOA). Transactions rapides en 5 minutes, frais compétitifs, sécurité maximale. Rejoignez 6000+ clients satisfaits.",
  keywords: [
    "transfert d'argent",
    "Russie Afrique",
    "CEMAC",
    "UEMOA",
    "envoi d'argent",
    "micro-finance",
    "taux de change",
    "transfert international",
    "argent diaspora",
    "frais bas",
    "transaction sécurisée",
    "AfruE",
    "Afru-Exchange",
    "transfert rapide",
    "mobile money",
    "virement bancaire",
  ],
  authors: [{ name: "AfruE Team" }],
  creator: "AfruE",
  publisher: "AfruE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://afrue.com"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/fr",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://afrue.com",
    siteName: "AfruE - Transfert d'argent Russie-Afrique",
    title:
      "AfruE - Transfert d'argent Russie-Afrique | Rapide, Sécurisé, Transparent",
    description:
      "AfruE facilite les transferts d'argent entre la Russie et l'Afrique (CEMAC, UEMOA). Transactions rapides en 5 minutes, frais compétitifs, sécurité maximale.",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "AfruE - Plateforme de transfert d'argent Russie-Afrique",
      },
      {
        url: "/globe.png",
        width: 901,
        height: 460,
        alt: "Transfert d'argent international sécurisé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AfruE",
    creator: "@AfruE",
    title: "AfruE - Transfert d'argent Russie-Afrique | Rapide, Sécurisé",
    description:
      "Facilitez vos transferts d'argent entre la Russie et l'Afrique. Transactions en 5 minutes, frais compétitifs, sécurité maximale.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Finance",
  classification: "Financial Services",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: { url: "/icon.png" },
  },
  manifest: "/seo/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "AfruE",
    "application-name": "AfruE",
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#ffffff",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 user-scalable=no, viewport-fit=cover"
        />

        {/* SEO Meta Tags */}
        <meta name="language" content="fr" />
        <meta name="geo.region" content="RU" />
        <meta name="geo.placename" content="Russia" />
        <meta name="geo.position" content="61.5240;105.3188" />
        <meta name="ICBM" content="61.5240, 105.3188" />

        {/* Business Information */}
        <meta name="business:contact_data:street_address" content="Russia" />
        <meta name="business:contact_data:locality" content="Moscow" />
        <meta name="business:contact_data:country_name" content="Russia" />
        <meta
          name="business:contact_data:phone_number"
          content="+7 963 897-02-92"
        />

        {/* Service Areas */}
        <meta
          name="service-area"
          content="Russia, Senegal, Congo, Cameroon, CEMAC, UEMOA"
        />
        <meta
          name="target-country"
          content="RU, SN, CG, CM, TD, CF, GA, GQ, ML, CI, BF, BJ, NE, TG, ML, CI"
        />

        {/* Financial Services */}
        <meta name="financial-service" content="Money Transfer" />
        <meta name="currency-supported" content="RUB, XOF, XAF, USD, EUR" />
        <meta name="transfert-limit" content="Unlimited" />
        <meta name="processing-time" content="5 minutes max" />

        {/* Security & Compliance */}
        <meta name="security-level" content="Bank-grade encryption" />
        <meta name="compliance" content="Financial regulations compliant" />
        <meta name="license" content="Licensed money transfer service" />

        {/* Performance & Statistics */}
        <meta name="clients-count" content="6000+" />
        <meta name="transactions-count" content="90000+" />
        <meta name="countries-served" content="10+" />
        <meta name="years-experience" content="3+" />

        {/* Additional SEO */}
        <meta name="rating" content="4.8/5" />
        <meta name="reviews-count" content="1000+" />
        <meta name="availability" content="24/7" />
        <meta name="customer-support" content="Multilingual support" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "AfruE",
              alternateName: "Afru-Exchange",
              description:
                "Plateforme de transfert d'argent entre la Russie et l'Afrique, spécialisée dans les transferts vers les pays CEMAC et UEMOA",
              url: "https://afrue.com",
              logo: "https://afrue.com/home/icon.png",
              image: [
                "https://afrue.com/home/icon.png",
                "https://afrue.com/globe.png",
              ],
              telephone: [
                "+7 963 897-02-92",
                "+221 787194501",
                "+242 06 831 8959",
                "+237 6 83 42 26 80",
              ],
              email: "contact@afrue.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "RU",
                addressLocality: "Moscow",
              },
              areaServed: [
                {
                  "@type": "Country",
                  name: "Russia",
                },
                {
                  "@type": "Country",
                  name: "Senegal",
                },
                {
                  "@type": "Country",
                  name: "Congo",
                },
                {
                  "@type": "Country",
                  name: "Cameroon",
                },
                {
                  "@type": "Country",
                  name: "Chad",
                },
                {
                  "@type": "Country",
                  name: "Central African Republic",
                },
                {
                  "@type": "Country",
                  name: "Gabon",
                },
                {
                  "@type": "Country",
                  name: "Equatorial Guinea",
                },
                {
                  "@type": "Country",
                  name: "Mali",
                },
                {
                  "@type": "Country",
                  name: "Ivory Coast",
                },
              ],
              serviceType: "Money Transfer Service",
              currenciesAccepted: ["RUB", "XOF", "XAF", "USD", "EUR"],
              paymentAccepted: ["Cash", "Bank Transfer", "Mobile Money"],
              priceRange: "$$",
              openingHours: "Mo-Su 00:00-23:59",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "1000",
                bestRating: "5",
                worstRating: "1",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Money Transfer Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Russia to Africa Money Transfer",
                      description:
                        "Fast and secure money transfers from Russia to African countries",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "CEMAC Money Transfer",
                      description:
                        "Money transfers to CEMAC countries (Cameroon, Central African Republic, Chad, Republic of the Congo, Equatorial Guinea, Gabon)",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "UEMOA Money Transfer",
                      description:
                        "Money transfers to UEMOA countries (Benin, Burkina Faso, Ivory Coast, Guinea-Bissau, Mali, Niger, Senegal, Togo)",
                    },
                  },
                ],
              },
              sameAs: [
                "https://www.facebook.com/afrue",
                "https://www.twitter.com/afrue",
                "https://www.linkedin.com/company/afrue",
                "https://www.instagram.com/afrue",
              ],
            }),
          }}
        />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AfruE",
              alternateName: "Afru-Exchange",
              url: "https://afrue.com",
              description:
                "Plateforme de transfert d'argent entre la Russie et l'Afrique",
              inLanguage: "fr-FR",
              copyrightYear: "2024",
              creator: {
                "@type": "Organization",
                name: "AfruE",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://afrue.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Accueil",
                  item: "https://afrue.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Transfert d'argent",
                  item: "https://afrue.com/transaction",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "À propos",
                  item: "https://afrue.com/#about",
                },
              ],
            }),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />

        {/* Performance */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      </head>
      <body className={""}>
        <ErrorBoundary>
          <ToastProvider>{children}</ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
