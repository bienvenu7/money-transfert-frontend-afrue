import { Provider } from "react-redux";
import "../styles/global.scss";
import ToastProvider from "./utils/ToastProvider";
import { Metadata } from "next";
import { store } from "@/redux/store";
import manifest from "@/seo/manifest";

export const metadata: Metadata = {
  icons: {
    icon: "/ico.png",
    // apple: ['/apple-touch-icon.png?v=4'],
    // shortcut: ['/apple-touch-icon.png'],
  },
  manifest: "/seo/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 user-scalable=no"
        />
      </head>
      <body className={""}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
