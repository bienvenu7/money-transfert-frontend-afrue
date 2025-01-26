import MobileNav from "../components/navigation/MobileNav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <MobileNav />
      {children}
    </main>
  );
}
