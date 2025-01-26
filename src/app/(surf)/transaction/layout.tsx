"use client";

import { store } from "@/redux/store";
import { Suspense } from "react";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </Provider>
  );
}
