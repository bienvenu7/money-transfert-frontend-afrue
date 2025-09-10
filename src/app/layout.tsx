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
  icons: {
    icon: "/ico.png",
    // apple: ['/apple-touch-icon.png?v=4'],
    // shortcut: ['/apple-touch-icon.png'],
  },
  manifest: "/seo/manifest.json",
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
      </head>
      <body className={""}>
        <ErrorBoundary>
          <ToastProvider>{children}</ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
